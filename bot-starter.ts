import { Bot, GrammyError, session, HttpError } from "grammy";
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import dotenv from "dotenv";

import { MyContext, MyConversation } from "./tools/types";
import { TYPES_MENU, selectedTypes, tags, tagsMenuMsg } from "./tools/menu";
import { checkTextByAttribute, sendNotionResource } from "./tools/utils";
import { isNotionClientError } from "@notionhq/client";

dotenv.config();


// Define the context type and conversation type
// export type MyContext = Context & SessionFlavor<unknown> & ConversationFlavor;
// export type MyConversation = Conversation<MyContext>;

/*
    - TODO: Add a limit time to answer the questions, otherwise the conversation will be closed.
    - TODO: Improve the edition of the selected types and tags.
    - TODO: Add the notion resource to the workspace.
    - ...
*/


class BotStarter {
    // Ensure BOT_TOKEN is defined
    private botToken: string = process.env.BOT_TOKEN || "";
    public bot = new Bot<MyContext>(this.botToken);
    private selectedTypesRef = selectedTypes;

    constructor() {
        this.startPlugins();
        this.setCommandSuggestion();
        this.startCommands();
        this.startResponses();
        this.startBot();
        console.log("Bot is running...");

    }

    public startBot() {
        this.bot.start().catch((err) => {
            const ctx = err.ctx;
            console.error(`Error while handling update ${ctx.update.update_id}:`);
            const e = err.error;
            if (e instanceof GrammyError) {
                console.error("Error in request:", e.description);
            } else if (e instanceof HttpError) {
                console.error("Could not contact Telegram:", e);
            } else {
                console.error("Unknown error:", e);
            }
        });
    }

    private startResponses() {
        this.bot.on("message", (ctx) => {
            console.log(`${ctx.from.first_name} wrote ${ctx.message.text}`);
            // Colocar en minisculas el mensaje recibido
            if (typeof ctx.message.text !== "undefined") {
                let processedMsg: string = ctx.message.text.toLowerCase();
                // si el mensaje contiene hola, o
                if (processedMsg.includes("hola") || processedMsg.includes("hi")) {
                    ctx.reply("Hi! how can I help you?");
                }
                else if (processedMsg.includes("bye")) {
                    ctx.reply("Goodbye!");
                }
                else {
                    ctx.reply("I'm sorry, I didn't understand that.");
                }
            }
        });
    }

    private startPlugins() {
        this.bot.use(TYPES_MENU)
            .use(session({ initial: () => ({}) }))
            .use(conversations())
            .use(createConversation(this.addNotionResourceConversation, "addNotionResource"))

    }

    private startCommands() {
        // // Start the bot.
        // this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
        // Help the user.
        this.bot.command("help", (ctx) => ctx.reply("I'm here to help you with your notion resources, and to help you with your tasks (I'n an AI)."));
        // Start the bot.
        this.bot.start();
        // Custom command. -> implement AI to understand the user's request.
        this.bot.command("custom", (ctx) => ctx.reply("You triggered a custom command!"));

        // Menu example
        // this.bot.command("menu", async (ctx) => {
        //     await ctx.reply("Checkout this menu: ", {
        //         reply_markup: TYPES_MENU,
        //     });
        // });

        // ===== Notion related commands
        // Get the notion resources through conversation.
        this.bot.command("notionadd", async (ctx) => {
            await ctx.conversation?.enter("addNotionResource");
        });

    }


    private async setCommandSuggestion() {
        await this.bot.api.setMyCommands([
            { command: "custom", description: "Custom command triggered" },
            { command: "help", description: "Help you with yoour tasks" },
            { command: "menu", description: "Menu example" },
            { command: "notionadd", description: "Add a resource to your notion" },

        ]);
    }


    private addNotionResourceConversation = async (conversation: MyConversation, ctx: MyContext) => {

        // Get the URL and parse it
        await ctx.reply("Please provide the URL of the resource you want to add to your notion resources.");
        let urlPromise = await conversation.wait();
        if (urlPromise.msg?.text) {
            if (checkTextByAttribute(urlPromise.msg.text, "url")) {
                await ctx.reply("The URL is valid.");
            } else {
                await ctx.reply("The URL is not valid.");
                await this.addNotionResourceConversation(conversation, ctx);
            }
        }
        //Select the resource's type
        await ctx.reply("Select the type of resource: ", {
            reply_markup: TYPES_MENU,
        });
        await conversation.waitForCommand(["closetypes"]);

        // Select the tags of the resource
        await ctx.reply(tagsMenuMsg);
        let selectedTags = await conversation.wait();
        /*
        check the selectedTags here
        */
        if (selectedTags.msg?.text) {
            if (checkTextByAttribute(selectedTags.msg?.text, "tags", tags.length)) {
                await ctx.reply("The given tags are valid.");
            } else {
                await ctx.reply("There is an error in the tags. Possibly a number is not valid or the tags are not separated by a comma. Please provide the tags again.");
                await this.addNotionResourceConversation(conversation, ctx);
            }
        }


        // Select the name of the resource
        await ctx.reply("Please provide the name of the resource.");
        let name = await conversation.wait();

        // Show the selected types and tags
        let typesMsg: string = "";
        for (let [key, value] of this.selectedTypesRef) {
            if (value) { typesMsg = `[ ${key} ]\n`; break };
        }
        await ctx.reply(`Your resource ${name.msg?.text} is a ${typesMsg} \n with the following tags: ${selectedTags.msg?.text}`);

        // Add the resource to the notion workspace
        // ctx.reply("This will be added to your notion resources. Once added, you will be able to see it in your notion workspace. I'll let you know when it's done. 🚀");


        sendNotionResource(
            {
                name: name.msg?.text,
                url: urlPromise.msg?.text,
                type: this.selectedTypesRef,
                tags: selectedTags.msg?.text
            }
        ).then((response) => {
            if (response) {
                ctx.reply("The resource was added to your notion workspace.");
            } else {
                console.log("response: ", response);
                ctx.reply("We are having trouble adding the resource to your notion workspace. Please try again later.");
            }

        })


        //show the response of the notion resource addition

        //option to edit the selected types and tags
        // await ctx.reply("Do you want to edit the selected types or tags?\ny-yes\nn-no\n");
        // let wantEdit = await conversation.wait();
        // if (wantEdit.msg?.text && wantEdit.msg?.text === "y") {
        //     await this.addNotionResourceConversation(conversation, ctx);
        // } else {
        //     //send and return
        //     return;
        // }

    }

}

export default BotStarter;
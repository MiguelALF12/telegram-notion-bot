import { Bot, GrammyError, session, HttpError } from "grammy";
import {
    conversations,
    createConversation,
} from "@grammyjs/conversations";
import { MyContext, MyConversation } from "./tools/types";
import { TYPES_MENU, selectedTypes, tagsMenuMsg } from "./tools/menu";
import { checkTextByAttribute } from "./tools/utils";
import dotenv from "dotenv";

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
    private selectedTags: string = "";

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
        await ctx.reply("Select the type of resource: ", {
            reply_markup: TYPES_MENU,
        });

        // Wait for the type
        await conversation.waitForCommand(["closetypes"]);
        // Wait for the tags
        await ctx.reply(tagsMenuMsg);
        let tags = await conversation.wait();

        if (tags.msg?.text) this.selectedTags = tags.msg.text;

        await ctx.reply(`You selected the following types: ${this.selectedTypesRef.keys()} and the following tags: ${this.selectedTags}`);
        await ctx.reply("Do you want to edit the selected types or tags?\ny-yes\nn-no\n");
        let wantEdit = await conversation.wait();
        if (wantEdit.msg?.text && wantEdit.msg?.text === "y") {
            await this.addNotionResourceConversation(conversation, ctx);
        } else {
            //send and return
            return;
        }

    }

}

export default BotStarter;
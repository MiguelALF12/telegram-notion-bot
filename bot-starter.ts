import { Bot, GrammyError, HttpError } from "grammy";
import dotenv from "dotenv";
dotenv.config();

// Ensure BOT_TOKEN is defined
const botToken: string = process.env.BOT_TOKEN || "";
const bot = new Bot(botToken);


class BotStarter {
    // Ensure BOT_TOKEN is defined
    private botToken: string = process.env.BOT_TOKEN || "";
    public bot = new Bot(botToken);

    constructor() {
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
    private startCommands() {
        // // Start the bot.
        // this.bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
        // Help the user.
        this.bot.command("help", (ctx) => ctx.reply("I'm here to help you with your notion resources, and to help you with your tasks (I'n an AI)."));
        // Start the bot.
        this.bot.start();
        // Custom command. -> implement AI to understand the user's request.
        this.bot.command("custom", (ctx) => ctx.reply("You triggered a custom command!"));
        // ===== Notion related commands
        // Get the notion resources.
        this.bot.command("notionadd", (ctx) => {
            let url: string = ctx.match;
            console.log("Adding notion resources ... ", url);
            // check if the url is not empty
            // else, return an error message.
            if (/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
                // The string is a valid URL, add it to the notion resources.
                ctx.reply(`You want to add this ${url} to your notion resources.`);
            } else {
                // The string is not a valid URL, return an error message.
                ctx.reply("You need to provide a valid URL to add to your notion resources.");
            }
        });

    }

}

export default BotStarter;
# Telegram Bot to add pages to a notion database

## Description

> **NOTE**: This is a work in progress. The bot is not yet functional or deployed.

This is a telegram bot that allows you to add pages to a notion database. It uses the notion API to add pages to a database.

## Installation

Provide step by step series of examples and explanations about how to get a development environment running.

```bash
git clone <your-repo-link>
cd <your-repo-name>
npm install
```

## Usage
### Environment variables
If you want to create a new bot, and use the current code as a base, you will need to create a new bot using the BotFather in telegram. Then you will need to create a new integration in Notion and get the token and the database id. You will need to create a .env file with the following variables:
```bash
BOT_TOKEN="Bot token given by BotFather"
NOTION_API_TOKEN="Token given by Notion"
NOTION_DATABASE_ID="Database id given in which you want to add the pages"
```
For you to have the NOTION_API_TOKEN you will need to create a new integration in Notion API [HERE](https://www.notion.so/my-integrations) and get the token. You can get the database id of the database by copying the id from the URL. The id is the part of the url that comes after the last slash, for example: https://www.notion.so/Database-Name-1234567890abcdef1234567890abcdef, the id is 1234567890abcdef1234567890abcdef.
### Commands

At first the bot will have the following commands:
- /custom: Custom command triggered
- /help: Help you with yoour tasks
- /menu: Menu example
- /notionadd: Add a resource to your notion
> *The only command that is functional is the /notionadd command*.

You can go to the /notionadd command and start the conversation to add a resource to your notion database. The bot will ask you for the title, the type, the tags, the description and the link of the resource. After you have answered all the questions, the bot will add the resource to the database and will send you a message with the link to the resource in the database.

At some point you will have to enter the /closetypes command to close the response of the types.

You can override the current commands, or add new ones in the bot-starter.ts folder.

There is a file to test only the notion API, you can run it with the following command:
```bash
npx tsx serverNotion.ts
```
This file has the client to the notion API, which has some useful methods to interact with the notion API in the context of adding pages.

## Start
To start the project run the following command:
```bash
npm run start
```
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact
email: miguel.lopez@utp.edu.co || flepard3612@gmail.com

***
## TODO
- [ ] Solve the issue of the bot not being able to create a new page in the notion database
- [ ] Make an easier-to-use interface for the bot, reducing the number of commands needed to create a new page
- [ ] Add a limit time to answer the questions, otherwise the conversation will be closed.
- [ ] Improve the edition of the selected types and tags.
- [ ] Create DockerFile for the bot and test it in a docker container
- [ ] Deploy the bot on the digital ocean server
- [ ] Add the notion resource to the workspace.
- [ ] [**Optional**] Implement the AI feature to the bot, so that it can understand natural language and create a new page based on the user's input
- [ ] [**Optional**] Add authentication to the bot, so that only certain users can use it

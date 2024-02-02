// In this file, we connect to the Notion Service
import dotenv from 'dotenv';
import { Client, LogLevel } from '@notionhq/client';

dotenv.config();


const notion = new Client({ auth: process.env.NOTION_API_TOKEN, logLevel: LogLevel.INFO });
export default notion;
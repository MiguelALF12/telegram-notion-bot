import { SessionFlavor, Context } from "grammy";
import {
    type Conversation,
    type ConversationFlavor,
} from "@grammyjs/conversations";

// Define the context type and conversation type
export type MyContext = Context & SessionFlavor<unknown> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;



import notion from "./notion_cli";

import { APIErrorCode, ClientErrorCode, isNotionClientError } from "@notionhq/client";
class NotionResources {
    databaseId: string;

    constructor() {
        this.databaseId = process.env.NOTION_DATABASE_ID || "";
    }

    async getResources() {
        try {
            const response = await notion.databases.query({
                database_id: this.databaseId,
                filter: {
                    or: [
                        {
                            property: "Type",
                            select: {
                                equals: "Site"
                            }
                        },
                        {
                            property: "Type",
                            select: {
                                equals: "tool"
                            }
                        }
                    ]
                }
            });
            return response.results;
        } catch (error: unknown) {
            if (isNotionClientError(error)) {
                // error is now strongly typed to NotionClientError
                switch (error.code) {
                    case ClientErrorCode.RequestTimeout:
                        console.error("[ClientErrorCode] Request timed out");
                        break
                    case APIErrorCode.ObjectNotFound:
                        console.error("[APIErrorCode] Object not found");
                        break
                    case APIErrorCode.Unauthorized:
                        console.error("[APIErrorCode] Unauthorized");
                        break
                    // ...
                    default:
                        // you could even take advantage of exhaustiveness checking
                        console.error("An unexpected error occurred");

                }
            }
        }
    }

    async addResource(resource: any) {
        try {
            const response = await notion.pages.create({
                parent: { database_id: this.databaseId },
                properties: resource
            });
            return response;
        } catch (error: unknown) {
            if (isNotionClientError(error)) {
                // error is now strongly typed to NotionClientError
                switch (error.code) {
                    case ClientErrorCode.RequestTimeout:
                        console.error("[ClientErrorCode] Request timed out");
                        break
                    case APIErrorCode.ObjectNotFound:
                        console.error("[APIErrorCode] Object not found");
                        break
                    case APIErrorCode.Unauthorized:
                        console.error("[APIErrorCode] Unauthorized");
                        break
                    // ...
                    default:
                        // you could even take advantage of exhaustiveness checking
                        console.error("An unexpected error occurred");

                }
            }
        }
    }

    async getPageTypeProperty() {
        try {
            const response = await notion.databases.retrieve({
                database_id: this.databaseId
            });

            let typeProps = response?.properties.Type;
            let propsVals: any[] = [];
            if (typeProps && typeProps.type === 'select') {
                typeProps.select.options.forEach((option: any) => {
                    propsVals.push(option.name);
                });
            }
            return propsVals;

        } catch (error: unknown) {
            if (isNotionClientError(error)) {
                // error is now strongly typed to NotionClientError
                switch (error.code) {
                    case ClientErrorCode.RequestTimeout:
                        console.error("[ClientErrorCode] Request timed out");
                        break
                    case APIErrorCode.ObjectNotFound:
                        console.error("[APIErrorCode] Object not found");
                        break
                    case APIErrorCode.Unauthorized:
                        console.error("[APIErrorCode] Unauthorized");
                        break
                    // ...
                    default:
                        // you could even take advantage of exhaustiveness checking
                        console.error("An unexpected error occurred");

                }
            }
        }

    }

    async getPageTagsProperty() {
        try {
            const response = await notion.databases.retrieve({
                database_id: this.databaseId
            });

            let typeProp = response?.properties.Tags;
            let propsVals: any[] = [];
            if (typeProp && typeProp.type === 'multi_select') {
                typeProp.multi_select.options.forEach((option: any) => {
                    propsVals.push(option.name);
                });
            }
            return propsVals;

        } catch (error: unknown) {
            if (isNotionClientError(error)) {
                // error is now strongly typed to NotionClientError
                switch (error.code) {
                    case ClientErrorCode.RequestTimeout:
                        console.error("[ClientErrorCode] Request timed out");
                        break
                    case APIErrorCode.ObjectNotFound:
                        console.error("[APIErrorCode] Object not found");
                        break
                    case APIErrorCode.Unauthorized:
                        console.error("[APIErrorCode] Unauthorized");
                        break
                    // ...
                    default:
                        // you could even take advantage of exhaustiveness checking
                        console.error("An unexpected error occurred");

                }
            }
        }

    }

}

export default NotionResources;
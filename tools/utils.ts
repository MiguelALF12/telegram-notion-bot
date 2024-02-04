import NotionResources from "../notion_api_handler/notion.controller"

export const checkTextByAttribute = (text: string, attribute: string) => {

    if (attribute === "url") {
        if (text.length > 0 && /((http(s)?|ftp):\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(text)) {
            // The string is a valid URL, add it to the notion resources.
            return true
        } else {
            // The string is not a valid URL, return an error message.
            return false
        }
    }
}

export const sendNotionResource = (newPage: object) => {
    // Get the notion resource properties.
    const notionResource = new NotionResources();
    // Format the newPage object in the tags and type properties.

    // notionResource.addResource(newPage)

    // Return the new page id, also, the response of .addResource(newPage).
}
import { types } from "util"
import NotionResources from "../notion_api_handler/notion.controller"
import { tags } from "./menu"


/**
 * 
 * @param text  The text that will be checked.
 * @param attribute  The attribute that will be checked.
 * @param params  The parameters that will be used to check the text.
 * @returns True if the text is valid, else, false.
 */

export const checkTextByAttribute = (text: string, attribute: string, ...params: any[]) => {

    if (attribute === "url") {
        if (text.length > 0 && /((http(s)?|ftp):\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(text)) {
            // The string is a valid URL, add it to the notion resources.
            return true
        } else {
            // The string is not a valid URL, return an error message.
            return false
        }
    } else if (attribute === "tags") {
        console.log(params[0])
        let textWthoutSpaces = text.replace(/\s/g, '');
        let tags = textWthoutSpaces.split(",");
        let tagAsNumber;
        console.log(tags);
        for (let tag of tags) {
            tagAsNumber = parseInt(tag);
            // Chekc if the string is a number
            if (isNaN(tagAsNumber) || (tagAsNumber > params[0] || tagAsNumber < 0)) {
                return false
            }
        }
        return true
    }
}

const getTagsValues = (type: string, value: any) => {
    let textWthoutSpaces = value.replace(/\s/g, '');
    let tagsAsIndexStrings = textWthoutSpaces.split(",");
    let tagAsNumber;
    let tagsValues = [];
    for (let tag of tagsAsIndexStrings) {
        tagAsNumber = Number(tag);
        tagsValues.push({ name: tags[tagAsNumber] });
    }
    return tagsValues

}

const getTypeValue = (types: Map<string, boolean>) => {
    for (let [key, value] of types) {
        if (value) {
            return key
        }
    }
}

/**
     * This function will send the newPage object to the notion API.
     * 
     * @param newPage The new page object that will be added to the notion workspace.
     *  
     *  The newPage object should have the following properties:
     *  - name: The name of the resource.
     *  - url: The URL of the resource.
     *  - type: The type of the resource.
     *  - tags: The tags of the resource.
     * 
     * @returns The new page id, also, the response of .addResource(newPage).
     * 
     * 
     */

export const sendNotionResource = (newPage: any) => {

    // Get the notion resource properties.
    const notionResource = new NotionResources();
    // Format the newPage object in the tags and type properties. 
    let tagsValues = getTagsValues("tags", newPage.tags);
    const newResource = {
        Type: {
            select: {
                name: 'tool'
            }
        },
        Link: {
            url: "https://example.com"
        },
        'Sub-courses': {
            relation: [],
            has_more: false
        },
        'Tags': {
            multi_select: [
                { name: 'Repos' },
                { name: 'Node' },
                { name: 'JavaScript' }
            ]
        },
        Course: {
            relation: [],
            has_more: false
        },
        Name: {
            title: [{
                text: {
                    content: "Test Resource v2.1"
                }
            }]
        }
    }
    const pageToSend = {
        Type: {
            select: {
                name: getTypeValue(newPage.type)
            }
        },
        Link: {
            url: newPage.url
        },
        'Sub-courses': {
            relation: [],
            has_more: false
        },
        'Tags': {
            multi_select: tagsValues
        },
        Course: {
            relation: [],
            has_more: false
        },
        Name: {
            title: [{
                text: {
                    content: newPage.name
                }
            }]
        }
    }

    console.log("Page(Formated) that will be added: \n", pageToSend);
    return notionResource.addResource(newResource)

    // Return the new page id, also, the response of .addResource(newPage).
}

export const toggleSelectedType = (type: string, value: boolean, selectedTypes: Map<string, boolean>): boolean => {
    // Check if there is a selected type in selectedTypes, if so, return false, else, return true.
    for (let [key, currvalue] of selectedTypes) {
        if (key != type && currvalue) {
            console.log("There is a selected type, dont update the menu.")
            return false
        }
    }
    console.log("could be a selected type, toggle this one, update the menu.")
    selectedTypes.set(type, value)
    return true
}

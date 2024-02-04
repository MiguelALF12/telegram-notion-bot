import NotionResources from "./notion.controller";
import { isFullPageOrDatabase } from "@notionhq/client";
const resources = new NotionResources();

// resources.getResources().then((results) => {
//     // console.log("results: ", results?.length);
//     // results?.forEach((result: any) => {
//     //     console.log(result.properties, "\n");
//     //     console.log(result.properties.Name.title[0]?.plain_text);
//     // });
// }).catch((error) => {
//     console.error(error);
// });

const newResource = {
    Type: {
        select: {
            name: 'Site',
            color: 'red'
        }
    },
    Link: {
        url: "https://example.com"
    },
    'Sub-courses': {
        relation: [],
        has_more: false
    },
    'Multi-select': {
        multi_select: []
    },
    Course: {
        relation: [],
        has_more: false
    },
    Name: {
        title: [{
            text: {
                content: "Test Resource"
            }
        }]
    }
}

// resources.addResource(newResource).then((response) => {
//     console.log("response: ", response);
// }).catch((error) => {
//     console.error(error);
// });

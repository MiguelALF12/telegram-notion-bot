import NotionResources from "./notion_api_handler/notion.controller";
import { isFullPageOrDatabase } from "@notionhq/client";
const resources = new NotionResources();

// resources.getResources().then((results) => {
//     console.log("results: ", results);
//     // results?.forEach((result: any) => {
//     //     console.log(result.properties, "\n");
//     //     console.log(result.properties.Name.title[0]?.plain_text);
//     // });
// }).catch((error) => {
//     console.error(error);
// });

console.log(__dirname);
console.log(process.cwd());

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
console.log("newResource: ", newResource);
resources.addResource(newResource).then((response) => {
    console.log("response: ", response);
}).catch((error) => {
    console.error(error);
});

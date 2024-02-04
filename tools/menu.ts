import NotionResources from "../notion_api_handler/notion.controller";
import { Menu } from "@grammyjs/menu";
import { MyContext } from "./types";



//=============== Get the notion resource properties.
// const notionResource = new NotionResources();
// const typesRes = notionResource.getPageTypeProperty();
// const tagsRes = notionResource.getPageTagsProperty();

//Get the types of the resources from the notion workspace.
/* Use it only when ther is an update within the notion workspace types-tags property */
// typesRes.then((types) => {
//     types?.forEach((type) => {
//         console.log(type)
//     })
// });
// tagsRes.then((tags) => {
//     tags?.forEach((tag) => {
//         console.log(tag)
//     })
// });

// ================== Define the menus ==================
// Define the selected types
export const selectedTypes = new Map();

selectedTypes.set("article", false);
selectedTypes.set("series", false);
selectedTypes.set("film", false);
selectedTypes.set("podcast", false);
selectedTypes.set("academic_journal", false);
selectedTypes.set("essay_resource", false);
selectedTypes.set("video", false);
selectedTypes.set("book", false);
selectedTypes.set("tool", false);
selectedTypes.set("stackoverflow", false);
selectedTypes.set("site", false);
selectedTypes.set("course", false);
selectedTypes.set("completed_course", false);
selectedTypes.set("movie", false);


export const TYPES_MENU = new Menu<MyContext>("typemenu", { onMenuOutdated: false })
    .text(() => selectedTypes.get("article") ? "📠 Article ✅" : "📠 Article"
        , (ctx) => {
            selectedTypes.set("article", !selectedTypes.get("article"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("series") ? "📺 TV Series ✅" : "📺 TV Series"
        , (ctx) => {
            selectedTypes.set("series", !selectedTypes.get("series"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("film") ? "📽 Film ✅" : "📽 Film"
        , (ctx) => {
            selectedTypes.set("film", !selectedTypes.get("film"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("podcast") ? "🎙 Podcast ✅" : "🎙 Podcast"
        , (ctx) => {
            selectedTypes.set("podcast", !selectedTypes.get("podcast"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("academic_journal") ? "🎓 Journal ✅" : "🎓 Journal"
        , (ctx) => {
            selectedTypes.set("academic_journal", !selectedTypes.get("academic_journal"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("essay_resource") ? "📚 Essay Resource ✅" : "📚 Essay Resource"
        , (ctx) => {
            selectedTypes.set("essay_resource", !selectedTypes.get("essay_resource"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("video") ? "🎥 Video ✅" : "🎥 Video"
        , (ctx) => {
            selectedTypes.set("video", !selectedTypes.get("video"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("book") ? "📒 Book ✅" : "📒 Book"
        , (ctx) => {
            selectedTypes.set("book", !selectedTypes.get("book"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("tool") ? "🛠 tool ✅" : "🛠 tool"
        , (ctx) => {
            selectedTypes.set("tool", !selectedTypes.get("tool"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("stackoverflow") ? "🔑 StackOVerflow ✅" : "🔑 StackOVerflow"
        , (ctx) => {
            selectedTypes.set("stackoverflow", !selectedTypes.get("stackoverflow"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("site") ? "🖥 Site ✅" : "🖥 Site"
        , (ctx) => {
            selectedTypes.set("site", !selectedTypes.get("site"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("course") ? "🔌 Course ✅" : "🔌 Course"
        , (ctx) => {
            selectedTypes.set("course", !selectedTypes.get("course"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("completed_course") ? "💡 Completed-course ✅" : "💡 Completed-course"
        , (ctx) => {
            selectedTypes.set("completed_course", !selectedTypes.get("completed_course"));
            ctx.menu.update()
        }).row()
    .text(() => selectedTypes.get("movie") ? "📼 Movie ✅" : "📼 Movie"
        , (ctx) => {
            selectedTypes.set("movie", !selectedTypes.get("movie"));
            ctx.menu.update()
        }).row()

// Define the selected tags
export let tagsMenuMsg: string = "Select the tags for the resource.\nType the number according to the tag, use a comma to separate them (1,2,3,...): \n * Type /notag to skip the tags selection. \n\n";
export const tags: string[] = [
    "Tools",
    "Repos",
    "Node",
    "JavaScript",
    "Solidity",
    "Blockchain",
    "NFT",
    "Hard concepts",
    "English",
    "Playlists",
    "Projects",
    "mini-courses",
    "Web development",
    "CLOUD",
    "LINUX",
    "OPEN SOURCE",
    "Bootcamp",
    "C#",
    "API",
    "CERTIFICATIONS",
    "Security",
    "BACKEND",
    "Jobs",
    "Terminal",
    "Github",
    "History",
    "C++",
    "Low level programming",
    "Programming advices",
    "IA",
    "Reverse Engineering",
    "Cybersecurity",
    "Assembly",
    "Python",
    "University projects",
    "Deployment",
    "Algorithms",
    "Computer Science",
    "Data structures",
    "repo",
    "Work",
    "Programming Jobs",
    "React",
    "Real time",
    "debugger",
    "Patterns",
    "Tech companies",
    "Skills",
    "Humanity",
    "Brain",
    "Get better at things",
    "model",
    "Referent",
    "Exxample",
    "free",
    "C/C++",
    "C",
    "Grammars",
    "Machine learning",
    "Artificial Intelligence",
    "free courses",
    "Networks",
    "Mongo",
    "Express",
    "Finished",
    "HTML",
    "basics",
    "Coursera",
    "MASTERMIND",
    "Hardware",
    "Pc",
    "django",
    "SaaS",
    "documenting",
    "markdown",
    "tutorial",
    "Frameworks",
    "Videojuegos",
    "Physics",
    "Wallpapers",
    "Image",
    "Opinion",
    "Learn",
    "Tool",
    "Fisica",
    "self-development",
    "productivity",
    "Math",
    "databases",
    "data generation",
    "SQL",
    "schema",
    "Codigo Facilito",
    "EDX",
    "MINTIC",
    "Springboot",
    "Java",
    "Sequalize",
    "Servers",
    "nginx",
    "Deep learning",
    "AWS",
    "practice problems",
    "competitive programming",
    "interviews",
    "Frontend",
    "style",
    "programming languages",
    "Devops",
    "Anti-procrastination",
    "Research",
    "services"
]
let tagRow: string = "";
tags.forEach((tag, index) => {
    tagRow = `[ ${index} ] - #${tag}\n`;
    tagsMenuMsg += tagRow;
})
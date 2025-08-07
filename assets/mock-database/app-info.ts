import type { AppFeature } from "~/types/app";

export const appFeatures: AppFeature[] = [
    {
        id: 1,
        title: "Image Recognition",
        iconUrl:"/media/images/icons/icon-park_upload-picture.png",
        description: "Upload a scene from your gallery or snap a quick pic — our AI compares it to millions of movie frames to pinpoint the film."
    },
    {
        id: 2,
        title: " Audio Recognition",
        iconUrl:"/media/images/icons/fluent_mic-record-28-regular.png",
        description: "Upload or record any movie audio — quote, dialogue, background score. Our AI will find the film faster than you can say “I’ll be back” It’s like Shazam, but built for movie nerds."
    },
    {
        id: 3,
        title: "Line Search",
        iconUrl:"/media/images/icons/si_search-line.png",
        description: "Even half-remembered quotes work. Just type what you recall, and we’ll scan thousands of scripts to track down the movie and the scene."
    },
    {
        id: 4,
        title: "Video Clip Search",
        iconUrl:"/media/images/icons/fluent_video-clip-multiple-20-regular.png",
        description: "Record or upload a quick video snippet, and we’ll instantly identify the movie — even give you the exact timestamp where the clip appears."
    },
];
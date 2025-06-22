import type { AppFeature } from "../interfaces";

export const appFeatures: AppFeature[] = [
    {
        id: 1,
        title: "Video recognition",
        iconUrl:"/media/images/icons/icon-park_upload-picture.png",
        description: "Upload a screenshot or Record a short clip (5-10 seconds) from a movie— our AI scans millions of movie frames to instantly match your scene"
    },
    {
        id: 2,
        title: " Audio Recognition",
        iconUrl:"/media/images/icons/fluent_mic-record-28-regular.png",
        description: "record, or upload an audio clip (E.g., dialogue, soundtrack, background score)— our sound recognition detects songs, scores, and dialogue in seconds. "
    },
    {
        id: 3,
        title: "Line Search",
        iconUrl:"/media/images/icons/si_search-line.png",
        description: "Type in a famous (or fuzzy) movie line or quote— Our Ai searches through thousands of scripts for matches. we’ll pinpoint the exact movie and scene."
    },
    {
        id: 4,
        title: "Video Clip Search",
        iconUrl:"/media/images/icons/fluent_video-clip-multiple-20-regular.png",
        description: "Upload a short clip—we’ll identify the film and even tell you the timestamp."
    },
];
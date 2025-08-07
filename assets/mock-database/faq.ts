import type { FAQ } from "~/types/app";

export const faqs: FAQ[] = [
    {
        id: 1,
        question: "What kind of clips or screenshots work best?",
        answer: "Anything clear enough to capture a character, setting, or key moment usually works great. Even older, grainy uploads often get matched — just aim for 5–10 seconds for video or a solid frame for images."
    },
    {
        id: 2,
        question: "Can SnipSuggest recognize foreign-language films or shows?",
        answer: "Yes! Our AI isn't picky about language — as long as the visuals or sounds are distinct enough, it can match movies from around the world."
    },
    {
        id: 3,
        question: "I only remember part of a quote. Will Line Search still work?",
        answer: "Totally. You don’t need the exact line — just type what you remember. We’ll do the heavy lifting and find close script matches that point you to the scene."
    },
    {
        id: 4,
        question: "What happens to the media I upload? Is it saved?",
        answer: "Nope. We process your uploads for recognition only, then delete them right after. No storage, no snooping, just pure movie-matching magic."
    },
    {
        id: 5,
        question: "Is this just for movies? What about TV shows or anime?",
        answer: "We're expanding! Right now, SnipSuggest works best with movies, but support for shows, series, and anime is rolling out soon — stay tuned."
    },
];
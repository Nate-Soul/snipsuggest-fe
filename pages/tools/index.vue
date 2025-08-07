<script setup lang="ts">
    const tools = [
        {
            id: 1,
            title: "Image Recognizer",
            iconUrl:"/media/images/icons/icon-park_upload-picture.png",
            description: "Upload a screenshot or snap a scene — our AI scans millions of movie frames to match it instantly. Paused a scene? Took a still? That’s enough.",
            link: "/tools/file-search"
        },
        {
            id: 2,
            title: " Audio Search",
            iconUrl:"/media/images/icons/fluent_mic-record-28-regular.png",
            description: "Record or upload a clip — dialogue, soundtrack, or even background noise. Our sound recognition finds the movie in seconds. Yes, even that one from your dream.",
            link: "/tools/line-search"
        },
        {
            id: 3,
            title: "Line Search",
            iconUrl:"/media/images/icons/si_search-line.png",
            description: "Type in a famous (or fuzzy) quote — our AI dives into thousands of scripts to find the exact movie and scene. Misquoted? No problem.",
            link: "/tools/line-search"
        },
        {
            id: 4,
            title: "Video Clip Search",
            iconUrl:"/media/images/icons/fluent_video-clip-multiple-20-regular.png",
            description: "Upload a short clip (5–10 seconds) — we’ll identify the film and give you the exact timestamp. Perfect for action scenes, montages, or mysterious flashbacks.",
            link: "/tools/file-search"
        },
    ];
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main>
        <section class="py-10 md:py-16 lg:py-20 bg-background-500 text-white/85">
            <div class="container mx-auto px-4">
                <hgroup class="text-center mb-14 flex flex-col gap-y-4 w-full xs:w-3/4 md:w-1/2 mx-auto">
                    <h1 class="text-4xl">SnipSuggest Tools</h1>
                    <p>Use any clue you’ve got — screenshot, clip, audio, or a half-remembered line — and we’ll find the film.</p>
                </hgroup>
                <div class="w-full smd:w-4/5 md:w-3/4 lg:w-3/5 mx-auto grid grid-cols-1 xs:grid-cols-2 gap-2.5">
                    <NuxtLink 
                        v-for="tool in tools" class="rounded border border-white/10 bg-background-400 p-5" 
                        :key="tool.id"
                        :to="tool.link"
                    >
                        <div class="rounded-full border border-white/65 h-20 w-20 mx-auto flex-center mb-4">
                            <img :src="tool.iconUrl" :alt="tool.title" width="40" height="40" />
                        </div>
                        <div class="flex flex-col gap-y-1.5 text-center">
                            <h5 class="font-semibold font-roboto">{{ tool.title }}</h5>
                            <p class="font-light text-white/70 text-sm">{{ tool.description }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
    <SectionsMainFooter/>
</template>
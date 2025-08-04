<script setup lang="ts">
    const tools = [
        {
            id: 1,
            title: "Image Recognizer",
            iconUrl:"/media/images/icons/icon-park_upload-picture.png",
            description: "Upload a screenshot or Record a short clip (5-10 seconds) from a movie— our AI scans millions of movie frames to instantly match your scene",
            link: "/tools/file-search"
        },
        {
            id: 2,
            title: " Audio Search",
            iconUrl:"/media/images/icons/fluent_mic-record-28-regular.png",
            description: "record, or upload an audio clip (E.g., dialogue, soundtrack, background score)— our sound recognition detects songs, scores, and dialogue in seconds.",
            link: "/tools/line-search"
        },
        {
            id: 3,
            title: "Line Search",
            iconUrl:"/media/images/icons/si_search-line.png",
            description: "Type in a famous (or fuzzy) movie line or quote— Our Ai searches through thousands of scripts for matches. we’ll pinpoint the exact movie and scene.",
            link: "/tools/line-search"
        },
        {
            id: 4,
            title: "Video Clip Search",
            iconUrl:"/media/images/icons/fluent_video-clip-multiple-20-regular.png",
            description: "Upload a short clip—we’ll identify the film and even tell you the timestamp.",
            link: "/tools/file-search"
        },
    ];
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main>
        <section class="py-10 md:py-16 lg:py-20 bg-background-500 text-white/85">
            <div class="container mx-auto px-4">
                <div class="w-full smd:w-4/5 md:w-3/4 lg:w-3/5 mx-auto grid grid-cols-1 xs:grid-cols-2 gap-2.5">
                    <NuxtLink 
                        v-for="tool in tools" class="rounded border border-white/10 bg-background-400 p-4" 
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
<script lang="ts" setup>
definePageMeta({
    layout: 'dashboard'
});

const empty = ref(true)

const toggleView = () => {
    empty.value = !empty.value;
}
</script>


<template>
    <div class="h-screen w-full flex-center relative z-0 overflow-hidden" v-if="empty">
        <div class="flex flex-col w-1/2 items-center gap-y-5 text-center">
            <img src="/media/images/bg/activity-hub.png" alt="" width="200">
            <h1 class="text-4xl capitalize">No activities on your feed</h1>
            <p>Explore movies and engage with community to see your activities here</p>
            <NuxtLink to="/movies" class="btn btn-lg btn-primary w-max">
                Explore Movies
            </NuxtLink>
            <button @click="toggleView">
                <Icon name="tabler:eye"/>
            </button>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute left-0 bottom-0 -z-[1]" width="200">
    </div>
    <section v-else="empty" class="bg-background-500 text-white px-6 py-10">
        <div class="flex flex-col gap-y-8">
            <h1 class="text-2xl font-semibold font-roboto">Recent Activities</h1>
            <div class="flex items-center justify-between">
                <button class="btn btn-md bg-background-300 text-white gap-x-1">This week &#9733;</button>
            </div>
            <div class="flex flex-col gap-y-6">
                <div class="activity-card flex items-center justify-between gap-x-4 p-4 rounded-lg bg-background-400 text-sm">
                    <div class="flex items-center gap-x-2">
                        <div class="w-10 h-10 bg-white rounded-full"></div>
                        <div class="flex flex-col gap-y-1">
                            <p>You replied to  on MovieJunky’ s comment</p>
                            <NuxtLink 
                                to="/movies#engagementPanel"
                                class="text-primary-500"
                            >
                                See comment
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <p>In my opinion the movie doesn't match the whole hype around it. Its just a regular average movie</p>
                        <p class="text-end"><span>04:40pm</span> <span>May 4, 2025</span></p>
                    </div>
                </div>
                <div class="activity-card flex items-center justify-between gap-x-4 p-4 rounded-lg bg-background-400 text-sm">
                    <div class="flex items-center gap-x-2">
                        <div class="w-10 h-10 bg-white rounded-full"></div>
                        <div class="flex flex-col gap-y-1">
                            <p>You replied to  on MovieJunky’ s comment</p>
                            <NuxtLink 
                                to="/movies#engagementPanel"
                                class="text-primary-500"
                            >
                                See comment
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <p>In my opinion the movie doesn't match the whole hype around it. Its just a regular average movie</p>
                        <p class="text-end"><span>04:40pm</span> <span>May 4, 2025</span></p>
                    </div>
                </div>
                <div class="activity-card flex items-center justify-between gap-x-4 p-4 rounded-lg bg-background-400 text-sm">
                    <div class="flex items-center gap-x-2">
                        <div class="w-10 h-10 bg-white rounded-full"></div>
                        <div class="flex flex-col gap-y-1">
                            <p>You replied to  on MovieJunky’ s comment</p>
                            <NuxtLink 
                                to="/movies#engagementPanel"
                                class="text-primary-500"
                            >
                                See comment
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <p>In my opinion the movie doesn't match the whole hype around it. Its just a regular average movie</p>
                        <p class="text-end"><span>04:40pm</span> <span>May 4, 2025</span></p>
                    </div>
                </div>
                <div class="activity-card flex items-center justify-between gap-x-4 p-4 rounded-lg bg-background-400 text-sm">
                    <div class="flex items-center gap-x-2">
                        <div class="w-10 h-10 bg-white rounded-full"></div>
                        <div class="flex flex-col gap-y-1">
                            <p>You replied to  on MovieJunky’ s comment</p>
                            <NuxtLink 
                                to="/movies#engagementPanel"
                                class="text-primary-500"
                            >
                                See comment
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <p>In my opinion the movie doesn't match the whole hype around it. Its just a regular average movie</p>
                        <p class="text-end"><span>04:40pm</span> <span>May 4, 2025</span></p>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <!-- <div class="mt-10 flex items-center justify-between">
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">9</span> of <span class="font-semibold text-gray-900 dark:text-white">100</span> Entries
                </span>
                <div class="inline-flex items-center gap-x-4">
                    <button class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" title="Previous">
                        <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" title="Next">
                        <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
                <div class="flex items-center gap-x-2">
                    <span>Go to page</span>
                    <input type="number" class="border border-gray-500 w-16 h-8 rounded-lg px-1.5" min="1" max="11">
                </div>
            </div> -->
        </div>
    </section>
</template>
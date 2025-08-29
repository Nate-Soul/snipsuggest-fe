<script setup lang="ts">
import { useComments } from "~/composables/useComments";

definePageMeta({
    layout: 'dashboard'
});

const { 
    comments, 
    commentsPending, 
    commentsErr, 
    refreshComments 
} = useComments();
</script>


<template>
    <div v-if="commentsPending" class="h-screen w-full flex-center relative z-0 overflow-hidden p-4">
        <div class="flex flex-col w-full xs:w-4/5 sm:w-1/2 items-center text-center gap-y-5">
            <img src="/media/images/bg/activity-hub.png" alt="" width="200">
            <p class="text-sm smd:text-base">Assembling your activities from the studio archives</p>
            <div class="animate-spin">
                <Icon name="tabler:settings" />
            </div>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute left-0 bottom-0 -z-[1]" width="200">
    </div>
    <div v-if="commentsErr" class="h-screen w-full flex-center relative z-0 overflow-hidden p-4">
        <div class="flex flex-col w-full xs:w-4/5 sm:w-1/2 items-center text-center gap-y-5">
            <img src="/media/images/bg/activity-hub.png" alt="" width="200">
            <h1 class="text-2xl xs:text-3xl md:text-4xl">Error Loading Activities</h1>
            <p class="text-sm smd:text-base">Click the button below to try again</p>
            <NuxtLink to="/dashboard/activities" class="btn btn-lg btn-primary gap-x-1 w-max">
                Try Again
                <Icon name="tabler:refresh" />
            </NuxtLink>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute left-0 bottom-0 -z-[1]" width="200">
    </div>
    <section v-if="!commentsPending && comments && comments.length > 0" class="bg-background-500 text-white px-6 py-10">
        <div class="flex flex-col gap-y-8">
            <h1 class="text-2xl font-semibold font-roboto">Recent Activities</h1>
            <div class="flex items-center justify-between">
                <button class="btn btn-md bg-background-300 text-white gap-x-1">This week &#9733;</button>
            </div>
            <div class="flex flex-col gap-y-6">
                <SubcomponentsActivityCard
                    v-for="comment in comments"
                    :key="comment.id"
                    :comment="comment" 
                />
            </div>
        </div>
    </section>
    <div v-else="!commentsPending && comments && comments.length === 0" class="h-screen w-full flex-center relative z-0 overflow-hidden p-4">
        <div class="flex flex-col w-full xs:w-4/5 sm:w-1/2 items-center text-center gap-y-5">
            <img src="/media/images/bg/activity-hub.png" alt="" width="200">
            <h1 class="text-2xl xs:text-3xl md:text-4xl">No activities on your feed</h1>
            <p class="text-sm smd:text-base">Explore movies and engage with community to see your activities here</p>
            <NuxtLink to="/movies" class="btn btn-lg btn-primary w-max">
                Explore Movies
            </NuxtLink>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute left-0 bottom-0 -z-[1]" width="200">
    </div>
</template>
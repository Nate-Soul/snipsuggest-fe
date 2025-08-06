<script lang="ts" setup>
import { useAuthStore } from '#imports';
import { IMAGE_BASE_URL, DEFAULT_POSTER_SIZE } from '~/assets/const';

definePageMeta({
    layout: 'dashboard'
});

const authStore = useAuthStore();

</script>


<template>
    <div class="h-screen w-full flex-center relative z-0 overflow-hidden p-4">
        <div class="flex flex-col w-full xs:w-4/5 sm:w-1/2 items-center text-center gap-y-5">
            <h1 class="text-2xl xs:text-3xl md:text-4xl">My Profile</h1>
            <p>Start adding movies to your list to help us curate suggestions just for you.</p>
            <NuxtLink to="/movies" class="btn btn-lg btn-primary w-max">
                Explore Movies
            </NuxtLink>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -z-[1]">
        <img src="/media/images/bg/movie-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
    </div>
</template>
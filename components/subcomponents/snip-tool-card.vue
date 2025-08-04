<script setup lang="ts">
import type { Movie } from "~/types/movies";
import { IMAGE_BASE_URL, DEFAULT_POSTER_SIZE } from "~/assets/const";

const props = defineProps<{
  movie: Movie;
}>();
</script>

<template>
    <div>
        <NuxtLink :to="`/movies/${movie.id}`" class="hover:text-primary-500">
            <div class="flex flex-col gap-y-2.5">
                <figure class="h-[342px]">
                    <img :src="`${movie.poster_path ? IMAGE_BASE_URL + DEFAULT_POSTER_SIZE + movie.poster_path : '/media/images/thumbnails/default.png'}`" :alt="movie.title" class="h-full w-full object-cover">
                </figure>
                <div>
                    <h4>{{ movie.title }} <span>({{ movie.release_date.slice(0, 4) }})</span></h4>
                </div>
            </div>
        </NuxtLink>
        <div class="mt-2.5 flex flex-col gap-y-3">
            <div class="flex items-center gap-x-2.5 justify-between smd:justify-start">
                <button class="btn btn-sm gap-x-1 bg-green-500 text-white hover:bg-green-800">
                    <Icon name="tabler:mood-smile" />
                    <span class="sr-only">Good Match</span>
                    <span class="hidden smd:inline">Good Match</span>                    
                </button>
                <button class="btn btn-sm smd:gap-x-1 btn-primary">
                    <Icon name="tabler:mood-sad" />
                    <span class="sr-only">Bad Match</span>
                    <span class="hidden smd:inline">Bad Match</span>  
                </button>
            </div>
        </div>
    </div>
</template>
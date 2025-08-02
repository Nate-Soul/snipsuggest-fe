<script setup>
import { IMAGE_BASE_URL, DEFAULT_POSTER_SIZE } from "~/assets/const";

defineProps({
  movie: {
    type: Object,
    required: true,
    // Add a default empty object to prevent errors if movie is initially null/undefined
    default: () => ({
      id: null,
      title: 'Unknown Title',
      poster_path: null,
      release_date: '',
      vote_average: 0,
      genre_ids: [], // Assuming genre_ids for mapping
    }),
  },
  containerClasses: {
    type: String, // Allow string or array of classes
    default: '',
  }
});
</script>

<template>
    <NuxtLink :to="`/movies/${movie.id}`" :class="`group ${containerClasses ? containerClasses : ''}`">
        <figure class="h-[300px] w-full">
          <img :src="`${movie.poster_path ? IMAGE_BASE_URL + DEFAULT_POSTER_SIZE + movie.poster_path : '/media/images/thumbnails/default.png'}`" :alt="movie.title" class="w-full h-full object-cover">
        </figure>
        <div class="mt-2.5 flex flex-col gap-y-2">
            <h4 class="text-sm group-hover:text-primary-500">{{ movie.title }}</h4>
            <div class="flex items-center justify-between gap-x-2 text-xs">
                <span>{{ movie.release_date.slice(0,4) }}</span>
                <span>Genre</span>
                <div class="flex items-center gap-x-0.5 text-primary-500">
                        <Icon name="tabler:star" />
                    {{ parseFloat(movie.vote_average).toFixed(1) }}
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
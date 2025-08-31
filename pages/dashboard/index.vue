<script setup lang="ts">
import { useAuthStore } from '#imports';
import { landingMovies } from '~/assets/mock-database/movies';
import { useCarouselScroll } from '~/composables/useCarouselScroll';
import { useFavourites } from "~/composables/useFavourites";
import { useComments } from "~/composables/useComments";

definePageMeta({
    layout: 'dashboard',
    middleware: ['protected']
});

const authStore = useAuthStore();
const { favouriteCount }    = useFavourites();
const { commentCount }      = useComments();
const { 
    canScrollRight, 
    canScrollLeft 
} = useCarouselScroll("recommendedMoviesOverflowCarousel");
</script>


<template>
    <section class="relative z-0 overflow-hidden pt-10 px-6 pb-5">
        <h1 class="text-2xl font-bold mb-10">Welcome Back, User</h1>
        <div class="stats-container grid grid-cols-1 xs:grid-cols-2 lgx:grid-cols-3 xl:grid-cols-4 gap-4">
            <div class="stat-card bg-background-300 p-5 rounded-lg">
                <h6 class="text-lg font-semibold mb-3">Favourites</h6>
                <div class="flex items-center justify-between">
                    <p class="text-5xl xl:text-6xl text-primary-500 font-medium">{{ favouriteCount || 0 }}</p>
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            <Icon name="tabler:heart" />
                        </div>
                        <NuxtLink to="/dashboard/favourites" class="text-sm inline-flex items-center gap-x-1">
                            See All
                            <Icon name="tabler:chevron-right" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="stat-card bg-background-300 p-5 rounded-lg">
                <h6 class="text-lg font-semibold mb-3">Comments</h6>
                <div class="flex items-center justify-between">
                    <p class="text-5xl xl:text-6xl text-primary-500 font-medium">{{ commentCount || 0 }}</p>
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            <Icon name="tabler:message-dots" />
                        </div>
                        <NuxtLink to="/dashboard/activities" class="text-sm inline-flex items-center gap-x-1">
                            See All
                            <Icon name="tabler:chevron-right" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="stat-card bg-background-300 p-5 rounded-lg">
                <h6 class="text-lg font-semibold mb-3">Recently Viewed</h6>
                <div class="flex items-center justify-between">
                    <p class="text-5xl xl:text-6xl text-primary-500 font-medium">0</p>
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            <Icon name="tabler:eye" />
                        </div>
                        <NuxtLink to="/dashboard/activities" class="text-sm inline-flex items-center gap-x-1">
                            See All
                            <Icon name="tabler:chevron-right" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="stat-card bg-background-300 p-5 rounded-lg">
                <h6 class="text-lg font-semibold mb-3">My Watchlist</h6>
                <div class="flex items-center justify-between">
                    <p class="text-5xl xl:text-6xl text-primary-500 font-medium">0</p>
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            <Icon name="tabler:list" />
                        </div>
                        <NuxtLink to="/dashboard/activities" class="text-sm inline-flex items-center gap-x-1 text-primary-500/80">
                            See All
                            <Icon name="tabler:chevron-right" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section
        v-if="landingMovies.upcoming_movies"
        id="recommendedMovies"
        class="py-10 px-6 relative z-0 overflow-hidden"
    >
        <header class="flex items-center gap-y-3 smd:gap-y-0 gap-x-3 justify-between flex-wrap smd:flex-nowrap mb-8">
            <hgroup class="flex flex-col gap-y-2">
                <h2 class="text-xl font-semibold">Recommended Movies</h2>
                <p class="text-white/70">Based on your favorites, here is what we think you’ll love.</p>
            </hgroup>
            <div class="flex items-center gap-x-2.5">
                <button 
                    class="btn-icon cursor-pointer w-8 xxs:w-10 h-8 xxs:h-10 overflow-carousel-prev-btn disabled:cursor-not-allowed" 
                    data-controls="recommendedMoviesOverflowCarousel"
                    :disabled="!canScrollLeft"
                >
                    <Icon name="tabler:chevron-left" />
                </button>
                <button 
                    class="btn-icon cursor-pointer w-8 xxs:w-10 h-8 xxs:h-10 overflow-carousel-next-btn disabled:cursor-not-allowed" 
                    data-controls="recommendedMoviesOverflowCarousel"
                    :disabled="!canScrollRight"
                >
                    <Icon name="tabler:chevron-right" />
                </button>
            </div>
        </header>
        <div 
            id="recommendedMoviesOverflowCarousel" 
            class="flex items-stretch gap-x-3 flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth"
        >
            <SubcomponentsMovieCard
                v-for="movie in landingMovies.upcoming_movies"
                :key="movie.id"
                :movie="movie"
                containerClasses="w-4/5 xxs:w-3/5 xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex-none"
            />
        </div>
        <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -right-[5%]"></div>
    </section>
    <div v-else="landingMovies.upcoming_movies">
        <p>Recommended Movies will appear here as you engage on the platform</p>
    </div>
</template>
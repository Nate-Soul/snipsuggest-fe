<script lang="ts" setup>
import { useAuthStore } from '#imports';
import { landingMovies } from '~/assets/mock-database/movies';

definePageMeta({
    layout: 'dashboard'
});

const authStore = useAuthStore();

</script>


<template>
    <section class="relative z-0 overflow-hidden pt-10 px-6 pb-5">
        <h1 class="text-2xl font-bold mb-10">Welcome Back, User</h1>
        <div class="stats-container grid grid-cols-4 gap-x-4">
            <div class="bg-background-300 p-5 rounded-lg">
                <h6>Favourites</h6>
                <div class="flex items-center justify-between">
                    <p class="text-6xl text-primary-500 font-medium">24</p>
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
            <div class="bg-background-300 p-5 rounded-lg">
                <h6>Comments</h6>
                <div class="flex items-center justify-between">
                    <p class="text-6xl text-primary-500 font-medium">69</p>
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            <Icon name="tabler:heart" />
                        </div>
                        <NuxtLink to="/dashboard/activities" class="text-sm inline-flex items-center gap-x-1">
                            See All
                            <Icon name="tabler:chevron-right" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="bg-background-300 p-5 rounded-lg">
                <h6>Recently Viewed</h6>
                <div class="flex items-center justify-between">
                    <p class="text-6xl text-primary-500 font-medium">6</p>
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
            <div class="bg-background-300 p-5 rounded-lg">
                <h6>My Watchlist</h6>
                <div class="flex items-center justify-between">
                    <p class="text-6xl text-primary-500 font-medium">56</p>
                    <div class="flex flex-col gap-y-4">
                        <div class="text-2xl">
                            <Icon name="tabler:list" />
                        </div>
                        <NuxtLink to="/dashboard/activities" class="text-sm inline-flex items-center gap-x-1">
                            See All
                            <Icon name="tabler:chevron-right" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- <section class="relative z-0 overflow-hidden py-10 px-6">
        <hgroup class="flex flex-col gap-y-2 mb-8">
            <h2 class="text-xl font-semibold">Recommended Movies</h2>
            <p class="text-white/70">Based on your favorite here is what we think you’ll love.</p>
        </hgroup>
    </section> -->
    <SectionsMovieSlide 
        v-if="landingMovies.upcoming_movies"
        sectionId="recommendedMovies"
        sectionTitle="Recommended Movies"
    >
        <SubcomponentsMovieCard
            v-for="movie in landingMovies.upcoming_movies"
            :key="movie.id"
            :movie="movie"
            containerClasses="w-4/5 xxs:w-3/5 xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex-none"
        />
    </SectionsMovieSlide>
</template>
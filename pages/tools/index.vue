<script setup lang="ts">
import { landingMovies } from '~/assets/mock-database/movies';
const { top_rated_movies } = landingMovies;

</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main>
        <section class="py-20 relative bg-background-500 text-white/85">
            <div class="container mx-auto px-4 flex flex-col gap-y-16">
                <h1 class="text-center text-4xl">
                    Line Search
                </h1>
                <div class="text-center">
                    <h6>Search Tips</h6>
                    <ul class="list-disc list-inside text-sm mt-5">
                        <li>Search by typing an exact phrase from a movie using quotation marks. For example: “to infinity and beyond”</li>
                    </ul>
                </div>
                <form action="#" class="flex items-center w-4/5 mx-auto">
                    <div class="flex w-full items-center gap-x-2 px-2 rounded-2xl border border-white/10 overflow-hidden divide-x-2 divide-white/10">
                        <input type="search" name="query" id="searchMovieField" class="block p-4 w-full focus:outline-0" placeholder="search for a movie"/>
                        <button type="button" class="flex-none btn-icon h-12 w-12 rounded-full btn-outline-white text-2xl animate-pulse">
                            <Icon name="tabler:microphone"/>
                        </button>
                        <!-- <button type="button" class="flex-none btn-icon h-12 w-12 rounded-full bg-primary-500/50 text-2xl">
                            <Icon name="tabler:microphone"/>
                        </button> -->
                    </div>
                </form>
                <div class="flex flex-col gap-y-5">
                    <div class="flex items-center justify-between">
                        <h2 class="text-3xl font-semibold">Recent Searches</h2>
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">Clear All</button>
                    </div>
                    <div class="flex items-center gap-y-2 gap-x-1 flex-wrap">
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">The bartender &times;</button>
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">Despicable me &times;</button>
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">Dracular &times;</button>
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">Last of us &times;</button>
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">Moana &times;</button>
                        <button class="btn btn-xs gap-x-1 bg-background-300 text-white">Dracular &times;</button>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-10">
                    <SubcomponentsSnipToolCard
                        v-for="(movie, movieIndex) in top_rated_movies"
                        :key="movieIndex"
                        :movie="movie"
                    />
                </div>
            </div>
        </section>
    </main>
    <SectionsMainFooter/>
</template>
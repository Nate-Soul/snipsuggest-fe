<script setup lang="ts">
import { landingMovies } from '~/assets/mock-database/movies';
const { top_rated_movies } = landingMovies;
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main>
        <section class="py-20 relative bg-background-500 text-white/85">
            <div class="container mx-auto px-4 flex flex-col gap-y-16">
                <form action="#" class="flex items-center w-full md:w-4/5 mx-auto">
                    <input type="search" name="query" id="searchMovieField" class="rounded-2xl p-4 border border-white/10 w-full" placeholder="search for a movie"/>
                </form>
                <h1 class="text-center text-2xl sm:text-3xl lgx:text-4xl">Found 4 results for your search: <span class="text-primary-600">Spiderman</span></h1>
                <div class="flex flex-col gap-y-5">
                    <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-4 xs:gap-y-0">
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
                <div class="grid grid-cols-1 xs:rid-cols-2 smd:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10">
                    <SubcomponentsMovieCard
                        v-for="(movie, movieIndex) in top_rated_movies"
                        :key="movieIndex"
                        :movie="movie"
                        containerClasses="col-span-1"
                    />
                </div>
            </div>
        </section>
    </main>
    <SectionsMainFooter/>
</template>
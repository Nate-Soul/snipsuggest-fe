<script setup lang="ts">
import { landingMovies } from '~/assets/mock-database/movies';
const { top_rated_movies } = landingMovies;

const handleUpload = () => {
    console.log("File uploaded")
};
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main>
        <section class="py-20 relative bg-background-500 text-white/85">
            <div class="container mx-auto px-4 flex flex-col gap-y-16">
                <h1 class="text-center text-4xl">Upload a image or short clip to start searching</h1>
                <form @submit.prevent="handleUpload" class="flex-center flex-col gap-y-5 h-64 w-4/5 mx-auto rounded-2xl bg-background-600">
                    <label class="w-1/2 h-3/5 flex flex-col items-center px-4 py-6 bg-background-400 rounded-lg shadow-lg tracking-wide cursor-pointer hover:bg-background-300 hover:text-white">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Drag and drop to upload video file or picture instantly</span>
                        <input type='file' class="hidden" />
                    </label>
                    <small class="text-xs">Supported Formats: MP4, MP3, JPEG, PNG</small>
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
                <div class="grid grid-cols-6 gap-x-5 gap-y-10">
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
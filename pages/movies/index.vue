<script setup>
import { IMAGE_BASE_URL, DEFAULT_BACKDROP_SIZE } from '~/assets/const';
import { landingMovies } from '~/assets/mock-database/movies';

const { featured_movies, top_rated_movies, popular_movies, upcoming_movies } = landingMovies;
const sections = [
    {
        sectionId: "topRatedMovies",
        sectionTitle: "Top Rated Movies",
        movieArray: top_rated_movies
    },
    {
        sectionId: "popularMovies",
        sectionTitle: "Popular Movies",
        movieArray: popular_movies
    },
    {
        sectionId: "upcomingMovies",
        sectionTitle: "Suggested For You",
        movieArray: upcoming_movies
    },
];
const props = defineProps({
    interval: {
        type: Number,
        default: 5000
    }
});

const carouselCurrentIndex  = ref(0);
let autoPlayIntervalId      = null;

const slideCarouselNext = () => {
  carouselCurrentIndex.value = (carouselCurrentIndex.value + 1) % featured_movies.length;
  resetAutoPlay();
};

const slideCarouselPrev = () => {
  carouselCurrentIndex.value = (carouselCurrentIndex.value - 1 + featured_movies.length) % featured_movies.length;
  resetAutoPlay();
};

// const goToSlide = (index) => {
//   carouselCurrentIndex.value = index;
//   resetAutoPlay();
// };

const startAutoPlay = () => {
  if (props.interval > 0 && featured_movies.length > 1) {
    autoPlayIntervalId = setInterval(slideCarouselNext, props.interval);
  }
};

const stopAutoPlay = () => {
  if (autoPlayIntervalId) {
    clearInterval(autoPlayIntervalId);
    autoPlayIntervalId = null;
  }
};

const resetAutoPlay = () => {
  stopAutoPlay();
  startAutoPlay();
};
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
        <main class="bg-background-500 text-white">
            <section v-for="(movie, movieIndex) in featured_movies" :class="`${carouselCurrentIndex === movieIndex ? 'opacity-100 block' : 'opacity-0 hidden'} py-20 relative z-0 h-[560px] overflow-hidden transition-opacity delay-300 duration-700 ease-in-out`" :style="`background-image: url(${IMAGE_BASE_URL}${DEFAULT_BACKDROP_SIZE}${movie.backdrop_path});`">
                <div class="container mx-auto px-4 h-full flex items-end ">
                    <div class="flex items-center justify-between">
                        <div class="flex flex-col gap-y-8 text-white w-1/2">
                            <div class="flex flex-wrap items-center gap-3 text-sm font-medium">
                                <div class="inline-flex items-center gap-x-1 py-1 px-3 bg-white text-black rounded-md">
                                    <span class="font-extrabold">{{ movie.vote_average }}</span>
                                </div>
                                <div class="bg-white w-1 h-1 rounded-full"></div>
                                <div class="year">{{ movie.release_date }}</div>
                                <div class="bg-white w-1 h-1 rounded-full"></div>
                                <div class="year">Genre</div>
                            </div>
                            <hgroup class="flex flex-col gap-y-4">
                                <h1 v-if="movieIndex === 0" class="text-6xl">{{ movie.title }}</h1>
                                <h2 v-else class="text-6xl">{{ movie.title }}</h2>
                                <p>{{ movie.overview }}</p>
                            </hgroup>
                        </div>
                    </div>
                </div>
                <div class="absolute -z-[1] top-0 left-0 w-full h-full bg-linear-[180deg,rgba(2,1,27,0)_0%,#02011B_94.39%]"></div>
                <div class="absolute bottom-[30%] right-[10%] flex items-between gap-x-4">
                    <button class="btn-icon w-10 h-10 btn-outline-white rounded-full" @click="slideCarouselPrev">&lt;</button>
                    <button class="btn-icon w-10 h-10 btn-outline-white rounded-full" @click="slideCarouselNext">&gt;</button>
                </div>
            </section>
            <SectionsMovieSlide
                v-for="(sec, secIndex) in sections"
                :key="secIndex"
                :sectionId="sec.sectionId"
                :sectionTitle="sec.sectionTitle"
            >
                <SubcomponentsMovieCard
                    v-for="(movie, movieIndex) in top_rated_movies"
                    :key="movieIndex"
                    :movie="movie"
                    containerClasses="w-1/6 flex-none"
                />
            </SectionsMovieSlide>
            <!-- <SectionsMovieSlide
                sectionId="popularMovies"
                sectionTitle="Popular Movies"
                :movies="popular_movies"
            >
                <SubcomponentsMovieCard
                    v-for="(movie, movieIndex) in popular_movies"
                    :key="movieIndex"
                    :movie="movie"
                    containerClasses="w-1/6"
                />
            </SectionsMovieSlide>
            <SectionsMovieSlide
                sectionId="upcomingMovies"
                sectionTitle="Suggested For You"
                :movies="upcoming_movies"
            >
                <SubcomponentsMovieCard
                    v-for="(movie, movieIndex) in upcoming_movies"
                    :key="movieIndex"
                    :movie="movie"
                    containerClasses="w-1/6"
                />
            </SectionsMovieSlide> -->
        </main>
    <SectionsMainFooter/>
</template>
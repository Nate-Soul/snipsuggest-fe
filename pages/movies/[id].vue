<script setup lang="ts">
import { IMAGE_BASE_URL, DEFAULT_BACKDROP_SIZE } from '~/assets/const';
import type { Movie } from '~/assets/interfaces';
import { landingMovies } from '~/assets/mock-database/movies';

interface MovieDetailProps {
    movieData: Movie
}

defineProps<MovieDetailProps>();

const displayCommentBox = ref(false);
const route = useRoute();
const movieId = route.params.id;

const allMovies = [
    ...landingMovies.featured_movies,
    ...landingMovies.popular_movies,
    ...landingMovies.top_rated_movies,
    ...landingMovies.upcoming_movies
];

const fetchMovieId = typeof movieId === "string" ? parseInt(movieId) : movieId;
const movieData = allMovies.filter(m => m.id === fetchMovieId)[0];


if (!movieData) {
   navigateTo("/movies");
}

const toggleCommentBox = () => {
    displayCommentBox.value = !displayCommentBox.value;
}
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main class="bg-background-500 text-white">
        <section :style="`background-image: url(${movieData.backdrop_path ? `${IMAGE_BASE_URL}${DEFAULT_BACKDROP_SIZE}${movieData.backdrop_path}` : '/media/images/movie-posters/deadpool-movie-poster.jpg'})`" class="relative z-0 rounded-lg  h-[600px] py-20 bg-no-repeat bg-center bg-cover">
            <div class="container h-full mx-auto px-4  flex items-end">
                <div class="flex justify-between gap-x-8 w-full">
                    <div class="flex-none flex flex-col justify-between gap-y-6 text-white w-2/5">
                        <div class="inline-flex-center w-12 h-12 bg-transparent rounded-full border-4 border-primary-500 border-t-white/20">
                            <span class="text-sm font-medium">{{ movieData.vote_average.toFixed(1) }}</span>
                        </div>
                        <div class="flex flex-col gap-y-6">
                            <h1 class="text-5xl">{{ movieData.title }}</h1>
                            <div class="flex items-stretch gap-x-4">
                                <button class="btn btn-lg btn-primary-gradient gap-x-1">
                                    <Icon name="tabler:download" />
                                    Download
                                </button>
                                <button class="btn btn-lg btn-outline-white text-primary-500 group">
                                    <Icon name="tabler:heart" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex-none flex flex-col gap-y-4 w-1/2">
                        <p>{{ movieData.overview }}</p>
                        <div class="flex items-center gap-x-4">
                            <dl class="flex items-center gap-x-2">
                                <dt class="font-medium">Runtime:</dt>
                                <dd class="text-sm">2h 23m</dd>
                            </dl>
                            <dl class="flex items-center gap-x-2">
                                <dt class="font-medium">Release Date:</dt>
                                <dd class="text-sm">{{ movieData.release_date }}</dd>
                            </dl>
                        </div>
                        <div class="flex items-start gap-x-3">
                            <h6 class="font-medium flex-none">Genres</h6>
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="bg-background-300 text-white text-sm font-light px-2.5 py-0.5 rounded-full">Action</span>
                                <span class="bg-background-300 text-white text-sm font-light px-2.5 py-0.5 rounded-full">Superhero</span>
                                <span class="bg-background-300 text-white text-sm font-light px-2.5 py-0.5 rounded-full">Sci-fi</span>
                            </div>
                        </div>
                        <dl class="flex items-center gap-x-2">
                            <dt class="text-[#FF9F10] font-medium">MPAA Rating:</dt>
                            <dd class="text-sm">PG</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="absolute -z-[1] top-0 left-0 w-full h-full bg-linear-[0.73deg,rgba(2,1,24,0)_-1.59%,#020118_97.01%] -rotate-180"></div>
        </section>
        <section id="movieCast" class="py-8 relative z-0 overflow-hidden">
            <div class="container mx-auto px-4">
                <div class="flex items-center gap-x-4 mb-4">
                    <h2 class="text-xl font-semibold">Movie Casts</h2>
                    <div class="flex items-center gap-x-2">
                        <button 
                            class="btn-icon cursor-pointer w-8 h-10 border border-white/15 rounded-md overflow-carousel-prev-btn disabled:cursor-not-allowed" 
                            data-controls="movieCastOverflowCarousel"
                        >
                           <Icon name="tabler:chevron-left" />
                        </button>
                        <button 
                            class="btn-icon cursor-pointer w-8 h-10 border border-white/15 rounded-md overflow-carousel-next-btn disabled:cursor-not-allowed" 
                            data-controls="movieCastOverflowCarousel"
                        >
                           <Icon name="tabler:chevron-right" />
                        </button>
                    </div>
                </div>
                <div id="movieCastOverflowCarousel" class="flex items-stretch gap-x-2 flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth">
                    <figure class="w-[10%] flex-none">
                        <img src="/media/images/cast/marisa-tomei.jpg" alt="Marisa Tomei" class="w-full h-[155px] object-contain">
                        <figcaption class="text-center text-white">
                            <h6 class="font-medium text-sm">Marisa Tomei</h6>
                            <p class="text-xs font-light">Auntie May</p>
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -left-[5%]"></div>
            <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -right-[5%]"></div>
        </section>
        <div id="engagementPanel" class="py-8">
            <div class="container mx-auto px-4">
                <div class="mx-auto w-4/5 flex items-center justify-evenly bg-background-400 rounded-2xl p-4">
                    <button :class="`btn btn-md hover:bg-white/5 gap-x-1 ${displayCommentBox ? 'bg-white/5 hover:bg-white/20' : 'bg'}`"
                        @click="toggleCommentBox"
                    >
                        <Icon name="tabler:message-dots" />
                        Comment
                    </button>
                    <button class="btn btn-md hover:bg-white/5 gap-x-1">
                        <Icon name="tabler:star" />
                        Rate
                    </button>
                    <button class="btn btn-md hover:bg-white/5 gap-x-1">
                        <Icon name="tabler:share-3" />
                        Share
                    </button>
                </div>
                <div :class="`mt-10 mx-auto w-4/5 flex-col gap-y-8 bg-background-400 rounded-2xl p-4 ${displayCommentBox ? 'flex h-auto' : 'hidden h-0'} transition duration-700 ease-linear delay-100`">
                    <div class="border border-white/10 p-2 w-full rounded-2xl flex items-start gap-x-2">
                        <div class="w-10 h-10 bg-white rounded-full flex-none"></div>
                        <div class="flex flex-col gap-y-1 w-full">
                            <textarea name="comment_area" id="commentArea" class="p-2 rounded-lg w-full" placeholder="Add comment"></textarea>
                            <div class="flex items-center gap-x-1">
                                <button>
                                    <Icon name="tabler:mood-smile"/>
                                </button>
                                <button>
                                    <Icon name="tabler:at"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <h6>Comments <span class="bg-primary-500 px-3 py-1 rounded-3xl text-sm">203</span></h6>
                        <select name="comment_type" id="commentType">
                            <option value="relevant">Relevant</option>
                            <option value="latest">Latest</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-y-4 comments-container">
                        <div class="comment-container flex flex-col gap-y-5">
                            <div class="comment-parent flex items-start gap-x-4">
                                <div class="w-8 h-8 bg-white rounded-full flex-none"></div>
                                <div class="flex flex-col gap-y-2">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <h6>FilmJunkie404</h6>
                                        <span class="text-xs">57 minutes ago</span>
                                    </div>
                                    <div class="flex items-center gap-x-1 text-primary-500">
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                    </div>
                                    <p class="text-xs">
                                        Honestly, I went in with low expectations but this movie really delivered. Major respect to the director! The plot was kinda all over the place, but the acting? Pure fire. Carried the whole thing."
                                    </p>
                                    <div class="flex items-center justify-between gap-x-4 w-full">
                                        <div class="flex items-center gap-x-4">
                                            <button>
                                                <Icon name="tabler:thumb-up"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:thumb-down"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:message-reply"/>
                                            </button>
                                        </div>
                                        <button>
                                            <Icon name="tabler:flag-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="comment-child flex items-start gap-x-3 ml-[5%]">
                                <div class="w-8 h-8 bg-white rounded-full flex-none"></div>
                                <div class="flex flex-col gap-y-2">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <h6>FilmJunkie404</h6>
                                        <span class="text-xs">57 minutes ago</span>
                                    </div>
                                    <div class="flex items-center gap-x-1 text-primary-500">
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star" />
                                        <Icon name="tabler:star" />
                                        <Icon name="tabler:star" />
                                        <Icon name="tabler:star" />
                                    </div>
                                    <p class="text-xs">
                                        Honestly, I went in with low expectations but this movie really delivered. Major respect to the director! The plot was kinda all over the place, but the acting? Pure fire. Carried the whole thing."
                                    </p>
                                    <div class="flex items-center justify-between gap-x-4 w-full">
                                        <div class="flex items-center gap-x-4">
                                            <button>
                                                <Icon name="tabler:thumb-up"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:thumb-down"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:message-reply"/>
                                            </button>
                                        </div>
                                        <button>
                                            <Icon name="tabler:flag-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment-container flex flex-col gap-y-5">
                            <div class="comment-parent flex items-start gap-x-4">
                                <div class="w-8 h-8 bg-white rounded-full flex-none"></div>
                                <div class="flex flex-col gap-y-2">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <h6>FilmJunkie404</h6>
                                        <span class="text-xs">57 minutes ago</span>
                                    </div>
                                    <div class="flex items-center gap-x-1 text-primary-500">
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                    </div>
                                    <p class="text-xs">
                                        Honestly, I went in with low expectations but this movie really delivered. Major respect to the director! The plot was kinda all over the place, but the acting? Pure fire. Carried the whole thing."
                                    </p>
                                    <div class="flex items-center justify-between gap-x-4 w-full">
                                        <div class="flex items-center gap-x-4">
                                            <button>
                                                <Icon name="tabler:thumb-up"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:thumb-down"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:message-reply"/>
                                            </button>
                                        </div>
                                        <button>
                                            <Icon name="tabler:flag-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="comment-child flex items-start gap-x-3 ml-[5%]">
                                <div class="w-8 h-8 bg-white rounded-full flex-none"></div>
                                <div class="flex flex-col gap-y-2">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <h6>FilmJunkie404</h6>
                                        <span class="text-xs">57 minutes ago</span>
                                    </div>
                                    <div class="flex items-center gap-x-1 text-primary-500">
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                    </div>
                                    <p class="text-xs">
                                        Honestly, I went in with low expectations but this movie really delivered. Major respect to the director! The plot was kinda all over the place, but the acting? Pure fire. Carried the whole thing."
                                    </p>
                                    <div class="flex items-center justify-between gap-x-4 w-full">
                                        <div class="flex items-center gap-x-4">
                                            <button>
                                                <Icon name="tabler:thumb-up"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:thumb-down"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:message-reply"/>
                                            </button>
                                        </div>
                                        <button>
                                            <Icon name="tabler:flag-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="comment-child flex items-start gap-x-3 ml-[5%]">
                                <div class="w-8 h-8 bg-white rounded-full flex-none"></div>
                                <div class="flex flex-col gap-y-2">
                                    <div class="flex items-center gap-x-2 text-sm">
                                        <h6>FilmJunkie404</h6>
                                        <span class="text-xs">57 minutes ago</span>
                                    </div>
                                    <div class="flex items-center gap-x-1 text-primary-500">
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star-filled" />
                                        <Icon name="tabler:star"/>
                                        <Icon name="tabler:star"/>
                                    </div>
                                    <p class="text-xs">
                                        Honestly, I went in with low expectations but this movie really delivered. Major respect to the director! The plot was kinda all over the place, but the acting? Pure fire. Carried the whole thing."
                                    </p>
                                    <div class="flex items-center justify-between gap-x-4 w-full">
                                        <div class="flex items-center gap-x-4">
                                            <button>
                                                <Icon name="tabler:thumb-up"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:thumb-down"/>
                                            </button>
                                            <button>
                                                <Icon name="tabler:message-reply"/>
                                            </button>
                                        </div>
                                        <button>
                                            <Icon name="tabler:flag-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="btn btn-sm text-primary-500 gap-x-1">
                            Show More
                            <Icon name="tabler:chevron-down" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <section class="py-10 px-4">
            <div class="flex items-center justify-between gap-x-3 mb-6">
                <h2 class="text-xl font-medium">User Reviews</h2>
                <a href="#" class="font-medium text-xs">See All Reviews <span class="bi bi-chevron-right"></span></a>
            </div>
            <div class="w-1/2 mx-auto p-3 rounded-lg bg-gray-300 text-[#02011B] flex flex-col gap-y-5">
                <div class="flex flex-col gap-y-3">
                    <div class="flex items-center justify-between text-[0.5rem]">
                        <div class="flex items-center gap-x-1">
                            <span class="bi bi-star text-primary-500"></span>
                            <span class="bi bi-star text-primary-500"></span>
                            <span class="bi bi-star text-primary-500"></span>
                            <span class="bi bi-star text-primary-500"></span>
                            <span class="bi bi-star text-primary-500"></span>
                        </div>
                        <span>2 days ago</span>
                    </div>
                    <hgroup class="flex flex-col gap-y-2 text-xs">
                        <h6>Not bad. But something’s different</h6>
                        <p>With Spider-Man's identity now revealed, our friendly neighborhood web-slinger is unmasked and no longer</p>
                    </hgroup>
                </div>
                <div class="flex flex-col gap-y-3">
                    <div class="flex items-center gap-x-2">
                        <div class="w-8 h-8 rounded-full overflow-hidden">
                            <img src="/media/images/users/melissa-brown.jpg" class="w-full h-full object-cover" alt="Melissa Brown">
                        </div>
                        <h6 class="text-xs text-[#5C1818]">Melissa Brown</h6>
                    </div>
                    <div class="flex items-center justify-between gap-x-4">
                        <div class="flex items-center gap-x-4">
                            <button>
                                <span class="bi bi-hand-thumbs-up"></span>
                            </button>
                            <button>
                                <span class="bi bi-hand-thumbs-down"></span>
                            </button>
                            <button class="transform">
                                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.825 6.06667L10 2.08867V4.22067L9.28333 4.33333C5.69167 4.862 3.25833 6.82067 1.86667 9.81933C3.8 8.398 6.2 7.71333 9.16667 7.71333H10V10.0447M8.33333 8.59733C4.60833 8.77933 1.94167 10.1747 0 13C0.833333 8.66667 3.33333 4.33333 9.16667 3.46667V0L15 6.06667L9.16667 12.1333V8.58C8.89167 8.58 8.61667 8.58867 8.33333 8.59733Z" fill="#020118"/>
                                </svg>
                            </button>
                        </div>
                        <button>
                            <span class="bi bi-flag"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section> -->
    </main>
    <SectionsMainFooter/>
</template>
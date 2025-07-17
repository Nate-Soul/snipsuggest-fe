<script setup lang="ts">
import type { MovieDetailResponse } from "~/types/movies";
import type { CommentResponse } from "~/types/comments";

import { useToast } from "vue-toastification";

import { addComment } from "~/services/comments";
import { useAuthStore } from "~/stores/auth";
import { IMAGE_BASE_URL, DEFAULT_BACKDROP_SIZE, DEFAULT_CAST_SIZE } from "~/assets/const";

// State
const authStore = useAuthStore();
const toast = useToast();
const route = useRoute();
const movieId = route.params.id;

const displayCommentBox = ref(false);
const displayRatingBox = ref(false);
const selectedRating = ref<number>(0);
const hoverRating = ref<number>(0);
const commentMsg = ref<string>("");
const commentStatus = ref<"idle" | "sending" | "sent">("idle");
const favouriteStatus = ref<"idle" | "sending" | "sent">("idle");
const ratingStatus = ref<"idle" | "sending" | "sent">("idle");
const commentSort = ref<"relevant" | "latest">("relevant");
const commentCurrentPage = ref<number>(1);

// Fetch movie data
const { 
  data: movieData, 
  error: movieDataErr, 
  pending: movieDataPending 
} = await useFetch<MovieDetailResponse>(`/api/movies/${movieId}`);

// Fetch comments with pagination
const { 
  data: commentsData, 
  error: commentsErr, 
  pending: commentsPending, 
  refresh: refreshComments 
} = await useFetch<CommentResponse[]>(
  `/api/comments/${movieId}?page=${commentCurrentPage.value}&sort=${commentSort.value}`,
  { query: { page: commentCurrentPage.value, sort: commentSort.value } }
);

// Fetch comments with pagination
const { 
  data: averageRating, 
  error: averageRatingErr,
  pending: averageRatingPending,
  refresh: refreshAverageRating 
} = await useFetch<number>(`/api/ratings/${movieId}/average`);


// Redirect if movie fetch fails
if (movieDataErr.value || !movieData.value) {
  toast.error("Failed to load movie details.");
  setTimeout(async () => {
    await navigateTo("/movies");
  }, 2000);
}

// Set page title
useHead({
  title: movieData.value?.movie.title ?? "Movie Details"
});

// Computed properties
const movie = computed(() => movieData.value?.movie);
const cast = computed(() => movieData.value?.credits.cast);

// Carousel controls
const { canScrollLeft, canScrollRight } = useCarouselScroll("movieCastOverflowCarousel");

// Toggle comment and rating boxes
const toggleCommentBox = () => {
  if (!authStore.isAuthenticated) {
    toast.error("Please log in to comment.");
    return;
  }
  displayCommentBox.value = !displayCommentBox.value;
};

const toggleRatingsBox = () => {
  if (!authStore.isAuthenticated) {
    toast.error("Please log in to rate.");
    return;
  }
  displayRatingBox.value = !displayRatingBox.value;
};

// Rating handlers
const setRating = async (value: number) => {
  if (!authStore.isAuthenticated) {
    toast.error("Please log in to rate.");
    return;
  }
  selectedRating.value = value;
  ratingStatus.value = "sending";
  try {
    await useApiFetch(`/api/ratings/${movieId}`, {
      method: "POST",
      body: { value },
    });
    ratingStatus.value = "sent";
    toast.success("Your rating has been saved!");
    setTimeout(() => (ratingStatus.value = "idle"), 2000);
    refreshAverageRating();
  } catch (err: any) {
    toast.error(err.message || "Failed to rate movie.");
    ratingStatus.value = "idle";
  }
};

const handleHover = (value: number) => {
  hoverRating.value = value;
};

const resetHover = () => {
  hoverRating.value = 0;
};

// Share movie page
const shareMoviePage = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: movie.value?.title ?? "Movie",
        text: "Check out this movie!",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    toast.error("Your browser does not support native sharing.");
  }
};

// Favorite movie
const addToFavourites = async (id: number) => {
  if (!authStore.isAuthenticated) {
    toast.error("Please log in to save to favorites.");
    return;
  }

  favouriteStatus.value = "sending";

  try {
    await useApiFetch(`/api/favourites/${id}`, {
      method: "POST",
    });
    favouriteStatus.value = "sent";
    toast.success("Movie saved to favorites!");
    setTimeout(() => (favouriteStatus.value = "idle"), 2000);
  } catch (err: any) {
    toast.error(err.message || "Failed to save movie.");
    favouriteStatus.value = "idle";
  }
};

const addMovieComment = async (id: number, content: string, parent_id?: number) => {
  if (!authStore.isAuthenticated) {
    toast.error("Please log in to add a comment.");
    return;
  }

  commentStatus.value = "sending";
  try {
    await addComment(id, content, parent_id);
    commentMsg.value = "";
    commentStatus.value = "sent";
    toast.success("Comment added successfully!");
    refreshComments();
  } catch (error) {
    console.error("Failed to add comment:", error);
    toast.error("Failed to add comment.");
    return;
  } finally {
    setTimeout(() => {
      commentStatus.value = "idle";
    }, 2000);
  }
};

const loadMoreComments = async () => {
  // if (pagination.value.page < pagination.value.total_pages) {
    commentCurrentPage.value++;
    await refreshComments();
  // }
};

// Log errors
// watchEffect(() => {
//   if (movieDataErr.value) {
//     console.error('Error fetching movie:', movieDataErr.value);
//   }
// });
</script>

<template>
  <SectionsMainHeader classes="bg-background-600 text-white" />
  <main class="bg-background-500 text-white">
    <section
      v-if="movie"
      :style="`background-image: url(${movie.backdrop_path ? `${IMAGE_BASE_URL}${DEFAULT_BACKDROP_SIZE}${movie.backdrop_path}` : '/media/images/backdrops/default.jpg'})`"
      class="relative z-0 rounded-lg h-[720px] py-20 bg-no-repeat bg-center bg-cover"
    >
      <div class="container h-full mx-auto px-4 flex items-end">
        <div class="flex justify-between gap-x-8 w-full">
          <div class="flex-none flex flex-col justify-between gap-y-6 text-white w-2/5">
            <UisMeterCircle v-if="averageRating" :rating="averageRating" />
            <div class="flex flex-col gap-y-6">
              <h1 class="text-5xl">{{ movie.title }}</h1>
              <div class="flex items-stretch gap-x-4">
                <button class="btn btn-lg btn-primary-gradient gap-x-1">
                  <Icon name="tabler:download" />
                  Download
                </button>
                <button
                  :disabled="favouriteStatus === 'sending' || !authStore.isAuthenticated"
                  @click="addToFavourites(movie.id)"
                  class="btn btn-lg btn-outline-white text-primary-500 group"
                >
                  <Icon :name="favouriteStatus === 'sent' ? 'tabler:heart-filled' : 'tabler:heart'" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex-none flex flex-col gap-y-4 w-1/2">
            <p>{{ movie.overview }}</p>
            <div class="flex items-center gap-x-4">
              <dl class="flex items-center gap-x-2">
                <dt class="font-medium">Runtime:</dt>
                <dd class="text-sm">{{ movie.runtime }}</dd>
              </dl>
              <dl class="flex items-center gap-x-2">
                <dt class="font-medium">Release Date:</dt>
                <dd class="text-sm">{{ movie.release_date }}</dd>
              </dl>
            </div>
            <div v-if="movie.genres.length > 0" class="flex items-start gap-x-3">
              <h6 class="font-medium flex-none">Genres</h6>
              <div class="flex items-center gap-2 flex-wrap">
                <span v-for="genre in movie.genres" :key="genre.id" class="bg-background-300 text-white text-sm font-light px-2.5 py-0.5 rounded-full">
                  {{ genre.name }}
                </span>
              </div>
            </div>
            <dl class="flex items-center gap-x-2">
              <dt class="text-[#FF9F10] font-medium">MPAA Rating:</dt>
              <dd class="text-sm">{{ movieData?.mpaa_rating }}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="absolute -z-[1] top-0 left-0 w-full h-full bg-linear-[0.73deg,rgba(2,1,24,0)_-1.59%,#020118_97.01%] -rotate-180"></div>
    </section>
    <section v-if="cast" id="movieCast" class="py-8 relative z-0 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-x-4 mb-4">
          <h2 class="text-xl font-semibold">Movie Cast</h2>
          <div class="flex items-center gap-x-2">
            <button
              class="btn-icon w-8 h-10 border border-white/15 rounded-md overflow-carousel-prev-btn disabled:cursor-not-allowed"
              data-controls="movieCastOverflowCarousel"
              :disabled="!canScrollLeft"
            >
              <Icon name="tabler:chevron-left" />
            </button>
            <button
              class="btn-icon w-8 h-10 border border-white/15 rounded-md overflow-carousel-next-btn disabled:cursor-not-allowed"
              data-controls="movieCastOverflowCarousel"
              :disabled="!canScrollRight"
            >
              <Icon name="tabler:chevron-right" />
            </button>
          </div>
        </div>
        <div
          id="movieCastOverflowCarousel"
          class="flex items-stretch gap-x-2 flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth"
        >
          <figure v-for="actor in cast" :key="actor.id" class="w-[10%] flex-none">
            <img
              :src="actor.profile_path ? `${IMAGE_BASE_URL}${DEFAULT_CAST_SIZE}${actor.profile_path}` : '/media/images/cast/default.png'"
              :alt="actor.name"
              class="w-full h-[155px] object-contain"
            />
            <figcaption class="text-center text-white">
              <h6 class="font-medium text-sm">{{ actor.name }}</h6>
              <p class="text-xs font-light">as {{ actor.character }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -left-[5%]"></div>
      <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -right-[5%]"></div>
    </section>
    <section v-if="movie" id="engagementPanel" class="py-8">
      <div class="container mx-auto px-4">
        <div class="mx-auto w-4/5 flex items-center justify-evenly bg-background-400 rounded-2xl p-4">
          <button
            :class="`btn btn-md hover:bg-white/5 gap-x-1 ${displayCommentBox ? 'bg-white/5 hover:bg-white/20' : ''}`"
            @click="toggleCommentBox"
          >
            <Icon name="tabler:message-dots" />
            Comment
          </button>
          <div class="relative">
            <button
              @click="toggleRatingsBox"
              class="btn btn-md hover:bg-white/5 gap-x-1"
              :disabled="!authStore.isAuthenticated"
            >
              <Icon name="tabler:star" />
              Rate
            </button>
            <div
              :class="`absolute left-1/2 -translate-x-1/2 w-max shadow shadow-white flex items-center gap-x-2 py-2 px-6 rounded-2xl text-primary-500 transition-all ease-linear duration-300 ${displayRatingBox ? '-top-[150%] opacity-100' : '-top-full opacity-0'}`"
              @mouseleave="resetHover"
            >
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="setRating(star)"
                @mouseover="handleHover(star)"
                class="text-2xl transition transform hover:scale-125"
              >
                <Icon
                  :name="(hoverRating || selectedRating) >= star ? 'tabler:star-filled' : 'tabler:star'"
                  class="transition-all duration-200"
                /> 
              </button>
            </div>
          </div>
          <button @click="shareMoviePage" class="btn btn-md hover:bg-white/5 gap-x-1">
            <Icon name="tabler:share-3" />
            Share
          </button>
        </div>
        <div
          v-if="displayCommentBox"
          class="mt-10 mx-auto w-4/5 flex flex-col gap-y-8 bg-background-400 rounded-2xl p-4 transition-all duration-700 ease-linear"
        >
          <div class="border border-white/10 p-2 w-full rounded-2xl flex items-start gap-x-2">
            <div class="w-10 h-10 bg-white rounded-full flex-none"></div>
            <div class="flex flex-col gap-y-2 w-full">
              <textarea
                v-model="commentMsg"
                placeholder="Add comment"
                class="p-2 rounded-lg w-full"
                :readonly="!authStore.isAuthenticated || commentStatus === 'sending'"
              ></textarea>
              <div class="flex items-center gap-x-2 justify-between">
                <div class="flex items-center gap-x-1">
                  <button :disabled="!authStore.isAuthenticated">
                    <Icon name="tabler:mood-smile" />
                  </button>
                  <button :disabled="!authStore.isAuthenticated">
                    <Icon name="tabler:at" />
                  </button>
                </div>
                <button
                  @click="addMovieComment(movie.id, commentMsg)"
                  :disabled="!authStore.isAuthenticated || commentStatus === 'sending'"
                  class="btn-icon w-6 h-6 btn-primary-gradient rounded-lg"
                >
                  <Icon name="tabler:send" />
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h6>
              Comments
              <span class="bg-primary-500 px-3 py-1 rounded-3xl text-sm ms-1.5">{{ commentsData?.length || 0 }}</span>
            </h6>
            <select
              v-model="commentSort"
              class="bg-background-600 text-white p-2 rounded"
            >
              <option value="relevant">Relevant</option>
              <option value="latest">Latest</option>
            </select>
          </div>
          <div v-if="commentsPending" class="text-center text-white/70">
            <p>Loading comments...</p>
            <div class="animate-spin"><Icon name="tabler:settings" /></div>
          </div>
          <div v-if="commentsData && commentsData.length > 0" class="flex flex-col gap-y-4">
            <div v-for="comment in commentsData" :key="comment.id" class="flex flex-col gap-y-5">
              <SubcomponentsCommentCard :comment="comment" :movie_id="movie.id" />
              <div v-if="comment.replies && comment.replies.length > 0" class="pl-4 border-l border-white/10">
                <div v-for="reply in comment.replies" :key="reply.id" class="mb-4">
                  <SubcomponentsCommentCard :comment="reply" :movie_id="movie.id" containerClasses="ml-[5%]" />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="commentsData && commentsData.length === 0" class="text-center text-white/70">
            <p>No comments yet. Be the first to comment!</p>
          </div>
          <div class="flex items-center justify-center">
            <button @click.prevent="loadMoreComments" class="btn btn-sm text-primary-500 gap-x-1">
              Show More
              <Icon name="tabler:chevron-down" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <SectionsMainFooter />
</template>
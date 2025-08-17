<script lang="ts" setup>
import type { StoredMovie } from "~/types/movies";
import { useToast } from "vue-toastification";
import { useAuthStore } from "#imports";

import { IMAGE_BASE_URL, DEFAULT_POSTER_SIZE } from "~/assets/const";

definePageMeta({
    layout: 'dashboard'
});

interface FavouriteResponse {
    data: StoredMovie[];
    message?: string;
}

const authStore = useAuthStore();
const toast     = useToast();

const deleteFavouriteStatus = ref<"idle" | "deleting" | "deleted">("idle");

const {
    data: favourites, 
    pending: favouritesPending, 
    error: favouritesErr,
    refresh: refreshFavourites 
} = useFetch<FavouriteResponse>(
  "/api/favourites",
  {
    headers: { 
        Authorization: `Bearer ${authStore.token}` 
    }
  }
);

const removeFavourite = async (id: number) => {
    deleteFavouriteStatus.value = "deleting";
    try {
        await useApiFetch(`/api/favourites/${id}`, {
            method: "DELETE",
        });
        refreshFavourites();
        toast.success("Favourite removed successfully!");
        deleteFavouriteStatus.value = "deleted";
    } catch (error) {
        toast.error("Failed to remove favourite. Please try again.");
        console.error("Failed to remove favourite:", error);
    } finally {
        deleteFavouriteStatus.value = "idle";
    }
}
</script>


<template>
    <div class="h-screen w-full flex-center relative z-0 overflow-hidden" v-if="favouritesPending">
        <div class="flex flex-col w-1/2 items-center text-center gap-y-5">
            <div class="animate-spin">
                <Icon name="tabler:settings" />
            </div>
            <p>Summoning your favourites from the multiverse</p>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -z-[1]">
        <img src="/media/images/bg/movie-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
    </div>
    <section v-if="favourites && favourites.data.length > 0" class="bg-background-500 text-white px-6 pb-10">
        <div class="flex flex-col gap-y-5">
            <div class="py-4 flex items-center justify-between gap-x-3">
                <button @click="$router.back()" class="btn gap-x-1">
                    <Icon name="tabler:chevron-left" />
                    Go Back
                </button>
                <NuxtLink to="/movies" class="btn btn-md btn-primary-gradient gap-x-1">
                    <Icon name="tabler:plus" />
                    Movies
                </NuxtLink>
            </div>
            <h1 class="text-2xl font-semibold font-roboto">My Favourites</h1>
            <!-- filters -->
            <ul class="flex items-center flex-wrap gap-3 text-sm font-medium text-center">
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 text-white bg-primary-500 rounded-full active" aria-current="page">All</a>
                </li>
                <li>
                    <a href="#"  class="inline-flex px-5 py-2.5 rounded-full bg-background-300 hover:bg-primary-500">Top 5</a>
                </li>
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 rounded-full bg-background-300 hover:bg-primary-500">New</a>
                </li>
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 rounded-full bg-background-300 hover:bg-primary-500">Year <span class="bi bl-chrevron-down"></span></a>
                </li>
                <li>
                    <a href="#" class="inline-flex px-5 py-2.5 text-gray-400 cursor-not-allowed dark:text-gray-500">Category <span class="bi bl-chrevron-down"></span></a>
                </li>
            </ul>
            <!-- favourite cards -->
            <div class="flex flex-col xs:flex-row xs:items-stretch gap-y-8 gap-x-0 xs:gap-6 flex-nowrap xs:flex-wrap">
                <div
                    v-for="(fav, favIndex) in favourites.data"
                    :id="`favouriteCard${fav.id}`"
                    :key="favIndex"
                    class="favourite-card flex flex-col xs:flex-row xs:items-center gap-y-4 xs:gap-y-0 gap-x-0 xs:gap-x-4"
                >
                    <NuxtLink 
                        :to="`/movies/${fav.id}`" 
                        class="rounded-lg overflow-hidden self-stretch w-full xs:w-[183.75px] lg:w-[147px] h-auto xs:h-[280px] lg:h-[224px] flex-none"
                    >
                         <img 
                            :src="`${fav.poster_path ? IMAGE_BASE_URL+DEFAULT_POSTER_SIZE+fav.poster_path : '/media/images/thumbnails/default.png' }`" 
                            :alt="fav.title" 
                            class="w-full h-full object-cover"
                        >
                    </NuxtLink>
                    <div class="flex flex-col gap-y-2 text-sm">
                        <NuxtLink :to="`/movies/${fav.id}`">
                            <h3>{{ fav.title }}</h3>
                        </NuxtLink>
                        <dl class="flex items-center gap-x-2 flex-wrap">
                            <dt>IMDB Rating:</dt>
                            <dd class="text-primary-500"><Icon name="tabler:star-filled"/>{{ fav.imdb_rating }}</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2 flex-wrap">
                            <dt>MPAA Rating:</dt>
                            <dd>{{ fav.mpaa_rating }}</dd>
                        </dl>
                        <dl class="flex items-center gap-x-2 flex-wrap">
                            <dt>Duration:</dt>
                            <dd>{{ fav.release_date }}</dd>
                        </dl>
                        <!-- <dl class="flex items-center gap-x-2">
                            <dt>Added:</dt>
                            <dd></dd>
                        </dl> -->
                        <button 
                            @click="removeFavourite(fav.id)" 
                            class="btn btn-sm btn-primary w-max gap-x-1"
                            :disabled="deleteFavouriteStatus === 'deleting'"
                        >
                            Remove
                            <Icon name="tabler:trash-filled" />
                        </button>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <div class="mt-10 flex flex-wrap gap-4 items-center justify-between">
                <!-- Help text -->
                <span class="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">9</span> of <span class="font-semibold text-gray-900 dark:text-white">100</span> Entries
                </span>
                <div class="inline-flex items-center gap-x-4">
                <!-- Buttons -->
                    <button class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" title="Previous">
                        <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" title="Next">
                        <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
                <div class="flex items-center gap-x-2">
                    <span>Go to page</span>
                    <input type="number" class="border border-gray-500 w-16 h-8 rounded-lg px-1.5" min="1" max="11">
                </div>
            </div>
        </div>
    </section>
    <div class="h-screen w-full flex-center relative z-0 overflow-hidden" v-else="favourites && favourites.data.length === 0">
        <div class="flex flex-col w-full xs:w-4/5 sm:w-1/2 items-center text-center gap-y-5">
            <h1 class="text-2xl xs:text-3xl md:text-4xl">No Favorites Yet!</h1>
            <p>Start adding movies to you list to help us curate suggestions just for you.</p>
            <NuxtLink to="/movies" class="btn btn-lg btn-primary w-max">
                Explore Movies
            </NuxtLink>
        </div>
        <img src="/media/images/icons/popcorn.png" alt="" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -z-[1]">
        <img src="/media/images/bg/movie-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
    </div>
</template>
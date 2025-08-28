// composables/useFavourites.ts
import { computed, ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import type { FavouriteResponse } from "~/types/favourites";
import { useApiFetch } from "~/composables/useFetchAPI";

interface UseFavouritesOptions {
  immediate?: boolean; // Whether to fetch immediately
  page?: number; // Pagination page
  limit?: number; // Items per page
}

export function useFavourites(options: UseFavouritesOptions = { immediate: true }) {
  const authStore = useAuthStore();
  const page = ref(options.page ?? 1);
  const limit = ref(options.limit ?? 10);

  // Fetch favorites
  const { 
    data,
    pending: favouritesPending, 
    error:favouritesErr,
    refresh: refreshFavourites 
  } = useFetch<FavouriteResponse>('/api/favourites', {
    headers: { 
      Authorization: `Bearer ${authStore.token}`
    },
    query: computed(() => ({
      page: page.value,
      limit: limit.value,
    })),
    server: true, // Ensure SSR fetching
    immediate: options.immediate ?? true, // Control initial fetch
  });

  // Computed properties
  const favourites = computed(() => data.value?.data ?? []);
  const favouriteCount = computed(() => data.value?.pagination.total ?? 0);
  const totalPages = computed(() => data.value?.pagination.total_pages ?? 1);
  const perPage = computed(() => data.value?.pagination.limit ?? limit);
  const isAuthenticated = computed(() => authStore.isAuthenticated);

  // Methods
  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
      refreshFavourites();
    }
  };

  const addFavourite = async (movieId: number) => {
    if (!isAuthenticated.value) {
      throw new Error('User must be authenticated to add a favourite.');
    }
    try {
      await useApiFetch(`/movies/${movieId}/save`, {
        method: 'POST',
      });
      await refreshFavourites(); // Refresh favorites after adding
    } catch (err: any) {
      throw new Error(err.data?.detail || 'Failed to add favourite.');
    }
  };

  const removeFavourite = async (movieId: number) => {
    if (!isAuthenticated.value) {
      throw new Error('User must be authenticated to remove a favourite.');
    }
    try {
        await useApiFetch(`/api/favourites/${movieId}`, {
          method: "DELETE",
        });
      await refreshFavourites(); // Refresh favorites after removing
    } catch (err: any) {
      throw new Error(err.data?.detail || 'Failed to remove favourite.');
    }
  };

  return {
    favourites, // List of favorite movies
    favouriteCount, // Total number of favorites
    totalPages, // Total pages for pagination
    perPage, // Items per page
    favouritesPending, // Loading state
    favouritesErr, // Error state
    refreshFavourites, // Refresh function
    setPage, // Change page for pagination
    addFavourite, // Add a movie to favorites
    removeFavourite, // Remove a movie from favorites
  };
}
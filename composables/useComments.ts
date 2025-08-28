// composables/useFavourites.ts
import { computed, ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import type { PaginatedCommentResponse } from '~/types/comments';
import { useApiFetch } from '~/composables/useFetchAPI';

interface UseCommentsOptions {
  immediate?: boolean; // Whether to fetch immediately
  page?: number; // Pagination page
  limit?: number; // Items per page
}

export function useComments(options: UseCommentsOptions = { immediate: true }) {
  const authStore = useAuthStore();
  const page = ref(options.page ?? 1);
  const limit = ref(options.limit ?? 10);

  // Fetch comments
  const { 
    data,
    pending: commentsPending, 
    error: commentsErr,
    refresh: refreshComments 
  } = useFetch<PaginatedCommentResponse>('/api/comments/user', {
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
  const comments = computed(() => data.value?.data ?? []);
  const commentCount = computed(() => data.value?.pagination.total ?? 0);
  const totalPages = computed(() => data.value?.pagination.total_pages ?? 1);

  // Methods
  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
      refreshComments();
    }
  };

  const addComment = async (id: number, commentMsg: string, parent_id?: number) => {
    try {
      await useApiFetch(`/api/comments/${id}`, {
        method: 'POST',
        body: {
          content: commentMsg,
          parent_id: parent_id || null,
        }
      });
    } catch (err: any) {
      console.log("Error adding comment:", err);
      throw new Error(err.message || "Failed to add comment.");
    }
  };

  return {
    comments, // List of comments movies
    commentCount, // Total number of comments
    totalPages, // Total pages for pagination
    commentsPending, // Loading state
    commentsErr, // Error state
    refreshComments, // Refresh function
    setPage, // Change page for pagination
    addComment, // Add a movie to comments
  };
}
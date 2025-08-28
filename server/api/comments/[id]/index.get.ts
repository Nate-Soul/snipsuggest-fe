interface CommentResponse {
  data: Array<{
    id: number;
    user: { username: string; avatar_url: string | null };
    content: string;
    rating: number | null;
    created_at: string;
    parent_id: number | null;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  message: string;
};

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const query = getQuery(event);

  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  try {
    return await $fetch(`${apiBaseUrl}/comments/movies/${id}`, {
      method: 'GET',
      query,
    });
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || 'Failed to fetch comments',
    });
  }
});
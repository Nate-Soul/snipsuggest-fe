export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const query = getQuery(event);

  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  try {
    return await $fetch(`${apiBaseUrl}/comments/movie/${id}`, {
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
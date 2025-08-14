export default defineEventHandler(async (event) => {

  const { id } = event.context.params as { id: string };

  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  const authorization = getHeader(event, "authorization");
  
  if (!authorization) {
    throw createError({
      statusCode: 401,
      statusMessage: "Missing authorization header",
    });
  }

  try {
    const response = await $fetch(`${apiBaseUrl}/ratings/${id}/user`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || "Failed to fetch user's rating for this movie",
    });
  }

});
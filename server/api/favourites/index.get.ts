export default defineEventHandler(async (event) => {
  const query = getQuery(event);
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
    const response = await $fetch(`${apiBaseUrl}/favourites`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
      query,
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || "Failed to fetch user's favourites",
    });
  }

});

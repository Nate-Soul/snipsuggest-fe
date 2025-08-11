export default defineEventHandler(async (event) => {
  const body        = await readBody(event);

  const config      = useRuntimeConfig();
  const apiBaseUrl  = config.apiBaseUrl;

  const authorization = getHeader(event, 'authorization');

  if (!authorization) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing authorization header',
    });
  }

  try {
    const response = await $fetch(`${apiBaseUrl}/auth/change-password`, {
      method: "POST",
      body,
      headers: {
        Authorization: authorization
      }
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || error.data.message || "Failed to fetch user",
    });
  }
});
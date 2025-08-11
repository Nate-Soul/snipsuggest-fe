export default defineEventHandler(async (event) => {
  const body        = await readBody(event);

  const config      = useRuntimeConfig();
  const apiBaseUrl  = config.apiBaseUrl;

  try {
    const response = await $fetch(`${apiBaseUrl}/auth/reset-password`, {
      method: "POST",
      body,
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || error.data.message || "Failed to fetch user",
    });
  }
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  try {
    const response = await $fetch(`${apiBaseUrl}/auth/signup`, {
      method: 'POST',
      body,
    });

    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.data?.detail || 'Signup failed'
    });
  }
});
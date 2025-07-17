// server/api/verify-email.post.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = query.token;
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;
  
  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Token is required"
    });
  }

  try {
    const backendUrl = `${apiBaseUrl}/auth/verify-email?token=${token}`;
    
    const response = await $fetch(backendUrl, {
      method: "GET",
      timeout: 5000
    });

    return response;
    
  } catch (error: any) {    
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.data?.detail || "Email verification failed",
      data: {
        originalError: error.message
      }
    });
  }
});
// import type { User } from "~/assets/interfaces";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;
  
  const authorization = getHeader(event, 'authorization');
  
  if (!authorization) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing authorization header',
    });
  }

  try {
    const user = await $fetch(`${apiBaseUrl}/auth/me`, {
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
    });

    return user;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || 'Failed to fetch user',
    });
  }
});
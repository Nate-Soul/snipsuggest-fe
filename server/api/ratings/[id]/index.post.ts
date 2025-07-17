export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const body = await readBody(event)

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
    const response = await $fetch(`${apiBaseUrl}/ratings/${id}`, {
      method: 'POST',
      body,
      headers: {
        Authorization: authorization
      }
    })

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.data?.detail || 'Rating failed'
    })
  }
})
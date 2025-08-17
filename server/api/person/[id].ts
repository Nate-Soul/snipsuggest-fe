import { PersonCredentials } from "~/types/movies";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  try {
    const personData = await $fetch(`${apiBaseUrl}/movies/person/${id}`, {
      method: "GET"
    }) as PersonCredentials;
    return personData;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || 'Failed to fetch person details',
    });
  }
});
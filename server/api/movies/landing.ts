export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  const response = await $fetch(`${apiBaseUrl}/movies/landing`);
  return response;
});
export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  const response = await $fetch(`${apiBaseUrl}/movies/${id}`);
  return response;
});

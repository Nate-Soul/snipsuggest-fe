export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl;

  const response = await $fetch(`${apiBaseUrl}/auth/check-email`, {
    method: 'POST',
    body
  });

  return response;
});
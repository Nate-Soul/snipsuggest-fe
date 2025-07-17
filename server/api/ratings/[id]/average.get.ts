export default defineEventHandler(async (event) => {

    const { id } = event.context.params!;
    const config = useRuntimeConfig();
    const apiBaseUrl = config.apiBaseUrl;

    try {
        const response = await $fetch(`${apiBaseUrl}/ratings/${id}/average`, {
            method: 'GET',
        });

        return response;
    } catch (error: any) {
        throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.data?.detail || 'Failed to fetch average rating',
        });
    }

});

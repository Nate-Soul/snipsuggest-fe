export const useApiFetch = (endpoint, options = {}) => {

  const authStore = useAuthStore();
  if (!authStore.token) {
    return Promise.reject(new Error('User is not authenticated'));
  }

  return $fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authStore.token}`,
    },
  });
};
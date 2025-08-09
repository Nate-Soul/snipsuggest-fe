import { navigateTo, useAuthStore } from '#imports';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Define protected routes
  const protectedRoutes = ['/dashboard',];

  // Check if the current route or its parent is protected
  const isProtected = protectedRoutes.some((route) => to.path.startsWith(route));

  if (isProtected && !authStore.isAuthenticated) {
    // Store the intended destination for redirect after login
    const redirectTo = to.fullPath;

    // Redirect to login with a query parameter for post-login redirect
    return navigateTo({
      path: '/login',
      query: { redirect: redirectTo },
    });
  }
});
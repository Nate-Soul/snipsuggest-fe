<script setup>
const auth = useAuthStore();

if (auth.token && !auth.user) {
  auth.fetchUser()
}
</script>

<template>
  <slot />
</template>
<script setup>
const auth = useAuthStore();

if (auth.token && !auth.user) {
  auth.fetchUser()
}
</script>

<template>
    <UisSidebar/>
    <SectionsMainContent>
        <UisTopNav/>
        <slot />
    </SectionsMainContent>
</template>
<script setup lang="ts">

definePageMeta({
  middleware: ['protected']
});

const sidebarStatus   = ref(false);

const openSidebar = () => {
  sidebarStatus.value = true;
}

const closeSidebar = () => {
    sidebarStatus.value = false;
}
</script>

<template>
  <UisSidebar :sidebarStatus="sidebarStatus" :sidebarCloseFn="closeSidebar"/>
  <SectionsMainContent>
      <UisTopNav :sidebarOpenFn="openSidebar"/>
      <slot />
  </SectionsMainContent>
</template>
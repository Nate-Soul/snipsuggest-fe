<script setup lang="ts">
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
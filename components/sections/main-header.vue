<script setup lang="ts">
defineProps<{
  classes?: string
}>();

const isOpenMobileMenu = ref(false);

const openMobileMenu = () => {
  if (!isOpenMobileMenu.value) {
    isOpenMobileMenu.value = true;
  }
};

const closeMobileMenu = () => {
  if (isOpenMobileMenu.value) {
    isOpenMobileMenu.value = false;
  }
};
</script>

<template>
    <header id="mainHeader" :class="classes ?? classes">
      <UisNavbar :openMobileMenuFn="openMobileMenu"/>
      <UisMobileMenu :mobileMenuStatus="isOpenMobileMenu" :closeMenuFn="closeMobileMenu"/>
    </header>
</template>
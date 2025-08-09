<script setup lang="ts">
import { useAuthStore } from '#imports';
import { useClickOutside } from '~/composables/useClickOutside';

const authStore = useAuthStore();
const navLinks = [
    {
        label: "Home",
        url: "/",
    },
    {
        label: "Snip Tools",
        url: "/tools",
    },
    {
        label: "Movies",
        url: "/movies",
    },
    {
        label: "How it Works",
        url: "/#howItWorks",
    },
];

const openDropdown = ref (false);
const profileDropdownMenu = ref<HTMLElement | null>(null);


const toggleDropdown = () => {
    openDropdown.value = !openDropdown.value;
};

const closeDropdown = () => {
  if (openDropdown.value) {
    openDropdown.value = false;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDropdown();
  }
};

useClickOutside(profileDropdownMenu, closeDropdown);

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <nav class="py-4 bg-transparent">
        <div class="container mx-auto px-4 flex items-center justify-between gap-x-4">
            <div class="md:hidden">
                <button class="btn-icon btn-outline-white rounded-full h-10 w-10 hidden">
                    <Icon name="tabler:menu-3" />
                </button>
            </div>
            <SubcomponentsLogo/>
            <ul class="hidden items-center gap-x-8 border border-white/10 rounded-lg p-3 md:flex">
                <li v-for="navLink in navLinks">
                    <NuxtLink :to="navLink.url" class="text-white/80 hover:text-primary-500">{{ navLink.label }}</NuxtLink>
                </li>
            </ul>
            <ul ref="profileDropdownMenu" class="items-center gap-x-4 xl:gap-x-6 flex">
                <li>
                    <NuxtLink to="/search" class="btn-icon w-10 h-10 rounded-full btn-outline-white">
                         <Icon name="tabler:search"/>
                    </NuxtLink>
                </li>
                <li class="relative">
                    <button @click="toggleDropdown" class="w-10 h-10 rounded-full btn-icon btn-outline-white">
                        <Icon name="tabler:user"/>
                    </button>
                    <ul v-if="openDropdown && authStore.isAuthenticated" class="text-center p-3 flex flex-col gap-y-1 absolute top-[120%] right-0 z-20 bg-background-300 text-white min-w-44 rounded-2xl shadow shadow-white">
                        <li>
                            <NuxtLink to="/dashboard" class="btn btn-md w-full hover:bg-white/30"> Dashboard </NuxtLink>
                        </li>
                        <li>
                            <button @click="authStore.logout" class="btn btn-md w-full hover:bg-white/30"> Logout </button>
                        </li>
                    </ul>
                    <ul v-if="openDropdown && !authStore.isAuthenticated" class="text-center p-3 flex flex-col gap-y-1 absolute top-[120%] right-0 z-20 bg-background-300 text-white min-w-44 rounded-2xl shadow shadow-white">
                        <li>
                            <NuxtLink to="/login" class="btn btn-md w-full hover:bg-white/30"> Login </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/signup" class="btn btn-md w-full hover:bg-white/30"> Signup </NuxtLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>
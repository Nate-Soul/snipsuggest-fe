<script lang="ts" setup>
import { useClickOutside } from "~/composables/useClickOutside";
import { useAuthStore } from "~/stores/auth";

defineProps<{
    sidebarOpenFn: () => void
}>()

const authStore     = useAuthStore();
const openDropdown  = ref(false);
const profileDropdownMenu = ref<HTMLElement | null>(null);
const profileDropdownToggler = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
    openDropdown.value = !openDropdown.value;
};

const closeDropdownMenu = () => {
    if (openDropdown.value) {
        openDropdown.value = false;
    }
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeDropdownMenu();
    }
};

useClickOutside(profileDropdownMenu, () => {
  if (profileDropdownToggler.value && !profileDropdownToggler.value.contains(document.activeElement as HTMLElement)) {
    closeDropdownMenu();
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <header class="py-4 bg-background-500 text-white sticky z-40 top-0 border-b border-gray-500">
        <nav class="px-6">
            <div class="flex items-center gap-x-4 justify-between">
                <div class="inline-flex md:hidden">
                    <button @click="sidebarOpenFn" class="sidebar-toggler btn-icon w-10 h-10 btn-outline-white rounded-full bg-background-400">
                        <Icon name="tabler:menu-2" />
                    </button>
                </div>
                <form action="#" method="GET" class="hidden xs:block">
                    <div class="relative border border-white rounded-3xl w-auto smd:w-80 lgx:w-100">
                        <input type="search" name="search_query" id="searchQuery" class="h-full w-full bg-transparent rounded-[inherit] py-2.5 px-4" placeholder="Search"/>
                        <img src="/media/images/icons/iconamoon_search-thin.svg" alt="" class="absolute -z-[1] top-1/2 transform -translate-y-1/2 right-4" width="16" height="16"/>
                    </div>
                </form>
                <ul class="flex items-center gap-x-4 md:gap-x-6">
                    <li class="inline-flex xs:hidden">
                        <button class="btn-icon w-10 h-10 btn-outline-white rounded-full bg-background-400">
                            <Icon name="tabler:search" />
                        </button>
                    </li>
                    <li>
                        <button class="relative btn-icon btn-outline-white rounded-full w-10 h-10">
                            <Icon name="tabler:bell" />
                            <span class="absolute -top-2 -end-2 w-5 h-5 bg-red-500 rounded-full text-xs btn-icon">10</span>
                            <span class="sr-only">Notifications</span>
                        </button>
                    </li>
                    <li class="relative">
                        <button @click="toggleDropdown" ref="profileDropdownToggler" class="w-10 h-10 btn-outline-white rounded-full btn-icon">
                            <Icon name="tabler:user" />
                        </button>
                        <ul ref="profileDropdownMenu" v-if="openDropdown" :class="`text-center px-3 py-5 flex flex-col gap-y-2 absolute top-[120%] right-0 z-20 bg-background-300 text-white min-w-44 rounded-lg shadow shadow-white ease transform ease-in-out ${openDropdown ? 'translate-0 opacity-100' : 'opacity-100'}`">
                            <li>
                                <NuxtLink to="/dashboard/settings" class="btn btn-md p-1 w-full rounded hover:bg-white/30">My Profile</NuxtLink>
                            </li>
                            <li>
                                <button @click="authStore.logout" class="btn btn-md p-1 w-full rounded hover:bg-white/30">Logout</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
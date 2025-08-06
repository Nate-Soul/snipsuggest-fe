<script setup lang="ts">
import { useAuthStore } from '#imports';

const props = defineProps<{
    sidebarStatus: boolean,
    sidebarCloseFn: () => void
}>();

const authStore = useAuthStore();
</script>

<template>
    <aside :class="`fixed h-screen z-40 top-0 left-0 w-full xxs:w-4/5 xs:w-3/5 md:w-64 transition-transform ease-linear md:transition-none duration-500 -translate-x-full md:translate-x-0 ${sidebarStatus ? 'translate-x-0' : ''}`">
        <button @click="sidebarCloseFn" class="absolute top-4 right-8 border border-primary-500/85 text-primary-500/85 hover:border-primary-500 hover:text-primary-500 w-8 h-8 rounded-full flex-center md:hidden">
            <Icon name="tabler:x" />
        </button> 
        <div class="bg-background-400 text-white h-full overflow-y-auto flex flex-col gap-y-5 items-center justify-between py-14 px-4">
            <SubcomponentsLogo/>
            <ul class="flex flex-col gap-y-6 text-white/65">
                <li>
                    <NuxtLink to="/dashboard" class="flex items-center gap-x-3">
                        <Icon name="tabler:user"/>
                        My Profile
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/dashboard/favourites" class="flex items-center gap-x-3">
                        <img src="/media/images/icons/mdi-light_heart.svg" height="20" width="20" alt=""/>
                        Favourites
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/dashboard/activities" class="flex items-center gap-x-3">
                        <img src="/media/images/icons/material-symbols-light_tab-recent-outline.svg" height="20" width="20" alt=""/>
                        My Comments
                    </NuxtLink>
                </li>
                <!-- <li>
                    <a href="#" class="flex items-center gap-x-3">
                        <img src="/media/images/icons/material-symbols-light_list.svg" height="20" width="20" alt="" title="My Watchlist"/>
                        My Watchlist
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center gap-x-3">
                        <img src="/media/images/icons/fluent_people-community-32-light.svg" height="20" width="20" alt=""/>
                        My Subscription
                    </a>
                </li> -->
            </ul>
            <ul class="flex flex-col gap-y-6 text-white/65">
                <li>
                    <a href="#" class="flex items-center gap-x-3">
                        <img src="/media/images/icons/mdi-light_settings.svg" height="20" width="20" alt=""/>
                        Settings
                    </a>
                </li>
                <li>
                    <button @click="authStore.logout" class="flex items-center gap-x-3">
                        <img src="/media/images/icons/material-symbols-light_logout.svg" height="20" width="20" alt=""/>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>
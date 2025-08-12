<script setup lang="ts">
defineProps<{
    mobileMenuStatus: boolean
    closeMenuFn: () => void,
}>();
</script>


<template>
    <nav :class="`fixed bg-background-500 h-screen py-10 px-3 z-50 top-0 left-0 w-full xs:w-4/5 sm:w-3/4 transition-transform ease-linear md:transition-none duration-500 -translate-x-full flex flex-col gap-y-16 md:hidden ${mobileMenuStatus ? 'translate-x-0' : ''}`">
        <div class="flex items-center gap-x-2.5 justify-between px-2">
            <SubcomponentsLogo/>
            <button @click="closeMenuFn" class="border border-primary-500/85 text-primary-500/85 hover:border-primary-500 hover:text-primary-500 w-8 h-8 rounded-full inline-flex-center">
                <Icon name="tabler:x" />
            </button>
        </div>
        <ul class="flex flex-col gap-y-2 p-2">
            <li>
                <NuxtLink to="/" class="block w-full p-3 rounded-lg bg-transparent hover:bg-background-300 transition-all duration-300 ease-out">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/tools" class="block w-full p-3 rounded-lg bg-transparent hover:bg-background-300 transition-all duration-300 ease-out">Snip Tools</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/movies" class="block w-full p-3 rounded-lg bg-transparent hover:bg-background-300 transition-all duration-300 ease-out">Movies</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/#howItWorks" class="block w-full p-3 rounded-lg bg-transparent hover:bg-background-300 transition-all duration-300 ease-out">How It Works</NuxtLink>
            </li>
        </ul>
        <div class="absolute -z-[1] -bottom-[5%] sm:-bottom-[10%] transform -translate-x-1/2 -right-[15%] w-[150px] sm:w-[220px] h-[150px] sm:h-[220px] rounded-full bg-primary-500 blur-[70px] sm:blur-[100px]"></div>
    </nav>
</template>
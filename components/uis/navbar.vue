<script setup>
const navLinks = [
    {
        label: "Home",
        url: "/"
    },
    {
        label: "Snip Tools",
        url: "/tools"
    },
    {
        label: "Movies",
        url: "/movies"
    },
    {
        label: "How it Works",
        url: "/#howItWorks"
    },
    {
        label: "Favourites",
        url: "/favourites"
    },
];
</script>

<template>
    <nav class="py-4 bg-transparent">
        <div class="container mx-auto px-4 flex items-center justify-between gap-x-4">
            <NuxtLink to="/">
                <img src="/media/images/logos/logo-dark.png" alt="SnipSuggest" height="44" width="140" />
            </NuxtLink>
            <ul class="flex items-center gap-x-8 border border-white/10 rounded-lg p-3">
                <li v-for="navLink in navLinks">
                    <NuxtLink :to="navLink.url" class="text-white/80 hover:text-primary-500">{{ navLink.label }}</NuxtLink>
                </li>
            </ul>
            <ul class="flex items-center gap-x-8">
                <li>
                    <NuxtLink to="/search">&#128269;</NuxtLink>
                </li>
                <li>
                    <a to="#">
                        <div class="w-8 h-8 rounded-full bg-white/60"></div>
                    </a>
                </li>
            </ul>            
        </div>
    </nav>
</template>
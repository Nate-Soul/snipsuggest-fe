<script setup lang="ts">
</script>

<template>
    <section class="bg-background-500 min-h-screen text-white relative z-0 overflow-hidden p-4 flex-center">
        <div class="flex flex-col w-1/2 items-center gap-y-5">
            <h1 class="text-4xl">Email Verified</h1>
            <img src="/media/images/bg/noto_confetti-ball.png" alt="" width="180">
            <NuxtLink to="/movies" class="btn btn-lg btn-primary w-max">
                Explore Movies
            </NuxtLink>
        </div>
        <img src="/media/images/bg/movie-catalog-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
    </section>
</template>
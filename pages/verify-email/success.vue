<template>
    <section class="bg-background-500 min-h-screen text-white relative z-0 overflow-hidden p-4 flex-center">
        <div class="flex flex-col w-full xs:w-4/5 sm:w-3/5 lgx:w-1/2 items-center gap-y-5 text-center">
            <h1 class="text-2xl sm:text-3xl lgx:text-4xl">Hurray! You've been registered as a citizen of Mars</h1>
            <img src="/media/images/bg/noto_confetti-ball.png" alt="" width="180">
            <NuxtLink to="/login" class="btn btn-lg btn-primary w-max">
              Login
            </NuxtLink>
        </div>
        <img src="/media/images/bg/movie-catalog-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
    </section>
</template>
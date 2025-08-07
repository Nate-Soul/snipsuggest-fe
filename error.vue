<script setup>
 const error = useError();
</script>

<template>
    <section class="bg-background-500 relative z-0 overflow-hidden py-8 min-h-screen">
        <div class="container mx-auto px-4">
            <SubcomponentsLogo/>
            <div v-if="error.statusCode === 404" class="mt-10 w-full smd:w-4/5 md:w-3/4 mx-auto bg-white/10 text-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm rounded-2xl flex-center flex-col gap-y-8 border border-[#F0F0F066]/40 p-8">
                <hgroup class="text-center flex flex-col gap-y-0 md:gap-y-2">
                    <h1 class="text-[8rem] xxs:text-[10rem] md:text-[12rem] lg:text-[16rem] font-extrabold tracking-wide smd:tracking-widest lg:tracking-[3rem] leading-tight">404</h1>
                    <p>Sorry, the page you entered does not exist or has been teleported into the abyss.</p>
                </hgroup>
                <NuxtLink to="/" class="btn btn-md btn-primary-gradient">
                    Go Back Home
                </NuxtLink>
            </div>
            <div v-else class="mt-10 w-full smd:w-4/5 md:w-3/4 mx-auto bg-white/10 text-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm rounded-2xl flex-center flex-col gap-y-8 border border-[#F0F0F066]/40 p-8">
                <hgroup class="text-center flex flex-col gap-y-0 md:gap-y-2">
                    <h1 class="text-[8rem] xxs:text-[10rem] md:text-[12rem] lg:text-[16rem] font-extrabold tracking-wide smd:tracking-widest lg:tracking-[3rem] leading-tight">{{ error.statusCode }}</h1>
                    <p>{{ error.statusMessage }}</p>
                </hgroup>
                <NuxtLink to="/" class="btn btn-md btn-primary-gradient">
                    Go Back Home
                </NuxtLink>
            </div>
        </div>
        <img src="/media/images/icons/popcorn.png" class="absolute -z-[1] -bottom-[8%] -left-[3%] w-[200px] sm:w-[300px]" />
        <img src="/media/images/bg/video-reel-circle.png" class="absolute -z-[1] -top-[5%] -right-[8%] opacity-30 w-[200px] sm:w-[300px] mix-blend-color-dodge rotate-[30deg]" />
    </section>
</template>
<script setup>
 const error = useError();
</script>

<template>
    <section class="bg-background-500 relative z-0 overflow-hidden py-8">
        <div class="container mx-auto px-4 min-h-screen flex flex-col">
            <SubcomponentsLogo/>
            <div class="flex-grow flex-center flex-col">
                <div v-if="error.statusCode === 404" class="mt-10 w-full smd:w-4/5 md:w-3/4 mx-auto bg-white/10 text-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm rounded-2xl flex-center flex-col gap-y-8 border border-[#F0F0F066]/40 p-8 relative overflow-hidden text-center">
                    <hgroup class="flex flex-col gap-y-0 md:gap-y-2">
                        <h1 class="text-[8rem] xxs:text-[10rem] md:text-[12rem] lg:text-[16rem] font-extrabold tracking-wide smd:tracking-widest lg:tracking-[3rem] leading-tight">404</h1>
                        <p>Lost like a sequel no one asked for.</p>
                    </hgroup>
                    <p>Looks like this page took the wrong portal. Or maybe it never existed. But don’t worry, you’re still in the right universe.</p>
                    <NuxtLink to="/" class="btn btn-md btn-primary-gradient">
                        Return to Homebase
                    </NuxtLink>
                    <div class="absolute -top-[5%] sm:-top-[10%] transform -translate-x-1/2 -right-[15%] -z-[1] w-[150px] sm:w-[220px] h-[150px] sm:h-[220px] rounded-full bg-primary-500 blur-[70px] sm:blur-[100px]"></div>
                </div>
                <div v-else-if="error.statusCode === 503" class="mt-10 w-full smd:w-4/5 md:w-3/4 mx-auto bg-white/10 text-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm rounded-2xl flex-center flex-col gap-y-8 border border-[#F0F0F066]/40 p-8 relative overflow-hidden text-center">
                    <hgroup class="flex flex-col gap-y-0 md:gap-y-2">
                        <h1 class="text-[8rem] xxs:text-[10rem] md:text-[12rem] lg:text-[16rem] font-extrabold tracking-wide smd:tracking-widest lg:tracking-[3rem] leading-tight">503</h1>
                        <p>We’re on a coffee break... just like your favorite heroes. </p>
                    </hgroup>
                    <p>Our servers are catching their breath, probably after a dramatic monologue. Hang tight — we’ll be back faster than a post-credits scene.</p>
                    <NuxtLink to="/" class="btn btn-md btn-primary-gradient">
                        Check Status
                    </NuxtLink>
                    <div class="absolute -top-[5%] sm:-top-[10%] transform -translate-x-1/2 -right-[15%] -z-[1] w-[150px] sm:w-[220px] h-[150px] sm:h-[220px] rounded-full bg-primary-500 blur-[70px] sm:blur-[100px]"></div>
                </div>
                <div v-else class="mt-10 w-full smd:w-4/5 md:w-3/4 mx-auto bg-white/10 text-white/85 shadow-[0_4px_16px_rgba(0,0,0,0.1)] backdrop-blur-sm rounded-2xl flex-center flex-col gap-y-8 border border-[#F0F0F066]/40 p-8 relative overflow-hidden text-center">
                    <hgroup class="flex flex-col gap-y-0 md:gap-y-2">
                        <h1 class="text-[8rem] xxs:text-[10rem] md:text-[12rem] lg:text-[16rem] font-extrabold tracking-wide smd:tracking-widest lg:tracking-[3rem] leading-tight">{{ error.statusCode }}</h1>
                        <p>Well, that wasn’t in the script.</p>
                    </hgroup>
                    <p>An unexpected error just crashed the scene. But no worries — we’re already editing the blooper reel.</p>
                    <NuxtLink to="/" class="btn btn-md btn-primary-gradient">
                        Back to Safety
                    </NuxtLink>
                    <div class="absolute -top-[5%] sm:-top-[10%] transform -translate-x-1/2 -right-[15%] -z-[1] w-[150px] sm:w-[220px] h-[150px] sm:h-[220px] rounded-full bg-primary-500 blur-[70px] sm:blur-[100px]"></div>
                </div>
            </div>
        </div>
        <img src="/media/images/icons/popcorn.png" class="absolute -z-[1] -bottom-[8%] -left-[3%] w-[200px] sm:w-[300px]" />
        <img src="/media/images/bg/video-reel-circle.png" class="absolute -z-[1] -top-[5%] -right-[8%] opacity-30 w-[200px] sm:w-[300px] mix-blend-color-dodge rotate-[30deg]" />
    </section>
</template>
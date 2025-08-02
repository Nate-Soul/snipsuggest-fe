<!-- <script setup lang="ts">
</script> -->

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
        <main>
            <section id="mainHero" class="py-20 relative z-0 bg-[url(/media/images/bg/snipsuggest-bg-collection.png)] bg-cover bg-center bg-no-repeat text-white">
                <div class="absolute -z-[1] top-0 left-0 w-full h-full bg-linear-[353.11deg,#02011B_3.58%,rgba(2,1,27,0.879231)_56.93%,rgba(224,11,11,0.76)_97.9%]"></div>
                <div class="container mx-auto px-4 min-h-[50vh] flex-center">
                    <div class="flex flex-col gap-y-14 w-full md:w-4/5 lg:w-3/5 items-center text-center">
                        <hgroup class="flex flex-col items-center gap-y-6">
                            <h1 class="text-5xl md:text-6xl leading-tight font-roboto">Never Wonder <span class="text-[#ff9b9b]">What Movie Is This?</span> Again</h1>
                            <p class="sm:text-lg">Tired of struggling to recall a movie from a scene, tune or quote? SnipSuggest is your instant movie identifier&dash;powered by AI that recognizes films from screenshots, sound clips, dialogue, and video clips.</p>
                        </hgroup>
                        <div class="flex flex-col xs:flex-row items-center gap-y-5 xs:gap-y-0 xs:gap-x-5">
                            <NuxtLink to="/tools" class="btn btn-lg btn-primary-gradient">
                                Try our Tools
                            </NuxtLink>
                            <NuxtLink to="/movies" class="btn btn-lg btn-outline-white">
                                Explore Movies
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
            <SectionsHowItWorks/>
            <section id="whySnipSuggest" class="bg-background-400 text-white/85 p-4 relative z-0 overflow-hidden">
                <div class="flex flex-col-reverse sm:flex-row items-center gap-y-6 sm:gap-y-0 gap-x-0 sm:gap-x-6 lg:gap-x-8">
                    <div class="basis-1/2 flex flex-col gap-y-10 p-6 md:p-8 lgx:p-10">
                        <h2 class="text-xl xs:text-2xl lg:text-3xl font-semibold font-roboto">Why Movie Lovers Adore <br class="hidden lg:inline"> SnipSuggest</h2>
                        <ul class="flex flex-col gap-y-4 list-disc list-outside">
                            <li>95% Accuracy – Industry-leading recognition tech</li>
                            <li>Massive Database – Millions of movies & TV shows</li>
                            <li>Instant Results – No more endless Googling  </li>
                            <li>Scene Details – Get cast, director, and trivia </li>
                        </ul>
                    </div>
                    <figure class="overflow-hidden rounded-2xl basis-1/2 self-stretch flex-none">
                        <img 
                            src="/media/images/bg/moviegoers-enjoying-snipsuggests-benefits.jpg" 
                            alt=""
                            class="w-full h-full object-cover"
                        />
                    </figure>
                </div>
                <img src="/media/images/bg/movie-reel.png" alt="" class="absolute -z-[1] top-0 bottom-0 left-2/5">
                <img src="/media/images/bg/movie-reel.png" alt="" class="absolute -z-[1] top-0 bottom-0 left-[5%]">
            </section>
            <section id="features" class="bg-background-400 text-white/85 py-20 relative z-0">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap-reverse md:flex-nowrap items-center gap-y-8 md:gap-y-0">
                        <div class="mx-auto md:mx-0 basis-full xs:basis-4/5 sm:basis-3/5 md:basis-2/5 flex-none flex flex-col gap-y-10">
                            <h2 class="text-xl xs:text-2xl lg:text-3xl font-semibold font-roboto">SnipSuggest Has Great Features <br class="hidden lg:inline"> Just For You</h2>
                            <ul class="flex flex-col gap-y-4">
                                <li>See a scene? Snap a pic— we’ll name the movie.</li>
                                <li>Hear a tune? Hum or record it— we’ll find the film.</li>
                                <li>Remember a line? Type it— we’ll reveal the source.</li>
                            </ul>
                        </div>
                        <figure class="basis-full md:basis-3/5 self-stretch">
                            <img 
                                src="/media/images/bg/feature-image.png" 
                                alt=""
                                class=""
                            />
                        </figure>
                    </div>
                </div>
            </section>
            <SectionsFaq/>
            <section id="appCTABanner" class="bg-background-500 text-white/85 py-20 relative z-0">
                <figure class="absolute z-[3] right-[15%] transform -top-[5%]">
                    <img src="/media/images/bg/mobile-app-screen-2.png" alt="" height="400" class="h-full object-contain"/>
                </figure>
                <div class="container border mx-auto min-h-[408px] rounded-2xl bg-[url(/media/images/bg/gritty-cinematic-luxurious-backdrop.jpg)] bg-no-repeat bg-center bg-cover p-10 relative z-0 overflow-hidden flex items-center">
                    <div class="absolute -z-[1] top-0 left-0 w-full h-full bg-linear-[270.04deg,rgba(2,1,27,0)_0.03%,rgba(2,1,27,0.7)_37.28%,#02011B_99.96%]"></div>
                    <div class="w-1/2 h-full flex flex-col justify-center gap-y-8">
                        <h2 class="text-xl xs:text-2xl lg:text-3xl font-semibold font-roboto">Download Our Mobile App</h2>
                        <div class="flex items-stretch gap-x-5">
                            <a href="#">
                                <img src="/media/images/icons/apple-app-store-badge.png" alt="">
                            </a>
                            <a href="#">
                                <img src="/media/images/icons/google-play-store-badge.png" alt="">
                            </a>
                        </div>
                    </div>
                    <div>
                        <figure class="absolute right-[27%] transform top-1/2 -translate-y-1/2">
                            <img src="/media/images/bg/mobile-app-screen-1.png" alt=""/>
                        </figure>
                        <figure class="absolute right-[2%] bottom-0">
                            <img src="/media/images/bg/mobile-app-screen-3.png" alt=""/>
                        </figure>
                    </div>
                </div>
            </section>
        </main>
    <SectionsMainFooter/>
</template>
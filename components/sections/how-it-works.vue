<script setup lang="ts">
import { appFeatures } from "~/assets/mock-database/app-info";
</script>

<template>
    <section id="howItWorks" class="py-14 bg-background-500 text-white/90">
        <div class="container mx-auto px-4">
            <header class="text-center w-full smd:w-4/5 md:w-1/2 mx-auto mb-14">
                <hgroup>
                    <h2 class="uppercase text-xl xs:text-2xl lg:text-3xl font-semibold font-roboto">HOW SNIPSUGGEST WORKS</h2>
                    <p class="lg:text-lg text-white/85">Use any of our tools to ID films from screenshots, audio, quotes, or clips in seconds.</p>
                </hgroup>
            </header>
            <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div v-for="feature in appFeatures" class="rounded-2xl border border-white/10 bg-background-400 p-4" :key="feature.id">
                    <div class="w-[122.5px] sm:w-[175px] h-[122.5px] sm:h-[175px] mx-auto flex-center border border-[#1E1B6D] rounded-full mb-5">
                        <div class="w-3/5 sm:w-3/4 lg:w-[80%] h-3/5 sm:h-3/4 lg:h-[80%] bg-background-500 flex-center rounded-full">
                            <div class="w-[90%] h-[90%] bg-transparent flex-center rounded-full border border-primary-500/25">
                                <img :src="feature.iconUrl" :alt="feature.title" width="40" height="40" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-1.5 text-center">
                        <h5 class="font-semibold font-roboto">{{ feature.title }}</h5>
                        <p class="font-light text-white/70 text-sm">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { appFeatures } from "~/assets/mock-database/app-info";
</script>

<template>
    <section id="howItWorks" class="py-14 bg-background-500 text-white/90">
        <div class="container mx-auto px-4">
            <header class="text-center w-1/2 mx-auto mb-14">
                <hgroup>
                    <h2 class="uppercase text-3xl font-semibold font-roboto">HOW SNIPSUGGEST WORKS</h2>
                    <p class="font-lg text-white/85">Enjoy our tools and get amazing results seamlessly in just few steps</p>
                </hgroup>
            </header>
            <div class="grid grid-cols-4 gap-6">
                <div v-for="feature in appFeatures" class="rounded-2xl border border-white/10 bg-background-400 p-4" :key="feature.id">
                    <div class="w-[175px] h-[175px] mx-auto flex-center border border-[#1E1B6D] rounded-full mb-5">
                        <div class="w-[80%] h-[80%] bg-background-500 flex-center rounded-full">
                            <div class="w-[90%] h-[90%] bg-transparent flex-center rounded-full border border-primary-500/25">
                                <img :src="feature.iconUrl" :alt="feature.title" width="40" height="40" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-1.5">
                        <h5 class="font-semibold font-roboto">{{ feature.id }}. {{ feature.title }}</h5>
                        <p class="font-light text-white/70 text-sm">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
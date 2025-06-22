<script setup lang="ts">
import { useCarouselScroll } from '~/composables/useCarouselScroll';

interface MovieSlideProps {
    sectionId: string;
    sectionTitle: string;
}

const props = defineProps<MovieSlideProps>();

const { canScrollRight, canScrollLeft }= useCarouselScroll(`${props.sectionId}OverflowCarousel`);
</script>


<template>
    <section :id="sectionId" class="py-10 md:py-16 lg:py-20 relative z-0 overflow-hidden">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between mb-10">
                <h2 class="text-xl font-semibold">{{ sectionTitle }}</h2>
                <div class="flex items-center gap-x-2.5">
                    <button 
                        class="btn-icon cursor-pointer w-10 h-10 overflow-carousel-prev-btn disabled:cursor-not-allowed" 
                        :data-controls="`${sectionId}OverflowCarousel`"
                        :disabled="!canScrollLeft"
                    >
                        &lt;
                    </button>
                    <button 
                        class="btn-icon cursor-pointer w-10 h-10 overflow-carousel-next-btn disabled:cursor-not-allowed" 
                        :data-controls="`${sectionId}OverflowCarousel`"
                        :disabled="!canScrollRight"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div :id="`${sectionId}OverflowCarousel`" class="flex items-stretch gap-x-3 flex-nowrap overflow-x-auto hide-scrollbar scroll-smooth">
                <!-- <SubcomponentsMovieCard
                    v-for="(movie, movieIndex) in movies"
                    :key="movieIndex"
                    :movie="movie"
                    containerClasses="w-1/6"
                /> -->
                <slot/>
            </div>
        </div>
        <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -left-[5%]"></div>
        <div class="absolute -z-[1] bg-primary-500 w-[200px] h-[200px] rounded-full blur-[150px] -bottom-6 -right-[5%]"></div>
    </section>
</template>
<script setup lang="ts">
import { useToast } from "vue-toastification";
import { IMAGE_BASE_URL, DEFAULT_POSTER_SIZE } from "~/assets/const";
import type { PersonCredentials } from "~/types/movies";

const toast = useToast();
const route = useRoute();
const personId = route.params.id;

const { 
    data: personData,
    pending: personPending,
    error: personError
} = useFetch<PersonCredentials | null>(`/api/person/${personId}`);


// Redirect if person fetch fails
if (personError.value && !personData.value) {
    toast.error("Failed to load person details.");
    navigateTo("/movies");
}

const person = computed(() => personData.value?.person);
const personCredits = computed(() => personData.value?.person_credits);

const personAge = computed(() => {
    if (!person.value?.birthday) return "Unknown";
    const birthDate = new Date(person.value.birthday);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return `${Math.abs(ageDate.getUTCFullYear() - 1970)} Years`;
});
</script>

<template>
    <SectionsMainHeader classes="bg-background-600 text-white"/>
    <main class="bg-background-600 text-white">
        <div 
            class="h-screen w-full flex-center relative z-0 overflow-hidden" 
            v-if="personPending"
        >
            <div class="flex flex-col w-1/2 items-center text-center gap-y-5">
                <div class="animate-spin">
                    <Icon name="tabler:settings" />
                </div>
                <p>Building their star profile frame by frame…</p>
            </div>
            <img src="/media/images/icons/popcorn.png" alt="" class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 -z-[1]">
            <img src="/media/images/bg/movie-reel-lg.png" alt="" class="absolute left-0 bottom-0 -z-[1]">
        </div>
        <section 
            v-if="!personPending && person" 
            class="py-10"
        >
            <div class="container mx-auto px-4 flex flex-col gap-y-8">
                <div class="flex flex-col lg:flex-row gap-y-6 lg:gap-y-0 gap-x-0 lg:gap-x-6">
                    <figure class="overflow-hidden h-[410.4px] flex-none">
                        <img :src="person.profile_path ? `${IMAGE_BASE_URL}${DEFAULT_POSTER_SIZE}${person.profile_path}` : '/media/images/cast/default.png'" :alt="person.name" class="object-contain w-full h-full">
                    </figure>
                    <div class="flex flex-col gap-y-5">
                        <div class="flex flex-col gap-y-4">
                            <hgroup class="flex flex-col gap-y-2">
                                <h1 class="text-4xl">Biography</h1>
                                <p>{{ person.name }}</p>
                            </hgroup>
                            <p>
                                {{ person.biography }}
                                <a v-if="person.homepage" :href="person.homepage" target="_blank" class="text-primary-500 hover:underline">Visit Homepage</a>
                            </p>
                        </div>
                        <div class="flex flex-col gap-y-3">
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">Birthday:</dt>
                                <dd>{{ person.birthday ? person.birthday : 'Unknown' }}</dd>
                            </dl>
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">Age:</dt>
                                <dd>{{ personAge }}</dd>
                            </dl>
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">Death day:</dt>
                                <dd>{{ person.deathday ? person.deathday : 'Nil' }}</dd>
                            </dl>
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">Place of Birth:</dt>
                                <dd>{{ person.place_of_birth ? person.place_of_birth : 'Unknown' }}</dd>
                            </dl>
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">Popularity Score:</dt>
                                <dd>{{ person.popularity ? person.popularity : 'Unknown' }}</dd>
                            </dl>
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">IMDb ID:</dt>
                                <dd>{{ person.imdb_id ? person.imdb_id : 'Nil' }}</dd>
                            </dl>
                            <dl class="flex items-start gap-x-2 xxs:gap-x-1.5 flex-wrap xxs:flex-no-wrap">
                                <dt class="font-semibold">Known for Department:</dt>
                                <dd>{{ person.known_for_department ? person.known_for_department : 'Unknown' }}</dd>
                            </dl>
                            <dl class="flex flex-wrap items-start gap-x-2">
                                <dt class="font-semibold">Also known as:</dt>
                                <dd>{{ person.also_known_as.length > 0 ? person.also_known_as.join(', ') : 'Unknown' }}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <SectionsMovieSlide
            v-if="!personPending && person && personCredits && personCredits.cast && personCredits.cast.length > 0"
            sectionId="personMoviePanel" 
            :sectionTitle="`Movies Featuring ${person.name}`"
        >
            <SubcomponentsMovieCard
                v-for="(movie, movieIndex) in personCredits.cast.sort((a, b) => b.popularity - a.popularity)"
                :key="movieIndex"
                :movie="movie"
                containerClasses="w-4/5 xxs:w-3/5 xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex-none"
            />
        </SectionsMovieSlide>
    </main>
    <SectionsMainFooter/>
</template>
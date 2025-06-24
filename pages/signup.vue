<script setup lang="ts">

const form = reactive({
    username: "",
    email: "",
    password: "",
    password2: "",
    genres: "",
    recommendations: ""
});

const currentTab = ref(1);
const totalTabs = ref(2);

const nextFormTab = () => {
    if (currentTab.value < totalTabs.value) currentTab.value++;
};

const prevFormTab = () => {
    if (currentTab.value > 1) currentTab.value--;
};

const handleSignup = () => {
    setTimeout(() => {
        navigateTo({
            path: "/verify-email",
            query: { email: form.email }
        });
    }, 3000);
};
</script>

<template>
    <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
        <div class="px-4 min-h-screen flex items-center gap-x-8">
            <div class="flex flex-col gap-y-10 basis-2/5 flex-none p-10">
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Create Account</h1>
                    <p>Help us personalize your experience</p>
                </hgroup>
                <div class="p-8 rounded-2xl border border-white/10 flex flex-col gap-y-4">
                    <form @submit.prevent="handleSignup" action="#" method="POST" class=" flex flex-col gap-y-6">
                        <div class="form-tab flex flex-col gap-y-6" v-if="currentTab === 1">
                            <div class="form-input-wrapper">
                                <label for="username">Your Username</label>
                                <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                    <span class="bi bi-person text-xl flex-none"></span>
                                    <input type="text" name="username" id="username" class="form-input" v-model="form.username">
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="emailAddress">Your Email</label>
                                <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                    <span class="bi bi-person text-xl flex-none"></span>
                                    <input type="email" name="email_address" id="emailAddress" class="form-input" v-model="form.email">
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="password">Your Password</label>
                                <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                    <span class="bi bi-lock text-xl flex-none"></span>
                                    <input type="password" name="password" id="password" class="form-input" v-model="form.password">
                                    <button>
                                        <span class="bi bi-eye text-xl flex-none"></span>
                                    </button>
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="password">Confirm Password</label>
                                <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                    <span class="bi bi-lock text-xl flex-none"></span>
                                    <input type="password" name="confirm_password" id="confirmPassword" class="form-input" v-model="form.password2">
                                    <button>
                                        <span class="bi bi-eye text-xl flex-none"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-tab flex flex-col gap-y-6" v-if="currentTab === 2">
                            <div class="form-input-wrapper">
                                <p for="username">Select Your Favorite Movie Genres?</p>
                                <div class="flex items-center flex-wrap gap-4">
                                    <div class="relative h-max w-max">
                                        <input type="checkbox" name="movie_genres" class="absolute z-[1] top-0 left-0 w-full h-full opacity-0 peer" value="action">
                                        <button class="rounded-3xl cursor-pointer bg-white/30 text-white btn-sm peer-checked:bg-primary-500">Action</button>
                                    </div>
                                    <div class="relative h-max w-max">
                                        <input type="checkbox" name="movie_genres" class="absolute z-[1] top-0 left-0 w-full h-full opacity-0 peer" value="adventure">
                                        <button class="rounded-3xl cursor-pointer bg-white/30 text-white btn-sm peer-checked:bg-primary-500">Adventure</button>
                                    </div>
                                    <div class="relative h-max w-max">
                                        <input type="checkbox" name="movie_genres" class="absolute z-[1] top-0 left-0 w-full h-full opacity-0 peer" value="drama">
                                        <button class="rounded-3xl cursor-pointer bg-white/30 text-white btn-sm peer-checked:bg-primary-500">Drama</button>
                                    </div>
                                    <div class="relative h-max w-max">
                                        <input type="checkbox" name="movie_genres" class="absolute z-[1] top-0 left-0 w-full h-full opacity-0 peer" value="scifi">
                                        <button class="rounded-3xl cursor-pointer bg-white/30 text-white btn-sm peer-checked:bg-primary-500">Scifi</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-input-wrapper">
                                <p for="username">How Do You Discover Movies?</p>
                                <div class="ps-2 flex flex-col gap-y-4">
                                    <label class="flex items-center gap-x-1 w-max">
                                        <input type="checkbox" class="accent-primary-500 border border-primary-500 checked:border-transparent" name="movie_discovery" value="friends">
                                        Friends/Family
                                    </label>
                                    <label class="flex items-center gap-x-1 w-max">
                                        <input type="checkbox" class="accent-primary-500" name="movie_discovery" value="streaming">
                                        Streaming Recommendation
                                    </label>
                                    <label class="flex items-center gap-x-1">
                                        <input type="checkbox" class="accent-primary-500" name="movie_discovery" value="social">
                                        Social Media
                                    </label>
                                    <label class="flex items-center gap-x-1">
                                        <input type="checkbox" class="accent-primary-500" name="movie_discovery" value="other">
                                        Other
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex-center gap-x-4">
                            <button v-if="currentTab > 1" class="btn btn-outline-white btn-lg" @click="prevFormTab">Previous</button>
                            <button v-if="currentTab < totalTabs" class="btn btn-primary btn-lg" @click="nextFormTab">Continue</button>
                            <button v-if="currentTab === totalTabs" type="submit" class="btn btn-primary btn-lg" @click="handleSignup">Signup</button>
                        </div>
                    </form>
                    <div class="flex-center gap-x-1 my-6">
                        <span 
                            v-for="n in totalTabs"
                            :key="n"
                            :class="`rounded-full ${n === currentTab ? 'w-10 h-2 bg-primary-500' : 'w-2 h-2 bg-white'}`"
                        ></span>
                    </div>
                    <div class="flex-center gap-x-2">
                        <div class="bg-white/10 w-[30%] h-px"></div>
                        <div class="flex-none">or Sign Up with </div>
                        <div class="bg-white/10 w-[30%] h-px"></div>
                    </div>
                    <p class="text-center">
                        Already have an account? <NuxtLink to="/login" class="text-primary-500 underline">Login</NuxtLink>
                    </p>
                </div>
            </div>
            <figure class="w-full self-stretch rounded-2xl overflow-hidden">
                <img src="/media/images/bg/snipsuggest-bg-collection.png" alt="" class="w-full h-full object-cover">
            </figure>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
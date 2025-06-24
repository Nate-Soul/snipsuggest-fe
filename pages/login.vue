<script setup lang="ts">

const form = ref({
    username: "",
    password: ""
});

const handleLogin = () => {
    console.table(form);
};
</script>

<template>
    <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
        <div class="px-4 min-h-screen flex items-center gap-x-8">
            <div class="flex flex-col gap-y-10 basis-2/5 flex-none p-10">
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Sign In</h1>
                    <p>Search Less, Discover More...</p>
                </hgroup>
                <div class="p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                    <form @submit.prevent="handleLogin" action="#" method="POST" class="flex flex-col gap-y-6">
                        <div class="form-input-wrapper">
                            <label for="username">Your Username</label>
                            <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                <span class="bi bi-person text-xl flex-none"></span>
                                <input type="text" name="username" id="username" class="form-input" v-model="form.username">
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
                            <p class="text-end text-primary-500">Forgot password?</p>
                        </div>
                        <a class="btn btn-primary btn-lg justify-center" href="/ranked-movies.html">Login</a>
                    </form>
                    <div class="flex-center gap-x-2">
                        <div class="bg-white/10 w-[30%] h-px"></div>
                        <div class="flex-none">or Sign in with </div>
                        <div class="bg-white/10 w-[30%] h-px"></div>
                    </div>
                    <div class="flex-center gap-x-5">
                        <button class="btn btn-lg btn-outline-white">
                            <span class="bi bi-google"></span>
                            Google
                        </button>
                        <button class="btn btn-lg btn-outline-white">
                            <span class="bi bi-apple"></span>
                            Apple
                        </button>
                    </div>
                    <p class="text-center">
                        Don't have an account? <NuxtLink to="/signup" class="text-primary-500 underline">Create Account</NuxtLink>
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
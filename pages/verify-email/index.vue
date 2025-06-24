<script setup lang="ts">
const route = useRoute();
const email = route.query.email as String;

if (!email || email === "undefined" || email === "") {
    navigateTo("/signup");
}
</script>

<template>
    <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
        <div class="px-4 min-h-screen flex items-center gap-x-8">
            <div class="flex flex-col gap-y-10 basis-2/5 flex-none p-10">
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Verify Your Email</h1>
                    <p>We've sent a link to: <span>{{ email }}</span></p>
                </hgroup>
                <div class="p-8 rounded-2xl border border-white/10 flex flex-col gap-y-8">
                    <p>Check Your Inbox And Click on The Verification Button To Unlock:</p>
                    <ul class="flex flex-col gap-y-3">
                        <li>AI-powered movie suggestions</li>
                        <li>Save your favorites & comment</li>
                        <li>Personalized Recommendations</li>
                    </ul>
                    <button class="w-max btn btn-md btn-primary self-center">
                        Resend Email
                    </button>
                    <small class="text-center">
                        Didn’t receive email? check spam or promotion folders
                    </small>
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
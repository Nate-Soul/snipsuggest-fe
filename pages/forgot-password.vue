<script setup lang="ts">
import type { UserCreate } from "~/types/users";
import { useToast } from "vue-toastification";

interface DataResponse {
    message: string;
};

const toast = useToast();
const isProcessingForm = ref(false);
const email = ref<string>("");

const { validateEmail, validateForm } = useFormValidation();

const handleForgotPsw = async () => {    
    const isValid = validateForm([
        { 
            name: 'email', 
            value: email.value, 
            validator: (name: string, value: string) => validateEmail(name, value) 
        },
    ]);

    if (isValid) {
        isProcessingForm.value = true;
        try {

            const response = await $fetch('/api/auth/request-password', {
                method: "POST",
                body: {
                    email: email.value
                }
            }) as DataResponse;

            email.value = "";
            toast.success(response.message || "Password Request Successful! Check Your Mail")
    
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error("Password Request Failed!");
        } finally {
            isProcessingForm.value = false;
        }
    }
};
</script>

<template>
    <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
        <div class="px-4 min-h-screen flex-center gap-x-0 sm:gap-x-5 md:gap-x-8">
            <div class="flex flex-col gap-y-10 basis-full xs:basis-4/5 sm:basis-3/5 md:basis-1/2 lgx:basis-2/5 flex-none p-0 sm:p-5 md:p-8 lg:p-10">
                <SubcomponentsLogo/>
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Forgot Your Password?</h1>
                    <p>Enter your registered email address, and we'll send you a link to reset your password right away.</p>
                </hgroup>
                <div class="p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                    <form @submit.prevent="handleForgotPsw" action="#" method="POST" class="flex flex-col gap-y-6">
                        <div class="form-input-wrapper">
                            <label for="emailAddress">Email Address</label>
                            <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                <Icon name="tabler:mail"/>
                                <input type="email" name="email_address" id="emailAddress" class="form-input" v-model="email">
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            class="btn btn-primary btn-lg justify-center"
                            :disabled="isProcessingForm"
                        >
                            {{ isProcessingForm ? 'Sending Password...' : 'Send Password' }}
                        </button>
                    </form>
                    <p class="text-center space-x-4">
                        <NuxtLink to="/signup" class="text-primary-500 underline">Create Account</NuxtLink>
                        <Icon name="tabler:arrows-move-horizontal" />
                        <NuxtLink to="/login" class="text-primary-500 underline">Login</NuxtLink>
                    </p>
                </div>
            </div>
            <figure class="w-0 sm:w-full self-stretch rounded-2xl overflow-hidden">
                <img src="/media/images/bg/snipsuggest-bg-collection.png" alt="" class="w-full h-full object-cover">
            </figure>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
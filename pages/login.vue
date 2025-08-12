<script setup lang="ts">
import { useAuthStore } from '#imports';
import { useToast } from 'vue-toastification';
import { usePasswordField } from '~/composables/usePasswordField';

const toast     = useToast();
const route     = useRoute();
const router    = useRouter();
const authStore = useAuthStore();


const isProcessingForm = ref(false);

const { validateForm, validatePsw, validateEmail } = useFormValidation();
const { passwordFieldVisible, togglePasswordField } = usePasswordField();

const form = reactive({
    email: "",
    password: ""
});


const handleLogin = async () => {    
    const isValid = validateForm([
        { 
            name: 'email', 
            value: form.email, 
            validator: (name: string, value: string) => validateEmail(name, value) 
        },
        { 
            name: 'password', 
            value: form.password, 
            validator: validatePsw 
        }
    ]);

    if (isValid) {
        isProcessingForm.value = true;
        try {
            await authStore.login(form);
            const redirect = route.query.redirect as string | undefined;
            await router.push(redirect || '/dashboard');
        } catch (err: any) {
            // console.log("An Error occured:", err.message);
            toast.error(err.message || err.detail || "Incorrect login credentials");
        } finally {
            isProcessingForm.value = false;
        }
    } else {
        toast.error("Check your form inputs, and try again.");
    }
};
</script>

<template>
    <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
        <div class="px-4 min-h-screen flex-center gap-x-0 sm:gap-x-5 md:gap-x-8">
            <div class="flex flex-col gap-y-10 basis-full xs:basis-4/5 sm:basis-3/5 md:basis-1/2 lgx:basis-2/5 flex-none p-0 sm:p-5 md:p-8 lg:p-10">
                <SubcomponentsLogo/>
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Sign In</h1>
                    <p>Search Less, Discover More...</p>
                </hgroup>
                <div class="p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                    <form @submit.prevent="handleLogin" action="#" method="POST" class="flex flex-col gap-y-6">
                        <div class="form-input-wrapper">
                            <label for="emailAddress">Email Address</label>
                            <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                <Icon name="tabler:user"/>
                                <input type="email" name="email_address" id="emailAddress" class="form-input" v-model="form.email">
                            </div>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="password">Your Password</label>
                            <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                <Icon name="tabler:lock"/>
                                <input :type="`${passwordFieldVisible ? 'text' : 'password'}`" name="password" id="password" class="form-input" v-model="form.password">
                                <button @click.prevent="togglePasswordField" class="btn flex-none p-2">
                                    <Icon :name="`${passwordFieldVisible ? 'tabler:eye-closed' : 'tabler:eye'}`"/>
                                </button>
                            </div>
                            <NuxtLink to="/forgot-password" class="text-end text-primary-500">Forgot password?</NuxtLink>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg justify-center" href="/ranked-movies.html">Login</button>
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
            <figure class="w-0 sm:w-full self-stretch rounded-2xl overflow-hidden">
                <img src="/media/images/bg/snipsuggest-bg-collection.png" alt="" class="w-full h-full object-cover">
            </figure>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
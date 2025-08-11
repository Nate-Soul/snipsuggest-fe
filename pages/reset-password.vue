<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useFormValidation } from "~/composables/useFormValidation";
import { usePasswordField } from "~/composables/usePasswordField";

interface DataResponse {
    message: string;
};

const toast = useToast();
const route = useRoute();

const isProcessingForm = ref(false);
const form = reactive({
    new_password: "",
    new_password2: ""
});

const token = route.query.token as string | undefined;

const { validateForm, validatePsw, comparePswFields, formErrors } = useFormValidation();
const { passwordFieldVisible, togglePasswordField } = usePasswordField();

const handleNewPassword = async () => {    
    const isValid = validateForm([
        { 
            name: 'new_password', 
            value: form.new_password, 
            validator: validatePsw 
        },
        { 
            name: 'new_password2',
            value: form.new_password2, 
            validator: (name: string, value: string) => comparePswFields(name, form.new_password, value) 
        },
    ]);

    if (isValid) {
        isProcessingForm.value = true;
        try {

            const response = await $fetch('/api/auth/reset-password', {
                method: "POST",
                body: {
                    new_password: form.new_password,
                    token,
                },
            }) as DataResponse;

            form.new_password = "";
            form.new_password2 = "";

            toast.success(response.message || "Password Change Successful");
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error("Password Change Failed!");
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
                    <h1 class="text-semibold text-2xl font-roboto">Change Your Password</h1>
                    <p>Enter your new password below.</p>
                </hgroup>
                <div class="p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                    <form @submit.prevent="handleNewPassword" action="#" method="POST" class="flex flex-col gap-y-6">
                        <div class="form-input-wrapper">
                            <label for="password">New Password</label>
                            <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                <div class="flex-none">
                                    <Icon name="tabler:lock"/>
                                </div>
                                <input :type="`${passwordFieldVisible ? 'text' : 'password'}`" name="new_password" id="newPassword" class="form-input" v-model="form.new_password" @blur="validatePsw('new_password', form.new_password)">
                                <button @click.prevent="togglePasswordField" class="btn flex-none p-2">
                                    <Icon :name="`${passwordFieldVisible ? 'tabler:eye-closed' : 'tabler:eye'}`"/>
                                </button>
                            </div>
                                <small v-if="formErrors.password" class="text-red-400">{{ formErrors.new_password }}</small>
                        </div>
                        <div class="form-input-wrapper">
                            <label for="password">Confirm Password</label>
                            <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                <div class="flex-none">
                                    <Icon name="tabler:lock"/>
                                </div>
                                <input :type="`${passwordFieldVisible ? 'text' : 'password'}`" name="new_password2" id="confirmPassword" class="form-input" v-model="form.new_password2" @blur="comparePswFields('new_password2', form.new_password, form.new_password2)">
                                <button @click.prevent="togglePasswordField" class="btn flex-none p-2">
                                    <Icon :name="`${passwordFieldVisible ? 'tabler:eye-closed' : 'tabler:eye'}`"/>
                                </button>
                            </div>
                                <small v-if="formErrors.new_password2" class="text-red-400">{{ formErrors.new_password2 }}</small>
                        </div>
                        <button 
                            type="submit" 
                            class="btn btn-primary btn-lg justify-center"
                            :disabled="isProcessingForm"
                        >
                            {{ isProcessingForm ? 'Changing Password...' : 'Change Password' }}
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
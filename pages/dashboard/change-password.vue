<script lang="ts" setup>
import { useAuthStore } from '#imports';
import { useToast } from "vue-toastification";
import { usePasswordField } from "~/composables/usePasswordField";

import { IMAGE_BASE_URL, DEFAULT_POSTER_SIZE } from '~/assets/const';

definePageMeta({
    layout: 'dashboard'
});

const authStore = useAuthStore();

interface DataResponse {
    message: string;
};

const toast = useToast();
const route = useRoute();

const isProcessingForm = ref(false);
const form = reactive({
    old_password: "",
    new_password: "",
    new_password2: ""
});

const token = route.query.token as string | undefined;

const { validateForm, validatePsw, comparePswFields, formErrors } = useFormValidation();
const { passwordFieldVisible, togglePasswordField } = usePasswordField();

const handleChangePassword = async () => {    
    const isValid = validateForm([
        { 
            name: 'old_password',
            value: form.old_password, 
            validator: validatePsw 
        },
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

            const response = await useApiFetch('/api/auth/change-password', {
                method: "POST",
                body: {
                    old_password: form.old_password,
                    new_password: form.new_password
                },
            }) as DataResponse;

            form.old_password = "";
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
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Change Your Password</h1>
                    <p>Enter your new password below.</p>
                </hgroup>
                <div class="p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                    <form @submit.prevent="handleChangePassword" action="#" method="POST" class="flex flex-col gap-y-6">
                        <SubcomponentsPasswordField
                            label="Old Password"
                            name="old_password"
                            id="oldPassword"
                            v-model="form.old_password"
                            :error="formErrors.old_password"
                            @blur="validatePsw('old_password', form.old_password)"
                        />
                        <SubcomponentsPasswordField
                            label="New Password"
                            name="new_password"
                            id="newPassword"
                            v-model="form.new_password"
                            :error="formErrors.new_password"
                            @blur="validatePsw('new_password', form.new_password)"
                        />
                        <SubcomponentsPasswordField
                            label="Confirm Password"
                            name="new_password2"
                            id="newPassword2"
                            v-model="form.new_password2"
                            :error="formErrors.new_password2"
                            @blur="validatePsw('new_password2', form.new_password2)"
                        />
                        <button 
                            type="submit" 
                            class="btn btn-primary btn-lg justify-center"
                            :disabled="isProcessingForm"
                        >
                            {{ isProcessingForm ? 'Changing Password...' : 'Change Password' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
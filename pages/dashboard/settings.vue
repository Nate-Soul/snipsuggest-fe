<script lang="ts" setup>
import { useAuthStore } from '#imports';
import { useToast } from "vue-toastification";
import { usePasswordField } from "~/composables/usePasswordField";

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
    <section class="relative z-0 overflow-hidden px-6 py-10">
        <div class="grid grid-cols-10 gap-6 ">
            <div class="col-span-full p-5 lg:p-8 rounded-2xl border border-white/10 grid grid-cols-2 gap-4">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl font-roboto">Change Your Password</h2>
                    <p>Enter your new password below.</p>
                </hgroup>
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
            <div class="col-span-6 p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl font-roboto">Change Your Password</h2>
                    <p>Enter your new password below.</p>
                </hgroup>
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
            <div class="col-span-4 p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl font-roboto">Delete Account</h2>
                    <p>Once you take this action, you can't recover from the regret that comes after</p>
                </hgroup>
                <div class="text-[200px]">
                    <Icon name="tabler:waterpolo" />
                </div>
                <button class="btn btn-md btn-primary-gradient">Delete Account</button>
            </div>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
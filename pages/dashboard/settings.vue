<script lang="ts" setup>
import { useAuthStore } from '#imports';
import { useToast } from "vue-toastification";
import { usePasswordField } from "~/composables/usePasswordField";

definePageMeta({
    layout: 'dashboard',
    middleware: ['protected']
});

const authStore = useAuthStore();

interface DataResponse {
    message: string;
};

const toast = useToast();
const route = useRoute();

const isProcessingPswForm = ref(false);
const isProcessingPrefForm = ref(false);

const passwordForm = reactive({
    old_password: "",
    new_password: "",
    new_password2: ""
});

const preferenceForm = reactive({
  username: "",
  email: "",
  password: "",
  password2: "",
  favourite_genre_ids: [] as number[],
  discovery_channels: [] as string[]
});

const genreOptions = [
  { id: 28, name: "Action" },
  { id: 80, name: "Crime" },
  { id: 53, name: "Thriller" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" }
];

const discoveryOptions = [
  { label: "Friends/Family", value: "family/friends" },
  { label: "Streaming Platforms", value: "streaming platform" },
  { label: "Social Media", value: "social media" },
  { label: "Other", value: "other" }
];

const { 
    validateForm, 
    validatePsw, 
    comparePswFields, 
    validateEmail,
    validateText,
    formErrors 
} = useFormValidation();

const handleInfoUpdate = () => {

};

const handleChangePassword = async () => {    
    const isValid = validateForm([
        { 
            name: 'old_password',
            value: passwordForm.old_password, 
            validator: validatePsw 
        },
        { 
            name: 'new_password', 
            value: passwordForm.new_password, 
            validator: validatePsw 
        },
        { 
            name: 'new_password2',
            value: passwordForm.new_password2, 
            validator: (name: string, value: string) => comparePswFields(name, passwordForm.new_password, value) 
        },
    ]);

    if (isValid) {
        isProcessingPswForm.value = true;
        try {

            const response = await useApiFetch('/api/auth/change-password', {
                method: "POST",
                body: {
                    old_password: passwordForm.old_password,
                    new_password: passwordForm.new_password
                },
            }) as DataResponse;

            passwordForm.old_password = "";
            passwordForm.new_password = "";
            passwordForm.new_password2 = "";

            toast.success(response.message || "Password Change Successful");
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error("Password Change Failed!");
        } finally {
            isProcessingPswForm.value = false;
        }
    }
};

const tabs = ref<"Account" | "Password" | "Preferences">("Account");

const handleTabChange = (tab: "Account" | "Password" | "Preferences") => {
    tabs.value = tab;
};
</script>

<template>
    <section class="relative z-0 overflow-hidden px-6 py-10">
        <!-- Profile tabs -->
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-12">
            <ul class="flex flex-wrap -mb-px">
                <li class="me-2">
                    <button @click="handleTabChange('Account')" :class="`inline-block p-4 ${tabs === 'Account' ? 'text-primary-500 border-primary-500 border-b-2' : 'border-b-transparent'} rounded-t-lg  hover:text-gray-300 hover:border-accent-500`">Your Account</button>
                </li>
                <li class="me-2">
                    <button @click="handleTabChange('Password')" :class="`inline-block p-4 ${tabs === 'Password' ? 'text-primary-500 border-primary-500 border-b-2' : 'border-b-transparent'} rounded-t-lg  hover:text-gray-300 hover:border-accent-500`" aria-current="page">Password Info</button>
                </li>
                <li class="me-2">
                    <button @click="handleTabChange('Preferences')" :class="`inline-block p-4 ${tabs === 'Preferences' ? 'text-primary-500 border-primary-500 border-b-2' : 'border-b-transparent'} rounded-t-lg  hover:text-gray-300 hover:border-accent-500`">Movie Preferences</button>
                </li>
            </ul>
        </div>
        <!-- Profile pane -->
        <div v-if="tabs === 'Account'" class="flex flex-col gap-y-8">
            <div class="col-span-full p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl font-roboto">Your Information</h2>
                    <p>Update your information here</p>
                </hgroup>
                <form @submit.prevent="handleInfoUpdate" action="#" method="POST" class="flex flex-col gap-y-6">
                    <div class="form-input-wrapper">
                        <label for="username">Your Username</label>
                        <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                            <div class="flex-none">
                                <Icon name="tabler:user"/>
                            </div>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                class="form-input" 
                                v-model="preferenceForm.username" 
                                @blur="() => {
                                    validateText('username', preferenceForm.username);
                                    // checkAvailability('username');
                                }"
                            >
                        </div>
                            <small v-if="formErrors.username" class="text-red-400">{{ formErrors.username }}</small>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="emailAddress">Your Email</label>
                        <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                            <div class="flex-none">
                                <Icon name="tabler:mail"/>
                            </div>
                            <input 
                                type="email" 
                                name="email_address" 
                                id="emailAddress" 
                                class="form-input" 
                                v-model="preferenceForm.email" 
                                @blur="() => { 
                                    validateEmail('email', preferenceForm.email);
                                }"
                            >
                        </div>
                            <small v-if="formErrors.email" class="text-red-400">{{ formErrors.email }}</small>
                    </div>
                    <button 
                        type="submit" 
                        class="btn btn-primary btn-lg justify-center"
                        :disabled="isProcessingPrefForm"
                    >
                        {{ isProcessingPrefForm ? 'Updating Info' : 'Save Changes' }}
                    </button>
                </form>
            </div>
            <div class="col-span-full lg:col-span-4 p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-5">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl text-primary-500 font-bold">Danger Zone</h2>
                    <p>Careful! This action leads to a black hole. Once your account disappears into the abyss, there’s no way back. Double-check you’re ready before hitting delete.</p>
                </hgroup>
                <div class="text-[100px] mx-auto">
                    <Icon name="tabler:alert-triangle" class="text-red-600" style="width: 100px; height: 100px;"/>
                </div>
                <button class="btn btn-md btn-primary-gradient">Delete Account</button>
            </div>
        </div>
        <!-- Password pane -->
        <div v-if="tabs === 'Password'">
            <div class="col-span-full lg:col-span-6 p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl font-roboto">Change Your Password</h2>
                    <p>Enter your new password below.</p>
                </hgroup>
                <form @submit.prevent="handleChangePassword" action="#" method="POST" class="flex flex-col gap-y-6">
                    <SubcomponentsPasswordField
                        label="Old Password"
                        name="old_password"
                        id="oldPassword"
                        v-model="passwordForm.old_password"
                        :error="formErrors.old_password"
                        @blur="validatePsw('old_password', passwordForm.old_password)"
                    />
                    <SubcomponentsPasswordField
                        label="New Password"
                        name="new_password"
                        id="newPassword"
                        v-model="passwordForm.new_password"
                        :error="formErrors.new_password"
                        @blur="validatePsw('new_password', passwordForm.new_password)"
                    />
                    <SubcomponentsPasswordField
                        label="Confirm Password"
                        name="new_password2"
                        id="newPassword2"
                        v-model="passwordForm.new_password2"
                        :error="formErrors.new_password2"
                        @blur="validatePsw('new_password2', passwordForm.new_password2)"
                    />
                    <button 
                        type="submit" 
                        class="btn btn-primary btn-lg justify-center"
                        :disabled="isProcessingPswForm"
                    >
                        {{ isProcessingPswForm ? 'Changing Password...' : 'Change Password' }}
                    </button>
                </form>
            </div>
        </div>
        <!-- Preferences pane -->
        <div v-if="tabs === 'Preferences'" class="grid grid-cols-10 gap-6 ">
            <div class="col-span-full p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
                <hgroup class="flex flex-col gap-y-2 mb-8">
                    <h2 class="text-semibold text-xl font-roboto">Your Movie Preferences</h2>
                    <p>Update your movie preferences below so we can serve you better recommendations</p>
                </hgroup>
                <form @submit.prevent="handleInfoUpdate" action="#" method="POST" class="flex flex-col gap-y-6">
                    <div class="form-input-wrapper">
                        <p for="username">Select Your Favorite Movie Genres?</p>
                        <div class="flex items-center flex-wrap gap-4">
                            <div 
                                v-for="genre in genreOptions"
                                :key="genre.id"
                                class="relative h-max w-max"
                            >
                                <input 
                                    type="checkbox" 
                                    class="absolute z-[1] top-0 left-0 w-full h-full opacity-0 peer" :value="genre.id" 
                                    v-model="preferenceForm.favourite_genre_ids" 
                                    :id="`favouriteGenre${genre.id}`"
                                >
                                <label 
                                    :for="`favouriteGenre${genre.id}`"
                                    class="rounded-3xl cursor-pointer bg-white/30 text-white btn-sm peer-checked:bg-primary-500"
                                >
                                    {{ genre.name }}
                                </label>
                            </div>
                        </div>
                            <small v-if="formErrors.favourite_genre_ids" class="text-red-400">{{ formErrors.favourite_genre_ids }}</small>
                    </div>
                    <div class="form-input-wrapper">
                        <p for="username">How Do You Discover Movies?</p>
                        <div class="ps-2 flex flex-col gap-y-4">
                            <label
                                v-for="option in discoveryOptions" 
                                :key="option.value"
                                class="flex items-center gap-x-1 w-max"
                            >
                                <input 
                                    type="checkbox" 
                                    class="accent-primary-500 border border-primary-500 checked:border-transparent"
                                    :value="option.value" 
                                    v-model="preferenceForm.discovery_channels"
                                >
                                {{ option.label }}
                            </label>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="btn btn-primary btn-lg justify-center"
                        :disabled="isProcessingPrefForm"
                    >
                        {{ isProcessingPrefForm ? 'Updating Info' : 'Save Changes' }}
                    </button>
                </form>
            </div>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute -bottom-10 -left-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
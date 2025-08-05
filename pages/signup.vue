<script setup lang="ts">
import { useAuthStore } from "#imports";
import { useToast } from "vue-toastification";

const toast     = useToast();
const authStore = useAuthStore();

const currentTab = ref(1);
const totalTabs = ref(2);
const isVisiblePsw = ref(false);
const isVisiblePsw2 = ref(false);
const isProcessingForm = ref(false);

const form = reactive({
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
    formErrors, 
    validateEmail,
    validateText,
    validatePsw,
    comparePswFields,
    validateForm,
    validateMultiSelect
} = useFormValidation();

const checkAvailability = async (field: "email" | "username") => {
  if (!form[field]) return;
  
  // First validate the field
  if (field === 'email') {
    validateEmail(field, form[field]);
  } else {
    validateText(field, form[field]);
  }
  
  if (formErrors[field]) return; // Don't check if invalid

  const { data, error } = await useFetch<{exists: Boolean}>(`/api/auth/check-${field}`, {
    method: 'POST',
    body: { [field]: form[field] }
  });

  if (error.value || data.value?.exists) {
    formErrors[field] = `${field[0].toUpperCase() + field.slice(1)} is already taken`;
  } else {
    delete formErrors[field];
  }
}

const isCurrentStepValid = computed(() => {
  if (currentTab.value === 1) {
    return (
      !formErrors.username &&
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.password2 &&
      form.username &&
      form.email &&
      form.password &&
      form.password2
    )
  } else if (currentTab.value === 2) {
    return ( 
        form.favourite_genre_ids.length > 0 &&
        form.discovery_channels.length > 0 &&
        !formErrors.favourite_genre_ids &&
        !formErrors.discovery_channels
    )
  }
  return false
});

const togglePswField = (n: number) => {
    if (n === 1) {
        isVisiblePsw.value = !isVisiblePsw.value;
    } else {
        isVisiblePsw2.value = !isVisiblePsw2.value;
    }
};

watch(() => form.password, () => {
  if (form.password2) {
    comparePswFields("password2", form.password, form.password2)
  }
});

const nextFormTab = () => {
  if (currentTab.value === 1) {
    const isValid = validateForm([
      { name: "username", value: form.username, validator: (name: string, value: string) => validateText(name, value) },
      { name: "email", value: form.email, validator: validateEmail },
      { name: "password", value: form.password, validator: validatePsw },
      { 
        name: "password2", 
        value: form.password2, 
        validator: (name: string, value: string) => comparePswFields(name, form.password, value) 
      }
    ]);
    
    if (isValid) {
      currentTab.value++;
    }
  } else {
    currentTab.value++;
  }
};

const prevFormTab = () => {
    if (currentTab.value > 1) currentTab.value--;
};

const handleSignup = async () => {
    const isValid = validateForm([
        { 
            name: 'username', 
            value: form.username, 
            validator: (name: string, value: string) => validateText(name, value) 
        },
        { 
            name: 'email', 
            value: form.email, 
            validator: validateEmail 
        },
        { 
            name: 'password', 
            value: form.password, 
            validator: validatePsw 
        },
        { 
            name: 'password2', 
            value: form.password2, 
            validator: (name: string, value: string) => comparePswFields(name, form.password, value) 
        },
        { 
            name: 'favourite_genre_ids', 
            value: form.favourite_genre_ids, 
            validator: (name: string, value: any[]) => validateMultiSelect(name, value)
        },
        {
            name: 'discovery_channels',
            value: form.discovery_channels,
            validator: (n: string, v: any[]) => validateMultiSelect(n, v)
        }
    ]);

    if (isValid) {
        isProcessingForm.value = true;
        try {
            const response = await authStore.signup(form);
            isProcessingForm.value = false;
            form.username = ""
            form.email=""
            form.password = ""
            form.password2 = ""
            form.favourite_genre_ids = []
            form.discovery_channels = []
            toast.success("Account created successfully. Check your email for next steps", {
                timeout: 3000
            });
            await navigateTo("/login");
        } catch (err) {
            isProcessingForm.value = false;
            console.error('Unexpected error:', err);
            alert('Something went wrong');
        }
    }
}
</script>

<template>
    <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
        <div class="px-4 min-h-screen flex-center gap-x-0 sm:gap-x-5 md:gap-x-8">
            <div class="flex flex-col gap-y-10 basis-full xs:basis-4/5 sm:basis-3/5 md:basis-1/2 lgx:basis-2/5 flex-none p-0 sm:p-5 md:p-8 lg:p-10">
            <SubcomponentsLogo/>
                <hgroup class="flex flex-col gap-y-3">
                    <h1 class="text-semibold text-2xl font-roboto">Create Account</h1>
                    <p>Help us personalize your experience</p>
                </hgroup>
                <div class="p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-4">
                    <form @submit.prevent="handleSignup" action="#" method="POST" class="flex flex-col gap-y-6">
                        <div class="form-tab flex flex-col gap-y-6" v-if="currentTab === 1">
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
                                        v-model="form.username" 
                                        @blur="() => {
                                            validateText('username', form.username);
                                            checkAvailability('username');
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
                                        v-model="form.email" 
                                        @blur="() => { 
                                            validateEmail('email', form.email);
                                            checkAvailability('email')
                                        }"
                                    >
                                </div>
                                 <small v-if="formErrors.email" class="text-red-400">{{ formErrors.email }}</small>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="password">Your Password</label>
                                <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                    <div class="flex-none">
                                        <Icon name="tabler:lock"/>
                                    </div>
                                    <input :type="`${isVisiblePsw ? 'text' : 'password'}`" name="password" id="password" class="form-input" v-model="form.password" @blur="validatePsw('password', form.password)">
                                    <button @click.prevent="togglePswField(1)" class="btn flex-none p-2">
                                        <Icon :name="`${isVisiblePsw ? 'tabler:eye-closed' : 'tabler:eye'}`"/>
                                    </button>
                                </div>
                                 <small v-if="formErrors.password" class="text-red-400">{{ formErrors.password }}</small>
                            </div>
                            <div class="form-input-wrapper">
                                <label for="password">Confirm Password</label>
                                <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
                                    <div class="flex-none">
                                        <Icon name="tabler:lock"/>
                                    </div>
                                    <input :type="`${isVisiblePsw2 ? 'text' : 'password'}`" name="confirm_password" id="confirmPassword" class="form-input" v-model="form.password2" @blur="comparePswFields('password2', form.password, form.password2)">
                                    <button @click.prevent="togglePswField(2)" class="btn flex-none p-2">
                                        <Icon :name="`${isVisiblePsw2 ? 'tabler:eye-closed' : 'tabler:eye'}`"/>
                                    </button>
                                </div>
                                 <small v-if="formErrors.password2" class="text-red-400">{{ formErrors.password2 }}</small>
                            </div>
                        </div>
                        <div class="form-tab flex flex-col gap-y-6" v-if="currentTab === 2">
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
                                            v-model="form.favourite_genre_ids" 
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
                                            v-model="form.discovery_channels"
                                        >
                                        {{ option.label }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex-center gap-x-4">
                            <button 
                                v-if="currentTab > 1" 
                                class="btn btn-outline-white btn-lg" 
                                @click="prevFormTab"
                            >
                                Previous
                            </button>
                            <button 
                                v-if="currentTab < totalTabs" 
                                class="btn btn-primary btn-lg" 
                                @click="nextFormTab"
                                :disabled="!isCurrentStepValid"
                            >
                                Continue
                            </button>
                            <button 
                                v-if="currentTab === totalTabs" 
                                type="submit" 
                                class="btn btn-primary btn-lg" 
                                @click="handleSignup"
                                :disabled="!isCurrentStepValid || isProcessingForm"
                            >
                                <span v-if="isProcessingForm">Signing you up...</span>
                                <span v-else>Signup</span>
                            </button>
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
            <figure class="w-0 sm:w-full self-stretch rounded-2xl overflow-hidden">
                <img src="/media/images/bg/snipsuggest-bg-collection.png" alt="" class="w-full h-full object-cover">
            </figure>
        </div>
        <div class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"></div>
        <div class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"></div>
    </section>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const route = useRoute();
const message = ref<string>('');
const error = ref<string>('');
const email = ref<string>('');
const resendEmail = ref<string>('');
const isVerifying = ref<boolean>(false);
const isResending = ref<boolean>(false);
const showResendForm = ref<boolean>(false);

onMounted(async () => {
  const token = route.query.token as string | undefined;

  if (token) {
    isVerifying.value = true;
    try {
      const response = await authStore.verifyToken(token);
      message.value = response.message || 'Account verified! Please log in.';
      setTimeout(() => navigateTo('/verify-email/success'), 2000);
    } catch (err: any) {
      error.value = err.message || 'Verification failed or expired.';
      showResendForm.value = true;
    } finally {
      isVerifying.value = false;
    }
  } else {
    error.value = 'No verification token provided.';
    showResendForm.value = true;
  }
});

const handleTokenResend = async () => {
  if (!resendEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resendEmail.value)) {
    error.value = 'Please enter a valid email address.';
    return;
  }

  isResending.value = true;
  try {
    const response: any = await useApiFetch('/auth/resend-email', {
      method: 'POST',
      body: { email: resendEmail.value },
    });
    email.value = resendEmail.value; // Store email for display
    message.value = response.message || 'Verification email resent successfully!';
    error.value = ''; // Clear any previous errors
    setTimeout(() => (message.value = ''), 5000); // Clear message after 5 seconds
  } catch (err: any) {
    error.value = err.message || 'Failed to resend verification email.';
  } finally {
    isResending.value = false;
  }
};
</script>


<template>
  <section class="bg-background-500 text-white relative z-0 overflow-hidden py-4">
    <div class="px-4 min-h-screen flex-center gap-x-0 sm:gap-x-5 md:gap-x-8">
      <div class="flex flex-col gap-y-10 basis-full xs:basis-4/5 sm:basis-3/5 md:basis-1/2 lgx:basis-2/5 flex-none p-0 sm:p-5 md:p-8 lg:p-10">
        <SubcomponentsLogo/>
        <hgroup class="flex flex-col gap-y-3">
          <h1 class="text-semibold text-2xl font-roboto">Verify Your Email</h1>
          <p v-if="email">Verification link sent to: <span>{{ email }}</span></p>
        </hgroup>
        <div class="p-5 lg:p-8 rounded-2xl border border-white/10 flex flex-col gap-y-6">
          <div v-if="isVerifying" class="flex flex-col items-center gap-y-2">
            <div class="animate-spin"><Icon name="tabler:settings"/></div>
            <p>Verifying if you landed from a spaceship</p>
          </div>
          <p v-if="message" class="text-green-400 text-center">{{ message }}</p>
          <p v-if="error" class="text-red-400 text-center">{{ error }}</p>
          <div v-if="showResendForm" class="flex flex-col gap-y-4">
            <input
              v-model="resendEmail"
              type="email"
              placeholder="Enter your email"
              class="p-2 rounded bg-gray-800 text-white border border-white/10"
              required
            />
            <button
              class="btn btn-md btn-primary self-center"
              :disabled="isResending"
              @click="handleTokenResend"
            >
              {{ isResending ? 'Sending...' : 'Resend Email' }}
            </button>
            <small class="text-center text-white/70">
              Didn’t receive email? Check spam or promotion folders.
            </small>
          </div>
        </div>
      </div>
      <figure class="w-0 sm:w-full self-stretch rounded-2xl overflow-hidden">
        <img
          src="/media/images/bg/snipsuggest-bg-collection.png"
          alt=""
          class="w-full h-full object-cover"
        />
      </figure>
    </div>
    <div
      class="absolute -top-10 -right-10 -z-[1] w-[175px] h-[175px] rounded-full bg-primary-500 blur-[100px]"
    ></div>
    <div
      class="absolute left-1/2 transform -translate-x-1/2 bottom-10 -z-[1] w-[220px] h-[220px] rounded-full bg-primary-500 blur-[100px]"
    ></div>
  </section>
</template>
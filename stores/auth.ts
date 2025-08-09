import { defineStore } from "pinia";
import persist from "pinia-plugin-persistedstate";
import type { 
  SignupPayload,
  User,
  LoginPayload,
  LoginResponse
} from "~/types/users";
import type { ApiResponse } from "~/types/common";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null
  }),

  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user
  },

  actions: {

    async signup(payload: SignupPayload): Promise<ApiResponse> {
      try {
        const response = await $fetch('/api/auth/signup', {
          method: 'POST',
          body: payload,
        });
        return response as ApiResponse;
      } catch (error: any) {
        throw new Error(error.data?.detail || 'Signup failed');
      }
    },

    async login(payload: LoginPayload): Promise<LoginResponse> {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: payload,
        }) as LoginResponse;
  
        this.token = response.access_token;
        await this.fetchUser();
        return response;
      } catch (error: any) {
        throw new Error(error.data?.detail || error.data?.message || 'Login failed');
      }
    },

    async verifyToken(verificationToken: string): Promise<ApiResponse> {
      try {
        const response = await $fetch(`/api/auth/verify-email?token=${verificationToken}`, {
          method: 'GET',
        });
        return response as ApiResponse;
      } catch (error: any) {
        throw new Error(error.data?.detail || 'Verification failed');
      }
    },

    async fetchUser() {
      if (!this.token) return;
      
      try {
        const response = await useApiFetch('/api/auth/me', {
          method: 'GET',
        }) as User;
  
        this.user = response;
      } catch (error: any) {
        console.error('Failed to fetch user:', error.data?.detail || error.message);
        this.user = null;
      }
    },

    logout() {
      this.$reset();
      navigateTo("/login");
    }
  },
  
  persist: true
});

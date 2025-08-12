<script setup lang="ts">
import { usePasswordField } from '~/composables/usePasswordField';
// Define the props this component will accept
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
});

// Define the events this component will emit
defineEmits(['update:modelValue', 'blur']);
const { passwordFieldVisible, togglePasswordField } = usePasswordField();
</script>

<template>
  <div class="form-input-wrapper">
    <label :for="name">{{ label }}</label>
    
    <div class="bg-white/10 flex items-center gap-x-2 h-12 ps-2.5 rounded-lg">
      <div class="flex-none">
        <Icon name="tabler:lock"/>
      </div>
      
      <input
        :type="passwordFieldVisible ? 'text' : 'password'"
        :name="name"
        :id="id"
        class="form-input"
        
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        
        @blur="$emit('blur')"
      />
      
      <button @click.prevent="togglePasswordField" class="btn flex-none p-2">
        <Icon :name="passwordFieldVisible ? 'tabler:eye-closed' : 'tabler:eye'"/>
      </button>
    </div>
    
    <small v-if="error" class="text-red-400">{{ error }}</small>
  </div>
</template>
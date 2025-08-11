import { ref } from 'vue';

export function usePasswordField() {
  const passwordFieldVisible = ref<boolean>(false);

  const togglePasswordField = () => {
    passwordFieldVisible.value = !passwordFieldVisible.value;
  };

  return {
    passwordFieldVisible,
    togglePasswordField
  };
};
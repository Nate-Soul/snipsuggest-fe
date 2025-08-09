import { ref, onMounted, onUnmounted } from 'vue';

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void) {
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (elementRef.value && !elementRef.value.contains(target)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleOutsideClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
  });
}
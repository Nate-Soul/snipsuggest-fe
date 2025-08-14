<!-- components/MeterCircle.vue -->
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  rating: number | null | undefined; // Allow nullable rating
  max?: number;
  title?: string;
  colour?: string;
}>();

const max = ref<number>(props.max || 10); // Default max value
const colour = ref<string>(props.colour || 'text-primary-500'); // Default colour

// Compute percentage safely
const percentage = computed(() => {
  if (!props.rating || isNaN(props.rating)) return '0.0';
  const value = (props.rating / (props.max || max.value)) * 100;
  return Math.min(Math.max(value, 0), 100).toFixed(1);
});

// Format rating for display
const displayRating = computed(() => {
  if (!props.rating || isNaN(props.rating)) return '0.0';
  return props.rating.toFixed(1);
});
</script>

<template>
  <div
    class="w-12 h-12 relative"
    role="meter"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="rating ?? 0"
    :title="title"
  >
    <svg class="w-full h-full transform" viewBox="0 0 36 36">
      <!-- Background circle -->
      <path
        class="text-white/20"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <!-- Progress circle -->
      <path
        :class="colour"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        :stroke-dasharray="`${percentage}, 100`"
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <!-- Text label -->
      <text
        x="18"
        y="22"
        text-anchor="middle"
        class="fill-current text-white text-xs font-medium"
      >
        {{ displayRating }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid'; // npm install uuid @types/uuid
import type { PropType } from 'vue';

// Define the shape of a tag
interface Tag {
  id: number | string;
  name: string;
}

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholderText: {
    type: String,
    default: 'Search and select...',
  },
  limit: {
    type: Number,
    default: 15,
  },
  fetchUrl: {
    type: String,
    required: true,
  },
  initialTags: {
    type: Array as PropType<Tag[]>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

// Unique ID for the component instance
const instanceId = uuidv4();

// Reactive state
const inputValue = ref('');
const allSuggestions = ref<Tag[]>([]);
const selectedBadges = ref<Tag[]>(props.initialTags);
const searchTimeout = ref<NodeJS.Timeout | null>(null);
const showSuggestions = ref(true);

// Computed property for filtered suggestions
const suggestions = computed(() => {
  if (!inputValue.value) {
    return [];
  }
  const filtered = allSuggestions.value.filter(suggestion =>
    suggestion.name.toLowerCase().startsWith(inputValue.value.toLowerCase()) &&
    !selectedBadges.value.some(badge => badge.id === suggestion.id)
  );
  return filtered;
});

// Watch for changes in selectedBadges and emit an event to the parent
watch(selectedBadges, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

// Fetch data from the backend
const fetchSuggestions = async () => {
  try {
    const response = await fetch(props.fetchUrl);
    const data = await response.json();
    allSuggestions.value = data.tags; // Assuming the API returns { tags: [{ id, name }, ...] }
  } catch (error) {
    console.error(`Error fetching suggestions from ${props.fetchUrl}:`, error);
  }
};

onMounted(fetchSuggestions);

// Methods to handle component logic
const debounceSearch = () => {
  showSuggestions.value = false;
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = setTimeout(() => {
    // Re-render suggestions based on input
  }, 300);
};

const addBadge = (tag: Tag) => {
  if (selectedBadges.value.length < props.limit && !selectedBadges.value.some(badge => badge.id === tag.id)) {
    selectedBadges.value.push(tag);
    inputValue.value = ''; // Clear input after selection
    showSuggestions.value = true;
  }
};

const removeBadge = (index: number) => {
  selectedBadges.value.splice(index, 1);
};

const handleInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault();
    const tagName = inputValue.value.trim().replace(',', '');
    if (tagName && selectedBadges.value.length < props.limit && !selectedBadges.value.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())) {
      const newTag: Tag = {
        id: uuidv4(), // Use a temp ID for new tags
        name: tagName
      };
      selectedBadges.value.push(newTag);
      inputValue.value = '';
    }
  }
};
</script>

<template>
  <div class="form-input-wrapper">
    <label :for="`userTags-${instanceId}`">{{ label }}</label>
    <output :id="`userTagsOutput-${instanceId}`" class="flex items-center flex-wrap gap-2">
      <div v-for="(tag, index) in selectedBadges" :key="tag.id" class="tag-badge">
        {{ tag.name }}
        <span @click="removeBadge(index)" class="bi bi-x close cursor-pointer"></span>
      </div>
    </output>

    <input
      :id="`userTags-${instanceId}`"
      v-model="inputValue"
      type="text"
      class="border rounded-lg p-2"
      :placeholder="placeholderText"
      @keydown="handleInput"
      @input="debounceSearch"
    />
    <small class="text-sm">
      Type a {{ label.toLowerCase() }} and press comma or enter.
      <span v-if="limit > 0">(You can input up to {{ limit }}.)</span>
    </small>

    <output :id="`userTagsSuggestions-${instanceId}`" class="flex items-center gap-x-1 gap-y-2 text-xs mt-2">
      <span v-if="showSuggestions">
        Existing {{ label.toLowerCase() }} will appear here as you type.
      </span>
      <span v-else-if="suggestions.length === 0 && inputValue.length > 0">
        No matching {{ label.toLowerCase() }} available.
      </span>

      <div
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        class="tag-badge cursor-pointer"
        @click="addBadge(suggestion)"
      >
        {{ suggestion.name }}
      </div>
    </output>
  </div>
</template>

<style scoped>
/* Scoped CSS for component-specific styles */
.tag-badge {
  @apply bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1;
}
.close {
  @apply text-red-500 hover:text-red-700 transition-colors;
}
</style>
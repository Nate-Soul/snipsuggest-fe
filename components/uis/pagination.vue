<script setup lang="ts">
interface Paging {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  setPage: (pageNumber: number) => void;
};

const props = defineProps<Paging>();

const startEntry = computed(() => (props.currentPage - 1) * props.perPage + 1);
const endEntry = computed(() => Math.min((startEntry.value + props.perPage - 1), props.totalItems));

const handlePageInput = (event: Event) => {
  const newPage = parseInt((event.target as HTMLInputElement).value, 10);
  if (!isNaN(newPage)) {
    props.setPage(newPage);
  }
};
</script>

<template>
    <nav class="mt-10 flex flex-wrap gap-4 items-center justify-between">
        <!-- Help text -->
        <span class="text-sm text-gray-700 dark:text-gray-400">
            Showing 
            <span class="font-semibold text-gray-900 dark:text-white">{{ startEntry }}</span> 
            to <span class="font-semibold text-gray-900 dark:text-white">{{ endEntry }}</span> 
            of <span class="font-semibold text-gray-900 dark:text-white">{{ totalItems }}</span> Entries
        </span>
        <div class="inline-flex items-center gap-x-4">
            <button 
                @click="setPage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" 
                title="Previous"
            >
                <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                <span class="sr-only">Previous</span>
            </button>
            <button 
                @click="setPage(currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white bg-transparent border hover:border-transparent hover:bg-primary-500" 
                title="Next"
            >
                <svg class="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                <span class="sr-only">Next</span>
            </button>
        </div>
        <div class="flex items-center gap-x-2">
            <span>Go to page</span>
            <input 
                type="number" 
                class="border border-gray-500 w-16 h-8 rounded-lg px-1.5" 
                min="1" 
                :max="totalPages" 
                :value="currentPage"
                @change="handlePageInput"
            >
        </div>
    </nav>
</template>
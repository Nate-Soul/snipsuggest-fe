<script lang="ts" setup>
import { ref } from "vue";
import { faqs } from "~/assets/mock-database/faq";

const props = defineProps({
  initialOpenIndex: {
    type: Number,
    default: -1
  }
});

const openIndex = ref(props.initialOpenIndex);

const handleToggle = (index: number, event: Event) => {
    if ((event.target as HTMLDetailsElement).open) {
        openIndex.value = index;
    } else {
        if (openIndex.value === index) {
            openIndex.value = -1;
        }
    }
};
</script>

<template>
    <section id="faq" class="bg-background-500 text-white/85 py-20 relative z-0">
        <div class="container mx-auto px-4">
            <div class="flex-center gap-x-8">
                <hgroup class="basis-1/5 flex-none flex flex-col gap-y-4">
                    <h2 class="text-3xl font-semibold font-roboto">Frequently Asked <br> Questions</h2>
                    <p>Get quick answers to common queries about snipSuggest</p>
                </hgroup>
                <div class="basis-3/5 bg-background-400 p-8 flex flex-col gap-y-4 rounded-2xl">
                    <details 
                        v-for="(faq, index) in faqs"
                        :key="faq.id"
                        :open="openIndex === index"
                        @toggle="handleToggle(index, $event)"
                        class="group p-4 border border-white/20 open:border-transparent rounded-lg transition-all ease-linear duration-300" 
                    >
                        <summary class="flex items-start gap-x-3 justify-between mb-0 group-open:mb-4 cursor-pointer">
                            {{ faq.question }}
                            <span class="bi bi-chevron-down text-sm group-open:hidden"></span>
                            <span class="bi bi-chevron-up text-sm hidden group-open:inline-flex"></span>
                        </summary>
                        {{ faq.answer }}
                    </details>
                </div>
            </div>
        </div>
        <img src="/media/images/bg/question-mark-frame.png" alt="" class="absolute -z-[1] top-1/2 -translate-y-1/2 left-[15%]" width="380">
    </section>
</template>
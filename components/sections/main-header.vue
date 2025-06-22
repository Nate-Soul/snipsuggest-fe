<script setup lang="ts">
defineProps<{
  classes?: string
}>();
</script>

<template>
    <header id="mainHeader" :class="classes ?? classes">
        <UisNavbar/>
    </header>
</template>
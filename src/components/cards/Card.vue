<script setup>
defineProps({
  symbol: String,
  number: String,
});

</script>

<template>
  <div class="grid grid-cols-1 p-6 bg-orange rounded-lg text-black">
    <div>{{ number }}</div>
    <div>{{ symbol }}</div>
    <slot></slot>
  </div>
</template>

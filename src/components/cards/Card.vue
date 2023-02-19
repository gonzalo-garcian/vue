<script setup>
defineProps({
  symbol: String,
  number: String,
});

</script>

<template>
  <div class="flex items-center justify-center p-6 bg-white rounded-lg text-black max-w-[30px]">
    <div>{{ number }}</div>
    <div>{{ symbol }}</div>
  </div>
</template>

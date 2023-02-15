<template>
  <tr>
    <td class="text-xl font-medium flex items-center gap-x-4 px-6 py-4">
      <img :src="'https://' + email" alt="" class="rounded-xl" />
      {{ name }}
    </td>
    <td class="text-gray-500 px-6 py-4">{{ email }}</td>
    <td class="px-6 py-4">
      <button class="text-green-400 text-xl">{{ status }}</button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  name: String,
  email: String,
  status: String,
});
</script>
<template>
  <tr class="bg-white mb-0 py-0 even:bg-gray-100">
    <!-- Номер -->
    <td
      class="px-7 py-2 text-blue-700 font-semibold border border-blue-200 text-center"
    >
      {{ number }}
    </td>

    <!-- Время, которое осталось -->
    <td class="px-7 py-2 text-blue-600 border border-blue-200 text-center">
      {{ remainingTime }}
    </td>

    <!-- Цена -->
    <td class="px-7 py-2 text-gray-700 border border-blue-200 text-center">
      <Tag severity="info" :value="price + '₽'" />
    </td>
  </tr>
</template>

<script setup>
import { Tag } from "primevue";

const props = defineProps({
  number: [String, Number],
  remainingTime: String,
  price: [String, Number],
});
</script>

<style scoped>
@media (max-width: 550px) {
  .card {
    width: 80vw;
  }
}
</style>

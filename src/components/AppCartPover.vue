<template>
  <div
    :class="{
      'bg-blue-500 p-8 rounded-2xl': !active,
      'opacity-0': active,
    }"
  >
    <h1>{{ id }}</h1>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  active: Boolean,
});
</script>

<style></style>

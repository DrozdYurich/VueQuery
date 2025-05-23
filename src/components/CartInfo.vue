<template>
  <div class="card bg-amber-400">
    <h1>{{ title }}</h1>
    <p>{{ views }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  views: Number,
});
</script>
<style scoped>
.card {
  gap: 10px;
  background-color: beige;
  border: 1px solid black;
  padding: 5px;
  width: 30vw;
}
</style>

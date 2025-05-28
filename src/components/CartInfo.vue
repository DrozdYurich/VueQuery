<template>
  <div class="card bg-amber-400">
    <h1>{{ title }}</h1>
    <p>{{ views }}</p>
    <Button
      severity="success"
      :style="{
        height: '25px',
      }"
      @click="goToArenda"
      >Оформить</Button
    >
  </div>
</template>
<script setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { Button } from "primevue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  title: String,
  views: Number,
  id: String,
});
const goToArenda = () => {
  router.push({ name: "arenda", params: { id: props.id } });
};
</script>
<style scoped>
.card {
  gap: 10px;
  background-color: beige;
  border: 1px solid black;
  padding: 5px;
  width: 40vw;
  border-radius: 10px;
}
@media (max-width: 550px) {
  .card {
    width: 80vw;
  }
}
</style>

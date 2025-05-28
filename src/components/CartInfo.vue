<template>
  <div class="card bg-white">
    <h1 class="text-2xl font-medium text-gray-800">{{ title }}</h1>
    <p class="text-gray-500">{{ views }} просмотров</p>
    <Button
      severity="success"
      :style="{
        height: '32px',
        backgroundColor: type === 'got' ? '#3b82f6' : '#ef4444',
        borderColor: type === 'got' ? '#3b82f6' : '#ef4444',
        color: 'white',
        fontWeight: '500',
        borderRadius: '6px',
      }"
      @click="goToArenda"
      >{{ type === "got" ? "Оформить" : "Снять бронь" }}</Button
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
  type: String,
});
const goToArenda = () => {
  if (props.type === "got") {
    router.push({ name: "arenda", params: { id: props.id } });
  } else {
    router.push({ name: "page" });
  }
};
</script>

<style scoped>
.card {
  gap: 12px;
  background-color: white;
  border: 1px solid #e5e7eb;
  padding: 16px;
  width: 40vw;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 550px) {
  .card {
    width: 80vw;
  }
}
</style>

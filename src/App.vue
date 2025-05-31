<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheToolBar from "./components/TheToolBar.vue";
import { Toast } from "primevue";
</script>

<template>
  <Toast position="top-left" class="small-toast" />
  <div class="h-full">
    <RouterView />
    <TheToolBar />
  </div>
</template>
<style>
.small-toast .p-toast-message {
  font-size: 0.875rem; /* Уменьшаем размер текста */
  padding: 0.5rem; /* Уменьшаем отступы */
  margin-bottom: 0.5rem; /* Уменьшаем расстояние между уведомлениями */
}

.small-toast .p-toast-icon-close {
  width: 1rem;
  height: 1rem;
}
</style>

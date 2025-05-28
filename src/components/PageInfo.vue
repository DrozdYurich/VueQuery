<template>
  <div class="card flex justify-center">
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Загружаем повербанки...</p>
    </div>

    <div v-else class="inf">
      <CartInfo
        v-for="d in data"
        :title="d.title"
        :key="d.id"
        :id="d.id"
        :views="d.views"
        :type="'got'"
      />
    </div>
  </div>
</template>
<script setup>
import { useQuery } from "@tanstack/vue-query";
import CartInfo from "./CartInfo.vue";
import axios from "axios";
const getData = async () => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const { data, isError, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: getData,
  staleTime: 1000 * 60 * 5,
});
</script>
<style scoped>
.inf {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
}
@media (max-width: 550px) {
  .inf {
    grid-template-columns: 1fr;
  }
}
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 15px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

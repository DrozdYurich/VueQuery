<template>
  <div class="card flex flex-col justify-center items-center">
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Загружаем повербанки...</p>
    </div>

    <div v-else class="inf">
      <AppCartPover
        v-for="n in data"
        :key="n.id"
        :id="n.id"
        :active="n.isActive"
      />
    </div>
    <Button
      severity="secondary"
      label="Взять в аренду"
      :style="{
        backgroundColor: '#cccccc',
        color: '#666666',
        border: '1px solid #999999',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '60%',
        textAlign: 'center',
        marginTop: '1rem',
      }"
      @click="handleRentClick"
    />
  </div>
</template>
<script setup>
import { getPosts } from "@/initialState";
import { useQuery } from "@tanstack/vue-query";
import CartInfo from "./CartInfo.vue";
import axios from "axios";
import AppCartPover from "./AppCartPover.vue";
import { Button } from "primevue";
import { useRouter } from "vue-router";
const router = useRouter();
const getData = async () => {
  try {
    const response = await getPosts();
    return response;
  } catch (error) {
    console.error(error);
  }
};

const { data, isError, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: getData,
  staleTime: 1000 * 60 * 5,
});
function getRandomItem(arr) {
  if (!arr || arr.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
function handleRentClick() {
  if (!data || data.length === 0) {
    alert("Данные еще не загружены");
    return;
  }
  const inactiveItems = data.value.filter((item) => !item.isActive);
  if (inactiveItems.length === 0) {
    alert("Нет доступных повербанков для аренды");
    return;
  }
  const randomItem = getRandomItem(inactiveItems);
  router.push({ name: "arenda", params: { id: randomItem.id } });
}
</script>
<style scoped>
.inf {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
}
@media (max-width: 550px) {
  .inf {
    grid-template-columns: repeat(3, 1fr);
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

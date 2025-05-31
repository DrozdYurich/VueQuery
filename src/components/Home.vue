<template>
  <div class="orders-container">
    <h1 class="orders-title">Мои заказы</h1>
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Загружаем ваши заказы...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>Ошибка при загрузке заказов: {{ error.message }}</p>
      <button @click="refetch" class="retry-button">Попробовать снова</button>
    </div>

    <div v-else-if="data.some((item) => item.isActive)" class="orders-grid">
      <CartInfo
        v-for="n in data.filter((item) => item.isActive)"
        :key="n.id"
        :number="n.id"
        :endData="n.endDate"
        :startData="n.rentalStart"
        :price="n.price"
        :activ="n.isActive"
      />
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h2 class="empty-title">Заказов пока нет</h2>
      <p class="empty-text">Здесь будут отображаться ваши будущие заказы</p>
      <button class="empty-button" @click="$router.push({ name: 'page' })">
        Начать покупки
      </button>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import CartInfo from "./CartInfo.vue";
import { useRouter } from "vue-router";
import { getPosts } from "@/initialState";
const router = useRouter();
const getPostss = async () => {
  try {
    const resp = await getPosts();
    return resp;
  } catch (error) {
    throw new Error("Не удалось загрузить заказы");
  }
};

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["posts"],
  queryFn: getPostss,
  staleTime: 1000 * 60 * 5,
});
</script>

<style scoped>
.orders-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.orders-title {
  font-size: 28px;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 30px;
  text-align: center;
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

.orders-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(300px, 1fr));

  margin: auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 30px;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: #cbd5e1;
  margin-bottom: 20px;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-title {
  font-size: 22px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 10px;
}

.empty-text {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 20px;
  max-width: 400px;
}

.empty-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.empty-button:hover {
  background-color: #2563eb;
}

@media (max-width: 768px) {
  .orders-grid {
    grid-template-columns: 1fr;
  }

  .empty-state {
    min-height: 300px;
    padding: 20px;
  }
}
</style>

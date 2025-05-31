<template>
  <div class="tr">
    <div class="td">{{ number }}</div>
    <div class="td">{{ timeLeft }}</div>
    <div class="td">
      <Tag severity="info" :value="price + '₽'" class="w-full" />
    </div>
  </div>
</template>

<script setup>
import { Tag } from "primevue";
import { onMounted, onUnmounted, ref } from "vue";
import { computed } from "vue";
const now = ref(new Date());

const props = defineProps({
  number: [String, Number],
  startData: String,
  endData: String,
  price: [String, Number],
});
const timeLeft = computed(() => {
  const diffMs = new Date(props.endData) - now.value;
  if (diffMs <= 0) {
    return "Аренда завершена";
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => n.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
});

let timer;

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.tr {
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  width: 70vw;
  text-align: center;
  border: 1px solid #2275db; /* светлая общая граница */
  border-bottom: none;
  overflow: hidden;
}

.td {
  padding: 8px 12px;
  border-right: 1px solid #cbd5e1; /* светлая граница справа */
  display: flex;
  align-items: center;
  justify-content: center;
}
.tr:last-child {
  border-bottom: 1px solid #2275db;
}
/* Убираем границу у последнего столбца */
.td:last-child {
  border-right: none;
}

@media (max-width: 550px) {
  .card {
    width: 80vw;
    http: ; //localhost:3000/posts
  }
}
</style>

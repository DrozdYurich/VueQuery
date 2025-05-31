<template>
  <div class="tr">
    <div class="td">{{ number }}</div>
    <div class="td">{{ timeLeft }}</div>
    <div class="td">
      <Tag severity="info" :value="price + '₽'" class="w-full" />
    </div>
    <div class="td">
      <Button severity="danger" label="Сдать" @click="changeDel" />
    </div>
  </div>
</template>

<script setup>
import { updatePost } from "@/initialState";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { Button, Tag } from "primevue";
import { onMounted, onUnmounted, ref } from "vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
const now = ref(new Date());
const router = useRouter();
const props = defineProps({
  number: [String, Number],
  startData: String,
  endData: String,
  price: [String, Number],
  activ: Boolean,
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
const qClient = useQueryClient();
const changeData = async () => {
  try {
    const resp = await updatePost(props.number, {
      id: props.number,
      price: props.price,
      isActive: false,
      endDate: props.endData,
      rentalStart: props.startData,
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};
const { mutateAsync: updatePosts, isPending } = useMutation({
  mutationFn: changeData,
  onSuccess: () => {
    qClient.invalidateQueries(["posts"]);
    router.push({
      name: "page",
    });
  },
});
const changeDel = async () => {
  await updatePosts();
};
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
  grid-template-columns: 0.5fr 0.8fr 0.5fr 0.5fr;
  width: 90vw;
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
  }
}
</style>

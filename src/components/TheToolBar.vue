<template>
  <Toolbar
    :style="{
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      zIndex: '50',
      backgroundColor: '#fff',
      padding: '0',
      display: 'flex',
      justifyContent: 'space-around',
    }"
  >
    <template #center>
      <Button
        v-for="it in items"
        :key="it.key"
        class="py-2.5 px-2 btn flex flex-col items-center justify-center"
        severity="secondary"
        :label="it.label"
        :icon="it.icon"
        text
        :class="{ active: activeBtn === it.key }"
        @click="handleMenuClick(it)"
      />
    </template>
  </Toolbar>
</template>
<script setup>
import { Button, Toolbar } from "primevue";
import { ref, watch } from "vue";
import useGoto from "./methods/useGoto";
import { useRoute } from "vue-router";
const { gotoMy, gotoPage } = useGoto();
const activeBtn = ref();
const route = useRoute();
function handleMenuClick(item) {
  activeBtn.value = item.key;
  if (item.command) {
    item.command();
  }
}
const items = ref([
  {
    key: "zak",
    label: "Повербанки",
    icon: "pi pi-shopping-cart",
    command: gotoPage,
    routeName: "page",
  },
  {
    key: "my",
    label: "Мои заказы",
    icon: "pi pi-user",
    command: gotoMy,
    routeName: "home",
  },
]);
watch(
  () => route.name,
  (newRoute) => {
    const found = items.value.find((item) => item.routeName === newRoute);
    activeBtn.value = found ? found.key : null;
  },
  { immediate: true }
);
</script>
<style>
.p-toolbar-center {
  width: 60%;
  display: flex;
  justify-content: space-around;
}

.active {
  background: #e0e7ff !important; /* Пример активного цвета */
  color: #1d4ed8 !important;
}
.p-button-label {
  font-size: 20px;
}
</style>

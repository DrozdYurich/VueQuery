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
import { ref } from "vue";
import useGoto from "./methods/useGoto";
const { gotoMy, gotoPage } = useGoto();
const activeBtn = ref();
function handleMenuClick(item) {
  activeBtn.value = item.key;
  if (item.command) {
    item.command();
  }
}
const items = ref([
  {
    key: "zak",
    label: "Заказать",
    icon: "pi pi-shopping-cart",
    command: gotoPage,
  },
  {
    key: "my",
    label: "Профиль",
    icon: "pi pi-user",
    command: gotoMy,
  },
]);
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
</style>

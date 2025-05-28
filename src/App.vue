<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheToolBar from "./components/TheToolBar.vue";
</script>

<template>
  <div class="h-full">
    <RouterView />
    <TheToolBar />
  </div>
</template>

<template>
  <div>
    <h1 class="text-3xl text-center p-3">Доступные повербанки</h1>
    <PageInfo />
  </div>
</template>
<script setup>
import Home from "@/components/Home.vue";
import PageInfo from "@/components/PageInfo.vue";
import { useQueryClient } from "@tanstack/vue-query";
const qClient = useQueryClient();
</script>
<style scoped></style>

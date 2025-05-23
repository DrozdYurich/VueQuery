<template>
  <div>Page page</div>

  <RouterLink :to="{ name: 'home' }">Home</RouterLink>
</template>
<script setup>
import Home from "@/components/Home.vue";
import { useQueryClient } from "@tanstack/vue-query";
const qClient = useQueryClient();
console.log(qClient.getQueryData(["posts"]));
</script>
<style scoped></style>

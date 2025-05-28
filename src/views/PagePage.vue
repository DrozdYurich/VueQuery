<template>
  <div class="home">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <PageInfo />
  </div>
</template>
<script setup>
import Home from "@/components/Home.vue";
import PageInfo from "@/components/PageInfo.vue";
import { useQueryClient } from "@tanstack/vue-query";
const qClient = useQueryClient();
console.log(qClient.getQueryData(["posts"]));
</script>
<style scoped>
.home {
  height: 93vh;
}
</style>

<template>
  <div>
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

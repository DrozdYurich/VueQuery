<template>
  <div class="card flex justify-center">
    <div v-if="isLoading">loading</div>

    <div v-else class="inf">
      <CartInfo
        v-for="d in data"
        :title="d.title"
        :key="d.id"
        :id="d.id"
        :views="d.views"
      />
    </div>
  </div>
</template>
<script setup>
import { useQuery } from "@tanstack/vue-query";
import CartInfo from "./CartInfo.vue";
import axios from "axios";
const getData = async () => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const { data, isError, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: getData,
  staleTime: 1000 * 60 * 5,
});
</script>
<style scoped>
.inf {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
}
@media (max-width: 550px) {
  .inf {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="card bg-amber-400">
    <h1>{{ title }}</h1>
    <p>{{ views }}</p>
    <Button
      severity="danger"
      :style="{
        height: '25px',
      }"
      @click="remove"
      >Удалить</Button
    >
  </div>
</template>
<script setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { Button } from "primevue";
const props = defineProps({
  title: String,
  views: Number,
  id: String,
});
const removeDel = async () => {
  try {
    const response = await axios.delete(`/api/posts/${props.id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const qClient = useQueryClient();
const { mutate: del } = useMutation({
  mutationFn: removeDel,
  onSuccess: (data) => {
    console.log("Mutation success data:", data);
    qClient.invalidateQueries(["posts"]);
  },
});

const remove = () => {
  del();
};
</script>
<style scoped>
.card {
  gap: 10px;
  background-color: beige;
  border: 1px solid black;
  padding: 5px;
  width: 30vw;
  border-radius: 10px;
}
</style>

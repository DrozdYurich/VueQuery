<template>
  <div>
    <h1>Home</h1>
    <div v-if="loading">loading</div>
    <div v-else>
      {{ data }}
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const data = ref();
const loading = ref(false);
const getData = async () => {
  try {
    loading.value = true;
    console.log(loading);
    const response = await axios.get("/api/posts");
    console.log(response);
    data.value = response.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error(error);
  }
};
onMounted(() => {
  getData();
});
</script>
<style scoped></style>

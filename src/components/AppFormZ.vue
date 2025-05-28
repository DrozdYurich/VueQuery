<template>
  <div class="flex items-center justify-center">
    <Form
      :initialValues
      :resolver
      class="flex flex-col gap-4 w-3/4 sm:w-80"
      @submit="onFormSubmit"
    >
      <FormField
        v-slot="$field"
        name="views"
        initialValue=""
        class="flex flex-col gap-1"
      >
        <InputNumber placeholder="Цена" v-model="initialValues.views" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        name="title"
        initialValue=""
        class="flex flex-col gap-1"
      >
        <label for="data" class="font-bold block mb-2">
          Дата окончания аренды
        </label>
        <DatePicker
          id="data"
          v-model="initialValues.data"
          showTime
          hourFormat="24"
          fluid
        />

        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <div class="flex gap-4 justify-around">
        <Button
          type="submit"
          severity="success"
          label="Оплатить"
          class="w-full"
        />
        <Button
          type="button"
          severity="danger"
          label="Отмена"
          class="w-full"
          @click="goToPage"
        />
      </div>
    </Form>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { Form, FormField } from "@primevue/forms";
import { Button, DatePicker, InputNumber, InputText, Message } from "primevue";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
function formatDate(dateString) {
  const date = new Date(dateString);

  // Проверяем корректность даты
  if (isNaN(date)) {
    return "Некорректная дата";
  }

  // Форматируем компоненты даты и времени с ведущими нулями
  const pad = (num) => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Месяцы с 0
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // Формат: ГГГГ-ММ-ДД ЧЧ:ММ:СС
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const goToPage = () => {
  router.push({ name: "page" });
};
const qClient = useQueryClient();
// const addTasks = async (data) => {
//   try {
//     const response = await axios.post("/api/posts", data);

//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
const defaultValues = {
  id: "",
  data: "",
  views: "",
};
// const { mutate: addMut } = useMutation({
//   mutationFn: addTasks,
//   onSuccess: (data) => {
//     console.log("Mutation success data:", data);
//     qClient.invalidateQueries(["posts"]);
//     Object.assign(initialValues, defaultValues);
//   },
// });

const initialValues = reactive({
  id: "",
  data: "",
  views: "",
});
const schema = computed(() => {
  const baseSchema = {
    data: yup.date().required("Укажите дату и время окончания поездки"),
    views: yup.number().required("Цена обязательна"),
  };
  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));
const onFormSubmit = ({ valid }) => {
  console.log("fffs");
  if (valid) {
    const falidData = {
      data: formatDate(initialValues.data),
      id: route.params.id,
      views: initialValues.views,
    };
    console.log(falidData, "fff");
  }
};
</script>
<style scoped></style>

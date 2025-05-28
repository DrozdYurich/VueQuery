<template>
  <div class="flex items-center justify-center">
    <Form
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-3/4 sm:w-80"
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
          v-model="initialValues.title"
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
          type="submit"
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
import { useRouter } from "vue-router";
const router = useRouter();
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
  title: "",
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
  title: "",
  views: "",
});
const schema = computed(() => {
  const baseSchema = {
    title: yup.string().required("Укажите название карточки"),
    views: yup.number().required("Цена обязательна"),
  };
  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));
const onFormSubmit = ({ valid }) => {
  if (valid) {
    const falidData = {
      title: initialValues.title,
      id: uuidv4(),
      views: initialValues.views,
    };

    addMut(falidData);
  }
};
</script>
<style scoped></style>

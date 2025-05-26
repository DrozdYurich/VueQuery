<template>
  <div class="card flex justify-center">
    <Form
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-80"
    >
      <FormField
        v-slot="$field"
        name="views"
        initialValue=""
        class="flex flex-col gap-1"
      >
        <InputNumber placeholder="views" v-model="initialValues.views" />
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
        <InputText
          type="text"
          v-model="initialValues.title"
          placeholder="Last Name"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@primevue/forms/resolvers/yup";

import * as yup from "yup";
import { Form, FormField } from "@primevue/forms";
import { Button, InputNumber, InputText, Message } from "primevue";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
const qClient = useQueryClient();
const addTasks = async (data) => {
  try {
    const response = await axios.post("/api/posts", data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const defaultValues = {
  id: "",
  title: "",
  views: "",
};
const { mutate: addMut } = useMutation({
  mutationFn: addTasks,
  onSuccess: (data) => {
    console.log("Mutation success data:", data);
    qClient.invalidateQueries(["posts"]);
    Object.assign(initialValues, defaultValues);
  },
});

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

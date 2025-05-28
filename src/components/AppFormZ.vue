<template>
  <div class="fr flex items-center justify-center min-h-[50vh]">
    <Form
      :initialValues="initialValues"
      :resolver="resolver"
      class="flex flex-col gap-6 w-3/4 sm:w-96 bg-white p-8 rounded-xl shadow-md border border-gray-100"
      @submit="onFormSubmit"
    >
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">
        Оформление аренды
      </h2>

      <FormField
        v-slot="$field"
        name="views"
        initialValue=""
        class="flex flex-col gap-2"
      >
        <label class="text-sm font-medium text-gray-700"
          >Стоимость аренды</label
        >
        <InputNumber
          placeholder="Введите цену"
          v-model="initialValues.views"
          class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md w-full"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="mt-1 text-sm text-red-600"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <FormField
        v-slot="$field"
        name="title"
        initialValue=""
        class="flex flex-col gap-2"
      >
        <label for="data" class="text-sm font-medium text-gray-700">
          Дата окончания аренды
        </label>
        <DatePicker
          id="data"
          v-model="initialValues.data"
          showTime
          hourFormat="24"
          fluid
          class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
        />

        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="mt-1 text-sm text-red-600"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <div class="flex gap-4 justify-between mt-4">
        <Button
          type="submit"
          label="Оплатить"
          class="bt w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        />
        <Button
          type="button"
          label="Отмена"
          class="btn w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
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
  if (isNaN(date)) return "Некорректная дата";

  const pad = (num) => num.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

const goToPage = () => {
  router.push({ name: "page" });
};

const qClient = useQueryClient();
const initialValues = reactive({
  id: "",
  data: "",
  views: "",
});

const schema = computed(() => {
  return yup.object().shape({
    data: yup.date().required("Укажите дату и время окончания поездки"),
    views: yup.number().required("Цена обязательна"),
  });
});

const resolver = computed(() => yupResolver(schema.value));

const onFormSubmit = ({ valid }) => {
  if (valid) {
    const falidData = {
      data: formatDate(initialValues.data),
      id: route.params.id,
      views: initialValues.views,
    };
    console.log(falidData, "Submitted data");
  }
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
.p-button {
  width: 100%;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
}
.p-button.bt:hover {
  background-color: #0d1d47;
}
.p-button.btn {
  background-color: #f32c09;
  border: none;
  transition: background-color 0.2s ease-in-out;
}
.p-button.btn:hover {
  background-color: #8f2512;
}
:deep(.p-inputnumber-input),
:deep(.p-datepicker) {
  transition: all 0.2s ease;
  border: 1px solid #d1d5db;
}

:deep(.p-inputnumber-input:focus),
:deep(.p-datepicker:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}
:deep(.p-inputtext),
:deep(.p-inputnumber-input),
:deep(.p-datepicker) {
  width: 100%;
}
</style>

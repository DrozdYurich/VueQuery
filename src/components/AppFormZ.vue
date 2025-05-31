<template>
  <div class="fr flex items-center justify-center min-h-[50vh] bg-gray-50 p-0">
    <Form
      :initialValues="initialValues"
      :resolver="resolver"
      class="flex flex-col gap-6 w-3/4 sm:w-96 bg-white p-8 rounded-xl shadow-md border border-gray-200"
      @submit="onFormSubmit"
    >
      <h2 class="text-2xl font-semibold text-blue-700 mb-4 text-center">
        Оформление аренды
      </h2>
      <div v-if="isPending" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Подождите...</p>
      </div>
      <div v-else class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700">Время аренды</label>
        <div class="tr flex gap-3">
          <Button
            type="button"
            :style="{ borderColor: 'blue' }"
            :class="{
              'bg-blue-600 text-white hover:bg-blue-700':
                selectedOption === 'hour',
              'bg-gray-200 text-gray-700 hover:bg-gray-300':
                selectedOption !== 'hour',
            }"
            class="flex-1 py-2 rounded-md"
            @click="selectOption('hour')"
          >
            1 час
          </Button>
          <Button
            type="button"
            :style="{ borderColor: 'blue' }"
            :class="{
              'bg-blue-600 text-white hover:bg-blue-700':
                selectedOption === 'day',
              'bg-gray-200 text-gray-700 hover:bg-gray-300':
                selectedOption !== 'day',
            }"
            class="flex-1 py-2 rounded-md"
            @click="selectOption('day')"
          >
            1 день
          </Button>
          <Button
            type="button"
            :style="{ borderColor: 'blue' }"
            :class="{
              'bg-blue-600 text-white hover:bg-blue-700':
                selectedOption === 'custom',
              'bg-gray-200 text-gray-700 hover:bg-gray-300':
                selectedOption !== 'custom',
            }"
            class="flex-1 py-2 rounded-md"
            @click="selectOption('custom')"
          >
            Другое
          </Button>
        </div>
      </div>
      <FormField
        v-if="selectedOption === 'custom'"
        v-slot="$field"
        name="customHours"
        initialValue=""
        class="flex flex-col gap-2"
      >
        <label class="text-sm font-medium text-gray-700"
          >Введите время аренды в часах</label
        >
        <InputNumber
          v-model="customHours"
          :min="1"
          placeholder="Количество часов"
          class="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md w-full"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          class="mt-1 text-sm text-red-600"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>
      <div class="text-center text-blue-700 font-semibold text-lg mt-4">
        Цена: {{ formattedPrice }} ₽
      </div>
      <div class="flex gap-4 justify-between mt-6">
        <Button
          type="submit"
          label="Оплатить"
          :style="{ borderColor: 'blue', fontSize: '0.6rem' }"
          class="bt w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        />
        <Button
          type="button"
          label="Отмена"
          :style="{ borderColor: 'blue' }"
          class="btn w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          @click="goToPage"
        />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { Form, FormField } from "@primevue/forms";
import { Button, InputNumber, Message } from "primevue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updatePost } from "@/initialState";
const router = useRouter();
const route = useRoute();
const qClient = useQueryClient();
const id = route.params.id;
const pricePerHour = 100;
const pricePerDay = 2000;

const selectedOption = ref("hour");
const customHours = ref(null);
const rentalStart = ref(new Date());

const initialValues = reactive({
  id: "",
  data: "",
  views: "",
  rentalStart: rentalStart.value,
  isActive: false,
});

const schema = computed(() => {
  const now = new Date();
  return yup.object().shape({
    data: yup
      .date()
      .required("Укажите дату и время окончания аренды")
      .min(now, "Дата не может быть в прошлом"),
    customHours:
      selectedOption.value === "custom"
        ? yup.number().required("Введите время аренды").min(1, "Минимум 1 час")
        : yup.number().notRequired(),
  });
});

const resolver = computed(() => yupResolver(schema.value));

const calculatedViews = computed(() => {
  if (selectedOption.value === "hour") {
    return pricePerHour;
  }
  if (selectedOption.value === "day") {
    return pricePerDay;
  }
  if (selectedOption.value === "custom" && customHours.value) {
    return customHours.value * pricePerHour;
  }
  return 0;
});

const calculatedEndDate = computed(() => {
  const endDate = new Date(rentalStart.value);

  if (selectedOption.value === "hour") {
    endDate.setHours(endDate.getHours() + 1);
  } else if (selectedOption.value === "day") {
    endDate.setDate(endDate.getDate() + 1);
  } else if (selectedOption.value === "custom" && customHours.value) {
    endDate.setHours(endDate.getHours() + Number(customHours.value));
  }

  return endDate;
});

const formattedPrice = computed(() => {
  return calculatedViews.value > 0
    ? calculatedViews.value.toLocaleString()
    : "0";
});
watch(
  [selectedOption, customHours],
  () => {
    initialValues.views = calculatedViews.value;
    initialValues.data = calculatedEndDate.value;
  },
  { immediate: true }
);

// Функция выбора варианта времени аренды
function selectOption(option) {
  selectedOption.value = option;
  if (option !== "custom") {
    customHours.value = null;
  }
}

// Форматирование даты в строку
function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
const changeData = async (data) => {
  try {
    const resp = await updatePost(id, data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
const { mutateAsync: updatePosts, isPending } = useMutation({
  mutationFn: changeData,
  onSuccess: () => {
    qClient.invalidateQueries(["posts"]);
    router.push({
      name: "home",
    });
  },
});
// Обработка сабмита формы
const onFormSubmit = async ({ valid }) => {
  if (valid) {
    const falidData = {
      id: route.params.id,
      rentalStart: formatDate(initialValues.rentalStart),
      price: initialValues.views,
      isActive: true,
      endDate: formatDate(initialValues.data),
    };
    await updatePosts(falidData);
    console.log("Submitted data:", falidData);
  }
};

const goToPage = () => {
  router.push({ name: "page" });
};
</script>

<style>
.p-button {
  font-size: 0.7rem;
}
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 15px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.p-button {
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}
@media (max-width: 365px) {
  .tr {
    display: flex;
    flex-direction: column;
  }
}
.p-button.bg-blue-600 {
  background-color: #2563eb;
  color: white;
}

.p-button.bg-blue-600:hover {
  background-color: #1e40af;
}

.p-button.bg-gray-200 {
  background-color: #e5e7eb;
  color: #374151;
}

.p-button.bg-gray-200:hover {
  background-color: #d1d5db;
}
.p-button-label {
  font-size: 0.8rem;
}
</style>

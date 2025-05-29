<template>
  <div class="fr flex items-center justify-center min-h-[50vh] bg-gray-50 p-6">
    <Form
      :initialValues="initialValues"
      :resolver="resolver"
      class="flex flex-col gap-6 w-3/4 sm:w-96 bg-white p-8 rounded-xl shadow-md border border-gray-200"
      @submit="onFormSubmit"
    >
      <h2 class="text-2xl font-semibold text-blue-700 mb-4 text-center">
        Оформление аренды
      </h2>

      <!-- Выбор времени аренды -->
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700">Время аренды</label>
        <div class="flex gap-3">
          <Button
            type="button"
            :style="{ borderColor: 'blue' }"
            :class="{
              'bg-blue-600 text-white': selectedOption === 'hour',
              'bg-gray-200 text-gray-700': selectedOption !== 'hour',
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
              'bg-blue-600 text-white': selectedOption === 'day',
              'bg-gray-200 text-gray-700': selectedOption !== 'day',
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
              'bg-blue-600 text-white': selectedOption === 'custom',
              'bg-gray-200 text-gray-700': selectedOption !== 'custom',
            }"
            class="flex-1 py-2 rounded-md"
            @click="selectOption('custom')"
          >
            Другое
          </Button>
        </div>
      </div>

      <!-- Поле для ввода времени при выборе "Другое" -->
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

      <!-- Отображение цены -->
      <div class="text-center text-blue-700 font-semibold text-lg mt-4">
        Цена: {{ formattedPrice }} ₽
      </div>

      <div class="flex gap-4 justify-between mt-6">
        <Button
          type="submit"
          label="Оплатить"
          :style="{ borderColor: 'blue' }"
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

const router = useRouter();
const route = useRoute();
const qClient = useQueryClient();

const pricePerHour = 10; // цена за час
const pricePerDay = 200; // цена за день (пример)

const selectedOption = ref("hour");
const customHours = ref(null);
const rentalStart = ref(new Date()); // Время начала аренды

const initialValues = reactive({
  id: "",
  data: "", // время окончания аренды
  views: "", // цена
  rentalStart: rentalStart.value, // время начала аренды
  isActive: false,
});

// Схема валидации
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

// Рассчитываем views (стоимость) в зависимости от выбранного варианта
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

// Рассчитываем дату окончания аренды на основе выбранного времени
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

// Форматируем цену для отображения
const formattedPrice = computed(() => {
  return calculatedViews.value > 0
    ? calculatedViews.value.toLocaleString()
    : "0";
});

// Следим за изменениями и обновляем initialValues
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

// Обработка сабмита формы
const onFormSubmit = ({ valid }) => {
  if (valid) {
    const falidData = {
      id: route.params.id,
      rentalStart: formatDate(initialValues.rentalStart),
      price: initialValues.views,
      isActive: true,
      endDate: formatDate(initialValues.data),
    };
    console.log("Submitted data:", falidData);
    // Здесь можно добавить вызов мутации для сохранения данных
  }
};

const goToPage = () => {
  router.push({ name: "page" });
};
</script>

<style scoped>
/* Кастомные стили для кнопок */
.p-button {
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
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
</style>

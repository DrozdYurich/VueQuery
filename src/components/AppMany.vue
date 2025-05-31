<template>
  <div class="payment-container">
    <div
      class="card-form p-6 rounded-lg shadow-md bg-white border border-gray-200 max-w-md mx-auto"
    >
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Оплата через Сбербанк
      </h2>

      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-5 w-full"
      >
        <!-- Номер карты -->
        <FormField
          v-slot="$field"
          name="cardNumber"
          class="flex flex-col gap-1"
        >
          <label for="cardNumber" class="text-sm font-medium text-gray-700"
            >Номер карты</label
          >
          <InputMask
            id="cardNumber"
            v-model="initialValues.cardNumber"
            mask="9999 9999 9999 9999"
            placeholder="1234 5678 9012 3456"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <!-- Имя владельца -->
        <FormField v-slot="$field" name="cardName" class="flex flex-col gap-1">
          <label for="cardName" class="text-sm font-medium text-gray-700"
            >Имя владельца</label
          >
          <InputText
            id="cardName"
            v-model="initialValues.cardName"
            placeholder="IVAN IVANOV"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-uppercase"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <!-- Срок действия / CVC -->
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="$field" name="expiry" class="flex flex-col gap-1">
            <label for="cardExpiry" class="text-sm font-medium text-gray-700"
              >Срок действия</label
            >
            <InputMask
              id="cardExpiry"
              v-model="initialValues.expiry"
              mask="99/99"
              placeholder="ММ/ГГ"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </FormField>

          <FormField v-slot="$field" name="cvc" class="flex flex-col gap-1">
            <label for="cardCvc" class="text-sm font-medium text-gray-700"
              >CVC</label
            >
            <InputMask
              id="cardCvc"
              v-model="initialValues.cvc"
              mask="999"
              placeholder="123"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </FormField>
        </div>

        <!-- Кнопка -->
        <Button
          type="submit"
          label="Оплатить"
          icon="pi pi-credit-card"
          class="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
          :loading="loading"
        />
      </Form>
    </div>
  </div>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Form, FormField } from "@primevue/forms";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { InputText, Button, Message, InputMask, useToast } from "primevue";
import { updatePost } from "@/initialState";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
const router = useRouter();

const toast = useToast();
const showToast = (options) => {
  toast.add({
    life: 1000,
    ...options,
  });
};
const route = useRoute();
let receivedData = null;

if (route.query.data) {
  try {
    receivedData = JSON.parse(decodeURIComponent(route.query.data));
    console.log(receivedData);
  } catch (e) {
    console.error("Ошибка при разборе данных из query");
  }
}
const initialValues = reactive({
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvc: "",
});

const schema = computed(() => {
  return yup.object().shape({
    cardNumber: yup
      .string()
      .required("Введите номер карты")
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Неверный формат"),
    cardName: yup.string().required("Укажите имя владельца"),
    expiry: yup
      .string()
      .required("Укажите срок действия")
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Формат: ММ/ГГ"),
    cvc: yup
      .string()
      .required("Введите CVC")
      .matches(/^\d{3}$/, "Должно быть 3 цифры"),
  });
});

const resolver = computed(() => yupResolver(schema.value));

const loading = ref(false);
const changeData = async (data) => {
  try {
    const resp = await updatePost(receivedData.id, receivedData);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
const qClient = useQueryClient();
const { mutateAsync: updatePosts, isPending } = useMutation({
  mutationFn: changeData,
  onSuccess: () => {
    qClient.invalidateQueries(["posts"]);
    router.push({
      name: "home",
    });
  },
});
const onFormSubmit = async ({ valid }) => {
  loading.value = true;

  if (valid) {
    setTimeout(async () => {
      console.log("Данные карты:", initialValues);
      showToast({
        severity: "success",
        summary: "Вы успешно оплатили",
      });
      await updatePosts(receivedData);
      router.push({ name: "home" });
    }, 1000);
  } else {
    showToast({
      severity: "error",
      summary: "Заполните все поля",
    });
  }
};
</script>

<style scoped>
.payment-container {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f9fc;
}

.text-uppercase {
  text-transform: uppercase;
}
</style>

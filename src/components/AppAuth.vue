<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="bg-[var(--background-color)] rounded-lg shadow-lg p-6 w-full max-w-md"
      :style="{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }"
    >
      <div v-if="loading">
        <ProgressBar
          class="custom-progressbar"
          mode="indeterminate"
          style="height: 5px"
        />
      </div>
      <Divider align="center" type="solid">
        <span
          class="text-xl font-bold text-[var(--text-color)] bg-[var(--background-color)]"
        >
          Вход
        </span>
      </Divider>

      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <FormField v-slot="$field" name="nickname" class="flex flex-col gap-1">
          <FloatLabel variant="on"
            ><InputText
              class="w-full"
              type="text"
              v-model="initialValues.nickname"
              id="nickname"
            />
            <label for="nickname">NickName</label>
          </FloatLabel>

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              type="text"
              id="password"
              v-model="initialValues.password"
              :feedback="false"
              toggleMask
              fluid
            />
            <label for="password">Пароль</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <Button
          :disabled="loading"
          type="submit"
          :style="{ background: blue }"
          severity="info"
          label="Войти"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { FormField } from "@primevue/forms";

import {
  Button,
  Divider,
  FloatLabel,
  InputText,
  Message,
  Password,
  ProgressBar,
  useToast,
} from "primevue";
import { Form } from "@primevue/forms";
const toast = useToast();
const showToast = (options) => {
  toast.add({
    life: 2000,
    ...options,
  });
};
const loading = ref(false);
const initialValues = reactive({
  nickname: "",
  password: "",
});
const schema = computed(() => {
  const baseSchema = {
    nickName: yup.string().required("Укажите email"),
    password: yup
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Пароль обязателен"),
  };
  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));
import { useAuthStore } from "@/stores/counter";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();

const onFormSubmit = async () => {
  try {
    await authStore.login(initialValues);
    router.push("/");
    showToast({
      severity: "success",
      summary: "Вы успешно вошли",
    });
  } catch (error) {
    showToast({
      severity: "error",
      summary: "Произошла ошибка, проверьте введённые данные",
    });
  }
};
</script>
<style>
.custom-progressbar .p-progressbar-value {
  background-color: black !important; /* нужный цвет */
}
.save-btn:hover {
  filter: brightness(90%);
}
label {
  background-color: transparent;
}
.p-toast-message {
  width: 50%;
}
.p-inputtext {
  background: #eff0f1 !important;
}
</style>

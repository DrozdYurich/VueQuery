// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(formData) {
      if (formData.nickname === "admin" && formData.password === "Admin12345") {
        this.token = "demo-token";
        localStorage.setItem("token", this.token);
      } else {
        throw new Error("Неверные данные");
      }
    },
  },
});

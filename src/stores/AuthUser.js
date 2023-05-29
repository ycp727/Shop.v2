import { defineStore } from "pinia";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    isAuthenticated: false,
    me: {},
  }),

  actions: {
    async login(dto) {
      const router = useRouter();
      try {
        const url = "collections/users/auth-with-password";
        const { data } = await api.post(url, dto);
        this.token = data.token;
        this.isAuthenticated = true;
        this.me = data.record;
        console.log("dato =>", data);
        Notify.create({
          icon: "las la-fire-alt",
          position: "top-right",
          message: `Bienvenido ${this.me.username}`,
          color: "success",
        });
        router.push({ path: "/" });
      } catch (error) {
        console.log("eeeee =>", error);
      }
    },
    async register(dto) {
      const router = useRouter();
      console.log("dto::: ", dto);
      try {
        const url = "collections/users/records";
        await api.post(url, dto);
        router.push({ path: "/" });
      } catch (error) {
        console.log("Error Mio => ", error);
      }
    },
  },
});

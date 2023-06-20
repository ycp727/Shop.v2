import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";
import PocketBase from "pocketbase";
import { storeToRefs } from "pinia";
import { useAuthUser } from "./AuthUser";

const { me } = storeToRefs(useAuthUser());

export const useCartStore = defineStore("Cart", {
  state: () => ({
    cart: [],
    cartCant: 0,
  }),

  getters: {},

  actions: {
    async getCartByID(id) {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const records = await pb.collection("cart").getFullList({
          filter: `idusers=${id}`,
          sort: "-created",
        });
        this.cart = records;
        this.cartCant = records.length;
      } catch (error) {
        console.log(error);
      }
    },

    async BuyNow() {
      try {
        loading.value = true;
        // Agrega aquí la lógica para realizar la compra
        // await api.post("/api/comprar", carrito.value);
        await VaciarCarrito();
        Notify.create({
          message: "Compra realizada con éxito",
          icon: "check",
          color: "positive",
        });
      } catch (error) {
        Notify.create({
          message: "Error al realizar la compra",
          icon: "times",
          color: "negative",
        });
      } finally {
        loading.value = false;
      }
    },

    async CleanCart() {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Vaciar carrito</span>',
          message: "Estás seguro que deseas vaciar el carrito?",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          await api.delete(`/api/ccarrito/${me.value?.id}`);
          await getCartByID(me.value.id);
          Notify.create({
            message: "Carrito vaciado",
            icon: "check",
            color: "positive",
          });
        });
      } catch (error) {
        Notify.create({
          message: "Error al vaciar el carrito",
          icon: "times",
          color: "negative",
        });
      }
    },

    async deleteItemCart(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "Estas seguro que deseas eliminar el producto",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const pb = new PocketBase("http://127.0.0.1:8090");
          await pb.collection("cart").delete(id);
          Notify.create({
            message: "Eliminado con exito",
            icon: "check",
            color: "positive",
          });
          await this.getCartByID(me.value.id);
        });
      } catch (error) {
        Notify.create({
          message: "Error al eliminar",
          icon: "times",
          color: "negative",
        });
      }
    },
  },
});

import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useStockProductsStore = defineStore("StockProducts", {
  state: () => ({
    products: [],
    showAddDialog: false,
    showDialogF: false,
    showcardDialogF: false,
    showEditDialog: false,
  }),

  actions: {
    async getProducts() {
      const { data } = await api.get("collections/products/records");
      this.products = data;
    },

    async addProducts(newProducts) {
      try {
        await api.post("collections/products/records", newProducts);
        Notify.create({
          message: "Agregado con exito",
          icon: "check",
          color: "positive",
        });
        this.getProducts;
        showDialogF.value = false;
      } catch (error) {
        Notify.create({
          message: "Error al agregar",
          icon: "times",
          color: "negative",
        });
      }
    },

    async editProducts(id) {
      if (!id) {
        Notify.create({
          message: "Error al editar ;)",
          icon: "times",
          color: "negative",
        });
        return;
      }
      try {
        await api.patch(
          `collections/products/records/${id}`,
          tempProducts.value
        );
        Notify.create({
          message: "Editado con éxito",
          icon: "check",
          color: "positive",
        });
        this.getProducts;
        showDialogF.value = false;
        tempProducts.value = {};
      } catch (error) {
        Notify.create({
          message: "Error al editar",
          icon: "times",
          color: "negative",
        });
      }
    },

    async deleteProducts(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "Estas seguro que deseas eliminar la fila",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          await api.delete(`collections/products/records/${id}`);
          Notify.create({
            message: "Eliminado con exito",
            icon: "check",
            color: "positive",
          });
          this.getProducts();
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

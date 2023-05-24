import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

export const useStockProductsStore = defineStore("StockProducts", {
  state: () => ({
    products: [],
    $q: useQuasar(),
    showAddDialog: false,
  }),

  actions: {
    async getProducts() {
      const { data } = await api.get("collections/products/records");
      this.products = data;
    },

    async addProducts(newProducts) {
      try {
        await api.post("collections/products/records", newProducts);
        // $q.notify({
        //   message: "Agregado con exito",
        //   icon: "check",
        //   color: "positive",
        // });
        this.getProducts;
        showDialogF.value = false;
      } catch (error) {
        // $q.notify({
        //   message: "Error al agregar",
        //   icon: "times",
        //   color: "negative",
        // });
      }
    },

    async editProducts(id) {
      if (!id) {
        // $q.notify({
        //   message: "Error al editar ;)",
        //   icon: "times",
        //   color: "negative",
        // });
        return;
      }
      try {
        await api.patch(
          `collections/products/records/${id}`,
          tempProducts.value
        );
        // $q.notify({
        //   message: "Editado con éxito",
        //   icon: "check",
        //   color: "positive",
        // });
        this.getProducts;
        showDialogF.value = false;
        tempProducts.value = {};
      } catch (error) {
        // $q.notify({
        //   message: "Error al editar",
        //   icon: "times",
        //   color: "negative",
        // });
      }
    },

    async deleteProducts(id) {
      // try {
      // $q.dialog({
      //   html: true,
      //   title: '<span class="text-red">Eliminar</span>',
      //   message: "Estas seguro que deseas eliminar la fila",
      //   cancel: { color: "positive" },
      //   ok: { color: "negative" },
      //   persistent: true,
      // }).onOk(async () => {
      await api.delete(`collections/products/records/${id}`);
      // $q.notify({
      //   message: "Eliminado con exito",
      //   icon: "check",
      //   color: "positive",
      // });
      this.getProducts();
      //   });
      // } catch (error) {
      //   $q.notify({
      //     message: "Error al eliminar",
      //     icon: "times",
      //     color: "negative",
      //   });
    },
  },
});

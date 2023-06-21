import { defineStore } from "pinia";
import { Notify, Dialog } from "quasar";
import PocketBase from "pocketbase";

export const useStockProducts = defineStore("Product", {
  state: () => ({
    accesorios: [],
    tempAccesorios: {
      foto: null,
      nombre: "",
      cantidad: null,
      precio: null,
      categoria: "accesorios",
    },
    showDialogA: false,
    EditA: false,
    AddA: false,
    ViewA: false,

    herramientas: [],
    tempHerramientas: {
      foto: null,
      nombre: "",
      cantidad: "",
      precio: null,
      categoria: "herramientas",
    },
    showDialogH: false,
    EditH: false,
    AddH: false,
    ViewH: false,

    cactus: [],
    tempCactus: {
      foto: null,
      nombre: "",
      cantidad: "",
      precio: null,
      categoria: "cactus",
    },
    showDialogC: false,
    EditC: false,
    AddC: false,
    ViewC: false,
  }),

  getters: {},

  actions: {
    async putToCart(item) {
      const { data } = await api.post("/api/carrito", item);
    },
    // -----------------------------
    async getCactus() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const records = await pb.collection("products").getFullList({
          filter: 'categoria="cactus"',
          sort: "-created",
        });
        this.cactus = records;
      } catch (error) {
        console.log(error);
      }
    },
    async addCactus() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("foto", this.tempCactus.foto);
        formData.append("nombre", this.tempCactus.nombre);
        formData.append("cantidad", this.tempCactus.cantidad);
        formData.append("precio", this.tempCactus.precio);
        formData.append("categoria", this.tempCactus.categoria);
        const createdRecord = await pb.collection("products").create(formData);
        if (createdRecord) {
          console.log("Add exitoso!");
          console.log("Respuesta => ", createdRecord);
          Notify.create({
            color: "positive",
            message: "Agregado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getCactus();
        this.showDialogC = false;
      } catch (error) {
        console.log("error add file", error);
        Notify.create({
          message: "Error al agregar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async editCactus(id) {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("foto", this.tempCactus.foto);
        formData.append("nombre", this.tempCactus.nombre);
        formData.append("cantidad", this.tempCactus.cantidad);
        formData.append("precio", this.tempCactus.precio);
        formData.append("categoria", this.tempCactus.categoria);
        const updatedRecord = await pb
          .collection("products")
          .update(id, formData);
        if (updatedRecord) {
          console.log("Update exitoso!");
          console.log("Respuesta => ", updatedRecord);
          Notify.create({
            color: "positive",
            message: "Actualizado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getCactus();
        this.showDialogC = false;
      } catch (error) {
        Notify.create({
          message: "Error al actualizar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async deleteCactus(id) {
      try {
        Dialog.create({
          html: true,
          nombre: '<span class="text-red">Eliminar</span>',
          message: "Estas seguro que deseas eliminar el Producto",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const pb = new PocketBase("http://127.0.0.1:8090");
          await pb.collection("products").delete(id);
          Notify.create({
            message: "Eliminado con exito",
            icon: "check",
            color: "positive",
          });
          await this.getCactus();
        });
      } catch (error) {
        Notify.create({
          message: "Error al eliminar",
          icon: "times",
          color: "negative",
        });
      }
    },
    // -----------------------------
    async getAccesorios() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const records = await pb.collection("products").getFullList({
          filter: 'categoria="accesorios"',
          sort: "-created",
        });
        console.log("mi record : ", records);
        this.accesorios = records;
      } catch (error) {
        console.log(error);
      }
    },
    async addAccesorios() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("foto", this.tempAccesorios.foto);
        formData.append("nombre", this.tempAccesorios.nombre);
        formData.append("cantidad", this.tempAccesorios.cantidad);
        formData.append("precio", this.tempAccesorios.precio);
        formData.append("categoria", this.tempAccesorios.categoria);
        const createdRecord = await pb.collection("products").create(formData);
        if (createdRecord) {
          console.log("Add exitoso!");
          console.log("Respuesta => ", createdRecord);
          Notify.create({
            color: "positive",
            message: "Agregado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getAccesorios();
        this.showDialogA = false;
      } catch (error) {
        console.log("error add file", error);
        Notify.create({
          message: "Error al agregar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async editAccesorios(id) {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("foto", this.tempAccesorios.foto);
        formData.append("nombre", this.tempAccesorios.nombre);
        formData.append("cantidad", this.tempAccesorios.cantidad);
        formData.append("precio", this.tempAccesorios.precio);
        formData.append("categoria", this.tempAccesorios.categoria);
        const updatedRecord = await pb
          .collection("products")
          .update(id, formData);
        if (updatedRecord) {
          console.log("Update exitoso!");
          console.log("Respuesta => ", updatedRecord);
          Notify.create({
            color: "positive",
            message: "Actualizado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getAccesorios();
        this.showDialogA = false;
      } catch (error) {
        Notify.create({
          message: "Error al actualizar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async deleteAccesorios(id) {
      try {
        Dialog.create({
          html: true,
          nombre: '<span class="text-red">Eliminar</span>',
          message: "Estas seguro que deseas eliminar el Producto",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const pb = new PocketBase("http://127.0.0.1:8090");
          await pb.collection("products").delete(id);
          Notify.create({
            message: "Eliminado con exito",
            icon: "check",
            color: "positive",
          });
          await this.getAccesorios();
        });
      } catch (error) {
        Notify.create({
          message: "Error al eliminar",
          icon: "times",
          color: "negative",
        });
      }
    },
    // -----------------------------
    async getHerramientas() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const records = await pb.collection("products").getFullList({
          filter: 'categoria="herramientas"',
          sort: "-created",
        });
        this.herramientas = records;
      } catch (error) {
        console.log(error);
      }
    },
    async addHerramientas() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("foto", this.tempHerramientas.foto);
        formData.append("nombre", this.tempHerramientas.nombre);
        formData.append("cantidad", this.tempHerramientas.cantidad);
        formData.append("precio", this.tempHerramientas.precio);
        formData.append("categoria", this.tempHerramientas.categoria);
        const createdRecord = await pb.collection("products").create(formData);
        if (createdRecord) {
          console.log("Add exitoso!");
          console.log("Respuesta => ", createdRecord);
          Notify.create({
            color: "positive",
            message: "Agregado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getHerramientas();
        this.showDialogH = false;
      } catch (error) {
        console.log("error add file", error);
        Notify.create({
          message: "Error al agregar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async editHerramientas(id) {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("foto", this.tempHerramientas.foto);
        formData.append("nombre", this.tempHerramientas.nombre);
        formData.append("cantidad", this.tempHerramientas.cantidad);
        formData.append("precio", this.tempHerramientas.precio);
        formData.append("categoria", this.tempHerramientas.categoria);
        const updatedRecord = await pb
          .collection("products")
          .update(id, formData);
        if (updatedRecord) {
          console.log("Update exitoso!");
          console.log("Respuesta => ", updatedRecord);
          Notify.create({
            color: "positive",
            message: "Actualizado con exito",
            position: "top",
            icon: "check",
          });
        }
        await this.getHerramientas();
        this.showDialogH = false;
      } catch (error) {
        Notify.create({
          message: "Error al actualizar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async deleteHerramientas(id) {
      try {
        Dialog.create({
          html: true,
          nombre: '<span class="text-red">Eliminar</span>',
          message: "Estas seguro que deseas eliminar el Producto",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const pb = new PocketBase("http://127.0.0.1:8090");
          await pb.collection("products").delete(id);
          Notify.create({
            message: "Eliminado con exito",
            icon: "check",
            color: "positive",
          });
          await this.getHerramientas();
        });
      } catch (error) {
        Notify.create({
          message: "Error al eliminar",
          icon: "times",
          color: "negative",
        });
      }
    },
    // -----------------------------
  },
});

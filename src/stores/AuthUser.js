import { defineStore } from "pinia";
import { Notify, Dialog } from "quasar";
import PocketBase from "pocketbase";

export const useAuthUser = defineStore("Auth", {
  state: () => ({
    token: "",
    isAuthenticated: false,
    me: {},

    accesoForm: {
      identity: "",
      password: "",
    },
    crearCuentaForm: {
      name: "",
      username: "",
      email: "",
      emailVisibility: true,
      password: "",
      passwordConfirm: "",
      roles: "user",
      avatar: null,
    },
    users: [],
    tempUsers: {
      avatar: null,
      name: "",
      username: "",
      email: "",
      emailVisibility: true,
      oldPassword: "",
      password: "",
      passwordConfirm: "",
      roles: "user",
    },
    changePass: false,
    showDialogU: false,
    EditU: false,
    AddU: false,
    ViewU: false,
  }),
  actions: {
    async submitAcceso() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const authData = await pb
          .collection("users")
          .authWithPassword(this.accesoForm.identity, this.accesoForm.password);
        this.token = pb.authStore.token;
        this.isAuthenticated = true;
        this.me = authData.record;
        console.log("firstData => ", authData);

        Notify.create({
          icon: "las la-fire-alt",
          position: "top-right",
          message: `Bienvenido ${this.me.username}`,
          color: "success",
        });
        this.accesoForm.identity = "";
        this.accesoForm.password = "";
        this.router.push("/");
      } catch (error) {
        console.log(error);
      }
    },

    async submitlogout() {
      this.token = "";
      this.isAuthenticated = false;
      this.me = {};
    },

    async submitCrearCuenta() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("name", this.crearCuentaForm.name);
        formData.append("username", this.crearCuentaForm.username);
        formData.append("email", this.crearCuentaForm.email);
        formData.append(
          "emailVisibility",
          this.crearCuentaForm.emailVisibility
        );
        formData.append("password", this.crearCuentaForm.password);
        formData.append(
          "passwordConfirm",
          this.crearCuentaForm.passwordConfirm
        );
        formData.append("roles", this.crearCuentaForm.roles);
        formData.append("avatar", this.crearCuentaForm.avatar);
        const response = await pb.collection("users").create(formData);

        if (response) {
          console.log("Registro exitoso!");
          console.log("Respuesta => ", response);
          Notify.create({
            color: "positive",
            message: `Usuario ${this.crearCuentaForm.username} registrado exitosamente`,
            position: "top",
            icon: "check",
          });
          this.crearCuentaForm.name = "";
          this.crearCuentaForm.username = "";
          this.crearCuentaForm.email = "";
          this.crearCuentaForm.password = "";
          this.crearCuentaForm.passwordConfirm = "";
          this.crearCuentaForm.avatar = null;
          this.router.push("/");
          console.log("Redireccionando a la página principal...");
        }
      } catch (error) {
        console.log("MI ERROR Registro: ", error);
        Notify.create({
          color: "negative",
          message: "Error al registrar usuario",
          position: "top",
          icon: "report_problem",
        });
      }
    },

    async refreshAuth() {
      //no
      try {
        const authData = await pb.collection("users").authRefresh();
        console.log("Auth data:", authData);

        // Actualiza el estado de autenticación y los datos del usuario en tu store de Pinia
        this.token = pb.authStore.token;
        this.isAuthenticated = true;
        this.me = authData.model;

        // Verifica que la autenticación sea válida y actualizada
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.model.id);
      } catch (error) {
        console.log("Error al renovar la autenticación:", error);
      }
    },

    // -----------------------------
    async getUsers() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const records = await pb.collection("users").getFullList({
          sort: "-created",
        });
        console.log("mi record : ", records);
        this.users = records;
      } catch (error) {
        console.log(error);
      }
    },
    async addUsers() {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("avatar", this.tempUsers.avatar);
        formData.append("name", this.tempUsers.name);
        formData.append("username", this.tempUsers.username);
        formData.append("email", this.tempUsers.email);
        formData.append("emailVisibility", this.tempUsers.emailVisibility);
        formData.append("password", this.tempUsers.password);
        formData.append("passwordConfirm", this.tempUsers.passwordConfirm);
        formData.append("roles", this.tempUsers.roles);
        const createdRecord = await pb.collection("users").create(formData);
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
        await this.getUsers();
        this.showDialogU = false;
      } catch (error) {
        console.log("error add file", error);
        Notify.create({
          message: "Error al agregar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async editUsers(id) {
      try {
        const pb = new PocketBase("http://127.0.0.1:8090");
        const formData = new FormData();
        formData.append("avatar", this.tempUsers.avatar);
        formData.append("name", this.tempUsers.name);
        formData.append("username", this.tempUsers.username);
        formData.append("email", this.tempUsers.email);
        formData.append("emailVisibility", this.tempUsers.emailVisibility);
        formData.append("roles", this.tempUsers.roles);
        if (this.changePass === true) {
          formData.append("oldPassword", this.tempUsers.oldPassword);
          formData.append("password", this.tempUsers.password);
          formData.append("passwordConfirm", this.tempUsers.passwordConfirm);
        }
        const updatedRecord = await pb.collection("users").update(id, formData);
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
        await this.getUsers();
        this.showDialogU = false;
      } catch (error) {
        Notify.create({
          message: "Error al actualizar",
          icon: "times",
          color: "negative",
        });
      }
    },
    async deleteUsers(id) {
      try {
        Dialog.create({
          html: true,
          title: '<span class="text-red">Eliminar</span>',
          message: "Estas seguro que deseas eliminar el Producto",
          cancel: { color: "positive" },
          ok: { color: "negative" },
          persistent: true,
        }).onOk(async () => {
          const pb = new PocketBase("http://127.0.0.1:8090");
          await pb.collection("users").delete(id);
          Notify.create({
            message: "Eliminado con exito",
            icon: "check",
            color: "positive",
          });
          await this.getUsers();
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

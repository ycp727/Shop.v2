<template>
  <div class="auth-page">
    <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <q-card flat bordered class="my-card">
      <q-card-section v-if="isCuenta">
        <q-form
          @submit.prevent="submitCrearCuenta"
          class="row justify-around q-gutter-xs q-ma-none q-pa-none"
        >
          <p
            class="col-12 text-h5 text-weight-bolder text-center text-dark q-ma-none q-pa-none"
          >
            Crear Cuenta
          </p>
          <q-avatar size="120px" class="shadow-15 q-ma-xs">
            <img :src="imageUrl || 'src/assets/no_user_login.png'" />
          </q-avatar>
          <q-file
            class="col-11"
            filled
            bottom-slots
            v-model="crearCuentaForm.avatar"
            label="Agregar Foto de Perfil"
            counter
            @update:model-value="updateFile()"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="clearPreview"
                class="cursor-pointer"
              />
            </template>
          </q-file>

          <q-input
            class="col-11"
            type="text"
            label="Nombres y Apellidos"
            v-model="crearCuentaForm.name"
            dense
            required
          />
          <q-input
            class="col-11"
            type="text"
            label="Nombre de Usuario"
            v-model="crearCuentaForm.username"
            dense
          />
          <q-input
            class="col-11"
            type="email"
            label="Correo electrónico"
            v-model="crearCuentaForm.email"
            dense
            required
          />
          <q-input
            class="col-5"
            type="password"
            label="Contraseña"
            v-model="crearCuentaForm.password"
            dense
            required
          />
          <q-input
            class="col-5"
            type="password"
            label="Confirmar Contraseña"
            v-model="crearCuentaForm.passwordConfirm"
            dense
            required
          />

          <q-card-section
            class="row q-pa-xs q-gutter-md justify-around"
            vertical
          >
            <q-toggle
              v-model="accept"
              label="Acepto la licencia y los términos"
            />

            <q-btn
              class="col-5"
              type="submit"
              color="positive"
              icon="login"
              label="Crear"
            />
            <q-btn
              class="col-5"
              type="submit"
              color="negative"
              icon="logout"
              label="Regresar"
              to="/"
            />
          </q-card-section>
        </q-form>
      </q-card-section>

      <!-- Acceso -->
      <q-card-section v-else>
        <q-form @submit.prevent="submitAcceso" class="q-gutter-md">
          <p class="col-12 text-h5 text-weight-bolder text-center text-dark">
            Acceso
          </p>
          <q-input
            type="email"
            label="Correo electrónico"
            v-model="accesoForm.identity"
            required
          />
          <q-input
            type="password"
            label="Contraseña"
            v-model="accesoForm.password"
            required
          />
          <q-card-actions vertical>
            <q-btn
              class="q-ma-xs"
              type="submit"
              color="positive"
              icon="login"
              label="Acceso"
            />
            <q-btn
              class="q-ma-xs"
              type="submit"
              color="negative"
              label="Regresar"
              icon="logout"
              to="/"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
      <!-- Crear Cuenta -->
      <q-card-section class="q-pt-none">
        <div v-if="isCuenta" class="text-overline text-center">
          ¿Ya tienes una cuenta?
          <a href="#" @click.prevent="toggleForm(false)">Acceso</a>
        </div>
        <div v-else class="text-overline text-center">
          ¿No tienes una cuenta?
          <a href="#" @click.prevent="toggleForm(true)">Crear Cuenta</a>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthUser } from "src/stores/AuthUser";
import { storeToRefs } from "pinia";

const { submitAcceso, submitCrearCuenta } = useAuthUser();
const { crearCuentaForm, accesoForm } = storeToRefs(useAuthUser());

const accept = ref(false);
const isCuenta = ref(true);

const imageUrl = ref("");
function updateFile() {
  imageUrl.value = URL.createObjectURL(crearCuentaForm.value.avatar);
  console.log("imageUrl: ", imageUrl);
}
function clearPreview() {
  crearCuentaForm.value.avatar = null;
  imageUrl.value = "";
}

function toggleForm(value) {
  isCuenta.value = value;
}
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.my-card {
  width: 100%;
  max-width: 380px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

html {
  height: 100%;
}

body {
  margin: 0;
}

.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, #6c3 50%, rgb(183, 238, 80) 50%);
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.bg3 {
  animation-duration: 5s;
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  left: 50%;
  padding: 10vmin;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes slide {
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
}
</style>

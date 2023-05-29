<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form class="q-gutter-md">
        <q-input
          filled
          v-model="dto.identity"
          label="User name*"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          :type="isPwd ? 'text' : 'password'"
          filled
          v-model="dto.password"
          label="Contraseña"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'No deje en blanco la contraseña',
          ]"
          @keypress.enter.prevent="sendLogin"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn
            label="Acceder"
            type="bottom"
            @click="sendLogin"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            @reset="onReset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/AuthUser";

const { login } = useAuthStore();

const dto = ref({
  identity: "",
  password: "",
});

let isPwd = ref(false);

const sendLogin = async () => {
  await login({ identity: dto.value.identity, password: dto.value.password });
};

const onReset = () => {
  dto.value.identity = null;
  dto.value.password = null;
};
</script>

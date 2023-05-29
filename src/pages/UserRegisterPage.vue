<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form class="q-gutter-md">
        <q-input
          filled
          type="text"
          v-model="dto.name"
          label="Name *"
          lazy-rules
        />
        <q-input
          type="text"
          filled
          v-model="dto.username"
          label="User name *"
        />
        <q-input filled type="email" v-model="dto.email" label="Email *" />
        <q-input
          :type="isPwd ? 'text' : 'password'"
          filled
          v-model="dto.password"
          label="Password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          :type="isPwdC ? 'text' : 'password'"
          filled
          v-model="dto.passwordConfirm"
          label="Password Confirm *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdC ? 'las la-eye-slash' : 'las la-eye'"
              class="cursor-pointer"
              @click="isPwdC = !isPwdC"
            />
          </template>
        </q-input>

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn
            label="Register"
            type="bottom"
            color="primary"
            @click="sendRegister"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @reset="onReset"
          />
        </div>
      </q-form>
    </div>

    {{ dto }}
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/AuthUser";
import { useQuasar } from "quasar";
const $q = useQuasar();

const { register } = useAuthStore();

const dto = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

let accept = ref(false);
let isPwd = ref(false);
let isPwdC = ref(false);

const sendRegister = async () => {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    const { resp } = await register({
      name: dto.value.name,
      username: dto.value.username,
      email: dto.value.email,
      password: dto.value.password,
      passwordConfirm: dto.value.passwordConfirm,
      emailVisibility: true,
    });
    console.log("Datos: ", resp);
    console.log("dto: ", dto.value.name);
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
};

const onReset = () => {
  (dto.value.name = null),
    (dto.value.username = null),
    (dto.value.email = null),
    (dto.value.password = null),
    (dto.value.passwordConfirm = null);
};
</script>

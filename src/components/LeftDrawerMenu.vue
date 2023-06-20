<template>
  <div class="q-ma">
    <q-list bordered class="rounded-borders">
      <q-item clickable v-ripple to="/">
        <q-item-section avatar>
          <q-icon color="primary" name="home" />
        </q-item-section>

        <q-item-section class="text-primary">Inicio</q-item-section>
      </q-item>

      <q-expansion-item
        expand-separator
        default-opened
        icon="store"
        expand-icon-class="text-secondary"
        header-class="text-primary"
        label="Productos"
        caption="por categorias"
      >
        <q-item clickable v-ripple to="/cactus">
          <q-item-section avatar> </q-item-section>

          <q-item-section class="text-secondary">Cactus</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/herramientas">
          <q-item-section avatar> </q-item-section>

          <q-item-section class="text-secondary">Herramientas</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/accesorios">
          <q-item-section avatar> </q-item-section>

          <q-item-section class="text-secondary">Accesorios</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-item clickable v-ripple to="sobrenosotros">
        <q-item-section avatar>
          <q-icon color="primary" name="contact_support" />
        </q-item-section>

        <q-item-section class="text-primary">Sobre nosotros</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="preguntasfrecuentes">
        <q-item-section avatar>
          <q-icon color="primary" name="policy" />
        </q-item-section>

        <q-item-section class="text-primary"
          >Preguntas frecuentes</q-item-section
        >
      </q-item>

      <q-item clickable v-ripple to="contacto">
        <q-item-section avatar>
          <q-icon color="primary" name="contact_page" />
        </q-item-section>

        <q-item-section class="text-primary">Contacto</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LeftDrawerMenu",
  setup() {
    const inset = ref(1);
    return {
      inset,
    };
  },
};
</script>

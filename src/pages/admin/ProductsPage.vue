<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Seleccione la categoria para Editar
      </h5>
      <q-select
        class="col-6"
        label="Categorías"
        transition-show="scale"
        transition-hide="scale"
        bg-color="positive"
        rounded
        standout
        v-model="cat"
        :options="options"
        style="width: 200px"
      />
    </div>
    <!-- content -->
    <tableAccesoriosVue v-if="cat === 'Accesorios'" />
    <tableCactusVue v-if="cat === 'Cactus'" />
    <tableHerramientasVue v-if="cat === 'Herramientas'" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import tableAccesoriosVue from "src/components/tableAccesorios.vue";
import tableCactusVue from "src/components/tableCactus.vue";
import tableHerramientasVue from "src/components/tableHerramientas.vue";

const cat = ref("Accesorios");
const options = ["Accesorios", "Cactus", "Herramientas"];
</script>

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
    <table-Accesorios v-if="cat === 'Accesorios'" />
    <table-Cactus v-if="cat === 'Cactus'" />
    <table-Herramientas v-if="cat === 'Herramientas'" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import TableAccesorios from "src/components/tableAccesorios.vue";
import TableCactus from "src/components/tableCactus.vue";
import TableHerramientas from "src/components/tableHerramientas.vue";

const cat = ref("Accesorios");
const options = ["Accesorios", "Cactus", "Herramientas"];
</script>

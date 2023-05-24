<template>
  <div class="q-pa-md">
    <q-table
      class="mytable"
      :rows="products.items"
      :columns="columnsproducts"
      :filter="filter"
      row-key="id"
      no-data-label="No encontre nada para ti"
      no-results-label="El filtro no descubrió ningún resultado."
      flat
      dense
      bordered
      separator="cell"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title text-white">Productos</div>
        <q-space />
        <q-input
          rounded
          standout="bg-teal-3 text-white"
          dark
          dense
          input-class="text-right"
          debounce="300"
          color="teal-3"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon v-if="filter === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="filter = ''"
            />
          </template>
        </q-input>
        <q-btn
          flat
          unelevated
          fab-mini
          color="white"
          icon="add"
          type="submit"
          label="Agregar"
          @click="openAddDialog(props.row)"
          class="q-ml-md"
        />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-img :src="props.row.image" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="accent"
            icon="visibility"
            @click="openViewDialog(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete"
            @click="deleteProducts(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="showDialogF" persistent>
      <q-card class="cartel row justify-center">
        <q-card-section>
          <q-form>
            <q-input bottom-slots v-model="tempProducts.foto" label="Imagen">
              <template v-slot:before>
                <q-avatar>
                  <q-img v-if="tempProducts.foto" :src="tempProducts.foto" />
                </q-avatar>
              </template>
            </q-input>
            <q-input v-model="tempProducts.nombre" label="Nombre" />
            <q-input
              v-model="tempProducts.precio"
              label="Precio"
              type="number"
            />
            <q-input
              v-model="tempProducts.fechaCaducidad"
              type="date"
              label="Fecha de Caducidad"
            />
            <q-input
              v-model="tempProducts.fechaVenta"
              type="date"
              label="Fecha de Venta"
            />
            <q-select
              v-model="tempProducts.categoria"
              label="categoria"
              :options="[
                'Cactus',
                'Macetas',
                'Estantes',
                'Herramientas',
                'Fertilizantes',
              ]"
            />
            <q-input
              v-model="tempProducts.cantidad"
              label="Cantidad"
              type="number"
            />
            <div class="q-mt-md q-gutter-xs">
              <q-btn
                type="submit"
                label="Guardar"
                color="primary"
                v-if="showEditDialog == true"
                @click="editProducts(tempProducts.id)"
              />
              <q-btn
                type="submit"
                label="Añadir"
                color="primary"
                v-if="showAddDialog == true"
                @click="addProducts(tempProducts)"
              />
              <q-btn label="Cancelar" @click="showDialogF = false" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showcardDialog" persistent>
      <q-card class="cartel row justify-center">
        <q-card-section>
          <q-form>
            <q-input bottom-slots v-model="tempProducts.foto" label="Imagen">
              <template v-slot:before>
                <q-avatar>
                  <q-img v-if="tempProducts.foto" :src="tempProducts.foto" />
                </q-avatar>
              </template>
            </q-input>
            <q-input v-model="tempProducts.nombre" label="Nombre" />
            <q-input
              v-model="tempProducts.precio"
              label="Precio"
              type="number"
            />
            <q-input
              v-model="tempProducts.fechaCaducidad"
              type="date"
              label="Fecha de Caducidad"
            />
            <q-input
              v-model="tempProducts.fechaVenta"
              type="date"
              label="Fecha de Venta"
            />
            <q-select
              v-model="tempProducts.categoria"
              label="categoria"
              :options="[
                'Cactus',
                'Macetas',
                'Estantes',
                'Herramientas',
                'Fertilizantes',
              ]"
            />
            <q-input
              v-model="tempProducts.cantidad"
              label="Cantidad"
              type="number"
            />
            <div class="q-mt-md q-gutter-xs">
              <q-btn
                type="submit"
                label="Guardar"
                color="primary"
                v-if="showEditDialog == true"
                @click="editProducts(tempProducts.id)"
              />
              <q-btn
                type="submit"
                label="Añadir"
                color="primary"
                v-if="showAddDialog == true"
                @click="addProducts(tempProducts)"
              />
              <q-btn label="Cancelar" @click="showDialogF = false" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useStockProductsStore } from "src/stores/StockProducts";
import { storeToRefs } from "pinia";

const { getProducts, addProducts, editProducts, deleteProducts } =
  useStockProductsStore();
const { products, showAddDialog } = storeToRefs(useStockProductsStore());

onMounted(async () => {
  await getProducts();
});

const filter = ref("");
const showDialogF = ref(false);
const showcardDialogF = ref(false);
const showEditDialog = ref(false);
const tempProducts = ref({});

const columnsproducts = [
  {
    name: "id",
    required: true,
    label: "Id",
    align: "left",
    field: (row) => row.id,
    sortable: true,
  },
  { name: "foto", label: "Imagen", field: "foto", align: "center" },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.nombre,
    sortable: true,
  },

  {
    name: "precio",
    label: "Precio",
    field: "precio",
    format: (val) => `${val}`,
    align: "center",
    sortable: true,
  },
  {
    name: "fechaCaducidad",
    label: "Fecha de Caducidad",
    field: "fechaCaducidad",
    align: "center",
    sortable: true,
  },
  {
    name: "fechaVenta",
    label: "Fecha de Venta",
    field: "fechaVenta",
    align: "center",
    sortable: true,
  },
  {
    name: "categoria",
    label: "Categoria",
    field: "categoria",
    align: "center",
    sortable: true,
  },
  {
    name: "cantidad",
    label: "Cantidad",
    field: "cantidad",
    align: "center",
    sortable: true,
  },
  { name: "actions", label: "Acciones", align: "center" },
];

const openViewDialog = (row) => {
  tempProducts.value = { ...row };
  showcardDialogF.value = true;
};
const openEditDialog = (row) => {
  tempProducts.value = { ...row };
  showAddDialog.value = false;
  showEditDialog.value = true;
  showDialogF.value = true;
};
const openAddDialog = () => {
  tempProducts.value = {};
  showAddDialog.value = true;
  showEditDialog.value = false;
  showDialogF.value = true;
};
</script>
<style lang="scss">
.mytable {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #9c27b0;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
    &.q-table--loading thead tr:last-child th {
      top: 48px;
    }
  }
  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
  tbody {
    scroll-margin-top: 48px;
  }
}
</style>

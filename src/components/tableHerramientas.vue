<template>
  <div class="q-pa-md">
    <q-table
      class="catprod2"
      :rows="herramientas"
      :columns="columnsHerramientas"
      :filter="filter"
      row-key="id"
      rows-per-page-label="Productos a Mostrar"
      no-data-label="No encontre nada para ti"
      no-results-label="El filtro no descubrió ningún resultado."
      flat
      dense
      bordered
      separator="cell"
    >
      <template v-slot:top="props">
        <div class="col-5 q-table__title text-white">Herramientas</div>
        <q-space />
        <q-input
          rounded
          standout="bg-teal-5 text-white"
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
          icon="add"
          type="submit"
          label="Agregar"
          @click="openAddDialog(props.row)"
          class="q-ml-md btn-agregar"
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
      <template v-slot:body-cell-foto="props">
        <q-td :props="props">
          <q-img
            :src="
              getImageURL(
                props.row.collectionName,
                props.row.id,
                props.row.foto
              )
            "
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            class="icon-ver"
            color="accent"
            icon="visibility"
            @click="openViewDialog(props.row)"
          />
          <q-btn
            flat
            round
            dense
            class="icon-edit"
            color="primary"
            icon="edit"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            flat
            round
            dense
            class="icon-delete"
            color="negative"
            icon="delete"
            @click="deleteHerramientas(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <!-- Añadir - Editar -->
    <q-dialog v-model="showDialogH" persistent>
      <q-card class="addedit">
        <q-card-section>
          <q-form class="justify-center">
            <q-file
              class="col-10"
              filled
              bottom-slots
              v-model="tempHerramientas.foto"
              label="Agregar Foto del Producto"
              counter
              @update:model-value="updateFile()"
            >
              <template v-slot:before>
                <q-avatar
                  size="100px"
                  style="transform: translateY(-250%) translateX(-50%)"
                  class="absolute-center shadow-10"
                >
                  <img
                    :src="
                      imageUrl ||
                      getImageURL(
                        tempHerramientas.collectionName,
                        tempHerramientas.id,
                        tempHerramientas.foto
                      )
                    "
                  />
                </q-avatar>
              </template>
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="clearPreview()"
                  class="cursor-pointer"
                />
              </template>
            </q-file>
            <q-input
              class="col-12"
              v-model="tempHerramientas.nombre"
              type="text"
              label="Nombre"
            />
            <div class="row q-col-gutter-xs justify-between">
              <q-input
                class="col-12"
                v-model="tempHerramientas.cantidad"
                type="number"
                label="Cantidad"
              />
              <q-input
                class="col-12"
                v-model="tempHerramientas.precio"
                type="number"
                label="Precio"
              />
            </div>
            <div class="q-mt-xs row q-gutter-xs justify-center">
              <q-btn
                class="col-4"
                type="submit"
                label="Guardar"
                color="positive"
                v-if="EditH"
                @click="editHerramientas(tempHerramientas.id)"
              />
              <q-btn
                class="col-4"
                type="submit"
                label="Añadir"
                color="positive"
                v-if="AddH"
                @click="addHerramientas(tempHerramientas)"
              />
              <q-btn
                class="col-4"
                color="negative"
                label="Cancelar"
                @click="showDialogH = false"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Ver -->
    <q-dialog v-model="ViewH">
      <q-card class="my-cardroot">
        <q-card>
          <q-img
            class=""
            fit="cover"
            :src="
              getImageURL(
                tempHerramientas.collectionName,
                tempHerramientas.id,
                tempHerramientas.foto
              )
            "
            :alt="tempHerramientas.nombre"
          />

          <q-card-section>
            <div class="row no-wrap items-center">
              <q-item-label header="" class="col text-h3" align="center">
                {{ tempHerramientas.nombre }}
              </q-item-label>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row no-wrap items-center">
              <q-item-label header="" class="col text-h5" align="center">
                precio ${{ tempHerramientas.precio }}
              </q-item-label>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row no-wrap items-center">
              <q-item-label header="" class="col text-h5" align="center">
                cantidad {{ tempHerramientas.cantidad }}
              </q-item-label>
            </div>
          </q-card-section>
        </q-card>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useStockProducts } from "src/stores/StockProducts";
import { useScriptStore } from "src/stores/ScriptStore";

const { getImageURL } = useScriptStore();
const {
  getHerramientas,
  addHerramientas,
  editHerramientas,
  deleteHerramientas,
} = useStockProducts();
const { herramientas, tempHerramientas, AddH, EditH, ViewH, showDialogH } =
  storeToRefs(useStockProducts());

const filter = ref("");
const stars = ref(0);
const columnsHerramientas = [
  {
    name: "foto",
    label: "Foto",
    field: "foto",
    align: "center",
    autoWidth: true,
  },
  {
    name: "nombre",
    label: "Nombre",
    field: "nombre",
    align: "left",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  {
    name: "cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  {
    name: "precio",
    align: "center",
    label: "Precio",
    field: "precio",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
];

onMounted(async () => {
  await getHerramientas();
});

const openViewDialog = (row) => {
  tempHerramientas.value = { ...row };
  ViewH.value = true;
};
const openEditDialog = (row) => {
  tempHerramientas.value = { ...row };
  AddH.value = false;
  EditH.value = true;
  showDialogH.value = true;
};
const openAddDialog = () => {
  clearPreview();
  AddH.value = true;
  EditH.value = false;
  showDialogH.value = true;
};
const imageUrl = ref("");
function updateFile() {
  imageUrl.value = URL.createObjectURL(tempHerramientas.value.foto);
  console.log("imageUrl: ", imageUrl.value);
}
function clearPreview() {
  tempHerramientas.value.foto = null;
  tempHerramientas.value.nombre = "";
  tempHerramientas.value.precio = null;
  tempHerramientas.value.cantidad = null;
  imageUrl.value = "";
}
</script>

<style lang="scss">
.catprod2 {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #89e190;
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
.my-cardroot {
  padding: 200px, 850px;
  max-width: 350px;
  background: rgba(255, 255, 255, 0.614);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.addedit {
  padding: 200px, 850px;
  max-width: 350px;
  background: rgba(255, 255, 255, 0.614);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.q-badge {
  padding: 200px, 850px;
  max-width: 350px;
  background: rgba(255, 255, 255, 0.614);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.icon-ver {
  background-color: #fff;
  color: #007bff;
}
.icon-ver:hover {
  background-color: #007bff;
  color: #fff;
}
.icon-edit {
  background-color: #fff;
  color: #26ab9d;
}
.icon-edit:hover {
  background-color: #26ab9d;
  color: #fff;
}
.icon-delete {
  background-color: #fff;
  color: #d32f2f;
}
.icon-delete:hover {
  background-color: #d32f2f;
  color: #fff;
}
.btn-agregar {
  background-color: #fff;
  color: #26ab9d;
}
.btn-agregar:hover {
  background-color: #26ab9d;
  color: #fff;
}
</style>

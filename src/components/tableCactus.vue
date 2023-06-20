<template>
  <div class="q-pa-md">
    <q-table
      class="catprod2"
      :rows="cactus"
      :columns="columnscactus"
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
        <div class="col-2 q-table__title text-white">Cactus</div>
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
            @click="deleteCactus(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <!-- Añadir - EditCr -->
    <q-dialog v-model="showDialogC" persistent>
      <q-card class="addedit">
        <q-card-section>
          <q-form class="justify-center">
            <q-img
              fit="cover"
              :src="
                imageUrl ||
                getImageURL(
                  tempCactus.collectionName,
                  tempCactus.id,
                  tempCactus.foto
                )
              "
            />
            <q-file
              class="col-10"
              filled
              bottom-slots
              v-model="tempCactus.foto"
              label="Foto"
              counter
              @update:model-value="updateFile()"
            >
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
              v-model="tempCactus.nombre"
              type="text"
              label="Nombre"
            />
            <div class="row q-col-gutter-xs justify-between">
              <q-input
                class="col-12"
                v-model="tempCactus.precio"
                type="number"
                label="Precio"
              />
            </div>
            <q-input
              class="col-12"
              v-model="tempCactus.cantidad"
              type="number"
              label="Cantidad"
            />
            <div class="q-mt-xs row q-gutter-xs justify-center">
              <q-btn
                class="col-4"
                type="submit"
                label="Guardar"
                color="positive"
                v-if="EditC"
                @click="editCactus(tempCactus.id)"
              />
              <q-btn
                class="col-4"
                type="submit"
                label="Añadir"
                color="positive"
                v-if="AddC"
                @click="addCactus(tempCactus)"
              />
              <q-btn
                class="col-4"
                color="negative"
                label="Cancelar"
                @click="showDialogC = false"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Ver -->
    <q-dialog v-model="ViewC">
      <q-card class="my-cardroot">
        <q-card>
          <q-img
            class=""
            fit="cover"
            :src="
              getImageURL(
                tempCactus.collectionName,
                tempCactus.id,
                tempCactus.foto
              )
            "
            :alt="tempCactus.nombre"
          />
          <q-card-section>
            <div class="row no-wrap items-center">
              <q-item-label header="" class="col text-h6 ellipsis">
                {{ tempCactus.nombre }}
              </q-item-label>
              <div
                class="col-auto text-grey text-caption row no-wrap items-center"
              >
                Comprar
              </div>
            </div>
            <div align="center">
              <q-rating
                v-model="stars"
                icon="star_border"
                icon-selected="star"
                :max="5"
                size="1.5em"
                v-if="tempCactus.rating"
                :value="tempCactus.rating"
                :readonly="false"
              />
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle1 text-right">
              $ {{ tempCactus.precio }}
            </div>
            <div class="text-caption text-grey text-center">
              {{ tempCactus.cantidad }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions vertical align="center"> </q-card-actions>
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
const { getCactus, getAccesorios, addCactus, editCactus, deleteCactus } =
  useStockProducts();
const { cactus, accesorios, tempCactus, AddC, EditC, ViewC, showDialogC } =
  storeToRefs(useStockProducts());

const filter = ref("");
const stars = ref(0);
const columnscactus = [
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
    name: "precio",
    align: "center",
    label: "Precio",
    field: "precio",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  {
    name: "cantidad",
    align: "left",
    label: "Cantidad",
    field: "cantidad",
    classes: "ellipsis",
    style: "max-width: 250px",
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
];

onMounted(async () => {
  await getCactus();
  await getAccesorios();
});

const openViewDialog = (row) => {
  tempCactus.value = { ...row };
  ViewC.value = true;
};
const openEditDialog = (row) => {
  tempCactus.value = { ...row };
  AddC.value = false;
  EditC.value = true;
  showDialogC.value = true;
};
const openAddDialog = () => {
  clearPreview();
  AddC.value = true;
  EditC.value = false;
  showDialogC.value = true;
};
const imageUrl = ref("");
function updateFile() {
  imageUrl.value = URL.createObjectURL(tempCactus.value.foto);
  console.log("imageUrl: ", imageUrl.value);
}
function clearPreview() {
  tempCactus.value.foto = null;
  tempCactus.value.nombre = "";
  tempCactus.value.cantidad = "";
  tempCactus.value.precio = null;
  tempCactus.value.available = true;
  tempCactus.value.rating = null;
  tempCactus.value.discount = null;
  imageUrl.value = "";
}
</script>
<style lang="scss">
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
.my-cardroot {
  width: 800px;
  padding: 2%;
}
.addedit {
  max-width: 800px;
  padding: 2%;
}
.q-badge {
  margin-right: 8px;
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

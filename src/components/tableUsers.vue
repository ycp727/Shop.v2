<template>
  <div class="q-pa-md">
    <q-table
      class="catuse"
      :rows="users"
      :columns="columnsusers"
      :filter="filter"
      :rows-per-page-options="[7, 12, 15, 25]"
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
        <div class="col-2 q-table__title text-white">Usuarios del Sistema</div>
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
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-img
            :src="
              getImageURL(
                props.row.collectionName,
                props.row.id,
                props.row.avatar
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
            @click="deleteUsers(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <!-- Añadir - Editar -->
    <q-dialog v-model="showDialogU" persistent>
      <q-card class="addedit">
        <q-card-section>
          <q-form class="justify-center">
            <q-file
              class="col-10"
              filled
              bottom-slots
              v-model="tempUsers.avatar"
              label="Imagen"
              counter
              @update:model-value="updateFile()"
            >
              <template v-slot:before>
                <q-avatar size="100px">
                  <img
                    :src="
                      imageUrl ||
                      getImageURL(
                        tempUsers.collectionName,
                        tempUsers.id,
                        tempUsers.avatar
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
            <div class="row q-col-gutter-xs justify-center">
              <q-input
                class="col-6"
                v-model="tempUsers.name"
                type="text"
                label="Nombre"
              />
              <q-input
                class="col-6"
                v-model="tempUsers.username"
                type="text"
                label="Usuario"
              />
              <q-input
                class="col-8"
                v-model="tempUsers.email"
                type="text"
                label="Correo Electrónico"
              />
              <q-select
                class="col-4"
                v-model="tempUsers.roles"
                label="Rol"
                :options="['admin', 'user']"
              />
              <q-checkbox
                left-label
                v-if="EditU"
                v-model="changePass"
                label="Cambiar Contraseña"
              />
              <q-input
                v-if="changePass"
                class="col-8"
                v-model="tempUsers.oldPassword"
                type="password"
                label="Contraseña Anterior"
              />
              <q-input
                v-if="changePass || AddU"
                class="col-6"
                v-model="tempUsers.password"
                type="password"
                label="Contraseña"
              />
              <q-input
                v-if="changePass || AddU"
                class="col-6"
                v-model="tempUsers.passwordConfirm"
                type="password"
                label="Contraseña Confirmación"
              />
            </div>
            <div class="q-mt-lg row q-gutter-xs justify-center">
              <q-btn
                class="col-4"
                type="submit"
                label="Guardar"
                color="positive"
                v-if="EditU"
                @click="editUsers(tempUsers.id)"
              />
              <q-btn
                class="col-4"
                type="submit"
                label="Añadir"
                color="positive"
                v-if="AddU"
                @click="addUsers(tempUsers)"
              />
              <q-btn
                class="col-4"
                color="negative"
                label="Cancelar"
                @click="showDialogU = false"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Ver -->
    <q-dialog v-model="ViewU">
      <q-card class="my-cardroot">
        <q-img
          class=""
          :ratio="16 / 9"
          fit="contain"
          :src="
            getImageURL(
              tempUsers.collectionName,
              tempUsers.id,
              tempUsers.avatar
            )
          "
          :alt="tempUsers.avatar"
        />
        <q-card-section>
          <q-item-section class="text-h6 ellipsis">
            <q-item-label overline>ID:</q-item-label>
            <q-item-label>{{ tempUsers.id }}</q-item-label>
            <q-item-label overline>Nombre:</q-item-label>
            <q-item-label>{{ tempUsers.name }}</q-item-label>
            <q-item-label overline>Usuario:</q-item-label>
            <q-item-label>{{ tempUsers.username }}</q-item-label>
            <q-item-label overline>Correo Electronico:</q-item-label>
            <q-item-label>{{ tempUsers.email }}</q-item-label>
            <q-item-label overline>Rol:</q-item-label>
            <q-item-label>{{ tempUsers.roles }}</q-item-label>
          </q-item-section>
          <q-card-section>
            <q-item-section class="col text-subtitle1 ellipsis">
              <q-item-label overline>Creado:</q-item-label>
              <q-item-label>{{ tempUsers.created }}</q-item-label>
              <q-item-label overline>Ultima Actualización:</q-item-label>
              <q-item-label>{{ tempUsers.updated }}</q-item-label>
            </q-item-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthUser } from "src/stores/AuthUser";
import { useScriptStore } from "src/stores/ScriptStore";

const { getImageURL } = useScriptStore();
const { getUsers, addUsers, editUsers, deleteUsers } = useAuthUser();
const { users, tempUsers, AddU, EditU, ViewU, showDialogU, changePass } =
  storeToRefs(useAuthUser());

const filter = ref("");
const columnsusers = [
  {
    name: "id",
    required: true,
    label: "Id",
    align: "center",
    field: (row) => row.id,
    sortable: true,
    classes: "ellipsis",
    style: "max-width: 100px",
  },
  {
    name: "avatar",
    label: "Avatar",
    field: "avatar",
    align: "center",
    autoWidth: true,
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "left",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  {
    name: "username",
    label: "Usuario",
    field: "username",
    align: "center",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  {
    name: "email",
    label: "Correo Electrónico",
    field: "email",
    align: "center",
    required: true,
    sortable: true,
    autoWidth: true,
  },
  {
    name: "roles",
    label: "Rol",
    field: "roles",
    align: "center",
    sortable: true,
    autoWidth: true,
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
];

onMounted(async () => {
  await getUsers();
});

const openViewDialog = (row) => {
  tempUsers.value = { ...row };
  ViewU.value = true;
};
const openEditDialog = (row) => {
  changePass.value = false;
  tempUsers.value = { ...row };
  tempUsers.value.oldPassword = "";
  tempUsers.value.password = "";
  tempUsers.value.passwordConfirm = "";
  AddU.value = false;
  EditU.value = true;
  showDialogU.value = true;
};
const openAddDialog = () => {
  clearPreview();
  AddU.value = true;
  EditU.value = false;
  showDialogU.value = true;
};
const imageUrl = ref("");
function updateFile() {
  imageUrl.value = URL.createObjectURL(tempUsers.value.avatar);
  console.log("imageUrl: ", imageUrl.value);
}
function clearPreview() {
  tempUsers.value.avatar = null;
  tempUsers.value.name = "";
  tempUsers.value.username = "";
  tempUsers.value.email = "";
  tempUsers.value.oldPassword = "";
  tempUsers.value.password = "";
  tempUsers.value.passwordConfirm = "";
  tempUsers.value.roles = "user";
  imageUrl.value = "";
}
</script>

<style lang="scss">
.catuse {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #aa4f6e;
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
  width: 310px;
  max-height: 650px;
  padding: 0.2%;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.addedit {
  width: 500px;
  padding: 2%;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.q-badge {
  margin-right: 8px;
}
</style>

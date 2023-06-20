<template>
  <div class="q-pa-none q-ma-none">
    <!-- hide-bottom -->
    <q-table
      hide-header
      flat
      bordered
      dense
      wrap-cells
      table-colspan
      title="Carrito de Compras"
      :rows="cart"
      :columns="columnscart"
      row-key="id"
      class="my-sticky-header-table"
      no-data-label="No encontre nada para ti"
    >
      <template v-slot:top>
        <div class="justify-center row">
          <p class="q-pa-xs col-12 text-center carrito-titulo">
            Carrito de Compras
          </p>
          <div class="q-gutter-xs">
            <q-btn
              dense
              color="negative"
              :disable="loading || carrito.length === 0"
              label="Vaciar"
              @click="CleanCart()"
            />
            <q-btn
              dense
              color="positive"
              :disable="loading || carrito.length === 0"
              label="Comprar"
              @click="BuyNow()"
            />
            <q-btn
              dense
              icon="update"
              color="info"
              @click="actualizarCarrito"
            />
          </div>
        </div>
      </template>

      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar>
            <img fit="cover" :ratio="1" :src="props.row.image" />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete"
            @click="deletecarrito(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useAuthStore } from "src/stores/AuthStore";
import { useCartStore } from "src/stores/CartStore";

const { getCartByID, BuyNow, CleanCart, deleteItemCart } = useCartStore();
const { cart } = storeToRefs(useCartStore());
const { me } = storeToRefs(useAuthStore());

onMounted(async () => {
  if (me.value !== null) {
    // await getUser();
    // await getCartByID(me.value.id);
  }
});

const loading = ref(false);
const columnscart = [
  { name: "image", align: "center", label: "image", field: "image" },
  {
    name: "title",
    align: "center",
    label: "title",
    field: "title",
    sortable: true,
  },
  { name: "price", label: "price", field: "price", sortable: true },
  { name: "actions", label: "actions", field: "actions" },
];

const actualizarCarrito = async () => {
  await getCartByID(me?.value.id);
};
</script>
<style lang="scss">
.carrito-titulo {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 1);
}

.my-sticky-header-table {
  /* height or max-height is important */
  height: 560px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #26a69a;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }

  /* prevent scrolling behind sticky top row on focus */
  tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px;
  }
}
</style>

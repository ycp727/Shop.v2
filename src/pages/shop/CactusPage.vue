<template>
  <div class="fit row wrap justify-center items-center content-center">
    <!-- barra de busqueda -->
    <div class="col-8 q-pa-lg flex-center">
      <q-input
        dense
        standout="bg-primary text-white"
        rounded
        type="search"
        placeholder="Buscar"
        v-model="search"
        input-class="text-right"
        class="q-ml-xs"
      >
        <template v-slot:append>
          <q-icon v-if="search === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="search = ''"
          />
        </template>
      </q-input>
    </div>

    <!-- lista de cards -->
    <div
      class="row q-gutter-md justify-evenly items-center content-center col-11"
    >
      <q-card
        class="my-card"
        v-for="item in displayedItems"
        :key="item.id"
        @mouseover="hoveredCard = item.id"
        @mouseleave="hoveredCard = null"
        :class="{ 'shadow-2': hoveredCard === item.id }"
      >
        <q-img
          class="q-img"
          :src="getImageURL(item.collectionName, item.id, item.foto)"
          :alt="item.nombre"
        />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="shopping_bag"
            class="absolute"
            :disabled="!me?.id"
            style="top: 0; right: 12px; transform: translateY(-50%)"
            @click="buyProduct(item.id)"
          />

          <div class="row no-wrap items-center">
            <q-item-label header="" class="col text-h4 ellipsis">
              {{ item.nombre }}
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
              v-if="item.rating"
              :value="item.rating"
              :readonly="false"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h4 text-right">$ {{ item.precio }}</div>
          <div class="text-h5 text-grey text-center">
            Stock {{ item.cantidad }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions vertical align="center">
          <q-btn
            flat
            icon="shopping_cart"
            color="primary"
            label="Agregar al carrito"
            :disabled="!me.id"
            @click="addToCart(item)"
          />
        </q-card-actions>
      </q-card>
    </div>
    <!-- paginacion -->
    <div class="col-4 q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        :min="1"
        :max="totalPages"
        color="primary"
        size="md"
        input
        input-class="secondary"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useAuthUser } from "src/stores/AuthUser";
import { useScriptStore } from "src/stores/ScriptStore";
import { useStockProducts } from "src/stores/StockProducts";

const $q = useQuasar();

const { getImageURL } = useScriptStore();
const { putToCart, getCartByID, getCactus } = useStockProducts();
const { me } = storeToRefs(useAuthUser());
const { cactus } = storeToRefs(useStockProducts());

onMounted(async () => {
  await getCactus();
});

const search = ref("");
const stars = ref(0);
const hoveredCard = ref(null);
const currentPage = ref(1);
const perPage = ref(6);
const maxPrice = ref(Infinity);

const filteredItems = computed(() => {
  return cactus.value.filter((item) => {
    const matchTitle = item.nombre
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchPrice =
      maxPrice.value === Infinity || item.precio <= maxPrice.value;
    return matchTitle && matchPrice;
  });
});
const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = startIndex + perPage.value;
  return filteredItems.value.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / perPage.value);
});

const addToCart = async (item) => {
  try {
    const dto = {
      idusers: me.value?.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      foto: item.foto,
      precio: item.precio,
      cantidad: item.cantidad,
    };
    await putToCart(dto);
    await getCartByID(me.value?.id);
    $q.notify({
      message: "Agregado con exito",
      icon: "check",
      color: "positive",
    });
  } catch (error) {
    $q.notify({
      message: "Error al agregar",
      icon: "times",
      color: "negative",
    });
  }
};

const buyProduct = (id) => {
  console.log(id);
};
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
  max-width: 300px;
  transition: box-shadow 0.2s ease-in-out;
}
.q-img {
  height: 350px;
  object-fit: cover;
}
.shadow-2 {
  box-shadow: 0px 0px 10px 2px #00000033;
  transform: translateY(-5px);
}
.q-badge {
  margin-right: 8px;
}
</style>

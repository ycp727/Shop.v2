<template>
  <q-page padding>
    <div class="row q-col-gutter-sm q-py-sm mycard">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card
          class="q-ma-xs no-shadow"
          bordered
          style="background-color: #38b1c5"
        >
          <q-card-section class="text-h6 text-white">
            Today's View
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card
          class="q-ma-xs no-shadow"
          bordered
          style="background-color: #ea4b64"
        >
          <q-card-section class="text-h6 text-white">
            Daily Sales
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card
          class="q-ma-xs no-shadow"
          bordered
          style="background-color: #1e88e5"
        >
          <q-card-section class="text-h6 text-white">
            Today's User Visit
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-space />

          <q-btn
            color="grey"
            flat
            dense
            label="Leer Más"
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const expanded = ref(false);
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <q-layout view="hHh Lpr fFr">
    <q-header reveal elevated class="bg-secondary text-white">
      <q-toolbar class="row justify-between">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="col-3">
          <q-avatar>
            <img src="~/assets/Cactus.png" />
          </q-avatar>
          Cactus
        </q-toolbar-title>
        <div class="row col justify-end items-center content-end">
          <q-btn
            dense
            stretch
            unelevated
            padding="2px"
            icon-right="settings_applications"
            to="/admin/dashboard"
            v-if="me.roles === 'admin'"
          />
          <q-btn
            unelevated
            dense
            padding="5px"
            label="Iniciar sesión"
            to="login"
            v-if="!me || Object.keys(me).length === 0"
          >
            <q-avatar size="42px" class="q-ml-xs">
              <img fit="fill" src="~/assets/no_user_login.png" />
            </q-avatar>
          </q-btn>
          <q-btn-dropdown
            v-if="me.id"
            dense
            stretch
            unelevated
            padding="5px"
            :label="me?.email"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Ajustes</div>

                <q-list>
                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="account_circle" />
                    </q-item-section>
                    <q-item-section>Cambiar Foto de Perfil</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon color="primary" name="password" />
                    </q-item-section>
                    <q-item-section>Cambiar Contraseña</q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img
                    :src="getImageURL(me.collectionName, me.id, me.avatar)"
                  />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ me?.username }}
                </div>

                <q-btn
                  color="primary"
                  label="Salir"
                  push
                  size="sm"
                  @click="submitlogout()"
                  v-close-popup
                />
              </div>
            </div>
          </q-btn-dropdown>

          <q-btn
            dense
            stretch
            unelevated
            padding="5px"
            label="Ver compra"
            icon-right="shopping_cart"
            @click="toggleRightDrawer"
          >
            <q-badge
              style="margin-top: 0.3rem"
              floating
              transparent
              color="red"
              >{{ carritoCantidad }}</q-badge
            >
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <LeftDrawerMenu />
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <RightDrawerMenu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated class="row bg-dark text-white q-pa-xs">
      <q-toolbar>
        <q-toolbar-title>
          <div class="col-2 q-pa-xs">
            <q-avatar>
              <img src="~/assets/Cactus.png" />
            </q-avatar>
          </div>
        </q-toolbar-title>
        <div class="col-6 q-pa-xs q-gutter-lg" align="center">
          <q-btn
            round
            flat
            padding="none"
            icon="lab la-facebook"
            size="lg"
            target="_blank"
            href="https://www.facebook.com/"
          />
          <q-btn
            round
            flat
            padding="none"
            icon="lab la-whatsapp"
            size="lg"
            target="_blank"
            href="https://web.whatsapp.com/"
          />
          <q-btn
            round
            flat
            padding="none"
            icon="lab la-telegram"
            size="lg"
            target="_blank"
            href="https://weba.telegram.org/"
          />
          <q-btn
            round
            flat
            padding="none"
            icon="lab la-github"
            size="lg"
            target="_blank"
            href="https://github.com/"
          />
          <q-btn
            round
            flat
            padding="none"
            icon="lab la-youtube"
            size="lg"
            target="_blank"
            href="https://www.youtube.com/"
          />
        </div>
        <q-separator spaced />
        <div class="col-3 justify-center text-center">
          {{ new Date().getFullYear() }} —
          <strong>Copyright: ycp727</strong>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import LeftDrawerMenu from "src/components/LeftDrawerMenu.vue";
import RightDrawerMenu from "src/components/RightDrawerMenu.vue";
import { useAuthUser } from "src/stores/AuthUser";
import { useStockProducts } from "src/stores/StockProducts";
import { useScriptStore } from "src/stores/ScriptStore";

const { getImageURL } = useScriptStore();
const { submitlogout, reAcceso } = useAuthUser();

const { carritoCantidad } = storeToRefs(useStockProducts());
const { me } = storeToRefs(useAuthUser());

onMounted(async () => {
  reAcceso();
});

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>

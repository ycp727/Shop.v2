<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          <q-avatar>
            <img src="~/assets/Cactus.png" />
          </q-avatar>
          Sweet Delight
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <!-- Botón para pantalla Completa -->
          <q-btn
            class="fa-beat"
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>
          <!-- Botón de Notificaciones-->
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <!-- Contenido de la ventana del boton de Notificaciones -->
                <messages />
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="Ver Mas"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-secondary"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- Botón login usuario -->
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
        </div>
      </q-toolbar>
    </q-header>

    <!-- Menú Lateral Izquierdo -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-secondary text-white"
    >
      <q-list>
        <!-- ========== -->
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inicio</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item
          to="/admin/dashboard"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Admin Panel</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item icon="pages" label="Páginas">
          <q-list class="q-pl-lg">
            <!-- ========== -->
            <q-item
              to="/admin/tablesData"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="table_chart" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Página de Inicio </q-item-label>
              </q-item-section>
            </q-item>
            <!-- ========== -->
            <q-item
              to="/admin/tablesproduct"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Catálogos de Productos</q-item-label>
              </q-item-section>
            </q-item>
            <!-- ========== -->
            <q-item-label header class="text-weight-bolder text-white"
              >Generic</q-item-label
            >
            <q-item
              disable
              to="/Profile"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Perfil de usuario</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              disable
              to="/Maintenance"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mantenimiento</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- ========== -->
        <q-item
          to="/admin/tableusers"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuarios</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item disable to="/Mail" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="email" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Correo</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item
          disable
          to="/directory"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="card_giftcard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Directorio</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item disable to="/Charts" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Charts</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item
          disable
          to="/CardHeader"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="card_giftcard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Card Header</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item disable to="/Cards" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cards</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
        <q-item disable to="/Tables" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tables</q-item-label>
          </q-item-section>
        </q-item>

        <!-- ========== -->
        <q-item
          disable
          to="/Checkout"
          active-class="q-item-no-link-highlighting"
        >
          <q-item-section avatar>
            <q-icon name="check_circle_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Checkout</q-item-label>
          </q-item-section>
        </q-item>
        <!-- ========== -->
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAuthUser } from "src/stores/AuthUser";
import { useScriptStore } from "src/stores/ScriptStore";

const { getImageURL } = useScriptStore();
const { submitlogout } = useAuthUser();
const { me } = storeToRefs(useAuthUser());
onMounted(async () => {
  // await refreshAuth();
});
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const $q = useQuasar();
</script>

<style>
.fa-beat {
  animation: fa-beat 5s ease infinite;
}
@keyframes fa-beat {
  0% {
    transform: scale(1);
  }
  5% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1);
  }
  35% {
    transform: scale(1.25);
  }
  50% {
    transform: scale(1);
  }
  55% {
    transform: scale(1.25);
  }
  70% {
    transform: scale(1);
  }
}
</style>

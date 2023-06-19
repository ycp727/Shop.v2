const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "users",
        component: () => import("pages/admin/UsersPage.vue"),
      },
      {
        path: "products",
        component: () => import("pages/admin/ProductsPage.vue"),
      },
    ],
  },
  {
    path: "/shop",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "diadema",
        component: () => import("pages/shop/DiademaPage.vue"),
      },
      {
        path: "fuentes",
        component: () => import("pages/shop/FuentesPage.vue"),
      },
      {
        path: "carteras",
        component: () => import("pages/shop/CarterasPage.vue"),
      },
      {
        path: "herramientas",
        component: () => import("pages/shop/HerramientasPage.vue"),
      },
      {
        path: "jaulas",
        component: () => import("pages/shop/JaulasPage.vue"),
      },
      {
        path: "macetas",
        component: () => import("pages/shop/MacetasPage.vue"),
      },
      {
        path: "piedras",
        component: () => import("pages/shop/PiedrasPage.vue"),
      },
      {
        path: "ramilletes",
        component: () => import("pages/shop/RamilletesPage.vue"),
      },
      {
        path: "vestidos",
        component: () => import("pages/shop/VestidosPage.vue"),
      },
      {
        path: "zapatos",
        component: () => import("pages/shop/ZapatosPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/login",
    component: () => import("pages/UserLoginPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

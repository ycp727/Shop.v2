const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "herramientas",
        component: () => import("pages/shop/HerramientasPage.vue"),
      },
      {
        path: "accesorios",
        component: () => import("pages/shop/AccesoriosPage.vue"),
      },
      {
        path: "cactus",
        component: () => import("pages/shop/CactusPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("pages/admin/DashboardPage.vue"),
      },
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

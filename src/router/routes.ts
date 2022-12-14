const routes = [
   {
      path: "/",
      component: () => import("../layouts/LyPublic.vue"),
      children: [
         {
            name: "pgHome",
            path: "",
            component: () => import("../pages/PgHome.vue"),
         },
      ],
   },
   {
      path: "/auth",
      component: () => import("../layouts/LyAuth.vue"),
      children: [],
   },
]

export default routes

import LyPublic from "@/layouts/LyPublic.vue"
import PgHome from "@/pages/PgHome.vue"

const routes = [
   {
      path: "/",
      component: LyPublic,
      children: [
         {
            path: "",
            name: "pgHome",
            component: PgHome,
         },
      ],
   },
]

export default routes

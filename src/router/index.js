import { createWebHistory, createRouter } from "vue-router";
import Ontvangsten from "@/views/Ontvangsten.vue";
import Ontvangstregels from "@/views/Ontvangstregels.vue";

const routes = [
  {
    path: "/",
    name: "Ontvangsten",
    component: Ontvangsten,
  },
  {
    path: "/ontvangstregels",
    name: "Ontvangstregels",
    component: Ontvangstregels,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "inicio",
      path: "/rh",
      component: () => import('../views/Inicio.vue')
    },
    {
      name: "login",
      path: "/rh/login",
      component: () => import('../views/Login.vue')
    },
    {
      name: "incidencias",
      path: "/rh/incidencias",
      component: () => import('../views/TablaIncidencia.vue')
    },
    {
      name: "usuarios",
      path: "/rh/usuarios",
      component: () => import('../views/Usuarios.vue')
    },
    {
      name: "reporte_incidencias",
      path: "/rh/reporte_incidencias",
      component: () => import('../views/Reporte.vue')
    }
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/PerfilView.vue'),
    props: (route) => ({username: route.params.username}), //Pasamos el parametro email a la vista
    meta: { requiresAuth: true }
  },
]
const currentUser = localStorage.getItem('currentUser') !== null //solucion para que no se pierda el usuario al recargar la pagina
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Verificamos si la ruta a la que se intenta acceder requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAuth) && !currentUser) {
    next({ name: 'register' })// Si la ruta requiere autenticación y no hay un usuario autenticado, redirigimos a la página de registro
  } else {        
    next()// Si la ruta no requiere autenticación o hay un usuario autenticado, permitimos el acceso
  }
})

export default router

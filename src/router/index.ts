import { useUserStore } from '@/service/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

export enum RouterNames {
  ABOUT = 'about',
  LOGIN = 'login',
  BIND = 'bind',
  URBAN_RENEWAL = 'urbanRenewal'
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'urbanRenewal'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: RouterNames.LOGIN,
      component: () => import('../views/GoogleLogin.vue')
    },
    {
      path: '/bind',
      name: RouterNames.BIND,
      component: () => import('../views/FaceBookBind.vue'),
      beforeEnter: (from, to, next) => {
        const userStore = useUserStore()
        if (
          userStore.googlePeople &&
          userStore.facebookPeople &&
          userStore.bindingArray.find(
            (e) => e.googleResourceName === userStore.googlePeople?.resourceName
          )
        ) {
          const bindObj = userStore.bindingArray.find(
            (e) => e.googleResourceName === userStore.googlePeople?.resourceName
          )
          const facebookPopple = userStore.facebookPeoples.find(
            (facebookP) => facebookP.id === bindObj?.facebookId
          )
          if (facebookPopple) {
            userStore.setAndRegisterFacebookPeople(facebookPopple)
            next({ name: RouterNames.URBAN_RENEWAL })
            return
          }
        }
        next()
      }
    },

    {
      path: '/urban-renewal',
      name: RouterNames.URBAN_RENEWAL,
      component: () => import('../views/UrbanRenewal/index.vue'),
      beforeEnter: (from, to, next) => {
        const userStore = useUserStore()
        if (!userStore.googlePeople || !userStore.facebookPeople) {
          next({ name: RouterNames.LOGIN })
        } else {
          next()
        }
      }
    }
  ]
})

export default router

import { useUserStore } from '@/service/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

export enum RouterNames {
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
        name: RouterNames.LOGIN
      }
    },
    {
      path: '/login',
      name: RouterNames.LOGIN,
      component: () => import('../views/GoogleLogin/index.vue')
    },
    {
      path: '/bind',
      name: RouterNames.BIND,
      component: () => import('../views/FaceBookBind.vue'),
      beforeEnter: (from, to, next) => {
        const userStore = useUserStore()
        if (!userStore.googlePeople) {
          next({ name: RouterNames.LOGIN })
          return
        }
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

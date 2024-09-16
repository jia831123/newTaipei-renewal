import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { People as GooglePeople } from '../api/useGooglePeople'
import type { People as FacebookPeople } from '../api/useFacebookPeople'

export const useUserStore = defineStore(
  'user',
  () => {
    const googlePeoples = ref<GooglePeople[]>([])
    const facebookPeoples = ref<FacebookPeople[]>([])
    const bindingArray = ref<
      {
        googleResourceName: string
        facebookId: string
      }[]
    >([])
    const googlePeople = ref<GooglePeople>()
    const facebookPeople = ref<FacebookPeople>()
    const setAndRegisterGooglePeople = (p: GooglePeople) => {
      googlePeople.value = p
      const pNames = p.resourceName
      if (
        !googlePeoples.value.length ||
        !googlePeoples.value.find((googlePeople) => googlePeople.resourceName === pNames)
      ) {
        googlePeoples.value = [...googlePeoples.value, p]
      }
    }
    const setAndRegisterFacebookPeople = (p: FacebookPeople) => {
      facebookPeople.value = p
      if (
        !facebookPeoples.value.length ||
        !facebookPeoples.value.find((facebookPeople) => facebookPeople.id === p.id)
      ) {
        facebookPeoples.value = [...facebookPeoples.value, p]
      }
    }
    const bindingUser = (googleResourceName: string, facebookId: string) => {
      const bindData = {
        googleResourceName,
        facebookId
      }
      if (bindingArray.value.find((b) => b.googleResourceName === googleResourceName)) {
        bindingArray.value = [
          ...bindingArray.value.filter((b) => b.googleResourceName !== googleResourceName),
          bindData
        ]
      } else {
        bindingArray.value = [...bindingArray.value, bindData]
      }
    }
    const resetAll = () => {
      googlePeople.value = undefined
      facebookPeople.value = undefined
      bindingArray.value = []
      googlePeoples.value = []
      facebookPeoples.value = []
    }
    const resetGooglePeopleAndUnbind = () => {
      const googleResourceName = googlePeople.value?.resourceName
      bindingArray.value = bindingArray.value.filter(
        (each) => each.googleResourceName !== googleResourceName
      )
      googlePeople.value = undefined
      googlePeoples.value = googlePeoples.value.filter(
        (each) => each.resourceName !== googleResourceName
      )
    }
    return {
      googlePeople,
      facebookPeople,
      setAndRegisterGooglePeople,
      setAndRegisterFacebookPeople,
      googlePeoples,
      facebookPeoples,
      bindingArray,
      bindingUser,
      resetAll,
      resetGooglePeopleAndUnbind
    }
  },
  {
    persist: true
  }
)

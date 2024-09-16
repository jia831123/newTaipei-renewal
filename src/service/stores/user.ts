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
        googleId: string
        facebookId: string
      }[]
    >([])
    const googlePeople = ref<GooglePeople>()
    const facebookPeople = ref<FacebookPeople>()
    const setGooglePeople = (p: GooglePeople) => {
      googlePeople.value = p
      const pIds = p.names.map((name) => name.metadata.source.id).flat()
      if (
        !googlePeoples.value.length ||
        !googlePeoples.value.find((googlePeople) =>
          googlePeople.names.find((name) => pIds.includes(name.metadata.source.id))
        )
      ) {
        googlePeoples.value = [...googlePeoples.value, p]
      }
    }
    const setFacebookPeople = (p: FacebookPeople) => {
      facebookPeople.value = p
      if (
        !facebookPeoples.value.length ||
        !facebookPeoples.value.find((facebookPeople) => facebookPeople.id === p.id)
      ) {
        facebookPeoples.value = [...facebookPeoples.value, p]
      }
    }
    const bindingUser = (googleId: string, facebookId: string) => {
      const bindData = {
        googleId,
        facebookId
      }
      if (bindingArray.value.find((b) => b.googleId === googleId)) {
        bindingArray.value = [
          ...bindingArray.value.filter((b) => b.googleId !== googleId),
          bindData
        ]
      } else {
        bindingArray.value = [...bindingArray.value, bindData]
      }
    }

    return {
      googlePeople,
      facebookPeople,
      setGooglePeople,
      setFacebookPeople,
      googlePeoples,
      facebookPeoples,
      bindingArray,
      bindingUser
    }
  },
  {
    persist: true
  }
)

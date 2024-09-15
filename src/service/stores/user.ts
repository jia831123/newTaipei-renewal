import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { People as GooglePeople } from '../api/useGooglePeople'
import type { People as FacebookPeople } from '../api/useFacebookPeople'

export const useUserStore = defineStore('counter', () => {
  const googlePeople = ref<GooglePeople>()
  const facebookPeople = ref<FacebookPeople>()
  const setGooglePeople = (p: GooglePeople) => (googlePeople.value = p)
  const setFacebookPeople = (p: FacebookPeople) => (facebookPeople.value = p)

  return { googlePeople, facebookPeople, setGooglePeople, setFacebookPeople }
})

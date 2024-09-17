import L from 'leaflet'
import type { People as FacebookPeople } from '@/service/api/useFacebookPeople'
import { iconUrl } from './assets/default-leaflet-icon.png'
import { pictureUrl } from './assets/testdevelop.png'

const getDefaultLeafletIcon = () => L.icon({ iconUrl, iconAnchor: [12, 0] })
const createFacebookPeopleForTestBind = (): FacebookPeople => ({
  id: '0000000000',
  name: '測試開發人員',
  picture: {
    data: {
      height: 50,
      is_silhouette: false,
      url: pictureUrl,
      width: 50
    }
  }
})
export { getDefaultLeafletIcon, createFacebookPeopleForTestBind }

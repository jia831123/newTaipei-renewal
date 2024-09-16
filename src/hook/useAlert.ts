import { ElMessage } from 'element-plus'
import type { VNode } from 'vue'

type MessageType = 'success' | 'warning' | 'info' | 'error'
const useAlert =
  () =>
  (message: string | VNode, type: MessageType, duration = 3000) =>
    new Promise((res) => {
      ElMessage.closeAll()
      ElMessage({ type, message, onClose: () => res(true), duration: duration, showClose: true })
    })

export default useAlert

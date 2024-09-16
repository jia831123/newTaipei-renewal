import { ElMessageBox, type ElMessageBoxOptions } from 'element-plus'
interface Option {
  confirmButtonText: string
  cancelButtonText: string
  type: string
  center: boolean
  customClass: string
  closeOnClickModal: boolean
  haveDiver: boolean
}
const defaultOption = (): Option => {
  return {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
    customClass: 'ConfirmMessage',
    closeOnClickModal: false,
    haveDiver: true
  }
}
const deleteOption = () => {
  return {
    ...defaultOption(),
    // confirmButtonText: '確認刪除',
    // confirmButtonClass: 'el-button--danger',
    closeOnPressEscape: false,
    customClass: 'DeleteConfirmMessage',
    showClose: false
  }
}
const confirm = (message: string, title: string, options: Option | {} = {}) => {
  message = message || `確定執行以下操作嗎`
  title = title || `警告`
  return ElMessageBox.confirm(message, title, {
    ...defaultOption(),
    ...options
  } as ElMessageBoxOptions)
}
const useConfirm = () => confirm

export default useConfirm
export { useConfirm }

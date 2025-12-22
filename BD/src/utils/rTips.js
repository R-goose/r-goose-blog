import { createApp } from 'vue'
import RTips from '@/components/r-ui/r-tips.vue'
let instance = null
let container = null

/**
 * 显示全局提示
 * @param {Object} options
 * @param {string} [options.type='alert-s'] - 'alert-s' | 'alert-w' | 'alert-e' | 'confirm'
 * @param {string} [options.title='成功']
 * @param {string} [options.content='']
 * @param {string} [options.confirmBtnText='确定']
 * @param {string} [options.cancelBtnText='取消']
 * @returns {Promise<'confirm'|'cancel'|void>} confirm 类型返回用户操作
 */
export function rTips({
  type = 'alert-s',
  title = '成功',
  content = '',
  confirmBtnText = '确定',
  cancelBtnText = '取消',
} = {}) {
  if (instance) {
    instance.unmount()
    document.body.removeChild(container)
    instance = null
    container = null
  }

  // 创建容器
  container = document.createElement('div')
  document.body.appendChild(container)

  const isConfirm = type === 'confirm'

  // 创建 Promise（仅 confirm 需要）
  let resolveFn
  const resultPromise = isConfirm ? new Promise(resolve => resolveFn = resolve) : null

  // 创建 Vue 实例
  instance = createApp(RTips, {
    alertVisible: true,
    tipsType: type,
    tipsTitle: title,
    tipsContent: content,
    confirmsBtnText: {
      confirm: confirmBtnText,
      cancel: cancelBtnText,
    },
    onUpdateAlertVisible: (visible) => {
      if (!visible) {
        cleanup()
        if (isConfirm) {
          resolveFn('close')
        }
      }
    },
    onConfirm: () => {
      cleanup()
      resolveFn?.('confirm')
    },
    onCancel: () => {
      cleanup()
      resolveFn?.('cancel')
    }
  })

  instance.mount(container)

  function cleanup() {
    if (instance) {
      instance.unmount()
      document.body.removeChild(container)
      instance = null
      container = null
    }
  }

  return resultPromise
}
/**
 * <script setup>
import { showTips } from '@/composables/useGlobalTips'

const handleSuccess = () => {
  showTips({ title: '保存成功' })
}

const handleDelete = async () => {
  const result = await showTips({
    type: 'confirm',
    title: '确认删除？',
    content: '此操作不可恢复',
    confirmBtnText: '删了',
    cancelBtnText: '手滑'
  })

  if (result === 'confirm') {
    console.log('用户确认删除')
  }
}
</script>
 */

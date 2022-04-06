import { ref, onMounted } from 'vue'

export function useScreen(dom) {
  let width = 0
  let height = 0
  width = dom.clientWidth
  height = dom.clientHeight
  return {
    width,
    height,
  }
}
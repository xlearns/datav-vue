import compoent from './Modal.vue'

export const  DModal  = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
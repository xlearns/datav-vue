import compoent from './Icon.vue'

export const  DIcon  = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
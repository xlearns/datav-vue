import compoent from './Switch.vue'

export const  DSwitch = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
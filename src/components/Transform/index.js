import compoent from './Transform.vue'

export const  DTransform = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
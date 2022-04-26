import compoent from './TransformCategory.vue'

export const  DTransformCategory = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install



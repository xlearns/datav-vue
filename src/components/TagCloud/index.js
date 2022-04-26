import compoent from './TagCloud.vue'
export const  DTagCloud = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
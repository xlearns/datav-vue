import compoent from './BaseScrollList.vue'

export const  DBaseScrollList  = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
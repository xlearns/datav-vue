import compoent from './Loading.vue'

export const  DLoading  = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
import compoent from './Test.vue'



export const  DTest  = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
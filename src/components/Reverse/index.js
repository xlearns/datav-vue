import compoent from './compoent.vue'

export const  DReverse = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
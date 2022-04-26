import compoent from './VueCountTo.vue'


export const  DVueCountTo = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install


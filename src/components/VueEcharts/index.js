import compoent from './VueEcharts.vue'


export const  DVueEcharts = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install

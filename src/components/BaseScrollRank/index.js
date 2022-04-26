import compoent from './BaseScrollRank.vue'


export const  DBaseScrollRank  =  compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
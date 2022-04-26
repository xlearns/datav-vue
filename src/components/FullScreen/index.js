import compoent from './FullSreen.vue'

export const  DFullScreen  = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
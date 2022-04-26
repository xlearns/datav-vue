import compoent from './SvgAnimation.vue'


export const  DSvgAnimation = compoent


const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
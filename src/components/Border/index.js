import compoent from './FlyBox.vue'
import compoentOne from './DoubleBox.vue'
import three from './three.vue'


export const  DFlyBox  = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
    Vue.component(compoentOne.name,compoentOne)
    Vue.component(three.name,three)
  }
}
export default DFlyBox
import compoent from './FlyBox.vue'
import compoentOne from './DoubleBox.vue'
export default function(Vue){
  Vue.component(compoent.name,compoent)
  Vue.component(compoentOne.name,compoentOne)
}
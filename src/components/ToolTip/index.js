import compoent from './ToolTip.vue'


export const  DToolTip = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
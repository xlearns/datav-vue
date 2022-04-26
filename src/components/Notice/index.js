import compoent from './NoticeList.vue'

export const  DNoticeList = compoent

const install = {
  install(Vue) {
    Vue.component(compoent.name,compoent)
  }
}
export default  install
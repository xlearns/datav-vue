import Test from './components/Test/index'
import FullSreen from './components/FullScreen/index'
import Icon from './components/Icon/index'
import SvgAnimation from './components/SvgAnimation/index'
import Loading from './components/Loading/index'
import Border from './components/Border/index'
import VueEcharts from './components/VueEcharts/index'
import VueCountTo from './components/VueCountTo/index'
import BaseScrollList from './components/BaseScrollList/index'
import TransformCategory from './components/TransformCategory/index'
let component = function(Vue){
  Vue.use(Test)
  Vue.use(FullSreen)
  Vue.use(Icon)
  Vue.use(SvgAnimation)
  Vue.use(Loading)
  Vue.use(Border)
  Vue.use(VueEcharts)
  Vue.use(VueCountTo)
  Vue.use(BaseScrollList)
  Vue.use(TransformCategory)
}
export default  component;
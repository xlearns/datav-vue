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
import Upload from './components/Upload/index'
import BUtton from './components/Button/index'
import Switch from './components/Switch/index'
import Modal from './components/Modal/index'
import TagCloud from './components/TagCloud/index'
import ToolTip from './components/ToolTip/index'
import Transform from './components/Transform/index'
let component = function(Vue){
  Vue.use(Test)
  Vue.use(ToolTip)
  Vue.use(FullSreen)
  Vue.use(Icon)
  Vue.use(SvgAnimation)
  Vue.use(Loading)
  Vue.use(Border)
  Vue.use(VueEcharts)
  Vue.use(VueCountTo)
  Vue.use(BaseScrollList)
  Vue.use(TransformCategory)
  Vue.use(Upload)
  Vue.use(BUtton)
  Vue.use(Switch)
  Vue.use(Modal)
  Vue.use(TagCloud)
  Vue.use(Transform)
}
export default  component;
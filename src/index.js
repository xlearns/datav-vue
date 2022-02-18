import Test from './components/Test/index'
import FullSreen from './components/FullScreen/index'
import Icon from './components/Icon/index'
import SvgAnimation from './components/SvgAnimation/index'
import Loading from './components/Loading/index'
import Border from './components/Border/index'
SvgAnimation
let component = function(Vue){
  Vue.use(Test)
  Vue.use(FullSreen)
  Vue.use(Icon)
  Vue.use(SvgAnimation)
  Vue.use(Loading)
  Vue.use(Border)
}
export default  component;
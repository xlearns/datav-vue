import Test from './components/Test/index'
import FullSreen from './components/FullScreen/index'

let component = function(Vue){
  Vue.use(Test)
  Vue.use(FullSreen)
}
export default  component;
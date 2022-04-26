import Test from "./components/Test/index";
import FullSreen from "./components/FullScreen/index";
import Icon from "./components/Icon/index";
import SvgAnimation from "./components/SvgAnimation/index";
import Loading from "./components/Loading/index";
import Border from "./components/Border/index";
import VueEcharts from "./components/VueEcharts/index";
import VueCountTo from "./components/VueCountTo/index";
import BaseScrollList from "./components/BaseScrollList/index";
import TransformCategory from "./components/TransformCategory/index";
import Upload from "./components/Upload/index";
import BUtton from "./components/Button/index";
import Switch from "./components/Switch/index";
import Modal from "./components/Modal/index";
import TagCloud from "./components/TagCloud/index";
import ToolTip from "./components/ToolTip/index";
import Transform from "./components/Transform/index";
import Reverse from "./components/Reverse/index";
import Notice from "./components/Notice/index";
import { EchartsData } from "./components/Data/index";
import hook from "./hooks/index";

// 全局安装
let component = function (Vue) {
  Vue.use(Test);
  Vue.use(ToolTip);
  Vue.use(FullSreen);
  Vue.use(Icon);
  Vue.use(SvgAnimation);
  Vue.use(Loading);
  Vue.use(Border);
  Vue.use(VueEcharts);
  Vue.use(VueCountTo);
  Vue.use(BaseScrollList);
  Vue.use(TransformCategory);
  Vue.use(Upload);
  Vue.use(BUtton);
  Vue.use(Switch);
  Vue.use(Modal);
  Vue.use(TagCloud);
  Vue.use(Transform);
  Vue.use(Reverse);
  Vue.use(Notice);
  Vue.use(hook)
  Vue.provide("EchartsData", EchartsData);
};
export const DToolTip = ToolTip;
export const DTest = Test
export const DBorder = Border
export const DLoading = Loading
export const DSvgAnimation = SvgAnimation
export const DIcon = Icon
export const DFullSreen = FullSreen
export const DVueCountTo = VueCountTo;
export const DBaseScrollList = BaseScrollList;
export const DTransformCategory = TransformCategory;
export const DButton = BUtton;
export const DSwitch = Switch;
export const DTagCloud = TagCloud;
export const DModal = Modal;
export const Dhook = hook;
export const DEchartsData = EchartsData;
export const DNotice  = Notice;
export const DReverse = Reverse;
export const DTransform = Transform;
export const DVueEcharts  = VueEcharts;
export default component;

import { ref, openBlock, createElementBlock, pushScopeId, popScopeId, createElementVNode, onMounted, nextTick, onUnmounted, renderSlot, createCommentVNode, normalizeStyle, createStaticVNode, computed, watch, reactive, toRefs, toDisplayString, Fragment, renderList, normalizeClass, resolveComponent, createVNode, isRef, unref } from 'vue';
import Echarts from 'echarts';
import { to, timeline } from 'gsap';

var script$l = {
  name: "ComTest",

  setup() {
    let a = ref("test");
    return {
      a
    };
  }

};

const _withScopeId$6 = n => (pushScopeId("data-v-7cc4288f"), n = n(), popScopeId(), n);

const _hoisted_1$h = {
  class: "test"
};

const _hoisted_2$c = /*#__PURE__*/_withScopeId$6(() => /*#__PURE__*/createElementVNode("svg", {
  width: "20px",
  height: "20px",
  viewBox: "0 0 100 100"
}, [/*#__PURE__*/createElementVNode("line", {
  x1: "0",
  y1: "50",
  x2: "100",
  y2: "50",
  "stroke-width": "8",
  stroke: "currentColor"
}), /*#__PURE__*/createElementVNode("line", {
  x1: "50",
  y1: "0",
  x2: "50",
  y2: "100",
  "stroke-width": "8",
  stroke: "currentColor"
})], -1
/* HOISTED */
));

const _hoisted_3$7 = [_hoisted_2$c];
function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$h, _hoisted_3$7);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$g = ".test[data-v-7cc4288f] {\n  color: yellow; }\n";
styleInject(css_248z$g);

script$l.render = render$l;
script$l.__scopeId = "data-v-7cc4288f";
script$l.__file = "src/components/Test/Test.vue";

function Test (Vue) {
  Vue.component(script$l.name, script$l);
}

function debounce(delay, callback) {
  let task;
  return function () {
    clearTimeout(task);
    task = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
function isNumber(val) {
  return typeof val == 'number' && !isNaN(val);
}
function sleep(timer) {
  return new Promise(resolve => {
    setTimeout(resolve, timer);
  });
}
function formatNumber(num, decimals, decimal, separator, prefix, suffix) {
  num = num.toFixed(decimals);
  num += '';
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';
  const rgx = /(\d+)(\d{3})/;

  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }

  return prefix + x1 + x2 + suffix;
}

var script$k = {
	name: "VFullSreen",
	props: {
		options: Object,
	},
	setup(props) {
		let dom = ref();
		let width = ref(0);
		let height = ref(0);
		let originalWidth = ref(0);
		let originalHeight = ref(0);
		let ready = ref(false);
		let observer;
		const updateScale = function () {
			// 获取真实的视口尺寸
			const currentWidth = document.body.clientWidth;
			const currentHeight = document.body.clientHeight;
			// 获取大屏最终的宽高
			const realWidth = width.value || originalWidth.value;
			const realHeight = height.value || originalHeight.value;
			const widthScale = currentWidth / realWidth;
			const heightScale = currentHeight / realHeight;
			dom.value &&
				(dom.value.style.transform = `scale(${widthScale}, ${heightScale})`);
		};
		const updateSize = function () {
			if (width.value && height.value) {
				dom.value.style.width = `${width.value}px`;
				dom.value.style.height = `${height.value}px`;
			} else {
				dom.value.style.width = `${originalWidth.value}px`;
				dom.value.style.height = `${originalHeight.value}px`;
			}
		};
		const init = function () {
			return new Promise((resolve) => {
				nextTick(() => {
					if (props.options && props.options.width && props.options.height) {
						width.value = props.options.width;
						height.value = props.options.height;
					} else {
						console.warn(
							"props.options.width||props.options.height no defined"
						);
						width.value = dom.value.clientWidth;
						height.value = dom.value.clientHeight;
					}
					// 视口宽度
					if (!originalWidth.value || !originalHeight.value) {
						originalWidth.value = window.screen.width;
						originalHeight.value = window.screen.height;
					}
					resolve();
				});
			});
		};
		const onResize = async function () {
			// 屏幕改变、分辨率改变都会触发
			await init();
			updateScale();
		};

		const initMutationObserver = function () {
			const MutationObserver = window.MutationObserver;
			// dom变化执行onResize【callback】
			observer = new MutationObserver(onResize);
			observer.observe(dom.value, {
				attributes: true,
				attributeFilter: ["style"],
				attributeOldValue: true,
			});
		};
		const removeMutationObserver = function () {
			if (observer) {
				observer.disconnect();
				observer.takeRecords();
				observer = null;
			}
		};

		onMounted(async () => {
			ready.value = false;
			await init();
			updateSize();
			updateScale();
			window.addEventListener("resize", debounce(100, onResize));
			initMutationObserver();
			ready.value = true;
		});

		onUnmounted(() => {
			window.removeEventListener("resize", onResize);
			removeMutationObserver();
		});

		return {
			ready,
			dom,
		};
	},
};

const _hoisted_1$g = {
  ref: "dom",
  class: "datav-full-sreen"
};
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [$setup.ready ? renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : createCommentVNode("v-if", true)], 512
  /* NEED_PATCH */
  );
}

var css_248z$f = ".datav-full-sreen[data-v-8b5216c8] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  transform-origin: left top;\n  z-index: 999; }\n";
styleInject(css_248z$f);

script$k.render = render$k;
script$k.__scopeId = "data-v-8b5216c8";
script$k.__file = "src/components/FullScreen/FullSreen.vue";

function FullSreen (Vue) {
  Vue.component(script$k.name, script$k);
}

// 配合iconfont symbol
var script$j = {
  name: "VIcon",
  props: {
    name: String,
    style: Object,
    prefix: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    let {
      name,
      prefix
    } = props;
    const iconName = `#${prefix}${name}`;
    return {
      iconName
    };
  }

};

const _hoisted_1$f = {
  class: "icon"
};
const _hoisted_2$b = ["href"];
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "icon-wrapper",
    style: normalizeStyle({ ...$props.style
    })
  }, [(openBlock(), createElementBlock("svg", _hoisted_1$f, [createElementVNode("use", {
    href: $setup.iconName
  }, null, 8
  /* PROPS */
  , _hoisted_2$b)]))], 4
  /* STYLE */
  );
}

var css_248z$e = "\n.icon-wrapper {\r\n\tdisplay: inline-block;\n}\n.icon {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tvertical-align: -0.15em;\r\n\tfill: currentColor;\r\n\toverflow: hidden;\n}\r\n";
styleInject(css_248z$e);

script$j.render = render$j;
script$j.__file = "src/components/Icon/Icon.vue";

function Icon (Vue) {
  Vue.component(script$j.name, script$j);
}

var script$i = {
  name: "SvgAnimation",
  props: {
    name: String,
    style: Object,
    prefix: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    onMounted(() => {
      let logo = document.querySelector(".logo");
      console.log(logo.getTotalLength());
    });
  }

};

const _withScopeId$5 = n => (pushScopeId("data-v-5a151e4f"), n = n(), popScopeId(), n);

const _hoisted_1$e = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"500\" height=\"200\" viewBox=\"0 0 500 200\" data-v-5a151e4f><rect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"red\" transform=\"translate(0,0) rotate(30)\" data-v-5a151e4f></rect></svg></div><div class=\"contatiner\" data-v-5a151e4f><svg width=\"500\" height=\"500\" viewBox=\"0 0 200 200\" transform=\"rotate(270)\" data-v-5a151e4f><!-- 底 --><circle cx=\"100\" cy=\"100\" r=\"90\" stroke-width=\"10\" stroke=\"#d1d3d7\" fill=\"none\" data-v-5a151e4f></circle><!-- 实际 --><!-- 周长：2*PI*R --><!-- 2*3.14*90 = 566--><!--  --><circle class=\"circle-ring\" cx=\"100\" cy=\"100\" r=\"90\" stroke-width=\"10\" stroke=\"#00a5e0\" fill=\"none\" data-v-5a151e4f></circle></svg></div><div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 底 --><rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#d1d3d7\" stroke-width=\"10\" data-v-5a151e4f></rect><rect class=\"rectRing\" x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#00a5e0\" stroke-width=\"10\" data-v-5a151e4f></rect></svg></div>", 3);

const _hoisted_4$5 = /*#__PURE__*/_withScopeId$5(() => /*#__PURE__*/createElementVNode("div", {
  class: "contatiner"
}, [/*#__PURE__*/createCommentVNode(" 描边 "), /*#__PURE__*/createElementVNode("svg", {
  viewBox: "0 0 1024 1024"
}, [/*#__PURE__*/createElementVNode("path", {
  class: "logo",
  d: "M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z",
  fill: "",
  "p-id": "3769"
})])], -1
/* HOISTED */
));

const _hoisted_5$5 = /*#__PURE__*/_withScopeId$5(() => /*#__PURE__*/createElementVNode("div", {
  class: "contatiner"
}, [/*#__PURE__*/createCommentVNode(" 矩形周长：4r"), /*#__PURE__*/createElementVNode("svg", {
  width: "500px",
  height: "500px",
  viewBox: "0 0 200 200"
}, [/*#__PURE__*/createCommentVNode(" 底 "), /*#__PURE__*/createElementVNode("rect", {
  x: "0",
  y: "0",
  width: "200",
  height: "200",
  fill: "none",
  stroke: "#d1d3d7",
  "stroke-width": "10"
}), /*#__PURE__*/createElementVNode("rect", {
  class: "rectRingFly",
  x: "0",
  y: "0",
  width: "200",
  height: "200",
  fill: "none",
  stroke: "#00a5e0",
  "stroke-width": "10"
})])], -1
/* HOISTED */
));

const _hoisted_6$5 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"200px\" height=\"200px\" data-v-5a151e4f><!-- set 延迟设置不会补间--><rect x=\"0\" y=\"0\" fill=\"red\" width=\"100\" height=\"50\" data-v-5a151e4f><set attributeName=\"x\" to=\"10\" begin=\"1s\" data-v-5a151e4f></set><set attributeName=\"x\" to=\"20\" begin=\"2s\" data-v-5a151e4f></set><set attributeName=\"x\" to=\"30\" begin=\"3s\" data-v-5a151e4f></set><set attributeName=\"fill\" to=\"blue\" begin=\"4s\" data-v-5a151e4f></set></rect></svg></div>", 1);

const _hoisted_7$3 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"200px\" height=\"200px\" data-v-5a151e4f><!-- animate 延迟设置不会补间--><!-- &lt;rect x=&quot;0&quot; y=&quot;0&quot; fill=&quot;blue&quot; width=&quot;100&quot; height=&quot;50&quot;&gt;&lt;/rect&gt; --><circle cx=\"0\" cy=\"0\" r=\"30\" fill=\"blue\" stroke=\"black\" stroke-width=\"1\" data-v-5a151e4f><animate repeatCount=\"1\" attributeName=\"cx\" attributeType=\"XML\" from=\"0\" to=\"100\" dur=\"2s\" fill=\"freeze\" data-v-5a151e4f></animate><animate repeatCount=\"1\" attributeName=\"cy\" attributeType=\"XML\" from=\"0\" to=\"100\" dur=\"2s\" fill=\"freeze\" data-v-5a151e4f></animate><animateTransform attributeName=\"transform\" attributeType=\"XML\" begin=\"0\" dur=\"3s\" type=\"scale\" from=\"1\" to=\"4\" fill=\"freeze\" repeatCount=\"1\" data-v-5a151e4f></animateTransform></circle></svg></div>", 1);

const _hoisted_8$3 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 运动的矩形 --><rect x=\"0\" y=\"0\" width=\"10\" height=\"10\" fill=\"red\" data-v-5a151e4f><animateMotion path=\"M10 10 L110 10 L110 110 L10 110 Z\" dur=\"5s\" rotate=\"0\" repeatCount=\"indefinite\" data-v-5a151e4f></animateMotion></rect><path d=\"M10 10 L110 10 L110 110 L10 110 Z\" fill=\"none\" stroke=\"black\" stroke-width=\"3\" data-v-5a151e4f></path></svg></div>", 1);

const _hoisted_9$3 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 运动的矩形 --><rect x=\"0\" y=\"0\" width=\"10\" height=\"10\" fill=\"red\" data-v-5a151e4f><animateMotion id=\"forward-rect\" path=\"M10 10 L110 10 L110 110 L10 110\" dur=\"2s\" rotate=\"0\" fill=\"freeze\" begin=\"0;backward-rect.end+0.5\" data-v-5a151e4f></animateMotion><animateMotion id=\"backward-rect\" path=\"M10 110 L110 110 L110 10 L10 10 \" dur=\"2s\" rotate=\"0\" fill=\"freeze\" begin=\"forward-rect.end + 0.5s\" data-v-5a151e4f></animateMotion></rect><path d=\"M10 10 L110 10 L110 110 L10 110\" fill=\"none\" stroke=\"black\" stroke-width=\"1\" data-v-5a151e4f></path></svg></div>", 1);

function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [_hoisted_1$e, _hoisted_4$5, _hoisted_5$5, createCommentVNode(" set "), _hoisted_6$5, createCommentVNode(" animate "), _hoisted_7$3, createCommentVNode(" 路径运动 "), _hoisted_8$3, createCommentVNode(" 翻转效果 "), _hoisted_9$3]);
}

var css_248z$d = ".contatiner[data-v-5a151e4f] svg[data-v-5a151e4f] {\n  border: 1px solid #000; }\n\n.circle-ring[data-v-5a151e4f] {\n  stroke-dasharray: 566 566;\n  animation: circle-ring-5a151e4f 5s linear infinite; }\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 566; }\n  to {\n    stroke-dasharray: 566 566; } }\n\n.rectRing[data-v-5a151e4f] {\n  stroke-dasharray: 800 800;\n  animation: circle-ring-5a151e4f 5s linear infinite; }\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 800; }\n  to {\n    stroke-dasharray: 800 800; } }\n\n.logo[data-v-5a151e4f] {\n  fill: none;\n  stroke: #333;\n  stroke-width: 5;\n  animation: logoAnimation-5a151e4f 10s linear forwards; }\n\n@keyframes logoAnimation-5a151e4f {\n  0% {\n    stroke-dasharray: 5430;\n    stroke-dashoffset: 5430; }\n  50% {\n    stroke-dasharray: 5430;\n    fill: none;\n    stroke-dashoffset: 0; }\n  75% {\n    fill: red; }\n  100% {\n    fill: blue; } }\n\n.rectRingFly[data-v-5a151e4f] {\n  stroke-dasharray: 100 800;\n  animation: rectRingFly-5a151e4f 5s linear infinite; }\n\n@keyframes rectRingFly-5a151e4f {\n  from {\n    stroke-dashoffset: 800; }\n  to {\n    stroke-dashoffset: 0; } }\n";
styleInject(css_248z$d);

script$i.render = render$i;
script$i.__scopeId = "data-v-5a151e4f";
script$i.__file = "src/components/SvgAnimation/SvgAnimation.vue";

function SvgAnimation (Vue) {
  Vue.component(script$i.name, script$i);
}

var script$h = {
	name: "VLoading",
	props: {
		width: {
			type: [Number, String],
			default: 50,
		},
		height: {
			type: [Number, String],
			default: 50,
		},
		outsideColor: {
			type: String,
			default: "#3be6cb",
		},
		insideColor: {
			type: String,
			default: "#02bcfe",
		},
	},
	setup(props) {
		const outsideColorAimation = computed(
			() => `${props.outsideColor};${props.insideColor};${props.outsideColor}`
		);
		const insideColorAimation = computed(
			() => `${props.insideColor};${props.outsideColor};${props.insideColor}`
		);
		return {
			outsideColorAimation,
			insideColorAimation,
		};
	},
};

const _withScopeId$4 = n => (pushScopeId("data-v-416d18c9"), n = n(), popScopeId(), n);

const _hoisted_1$d = {
  class: "vdata-loading"
};
const _hoisted_2$a = ["width", "height"];
const _hoisted_3$6 = ["stroke"];

const _hoisted_4$4 = /*#__PURE__*/_withScopeId$4(() => /*#__PURE__*/createElementVNode("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 25 25",
  to: "360 25 25",
  dur: "1.5s",
  repeatCount: "indefinite"
}, null, -1
/* HOISTED */
));

const _hoisted_5$4 = ["values"];
const _hoisted_6$4 = ["stroke"];

const _hoisted_7$2 = /*#__PURE__*/_withScopeId$4(() => /*#__PURE__*/createElementVNode("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  values: "360 25 25;0 25 25",
  dur: "1.5s",
  repeatCount: "indefinite"
}, null, -1
/* HOISTED */
));

const _hoisted_8$2 = ["values"];
const _hoisted_9$2 = {
  class: "vdata-loading-content"
};
function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$d, [(openBlock(), createElementBlock("svg", {
    width: $props.width,
    height: $props.height,
    viewBox: "0 0 50 50"
  }, [createCommentVNode(" \r\n\t\t\t\t2*3.14*22\r\n\t\t\t\tstroke-dasharray=\"34 34\" 切等比例4块 2*3.14*22/4\r\n\t\t\t\tstroke-linecap=\"round\" 圆角\r\n\t\t\t\t "), createElementVNode("circle", {
    cx: "25",
    cy: "25",
    r: "22",
    fill: "none",
    stroke: $props.insideColor,
    "stroke-width": "3",
    "stroke-dasharray": "34 34",
    "stroke-linecap": "round"
  }, [createCommentVNode(" 过渡动画 "), createCommentVNode(" from(度数,圆心坐标.x,圆心坐标.y) "), createCommentVNode(" from='' to=''可以用values='a,b,c;a,b,c'替换 "), _hoisted_4$4, createElementVNode("animate", {
    attributeName: "stroke",
    values: $setup.outsideColorAimation,
    dur: "3s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_5$4)], 8
  /* PROPS */
  , _hoisted_3$6), createElementVNode("circle", {
    cx: "25",
    cy: "25",
    r: "12",
    fill: "none",
    stroke: $props.outsideColor,
    "stroke-width": "3",
    "stroke-linecap": "round",
    "stroke-dasharray": "19 19"
  }, [_hoisted_7$2, createElementVNode("animate", {
    attributeName: "stroke",
    values: $setup.insideColorAimation,
    dur: "3s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_8$2)], 8
  /* PROPS */
  , _hoisted_6$4)], 8
  /* PROPS */
  , _hoisted_2$a)), createElementVNode("div", _hoisted_9$2, [renderSlot(_ctx.$slots, "default")])]);
}

var css_248z$c = "\n.vdata-loading[data-v-416d18c9] {\r\n\ttext-align: center;\n}\r\n";
styleInject(css_248z$c);

script$h.render = render$h;
script$h.__scopeId = "data-v-416d18c9";
script$h.__file = "src/components/Loading/Loading.vue";

function Loading (Vue) {
  Vue.component(script$h.name, script$h);
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var script$g = {
  name: "VFlyBox",
  props: {
    duration: {
      type: [Number, String],
      default: 3
    },
    lineColor: {
      type: String,
      default: "#235fa7"
    },
    starColor: {
      type: String,
      default: "#4fd2dd"
    },
    starLength: {
      type: [Number, String],
      default: 50
    }
  },

  setup(props) {
    const uuid = v4(); // svg适配需要动态获取dom，然后根据dom去计算path

    const width = ref(0);
    const height = ref(0);
    const flybox = ref();
    const borderid = `borderid-${uuid}`;
    const maskid = `mask-${uuid}`;
    const radialGradientId = `radialGradient-${uuid}`;
    const path = computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`);
    const dur = computed(() => `${props.duration}s`);

    const init = function () {
      let dom = flybox.value;
      width.value = dom.clientWidth;
      height.value = dom.clientHeight;
    };

    onMounted(() => {
      init();
    });
    return {
      radialGradientId,
      maskid,
      borderid,
      dur,
      flybox,
      width,
      height,
      path
    };
  }

};

const _withScopeId$3 = n => (pushScopeId("data-v-449c7e3b"), n = n(), popScopeId(), n);

const _hoisted_1$c = {
  class: "vdata-border-flybox",
  ref: "flybox"
};
const _hoisted_2$9 = ["width:", "height:"];
const _hoisted_3$5 = ["id", "d"];
const _hoisted_4$3 = ["id"];

const _hoisted_5$3 = /*#__PURE__*/_withScopeId$3(() => /*#__PURE__*/createElementVNode("stop", {
  offset: "0%",
  "stop-color": "#fff",
  "stop-opacity": "1"
}, null, -1
/* HOISTED */
));

const _hoisted_6$3 = /*#__PURE__*/_withScopeId$3(() => /*#__PURE__*/createElementVNode("stop", {
  offset: "100%",
  "stop-color": "#fff",
  "stop-opacity": "0"
}, null, -1
/* HOISTED */
));

const _hoisted_7$1 = [_hoisted_5$3, _hoisted_6$3];
const _hoisted_8$1 = ["id"];
const _hoisted_9$1 = ["r", "fill"];
const _hoisted_10$1 = ["path", "dur"];
const _hoisted_11$1 = ["href", "stroke"];
const _hoisted_12$1 = ["href", "stroke", "mask"];
const _hoisted_13$1 = {
  class: "content"
};
function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$c, [(openBlock(), createElementBlock("svg", {
    "width:": $setup.width,
    "height:": $setup.height
  }, [createElementVNode("defs", null, [createElementVNode("path", {
    id: $setup.borderid,
    fill: "none",
    d: $setup.path
  }, null, 8
  /* PROPS */
  , _hoisted_3$5), createElementVNode("radialGradient", {
    id: $setup.radialGradientId,
    r: "50%",
    cx: "50%",
    cy: "50%",
    fx: "100%",
    fy: "50%"
  }, _hoisted_7$1, 8
  /* PROPS */
  , _hoisted_4$3), createElementVNode("mask", {
    id: $setup.maskid
  }, [createElementVNode("circle", {
    r: $props.starLength,
    cx: "0",
    cy: "0",
    fill: `url(#${$setup.radialGradientId})`
  }, [createElementVNode("animateMotion", {
    path: $setup.path,
    dur: $setup.dur,
    repeatCount: "indefinite",
    rotate: "auto"
  }, null, 8
  /* PROPS */
  , _hoisted_10$1)], 8
  /* PROPS */
  , _hoisted_9$1)], 8
  /* PROPS */
  , _hoisted_8$1)]), createCommentVNode(" 背景 "), createElementVNode("use", {
    href: `#${$setup.borderid}`,
    "stroke-width": "1",
    stroke: $props.lineColor
  }, null, 8
  /* PROPS */
  , _hoisted_11$1), createCommentVNode(" 实际 "), createElementVNode("use", {
    href: `#${$setup.borderid}`,
    "stroke-width": "3",
    stroke: $props.starColor,
    mask: `url(#${$setup.maskid})`
  }, null, 8
  /* PROPS */
  , _hoisted_12$1)], 8
  /* PROPS */
  , _hoisted_2$9)), createElementVNode("div", _hoisted_13$1, [renderSlot(_ctx.$slots, "default")])], 512
  /* NEED_PATCH */
  );
}

var css_248z$b = ".vdata-border-flybox[data-v-449c7e3b] {\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  .vdata-border-flybox[data-v-449c7e3b] svg[data-v-449c7e3b] {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0; }\n  .vdata-border-flybox[data-v-449c7e3b] .content[data-v-449c7e3b] {\n    width: 100%;\n    height: 100%;\n    padding: 5px;\n    box-sizing: border-box; }\n";
styleInject(css_248z$b);

script$g.render = render$g;
script$g.__scopeId = "data-v-449c7e3b";
script$g.__file = "src/components/Border/FlyBox.vue";

var script$f = {
	name: "DoubleBox",
	props: {
		leftColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
		rightColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
		topColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
		bottomColor: {
			type: Array,
			default: ["#035f3c", " #16f03a"],
		},
	},
	setup() {
		return {};
	},
};

const _hoisted_1$b = {
  class: "btnAnimation"
};
const _hoisted_2$8 = {
  class: "btnAnimation-box"
};
function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$b, [createElementVNode("span", {
    class: "btnAnimation-span",
    style: normalizeStyle({
      background: `linear-gradient(to right, ${$props.topColor[0]}, ${$props.topColor[1]})`
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("span", {
    class: "btnAnimation-span",
    style: normalizeStyle({
      background: `linear-gradient(to right, ${$props.rightColor[0]}, ${$props.rightColor[1]})`
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("span", {
    class: "btnAnimation-span",
    style: normalizeStyle({
      background: `linear-gradient(to right, ${$props.bottomColor[0]}, ${$props.bottomColor[1]})`
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("span", {
    class: "btnAnimation-span",
    style: normalizeStyle({
      background: `linear-gradient(to right, ${$props.leftColor[0]}, ${$props.leftColor[1]})`
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("div", _hoisted_2$8, [renderSlot(_ctx.$slots, "default")])]);
}

var css_248z$a = ".btnAnimation[data-v-7289f2a7] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden; }\n\n.btnAnimation-box[data-v-7289f2a7] {\n  height: 100%;\n  width: 100%; }\n\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(1) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(to right, #035f3c, #16f03a);\n  animation: animate1-7289f2a7 2s linear infinite;\n  -webkit-animation: animate1-7289f2a7 2s linear infinite; }\n\n@keyframes animate1-7289f2a7 {\n  0% {\n    transform: translateX(-100%);\n    -webkit-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -o-transform: translateX(-100%); }\n  100% {\n    transform: translateX(100%);\n    -webkit-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -o-transform: translateX(100%); } }\n\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(2) {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(to bottom, #035f3c, #16f03a);\n  animation: animate2-7289f2a7 2s linear infinite;\n  -webkit-animation: animate2-7289f2a7 2s linear infinite;\n  animation-delay: 1s; }\n\n@keyframes animate2-7289f2a7 {\n  0% {\n    transform: translateY(-100%);\n    -webkit-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -o-transform: translateY(-100%); }\n  100% {\n    transform: translateY(100%);\n    -webkit-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -o-transform: translateX(100%); } }\n\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(3) {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(to left, #035f3c, #16f03a);\n  animation: animate3-7289f2a7 2s linear infinite;\n  -webkit-animation: animate3-7289f2a7 2s linear infinite; }\n\n@keyframes animate3-7289f2a7 {\n  0% {\n    transform: translateX(100%);\n    -webkit-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -o-transform: translateX(100%); }\n  100% {\n    transform: translateX(-100%);\n    -webkit-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -o-transform: translateX(-100%); } }\n\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(4) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(to top, #035f3c, #16f03a);\n  animation: animate4-7289f2a7 2s linear infinite;\n  -webkit-animation: animate4-7289f2a7 2s linear infinite;\n  animation-delay: 1s; }\n\n@keyframes animate4-7289f2a7 {\n  0% {\n    transform: translateY(100%);\n    -webkit-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -o-transform: translateY(100%); }\n  100% {\n    transform: translateY(-100%);\n    -webkit-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -o-transform: translateY(-100%); } }\n";
styleInject(css_248z$a);

script$f.render = render$f;
script$f.__scopeId = "data-v-7289f2a7";
script$f.__file = "src/components/Border/DoubleBox.vue";

var script$e = {
  name: "VBorderThree",

  data() {
    const timestamp = Date.now();
    return {
      width: 0,
      height: 0,
      svgStatus: false,
      ref: "border-box-9",
      gradientId: `border-box-9-gradient-${timestamp}`,
      maskId: `border-box-9-mask-${timestamp}`,
      defaultColor: ["#11eefd", "#0078d2"],
      mergedColor: ["#468ef4", "#0078d2"]
    };
  },

  mounted() {
    this.width = this.$refs[this.ref].clientWidth;
    this.height = this.$refs[this.ref].clientHeight;
    this.$nextTick(() => {
      this.svgStatus = true;
    });
  }

};

const _withScopeId$2 = n => (pushScopeId("data-v-3b192cab"), n = n(), popScopeId(), n);

const _hoisted_1$a = ["width", "height"];
const _hoisted_2$7 = ["id"];

const _hoisted_3$4 = /*#__PURE__*/_withScopeId$2(() => /*#__PURE__*/createElementVNode("animate", {
  attributeName: "x1",
  values: "0%;100%;0%",
  dur: "10s",
  begin: "0s",
  repeatCount: "indefinite"
}, null, -1
/* HOISTED */
));

const _hoisted_4$2 = /*#__PURE__*/_withScopeId$2(() => /*#__PURE__*/createElementVNode("animate", {
  attributeName: "x2",
  values: "100%;0%;100%",
  dur: "10s",
  begin: "0s",
  repeatCount: "indefinite"
}, null, -1
/* HOISTED */
));

const _hoisted_5$2 = ["stop-color"];
const _hoisted_6$2 = ["values"];
const _hoisted_7 = ["stop-color"];
const _hoisted_8 = ["values"];
const _hoisted_9 = ["id"];
const _hoisted_10 = ["points"];
const _hoisted_11 = ["points"];
const _hoisted_12 = ["points"];
const _hoisted_13 = ["points"];
const _hoisted_14 = ["points"];
const _hoisted_15 = ["points"];
const _hoisted_16 = ["points"];
const _hoisted_17 = ["points"];
const _hoisted_18 = ["points"];
const _hoisted_19 = ["width", "height", "fill", "mask"];
const _hoisted_20 = {
  class: "border-box-content"
};
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "dv-border-box-9",
    ref: $data.ref
  }, [$data.svgStatus ? (openBlock(), createElementBlock("svg", {
    key: 0,
    class: "dv-svg-container",
    width: $data.width,
    height: $data.height
  }, [createElementVNode("defs", null, [createElementVNode("linearGradient", {
    id: $data.gradientId,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, [_hoisted_3$4, _hoisted_4$2, createElementVNode("stop", {
    offset: "0%",
    "stop-color": $data.mergedColor[0]
  }, [createElementVNode("animate", {
    attributeName: "stop-color",
    values: `${$data.mergedColor[0]};${$data.mergedColor[1]};${$data.mergedColor[0]}`,
    dur: "10s",
    begin: "0s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_6$2)], 8
  /* PROPS */
  , _hoisted_5$2), createElementVNode("stop", {
    offset: "100%",
    "stop-color": $data.mergedColor[1]
  }, [createElementVNode("animate", {
    attributeName: "stop-color",
    values: `${$data.mergedColor[1]};${$data.mergedColor[0]};${$data.mergedColor[1]}`,
    dur: "10s",
    begin: "0s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_8)], 8
  /* PROPS */
  , _hoisted_7)], 8
  /* PROPS */
  , _hoisted_2$7), createElementVNode("mask", {
    id: $data.maskId
  }, [createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: `8, ${$data.height * 0.4} 8, 3, ${$data.width * 0.4 + 7}, 3`
  }, null, 8
  /* PROPS */
  , _hoisted_10), createElementVNode("polyline", {
    fill: "#fff",
    points: `8, ${$data.height * 0.15} 8, 3, ${$data.width * 0.1 + 7}, 3
              ${$data.width * 0.1}, 8 14, 8 14, ${$data.height * 0.15 - 7}
            `
  }, null, 8
  /* PROPS */
  , _hoisted_11), createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: `${$data.width * 0.5}, 3 ${$data.width - 3}, 3, ${$data.width - 3}, ${$data.height * 0.25}`
  }, null, 8
  /* PROPS */
  , _hoisted_12), createElementVNode("polyline", {
    fill: "#fff",
    points: `
              ${$data.width * 0.52}, 3 ${$data.width * 0.58}, 3
              ${$data.width * 0.58 - 7}, 9 ${$data.width * 0.52 + 7}, 9
            `
  }, null, 8
  /* PROPS */
  , _hoisted_13), createElementVNode("polyline", {
    fill: "#fff",
    points: `
              ${$data.width * 0.9}, 3 ${$data.width - 3}, 3 ${$data.width - 3}, ${$data.height * 0.1}
              ${$data.width - 9}, ${$data.height * 0.1 - 7} ${$data.width - 9}, 9 ${$data.width * 0.9 + 7}, 9
            `
  }, null, 8
  /* PROPS */
  , _hoisted_14), createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: `8, ${$data.height * 0.5} 8, ${$data.height - 3} ${$data.width * 0.3 + 7}, ${$data.height - 3}`
  }, null, 8
  /* PROPS */
  , _hoisted_15), createElementVNode("polyline", {
    fill: "#fff",
    points: `
              8, ${$data.height * 0.55} 8, ${$data.height * 0.7}
              2, ${$data.height * 0.7 - 7} 2, ${$data.height * 0.55 + 7}
            `
  }, null, 8
  /* PROPS */
  , _hoisted_16), createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: `${$data.width * 0.35}, ${$data.height - 3} ${$data.width - 3}, ${$data.height - 3} ${$data.width - 3}, ${$data.height * 0.35}`
  }, null, 8
  /* PROPS */
  , _hoisted_17), createElementVNode("polyline", {
    fill: "#fff",
    points: `
              ${$data.width * 0.92}, ${$data.height - 3} ${$data.width - 3}, ${$data.height - 3} ${$data.width - 3}, ${$data.height * 0.8}
              ${$data.width - 9}, ${$data.height * 0.8 + 7} ${$data.width - 9}, ${$data.height - 9} ${$data.width * 0.92 + 7}, ${$data.height - 9}
            `
  }, null, 8
  /* PROPS */
  , _hoisted_18)], 8
  /* PROPS */
  , _hoisted_9)]), createElementVNode("rect", {
    x: "0",
    y: "0",
    width: $data.width,
    height: $data.height,
    fill: `url(#${$data.gradientId})`,
    mask: `url(#${$data.maskId})`
  }, null, 8
  /* PROPS */
  , _hoisted_19)], 8
  /* PROPS */
  , _hoisted_1$a)) : createCommentVNode("v-if", true), createElementVNode("div", _hoisted_20, [renderSlot(_ctx.$slots, "default")])], 512
  /* NEED_PATCH */
  );
}

var css_248z$9 = "\n.dv-border-box-9[data-v-3b192cab] {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\n}\nsvg[data-v-3b192cab] {\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tleft: 0px;\r\n\ttop: 0px;\n}\n.border-box-content[data-v-3b192cab] {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\n}\r\n";
styleInject(css_248z$9);

script$e.render = render$e;
script$e.__scopeId = "data-v-3b192cab";
script$e.__file = "src/components/Border/three.vue";

function Border (Vue) {
  Vue.component(script$g.name, script$g);
  Vue.component(script$f.name, script$f);
  Vue.component(script$e.name, script$e);
}

var script$d = {
  name: "VEcharts",
  props: {
    options: Object,
    // 主题
    theme: {
      type: [Object, String],
      default: ""
    },
    // 适配 默认300*150
    open: {
      type: Boolean,
      default: false
    },
    // svg or canvas
    type: {
      type: Object,
      default: {
        renderer: "canvas"
      }
    },
    animation: {
      type: Object
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    loadingConfig: {
      type: Object,
      default: {
        text: "loading",
        color: "#fff",
        textColor: "#fff",
        maskColor: "rgba(0, 0, 0, 0.1)",
        zlevel: 0,
        // 字体大小。从 `v4.8.0` 开始支持。
        fontSize: 12,
        // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
        showSpinner: true,
        // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
        spinnerRadius: 10,
        // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
        lineWidth: 5,
        // 字体粗细。从 `v5.0.1` 开始支持。
        fontWeight: "normal",
        // 字体风格。从 `v5.0.1` 开始支持。
        fontStyle: "normal",
        // 字体系列。从 `v5.0.1` 开始支持。
        fontFamily: "sans-serif"
      }
    }
  },

  setup(props) {
    let dom = ref();
    let charts = null; //animation

    let dataIndex = -1;
    let timerObj = null;
    let defaultAnimationConfig = {
      open: false,
      time: 3000,
      highlight: true,
      showTip: false
    };
    watch(() => props.isLoading, () => {
      if (props.isLoading) charts?.showLoading("default", props.loadingConfig);else charts?.hideLoading();
    });
    watch(() => props.options, () => {
      charts?.setOption(props.options);
    }, {
      deep: true
    });

    const onResize = function () {
      charts?.resize();
    };

    const ani = function (timer) {
      timerObj = setInterval(() => {
        charts?.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex
        }); // props.options  图例会有问题

        if (!props.options.series) return;
        dataIndex = (dataIndex + 1) % props.options.series[0].data.length;

        if (defaultAnimationConfig.highlight) {
          charts?.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex
          });
        }

        if (defaultAnimationConfig.showTip) {
          charts?.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex
          });
        }
      }, timer);
    };

    onMounted(() => {
      let _dom = dom.value;

      if (!props.open) {
        _dom.style.height = "150px";
        _dom.style.width = "300px";
      } else {
        _dom.style.height = "100%";
        _dom.style.width = "100%";
      }

      charts = Echarts.init(_dom, props.theme, props.type);
      charts.setOption(props.options);
      window.addEventListener("resize", onResize);
      Object.assign(defaultAnimationConfig, props.animation);

      if (defaultAnimationConfig.open) {
        ani(defaultAnimationConfig.time);
      }
    });
    onUnmounted(() => {
      clearInterval(timerObj);
      window.removeEventListener("resize", onResize);
    });
    return {
      dom,
      charts
    };
  }

};

const _hoisted_1$9 = {
  class: "echats",
  ref: "dom"
};
function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$9, null, 512
  /* NEED_PATCH */
  );
}

script$d.render = render$d;
script$d.__file = "src/components/VueEcharts/VueEcharts.vue";

function VueEcharts (Vue) {
  Vue.component(script$d.name, script$d);
}

let lastTime = 0;
const prefixes = 'webkit moz ms o'.split(' '); // 各浏览器前缀

let requestAnimationFrame;
let cancelAnimationFrame;
const isServer = typeof window === 'undefined';

if (isServer) {
  requestAnimationFrame = function () {};

  cancelAnimationFrame = function () {};
} else {
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;
  let prefix; // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式

  for (let i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
      break;
    }

    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
    cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
  } // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout


  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function (callback) {
      const currTime = new Date().getTime(); // 为了使setTimteout的尽可能的接近每秒60帧的效果

      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    cancelAnimationFrame = function (id) {
      window.clearTimeout(id);
    };
  }
}

var script$c = {
	name: "VueCountTo",
	props: {
		startVal: {
			type: Number,
			default: 0,
		},
		endVal: {
			type: Number,
			default: 2022,
		},
		duration: {
			type: Number,
			default: 3000,
		},
		autoplay: {
			type: Boolean,
			default: true,
		},
		decimals: {
			type: Number,
			required: false,
			default: 0,
			validator(value) {
				return value >= 0;
			},
		},
		decimal: {
			type: String,
			required: false,
			default: ".",
		},
		separator: {
			type: String,
			default: ",",
		},
		prefix: {
			type: String,
			default: "",
		},
		suffix: {
			type: String,
			default: "",
		},
		useEasing: {
			type: Boolean,
			default: true,
		},
		easingFn: {
			type: Function,
			default(t, b, c, d) {
				return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
			},
		},
	},
	setup(props, { emit }) {
		let state = reactive({
			displayValue: formatNumber(
				props.startVal,
				props.decimals,
				props.decimal,
				props.separator,
				props.prefix,
				props.suffix
			),
			localStartVal: props.startVal,
			printVal: null,
			paused: false,
			localDuration: props.duration,
			startTime: null,
			timestamp: null,
			remaining: null,
			rAF: null,
		});
		const countDown = computed(() => {
			return props.startVal > props.endVal;
		});
		const count = function (timestamp) {
			if (!state.startTime) state.startTime = timestamp;
			state.timestamp = timestamp;
			// 进度时间
			const progress = timestamp - state.startTime;
			// 剩余时间
			state.remaining = state.localDuration - progress;
			if (props.useEasing) {
				if (countDown.value) {
					state.printVal =
						state.localStartVal -
						props.easingFn(
							progress,
							0,
							state.localStartVal - props.endVal,
							state.localDuration
						);
				} else {
					state.printVal = props.easingFn(
						progress,
						state.localStartVal,
						props.endVal - state.localStartVal,
						state.localDuration
					);
				}
			} else {
				if (countDown.value) {
					// 核心
					// value = start - (start - end) * (dt/time)【执行的time】
					state.printVal =
						state.localStartVal -
						(state.localStartVal - props.endVal) *
							(progress / state.localDuration);
				} else {
					state.printVal =
						state.localStartVal +
						(props.endVal - state.localStartVal) *
							(progress / state.localDuration);
				}
			}
			if (countDown.value) {
				state.printVal =
					state.printVal < props.endVal ? props.endVal : state.printVal;
			} else {
				state.printVal =
					state.printVal > props.endVal ? props.endVal : state.printVal;
			}

			state.displayValue = formatNumber(
				state.printVal,
				props.decimals,
				props.decimal,
				props.separator,
				props.prefix,
				props.suffix
			);

			if (progress < state.localDuration) {
				state.rAF = requestAnimationFrame(count);
			} else {
				emit("callback");
			}
		};
		const start = function () {
			state.localStartVal = props.startVal;
			state.startTime = null;
			state.localDuration = props.duration;
			state.paused = false;
			state.rAF = requestAnimationFrame(count);
		};
		watch(
			() => [props.start, props.end],
			() => {
				if (props.autoplay) {
					start();
				}
			}
		);

		const pause = function () {
			//  暂停
			cancelAnimationFrame(state.rAF);
		};
		const reset = function () {
			// 重置
			state.startTime = null;
			cancelAnimationFrame(state.rAF);
			state.displayValue = formatNumber(
				props.startVal,
				props.decimals,
				props.decimal,
				props.separator,
				props.prefix,
				props.suffix
			);
		};
		const resume = function () {
			// 恢复
			state.startTime = null;
			state.localDuration = +state.remaining;
			state.localStartVal = +state.printVal;
			requestAnimationFrame(count);
		};

		onMounted(() => {
			if (props.autoplay) {
				start();
			}
			emit("mountedCallback");
		});
		onUnmounted(() => {
			state.rAF && cancelAnimationFrame(state.rAF);
		});
		return {
			pause,
			reset,
			resume,
			...toRefs(state),
		};
	},
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, toDisplayString(_ctx.displayValue), 1
  /* TEXT */
  );
}

script$c.render = render$c;
script$c.__file = "src/components/VueCountTo/VueCountTo.vue";

function VueCountTo (Vue) {
  Vue.component(script$c.name, script$c);
}

function useScreen(dom) {
  let width = 0;
  let height = 0;
  width = dom.clientWidth;
  height = dom.clientHeight;
  return {
    width,
    height
  };
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$3(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$3;

var eq$2 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$2(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;

var _ListCache = ListCache$4;

var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3;
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$8 = freeGlobal || freeSelf || Function('return this')();

var _root = root$8;

var root$7 = _root;

/** Built-in value references. */
var Symbol$3 = root$7.Symbol;

var _Symbol = Symbol$3;

var Symbol$2 = _Symbol;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$d.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$c = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$c.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$4(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$4;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$6(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$6;

var baseGetTag$3 = _baseGetTag,
    isObject$5 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$5(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$3(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$2;

var root$6 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$6['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var isFunction$1 = isFunction_1,
    isMasked = _isMasked,
    isObject$4 = isObject_1,
    toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$b = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$4(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$7;

var getNative$6 = _getNative,
    root$5 = _root;

/* Built-in method references that are verified to be native. */
var Map$3 = getNative$6(root$5, 'Map');

var _Map = Map$3;

var getNative$5 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$5(Object, 'create');

var _nativeCreate = nativeCreate$4;

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

var Hash = _Hash,
    ListCache$2 = _ListCache,
    Map$2 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$2 || ListCache$2),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var ListCache$1 = _ListCache,
    Map$1 = _Map,
    MapCache = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$1.prototype.clear = stackClear;
Stack$1.prototype['delete'] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;

var _Stack = Stack$1;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

function arrayEach$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach$1;

var getNative$4 = _getNative;

var defineProperty$2 = (function() {
  try {
    var func = getNative$4(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$2;

var defineProperty$1 = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$2(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$2;

var baseAssignValue$1 = _baseAssignValue,
    eq$1 = eq_1;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$3(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq$1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$1(object, key, value);
  }
}

var _assignValue = assignValue$3;

var assignValue$2 = _assignValue,
    baseAssignValue = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$5(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$2(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject$5;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$5(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$5;

var baseGetTag$2 = _baseGetTag,
    isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$3 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$3(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments$1;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$3 = Array.isArray;

var isArray_1 = isArray$3;

var isBuffer$2 = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

(function (module, exports) {
var root = _root,
    stubFalse = stubFalse_1;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
}(isBuffer$2, isBuffer$2.exports));

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$2;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$2(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength$2;

var baseGetTag$1 = _baseGetTag,
    isLength$1 = isLength_1,
    isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$2(value) &&
    isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$3;

var _nodeUtil = {exports: {}};

(function (module, exports) {
var freeGlobal = _freeGlobal;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
}(_nodeUtil, _nodeUtil.exports));

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary$2 = _baseUnary,
    nodeUtil$2 = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$1 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$1;

var baseTimes = _baseTimes,
    isArguments = isArguments_1,
    isArray$2 = isArray_1,
    isBuffer$1 = isBuffer$2.exports,
    isIndex$1 = _isIndex,
    isTypedArray = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$2(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$1(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$2;

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$4(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

var _isPrototype = isPrototype$4;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$2;

var overArg$1 = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg$1(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype$3 = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype$3(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var isFunction = isFunction_1,
    isLength = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$4(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

var isArrayLike_1 = isArrayLike$4;

var arrayLikeKeys$1 = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$3 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$4(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}

var keys_1 = keys$4;

var copyObject$4 = _copyObject,
    keys$3 = keys_1;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign$1(object, source) {
  return object && copyObject$4(source, keys$3(source), object);
}

var _baseAssign = baseAssign$1;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn$1;

var isObject$3 = isObject_1,
    isPrototype$2 = _isPrototype,
    nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$3(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$2(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn$1;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeysIn = _baseKeysIn,
    isArrayLike$2 = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$3(object) {
  return isArrayLike$2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

var keysIn_1 = keysIn$3;

var copyObject$3 = _copyObject,
    keysIn$2 = keysIn_1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn$1(object, source) {
  return object && copyObject$3(source, keysIn$2(source), object);
}

var _baseAssignIn = baseAssignIn$1;

var _cloneBuffer = {exports: {}};

(function (module, exports) {
var root = _root;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
}(_cloneBuffer, _cloneBuffer.exports));

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$1(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$1;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter$1;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray$2() {
  return [];
}

var stubArray_1 = stubArray$2;

var arrayFilter = _arrayFilter,
    stubArray$1 = stubArray_1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols$3;

var copyObject$2 = _copyObject,
    getSymbols$2 = _getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols$1(source, object) {
  return copyObject$2(source, getSymbols$2(source), object);
}

var _copySymbols = copySymbols$1;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$2(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$2;

var overArg = _overArg;

/** Built-in value references. */
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$2;

var arrayPush$1 = _arrayPush,
    getPrototype$1 = _getPrototype,
    getSymbols$1 = _getSymbols,
    stubArray = stubArray_1;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn$2;

var copyObject$1 = _copyObject,
    getSymbolsIn$1 = _getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn$1(source, object) {
  return copyObject$1(source, getSymbolsIn$1(source), object);
}

var _copySymbolsIn = copySymbolsIn$1;

var arrayPush = _arrayPush,
    isArray$1 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$2;

var baseGetAllKeys$1 = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys$2 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$2, getSymbols);
}

var _getAllKeys = getAllKeys$1;

var baseGetAllKeys = _baseGetAllKeys,
    getSymbolsIn = _getSymbolsIn,
    keysIn$1 = keysIn_1;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn$1;

var getNative$3 = _getNative,
    root$4 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$3(root$4, 'DataView');

var _DataView = DataView$1;

var getNative$2 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$2(root$3, 'Promise');

var _Promise = Promise$2;

var getNative$1 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$1(root$2, 'Set');

var _Set = Set$1;

var getNative = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root$1, 'WeakMap');

var _WeakMap = WeakMap$1;

var DataView = _DataView,
    Map = _Map,
    Promise$1 = _Promise,
    Set = _Set,
    WeakMap = _WeakMap,
    baseGetTag = _baseGetTag,
    toSource = _toSource;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$3 = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map && getTag$3(new Map) != mapTag$3) ||
    (Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag$3(new Set) != setTag$3) ||
    (WeakMap && getTag$3(new WeakMap) != weakMapTag$1)) {
  getTag$3 = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$3;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$3;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag$3;

/** Used for built-in method references. */

var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray$1(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray$1;

var root = _root;

/** Built-in value references. */
var Uint8Array$2 = root.Uint8Array;

var _Uint8Array = Uint8Array$2;

var Uint8Array$1 = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer$3;

var cloneArrayBuffer$2 = _cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView$1;

/** Used to match `RegExp` flags from their coerced string values. */

var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp$1;

var Symbol = _Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol$1;

var cloneArrayBuffer$1 = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray$1;

var cloneArrayBuffer = _cloneArrayBuffer,
    cloneDataView = _cloneDataView,
    cloneRegExp = _cloneRegExp,
    cloneSymbol = _cloneSymbol,
    cloneTypedArray = _cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag$1;

var isObject$2 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$2(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate$1;

var baseCreate = _baseCreate,
    getPrototype = _getPrototype,
    isPrototype$1 = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$1(object) {
  return (typeof object.constructor == 'function' && !isPrototype$1(object))
    ? baseCreate(getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject$1;

var getTag$2 = _getTag,
    isObjectLike$1 = isObjectLike_1;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$2(value) == mapTag$1;
}

var _baseIsMap = baseIsMap$1;

var baseIsMap = _baseIsMap,
    baseUnary$1 = _baseUnary,
    nodeUtil$1 = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;

var isMap_1 = isMap$1;

var getTag$1 = _getTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet$1(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}

var _baseIsSet = baseIsSet$1;

var baseIsSet = _baseIsSet,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

var isSet_1 = isSet$1;

var Stack = _Stack,
    arrayEach = _arrayEach,
    assignValue$1 = _assignValue,
    baseAssign = _baseAssign,
    baseAssignIn = _baseAssignIn,
    cloneBuffer = _cloneBuffer.exports,
    copyArray = _copyArray,
    copySymbols = _copySymbols,
    copySymbolsIn = _copySymbolsIn,
    getAllKeys = _getAllKeys,
    getAllKeysIn = _getAllKeysIn,
    getTag = _getTag,
    initCloneArray = _initCloneArray,
    initCloneByTag = _initCloneByTag,
    initCloneObject = _initCloneObject,
    isArray = isArray_1,
    isBuffer = isBuffer$2.exports,
    isMap = isMap_1,
    isObject$1 = isObject_1,
    isSet = isSet_1,
    keys$1 = keys_1,
    keysIn = keysIn_1;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$1,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys$1);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue$1(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone$1;

var baseClone = _baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

var cloneDeep_1 = cloneDeep;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$2(value) {
  return value;
}

var identity_1 = identity$2;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$1(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$1;

var constant = constant_1,
    defineProperty = _defineProperty,
    identity$1 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var identity = identity_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest$1;

var eq = eq_1,
    isArrayLike$1 = isArrayLike_1,
    isIndex = _isIndex,
    isObject = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike$1(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$1;

var baseRest = _baseRest,
    isIterateeCall = _isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner$1;

var assignValue = _assignValue,
    copyObject = _copyObject,
    createAssigner = _createAssigner,
    isArrayLike = isArrayLike_1,
    isPrototype = _isPrototype,
    keys = keys_1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

var assign_1 = assign;

const defaultConfig$1 = {
  // 标题数据
  headerData: [],
  // 标题样式
  headerStyle: [],
  // 标题背景
  headerBg: "rgb(90,90,90)",
  // 标题高度
  headerHeight: "35",
  // 标题是否展示序号
  headerIndex: false,
  // 展示的序号内容
  headerIndexContent: "#",
  // 序号内容的样式
  headerIndexStyle: {
    width: "50px"
  },
  // 序号列数据内容
  headerIndexData: [],
  // 数据项,二维数组
  data: [],
  // 每页显示的数据条数
  rowNum: 10,
  // 行样式
  rowStyle: [],
  // 行序号内容的样式
  rowIndexStyle: {
    width: "50px"
  },
  // 行背景
  rowBg: [],
  // 内容居中方式
  aligns: [],
  headerFontSize: 24,
  rowFontSize: 20,
  headerColor: "#fff",
  rowColor: "#000",
  moveNum: 1,
  // 每次移动几条数据的位置
  duration: 2000 // 动画间隔

};
var script$b = {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  setup(props) {
    let dom = ref();
    const actualConfig = ref([]);
    const headerDataVal = ref([]);
    const headerStyleVal = ref([]);
    const rowsData = ref([]);
    const rowStyle = ref([]);
    const currentRowsData = ref([]);
    const currentIndex = ref(0); // 动画指针

    const columnWidths = ref([]);
    const aligns = ref([]);
    const domWidth = ref(0);
    const domHeight = ref(0);
    const rowNum = ref(0);
    const rowHeights = ref([]);
    const rowBg = ref([]);
    let avgHeight;
    const isAnimationStart = ref(true);

    const handleHeader = config => {
      const _headerData = cloneDeep_1(config.headerData);

      const _headerStyle = cloneDeep_1(config.headerStyle);

      const _rowStyle = cloneDeep_1(config.rowStyle);

      const _rowsData = cloneDeep_1(config.data); // 获取居中方式


      const _aligns = cloneDeep_1(config.aligns);

      if (config.headerData.length <= 0) return;

      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent);

        _headerStyle.unshift(config.headerIndexStyle);

        _rowStyle.unshift(config.rowIndexStyle); // 二维数组


        _rowsData.forEach((rows, index) => {
          // 处理序号列数据
          if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index]) {
            rows.unshift(config.headerIndexData[index]);
          } else {
            rows.unshift(index + 1);
          }
        });

        _aligns.unshift("center");
      }

      headerDataVal.value = _headerData;
      headerStyleVal.value = _headerStyle; // columnWidths.value = _columnWidths;

      rowStyle.value = _rowStyle;
      aligns.value = _aligns; // 动态计算header中每一列的宽度

      let usedWidth = 0;
      let usedColumnNum = 0; // 判断是否存在自定义width

      _headerStyle.forEach(style => {
        if (style.width) {
          usedWidth += Number(style.width.replace("px", ""));
          usedColumnNum++;
        }
      }); // 动态计算列宽时，使用剩余未定义的宽度除以剩余的列数


      const avgWidth = (domWidth.value - usedWidth) / (_headerData.length - usedColumnNum);

      const _columnWidths = new Array(_headerData.length).fill(avgWidth);

      _headerStyle.forEach((style, index) => {
        if (style.width) {
          const headerWidth = Number(style.width.replace("px", ""));
          _columnWidths[index] = headerWidth;
        }
      });

      columnWidths.value = _columnWidths;
      const {
        rowNum
      } = config;

      if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
        const newRowData = [..._rowsData, ..._rowsData];
        rowsData.value = newRowData.map((item, index) => ({
          data: item,
          rowIndex: index
        }));
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index
        }));
      }
    };

    const handleRows = config => {
      // 动态计算每行数据的高度
      const {
        headerHeight
      } = config;
      const unusedHeight = domHeight.value - headerHeight;
      rowNum.value = config.rowNum; // 如果rowNum大于实际数据长度，则以实际数据长度为准

      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length;
      }

      avgHeight = unusedHeight / rowNum.value;
      rowHeights.value = new Array(rowNum.value).fill(avgHeight); // 获取行背景色

      if (config.rowBg) {
        rowBg.value = config.rowBg;
      }
    };

    const startAnimation = async () => {
      if (!isAnimationStart.value) {
        return;
      }

      const config = actualConfig.value;
      const {
        rowNum,
        moveNum,
        duration
      } = config;
      const totalLength = rowsData.value.length;
      if (totalLength < rowNum) return; // 动画索引

      const index = currentIndex.value; // 表格数据

      const _rowsData = cloneDeep_1(rowsData.value); // 数据重新头尾连接


      const rows = _rowsData.slice(index);

      rows.push(..._rowsData.slice(0, index));
      currentRowsData.value = rows; // 动画start
      // 先将所有行的高度还原

      rowHeights.value = new Array(totalLength).fill(avgHeight);
      const waitTime = 300;

      if (!isAnimationStart.value) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, waitTime)); // 将moveNum的行高度设置0
      // 这里splice将指定元素删除并替换

      rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
      currentIndex.value += moveNum; // 动画end
      // 判断是否到达最后一组数据

      const isLast = currentIndex.value - totalLength;

      if (isLast >= 0) {
        currentIndex.value = isLast;
      }

      if (!isAnimationStart.value) {
        return;
      } // sleep


      await new Promise(resolve => setTimeout(resolve, duration - waitTime));
      await startAnimation();
    };

    const stopAnimation = () => {
      isAnimationStart.value = false;
    };

    const update = function () {
      stopAnimation();
      let {
        width,
        height
      } = useScreen(dom.value);
      domWidth.value = width;
      domHeight.value = height;

      const _actualConfig = assign_1(defaultConfig$1, props.config);

      rowsData.value = _actualConfig.data || [];
      handleHeader(_actualConfig);
      handleRows(_actualConfig);
      actualConfig.value = _actualConfig;
      isAnimationStart.value = true;
      startAnimation();
    };

    watch(() => props.config, () => {
      nextTick(() => {
        update();
      });
    }, {
      immediate: true
    });
    onMounted(() => {});
    return {
      dom,
      columnWidths,
      actualConfig,
      currentRowsData,
      headerDataVal,
      headerStyleVal,
      rowsData,
      rowStyle,
      rowHeights,
      rowBg,
      aligns,
      domHeight
    };
  }

};

const _hoisted_1$8 = {
  class: "base-scroll-list",
  ref: "dom"
};
const _hoisted_2$6 = ["align", "innerHTML"];
const _hoisted_3$3 = ["align", "innerHTML"];
function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [createElementVNode("div", {
    class: "base-scroll-list-header",
    style: normalizeStyle({
      background: $setup.actualConfig.headerBg,
      height: `${$setup.actualConfig.headerHeight}px`,
      fontSize: `${$setup.actualConfig.headerFontSize}px`,
      color: $setup.actualConfig.headerColor
    })
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.headerDataVal, (headerItem, i) => {
    return openBlock(), createElementBlock("div", {
      class: "header-item base-scroll-list-text",
      key: headerItem + i,
      style: normalizeStyle({ ...$setup.headerStyleVal[i],
        width: `${$setup.columnWidths[i]}px`
      }),
      align: $setup.aligns[i],
      innerHTML: headerItem
    }, null, 12
    /* STYLE, PROPS */
    , _hoisted_2$6);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 4
  /* STYLE */
  ), createElementVNode("div", {
    class: "base-scroll-list-rows-wrapper",
    style: normalizeStyle({
      height: `${$setup.domHeight - $setup.actualConfig.headerHeight}px`
    })
  }, [createCommentVNode(" key必须是rowData.rowIndex既然唯一性否则会出现渲染错乱 "), (openBlock(true), createElementBlock(Fragment, null, renderList($setup.currentRowsData, (rowData, index) => {
    return openBlock(), createElementBlock("div", {
      class: "base-scroll-list-rows",
      style: normalizeStyle({
        height: `${$setup.rowHeights[index]}px`,
        lineHeight: `${$setup.rowHeights[index]}px`,
        background: rowData.rowIndex % 2 ? $setup.rowBg[1] : $setup.rowBg[0],
        fontSize: `${$setup.actualConfig.rowFontSize}px`,
        color: $setup.actualConfig.rowColor
      }),
      key: rowData
    }, [(openBlock(true), createElementBlock(Fragment, null, renderList(rowData.data, (colData, colIndex) => {
      return openBlock(), createElementBlock("div", {
        class: "base-scroll-list-columns base-scroll-list-text",
        style: normalizeStyle({
          width: `${$setup.columnWidths[colIndex]}px`,
          ...$setup.rowStyle[colIndex]
        }),
        align: $setup.aligns[colIndex],
        innerHTML: colData
      }, null, 12
      /* STYLE, PROPS */
      , _hoisted_3$3);
    }), 256
    /* UNKEYED_FRAGMENT */
    ))], 4
    /* STYLE */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))], 4
  /* STYLE */
  )], 512
  /* NEED_PATCH */
  );
}

var css_248z$8 = ".base-scroll-list[data-v-69eed30f] {\n  height: 100%; }\n  .base-scroll-list[data-v-69eed30f] .base-scroll-list-text[data-v-69eed30f] {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    box-sizing: border-box; }\n  .base-scroll-list[data-v-69eed30f] .base-scroll-list-header[data-v-69eed30f] {\n    display: flex;\n    font-size: 15px;\n    align-items: center; }\n  .base-scroll-list[data-v-69eed30f] .base-scroll-list-rows-wrapper[data-v-69eed30f] {\n    overflow: hidden; }\n    .base-scroll-list[data-v-69eed30f] .base-scroll-list-rows-wrapper[data-v-69eed30f] .base-scroll-list-rows[data-v-69eed30f] {\n      display: flex;\n      align-items: center;\n      transition: all 0.3s linear; }\n      .base-scroll-list[data-v-69eed30f] .base-scroll-list-rows-wrapper[data-v-69eed30f] .base-scroll-list-rows[data-v-69eed30f] .base-scroll-list-columns[data-v-69eed30f] {\n        height: 100%; }\n";
styleInject(css_248z$8);

script$b.render = render$b;
script$b.__scopeId = "data-v-69eed30f";
script$b.__file = "src/components/BaseScrollList/BaseScrollList.vue";

function BaseScrollList (Vue) {
  Vue.component(script$b.name, script$b);
}

var script$a = {
  name: "TransformCategory",
  props: {
    data: Array,
    color: {
      type: Array,

      default() {
        return ["rgb(140, 160, 173)", "rgb(80, 80, 80)"];
      }

    }
  },
  emits: ["click"],

  setup(props, {
    emit
  }) {
    const selected = ref(0);
    const hover = ref(-1);
    let task;

    const onClick = index => {
      selected.value = index;
      emit("click", index);
    };

    const onMounseEnter = index => {
      hover.value = index;
    };

    const onMounseLeave = index => {
      hover.value = -1;
    };

    const update = () => {
      task && clearInterval(task);
      task = setInterval(() => {
        if (selected.value + 1 > props.data.length - 1) {
          selected.value = 0;
        } else {
          selected.value += 1;
        }
      }, 2000);
    };

    onMounted(update);
    onUnmounted(() => {
      task && clearInterval(task);
    });
    return {
      selected,
      hover,
      onClick,
      onMounseEnter,
      onMounseLeave
    };
  }

};

const _hoisted_1$7 = {
  class: "country-category"
};
const _hoisted_2$5 = ["onClick", "onMouseenter", "onMouseleave", "onMousemove"];
const _hoisted_3$2 = {
  key: 2
};
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.data, (item, index) => {
    return openBlock(), createElementBlock("div", {
      class: "category",
      key: item,
      onClick: $event => $setup.onClick(index),
      onMouseenter: $event => $setup.onMounseEnter(index),
      onMouseleave: $event => $setup.onMounseLeave(index),
      onMousemove: $event => $setup.onMounseEnter(index)
    }, [index === $setup.selected ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "selected",
      style: normalizeStyle({
        background: $props.color[0]
      })
    }, toDisplayString(item), 5
    /* TEXT, STYLE */
    )) : index === $setup.hover ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "hovered",
      style: normalizeStyle({
        background: $props.color[1]
      })
    }, toDisplayString(item), 5
    /* TEXT, STYLE */
    )) : (openBlock(), createElementBlock("div", _hoisted_3$2, toDisplayString(item), 1
    /* TEXT */
    ))], 40
    /* PROPS, HYDRATE_EVENTS */
    , _hoisted_2$5);
  }), 128
  /* KEYED_FRAGMENT */
  ))]);
}

var css_248z$7 = ".country-category[data-v-0ce021a5] {\n  display: flex;\n  width: 100%;\n  height: 100%; }\n  .country-category[data-v-0ce021a5] .category[data-v-0ce021a5] {\n    flex: 1;\n    background: #353941;\n    font-size: 24px;\n    color: #90a0ae; }\n    .country-category[data-v-0ce021a5] .category[data-v-0ce021a5] .hovered[data-v-0ce021a5] {\n      background: #505050;\n      color: #ffffff; }\n    .country-category[data-v-0ce021a5] .category[data-v-0ce021a5] .selected[data-v-0ce021a5] {\n      background: #8ca0ad;\n      color: #fff; }\n    .country-category[data-v-0ce021a5] .category[data-v-0ce021a5] div[data-v-0ce021a5] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 100%;\n      height: 100%; }\n";
styleInject(css_248z$7);

script$a.render = render$a;
script$a.__scopeId = "data-v-0ce021a5";
script$a.__file = "src/components/TransformCategory/TransformCategory.vue";

function TransformCategory (Vue) {
  Vue.component(script$a.name, script$a);
}

const request = function ({
  url,
  methods = 'post',
  data,
  headers = {}
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(methods, url);
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.send(data);

    xhr.onload = function (e) {
      resolve({
        data: e.target.response
      });
    };
  });
}; //ajax设置请求头 setRequestHeader(key,value)
// onload和onreadystatechange 区别
// 只要进入onload请求中，一定是已经到4这个状态

const defaultConfig = {
	// 切片大小
	SIZE: 10 * 1024 * 1024,
	// 上传url
	url: "",
	data: [],
	chunk: "chunk",
	hash: "hash",
	filename: "filename",
	// 合并url
	urlMerge: "",
	headerMerge: {
		"content-type": "application/json",
	},
	dataMerge: {},
};
var script$9 = {
	name: "Upload",
	props: {
		config: {
			type: Object,
		},
	},
	emits: ["handleFileChange"],
	setup(props, { emit }) {
		const _actualConfig = assign_1(defaultConfig, props.config);
		const fileRef = ref(null);
		const data = ref([]);
		// 生成文件切片
		const createFileChunk = function (file, size = _actualConfig.SIZE) {
			const fileChunkList = [];
			let cur = 0;
			while (cur < file.size) {
				fileChunkList.push({ file: file.slice(cur, cur + size) });
				cur += size;
			}
			return fileChunkList;
		};
		// 合并切块
		const mergeRequest = async function () {
			await request({
				url: _actualConfig.urlMerge,
				headers: _actualConfig.headerMerge,
				data: JSON.stringify({
					filename: fileRef.value.name,
					..._actualConfig.dataMerge,
				}),
			});
		};
		// 上传切片
		const uploadChunks = async function () {
			const requestList = data.value
				.map(({ chunk, hash }) => {
					const formData = new FormData();
					formData.append(_actualConfig.chunk, chunk);
					formData.append(_actualConfig.hash, hash);
					formData.append(_actualConfig.filename, fileRef.value.name);

					_actualConfig.data.forEach((item) => {
						formData.append(item.key, item.value);
					});
					return { formData };
				})
				.map(async ({ formData }) => {
					request({
						url: _actualConfig.url,
						data: formData,
					});
				});

			await Promise.all(requestList); // 并发切片
			//  合并切片
			await mergeRequest();
		};
		const handleUpload = async function () {
			// 文件不存在
			if (!fileRef.value) return;
			// 对文件切片
			const fileChunkList = createFileChunk(fileRef.value);
			data.value = fileChunkList.map(({ file }, index) => ({
				chunk: file,
				hash: fileRef.value.name + "-" + index, // 文件名 + 数组下标
			}));
			await uploadChunks();
		};
		const handleFileChange = function (e) {
			const [file] = e.target.files;
			if (!file) return;
			fileRef.value = file;
			emit("handleFileChange", file);
		};
		return {
			handleFileChange,
			handleUpload,
		};
	},
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [createElementVNode("input", {
    type: "file",
    onChange: _cache[0] || (_cache[0] = (...args) => $setup.handleFileChange && $setup.handleFileChange(...args))
  }, null, 32
  /* HYDRATE_EVENTS */
  )]);
}

script$9.render = render$9;
script$9.__file = "src/components/Upload/Upload.vue";

function Upload (Vue) {
  Vue.component(script$9.name, script$9);
}

var script$8 = {
	name: "VButton",
	setup() {
		return {};
	},
};

const _withScopeId$1 = n => (pushScopeId("data-v-4439b54f"), n = n(), popScopeId(), n);

const _hoisted_1$6 = {
  class: "btn vb"
};

const _hoisted_2$4 = /*#__PURE__*/_withScopeId$1(() => /*#__PURE__*/createElementVNode("div", {
  class: "dot"
}, null, -1
/* HOISTED */
));

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", _hoisted_1$6, [createElementVNode("span", null, [renderSlot(_ctx.$slots, "default")]), _hoisted_2$4]);
}

var css_248z$6 = ".btn[data-v-4439b54f] {\n  vertical-align: top;\n  margin: 15px;\n  display: inline-block;\n  text-align: center;\n  width: 122px;\n  height: 44px;\n  line-height: 44px;\n  border-radius: 4px;\n  color: #fff;\n  cursor: pointer; }\n  .btn[data-v-4439b54f] .dot[data-v-4439b54f] {\n    content: \"\";\n    animation: atom-4439b54f 2s infinite linear;\n    position: absolute;\n    top: 0;\n    width: 32px;\n    height: 100%;\n    border-radius: 50%;\n    transition: all 300ms ease; }\n    .btn[data-v-4439b54f] .dot[data-v-4439b54f][data-v-4439b54f]::after {\n      content: \"\";\n      position: absolute;\n      top: -6px;\n      height: 5px;\n      width: 5px;\n      background: #fa5555;\n      border-radius: 50%;\n      border: 4px solid #fa5555;\n      box-shadow: 0 0 0.7em #fff, 0 0 2em #fa5555; }\n\n.vb[data-v-4439b54f] {\n  position: relative;\n  width: 120px;\n  color: #fa5555;\n  height: 40px;\n  line-height: 42px;\n  border: 2px solid #fa5555;\n  border-radius: 14px;\n  text-transform: uppercase; }\n\n@keyframes atom-4439b54f {\n  0% {\n    transform: translateX(0) rotate(0); }\n  30% {\n    transform: translateX(calc(122px - 36px)) rotate(0); }\n  50% {\n    transform: translateX(calc(122px - 36px)) rotate(180deg); }\n  80% {\n    transform: translateX(0) rotate(180deg); }\n  100% {\n    transform: translateX(0) rotate(360deg); } }\n";
styleInject(css_248z$6);

script$8.render = render$8;
script$8.__scopeId = "data-v-4439b54f";
script$8.__file = "src/components/Button/Button.vue";

function BUtton (Vue) {
  Vue.component(script$8.name, script$8);
}

var script$7 = {
	name: "VSwitch",
	props: {
		modelValue: {
			default: true,
			type: Boolean,
		},
		type: {
			type: Number,
			default: 1,
		},
		isRadius: {
			type: Boolean,
			default: true,
		},
		leftValue: {
			type: String,
			default: "是",
		},
		rightValue: {
			type: String,
			default: "否",
		},
		leftColor: {
			type: String,
			default: "#ebf7fc",
		},
		rightColor: {
			type: String,
			default: "#fcebeb",
		},
	},
	setup(props, { emit }) {
		const click = function () {
			emit("update:modelValue", !props.modelValue);
		};
		let classArray = [
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
			"nine",
			"ten",
			"eleven",
		];
		const classComputed = computed(() => {
			return [
				"ani",
				classArray[props.type - 1] ? classArray[props.type - 1] : "",
				props.isRadius ? "isRadius" : "",
			];
		});
		return { click, classComputed };
	},
};

const _withScopeId = n => (pushScopeId("data-v-0051a1e2"), n = n(), popScopeId(), n);

const _hoisted_1$5 = {
  class: "item"
};

const _hoisted_2$3 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/createElementVNode("span", {
  class: "ball"
}, null, -1
/* HOISTED */
));

const _hoisted_3$1 = {
  key: 0
};
const _hoisted_4$1 = {
  key: 1,
  class: "content"
};
const _hoisted_5$1 = {
  class: "item"
};
const _hoisted_6$1 = {
  class: "item"
};
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = (...args) => $setup.click && $setup.click(...args)),
    class: normalizeClass([$setup.classComputed, "box"]),
    style: normalizeStyle({
      backgroundColor: $props.modelValue ? $props.leftColor : $props.rightColor
    })
  }, [$props.type == 2 ? (openBlock(), createElementBlock("div", {
    key: 0,
    class: normalizeClass([$props.modelValue ? 'left' : 'right'])
  }, [createElementVNode("div", _hoisted_1$5, toDisplayString($props.modelValue ? $props.leftValue : $props.rightValue), 1
  /* TEXT */
  ), _hoisted_2$3], 2
  /* CLASS */
  )) : (openBlock(), createElementBlock("div", {
    key: 1,
    class: normalizeClass([[$props.modelValue ? 'left' : 'right'], "ani"])
  }, [$props.type == 1 ? (openBlock(), createElementBlock("span", _hoisted_3$1, toDisplayString($props.modelValue ? $props.leftValue : $props.rightValue), 1
  /* TEXT */
  )) : (openBlock(), createElementBlock("span", _hoisted_4$1, [createElementVNode("span", _hoisted_5$1, toDisplayString($props.leftValue), 1
  /* TEXT */
  ), createElementVNode("span", {
    class: normalizeClass(["box-block ani", [$props.modelValue ? 'leftActive' : 'rightActive']])
  }, null, 2
  /* CLASS */
  ), createElementVNode("span", _hoisted_6$1, toDisplayString($props.rightValue), 1
  /* TEXT */
  )]))], 2
  /* CLASS */
  ))], 6
  /* CLASS, STYLE */
  );
}

var css_248z$5 = ".ani[data-v-0051a1e2] {\n  transition: all 0.3s; }\n\n.box[data-v-0051a1e2] {\n  position: relative;\n  height: 100%;\n  min-height: 36px;\n  width: 76px; }\n\n.isRadius[data-v-0051a1e2] {\n  border-radius: 100px; }\n\n.one[data-v-0051a1e2] .left[data-v-0051a1e2] {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: 20px;\n  height: 10px;\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1;\n  padding: 9px 4px;\n  background-color: #03a9f4;\n  border-radius: 50%; }\n\n.one[data-v-0051a1e2] .right[data-v-0051a1e2] {\n  position: absolute;\n  top: 4px;\n  left: calc(100% - 30px);\n  width: 20px;\n  height: 10px;\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1;\n  padding: 9px 4px;\n  background-color: #f44336;\n  border-radius: 50%; }\n\n.two[data-v-0051a1e2] .left[data-v-0051a1e2] {\n  transition: all 0.3s; }\n  .two[data-v-0051a1e2] .left[data-v-0051a1e2] .item[data-v-0051a1e2] {\n    transition: all 0.3s;\n    position: absolute;\n    left: calc(100% - 30px);\n    top: 6px;\n    color: #fff; }\n  .two[data-v-0051a1e2] .left[data-v-0051a1e2] .ball[data-v-0051a1e2] {\n    transition: all 0.3s;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    width: 20px;\n    height: 10px;\n    color: #fff;\n    font-size: 10px;\n    font-weight: bold;\n    text-align: center;\n    line-height: 1;\n    padding: 9px 4px;\n    background-color: #fff;\n    border-radius: 50%; }\n\n.two[data-v-0051a1e2] .right[data-v-0051a1e2] {\n  transition: all 0.3s; }\n  .two[data-v-0051a1e2] .right[data-v-0051a1e2] .item[data-v-0051a1e2] {\n    color: #fff;\n    transition: all 0.3s;\n    position: absolute;\n    left: 4px;\n    top: 6px; }\n  .two[data-v-0051a1e2] .right[data-v-0051a1e2] .ball[data-v-0051a1e2] {\n    transition: all 0.3s;\n    position: absolute;\n    top: 4px;\n    left: calc(100% - 30px);\n    width: 20px;\n    height: 10px;\n    color: #fff;\n    font-size: 10px;\n    font-weight: bold;\n    text-align: center;\n    line-height: 1;\n    padding: 9px 4px;\n    background-color: #fff;\n    border-radius: 50%; }\n\n.three[data-v-0051a1e2] {\n  height: 36px; }\n  .three[data-v-0051a1e2] .left[data-v-0051a1e2],\n  .three[data-v-0051a1e2] .right[data-v-0051a1e2] {\n    display: inline-block;\n    height: 100%;\n    width: 100%; }\n    .three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2],\n    .three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] {\n      width: 100%;\n      height: 100%;\n      display: flex;\n      align-items: center;\n      justify-content: space-around;\n      perspective: 70px; }\n      .three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2] .item[data-v-0051a1e2],\n      .three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] .item[data-v-0051a1e2] {\n        display: inline-block; }\n      .three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2] .leftActive[data-v-0051a1e2],\n      .three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] .leftActive[data-v-0051a1e2] {\n        transform: rotateY(-180deg) !important;\n        background-color: #03a9f4 !important; }\n      .three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2] .box-block[data-v-0051a1e2],\n      .three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] .box-block[data-v-0051a1e2] {\n        position: absolute;\n        top: 4px;\n        border-radius: 2px;\n        right: 4px;\n        width: 33px;\n        height: 28px;\n        background-color: #f44336;\n        transform: rotateY(0);\n        transform-origin: 0% 50%;\n        transition: 0.6s ease all;\n        z-index: 1; }\n";
styleInject(css_248z$5);

script$7.render = render$7;
script$7.__scopeId = "data-v-0051a1e2";
script$7.__file = "src/components/Switch/Switch.vue";

function Switch (Vue) {
  Vue.component(script$7.name, script$7);
}

const _hoisted_1$4 = {
  viewBox: "0 0 1024 1024"
};

const _hoisted_2$2 = /*#__PURE__*/createElementVNode("path", {
  d: "M499.2 951.466667c-234.666667 0-426.666667-192-426.666667-426.666667 0-17.066667 0-38.4 4.266667-55.466667 4.266667-12.8 12.8-17.066667 25.6-17.066666 12.8 4.266667 17.066667 12.8 17.066667 25.6-4.266667 12.8-4.266667 29.866667-4.266667 46.933333 0 213.333333 170.666667 384 384 384s384-170.666667 384-384-170.666667-384-384-384c-25.6 0-46.933333 4.266667-72.533333 8.533333-12.8 0-21.333333-4.266667-25.6-17.066666 0-12.8 4.266667-21.333333 17.066666-25.6 25.6-4.266667 51.2-8.533333 81.066667-8.533334 234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667z",
  fill: "#7162AD",
  "p-id": "2204"
}, null, -1
/* HOISTED */
);

const _hoisted_3 = /*#__PURE__*/createElementVNode("path", {
  d: "M119.466667 418.133333h-8.533334c-8.533333-4.266667-17.066667-17.066667-12.8-29.866666 42.666667-119.466667 128-213.333333 238.933334-256 12.8-4.266667 21.333333 0 25.6 12.8 4.266667 12.8 0 21.333333-12.8 25.6C256 213.333333 174.933333 298.666667 140.8 405.333333c-4.266667 8.533333-12.8 12.8-21.333333 12.8z",
  fill: "#A495FC",
  "p-id": "2205"
}, null, -1
/* HOISTED */
);

const _hoisted_4 = /*#__PURE__*/createElementVNode("path", {
  d: "M392.533333 657.066667c-4.266667 0-12.8 0-17.066666-4.266667-8.533333-8.533333-8.533333-21.333333 0-29.866667l213.333333-213.333333c8.533333-8.533333 21.333333-8.533333 29.866667 0s8.533333 21.333333 0 29.866667l-213.333334 213.333333c0 4.266667-8.533333 4.266667-12.8 4.266667z",
  fill: "#7162AD",
  "p-id": "2206"
}, null, -1
/* HOISTED */
);

const _hoisted_5 = /*#__PURE__*/createElementVNode("path", {
  d: "M605.866667 657.066667c-4.266667 0-12.8 0-17.066667-4.266667l-213.333333-213.333333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866666 0l213.333334 213.333333c8.533333 8.533333 8.533333 21.333333 0 29.866667 0 4.266667-8.533333 4.266667-12.8 4.266667z",
  fill: "#7162AD",
  "p-id": "2207"
}, null, -1
/* HOISTED */
);

const _hoisted_6 = [_hoisted_2$2, _hoisted_3, _hoisted_4, _hoisted_5];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_6);
}

const script$6 = {};


script$6.render = render$6;
script$6.__file = "src/components/Modal/close.vue";

var script$5 = {
	name: "VModel",
	components: {
		close: script$6,
	},
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const openHeight = ref(false);
		const openWidth = ref(false);
		const openDom = ref(false);
		const ready = ref(false);
		const openFn = async function () {
			openDom.value = true;
			await sleep(400);
			openHeight.value = true;
			await sleep(400);
			openWidth.value = true;
			await sleep(400);
			ready.value = true;
		};
		watch(
			() => props.modelValue,
			() => {
				props.modelValue ? openFn() : closeFn();
			}
		);
		const close = function () {
			emit("update:modelValue", false);
		};
		const closeFn = async function () {
			ready.value = false;
			openWidth.value = false;
			await sleep(400);
			openHeight.value = false;
			await sleep(400);
			openDom.value = false;
		};
		onMounted(() => {});
		onUnmounted(() => {
			closeFn();
		});
		return { openHeight, openWidth, openDom, close, ready };
	},
};

const _hoisted_1$3 = {
  key: 0,
  class: "filterbg"
};
const _hoisted_2$1 = {
  key: 0,
  class: "content"
};
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_close = resolveComponent("close");

  return $setup.openDom ? (openBlock(), createElementBlock("div", _hoisted_1$3, [createElementVNode("div", {
    class: normalizeClass(["popup", {
      openHeight: $setup.openHeight,
      openWidth: $setup.openWidth
    }])
  }, [$setup.ready ? (openBlock(), createElementBlock("div", _hoisted_2$1, [createElementVNode("div", {
    class: "popupClose",
    onClick: _cache[0] || (_cache[0] = (...args) => $setup.close && $setup.close(...args))
  }, [createVNode(_component_close)]), renderSlot(_ctx.$slots, "default")])) : createCommentVNode("v-if", true)], 2
  /* CLASS */
  )])) : createCommentVNode("v-if", true);
}

var css_248z$4 = ".filterbg[data-v-47db75aa] {\n  width: 100%;\n  height: 100%;\n  background: rgba(30, 182, 254, 0.5);\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 998; }\n  .filterbg[data-v-47db75aa] .content[data-v-47db75aa] {\n    height: 100%; }\n  .filterbg[data-v-47db75aa] .openHeight[data-v-47db75aa] {\n    height: 76% !important; }\n  .filterbg[data-v-47db75aa] .openWidth[data-v-47db75aa] {\n    width: 82% !important; }\n  .filterbg[data-v-47db75aa] .popup[data-v-47db75aa] {\n    overflow: hidden;\n    transition: all 0.4s;\n    width: 3px;\n    height: 0;\n    background: #061f3e;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    z-index: 999;\n    border-radius: 8px;\n    -webkit-transform: translate(-50%, -50%);\n    -moz-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%); }\n    .filterbg[data-v-47db75aa] .popup[data-v-47db75aa] .popupClose[data-v-47db75aa] {\n      z-index: 100;\n      transition: all 0.2s;\n      cursor: pointer;\n      position: absolute;\n      width: 32px;\n      height: 32px;\n      top: 15px;\n      right: 18px;\n      background-size: 100%; }\n      .filterbg[data-v-47db75aa] .popup[data-v-47db75aa] .popupClose[data-v-47db75aa][data-v-47db75aa]:hover {\n        transform: rotateZ(360deg); }\n";
styleInject(css_248z$4);

script$5.render = render$5;
script$5.__scopeId = "data-v-47db75aa";
script$5.__file = "src/components/Modal/Modal.vue";

function Modal (Vue) {
  Vue.component(script$5.name, script$5);
}

var script$4 = {
	name: "VTagCloud",
	props: {
		tags: {
			type: Array,
			require: true,
			default: () => [],
		},
		options: {
			type: Object,
			require: false,
			default: () => {
				return {
					width: 600,
					height: 600,
					radius: 200,
					opacity: 300,
					fontSize: 600,
				};
			},
		},
	},
	setup(props) {
		let data = reactive({
			speedX: Math.PI / 720, //绕x轴旋转的角度
			speedY: Math.PI / 720, //绕y轴旋转的角度
			allTags: [],
		});
		const centerX = computed(() => props.options.width / 2);
		const centerY = computed(() => props.options.height / 2);

		const init = function () {
			for (let i = 0; i < props.tags.length; i++) {
				let tag = {};
				let k = -1 + (2 * (i + 1) - 1) / props.tags.length;
				let a = Math.acos(k);
				let b = a * Math.sqrt(props.tags.length * Math.PI);
				tag.name = props.tags[i].name;
				tag.color = props.tags[i].tagColor ? props.tags[i].tagColor : "#fff";
				tag.x =
					centerX.value + props.options.radius * Math.sin(a) * Math.cos(b);
				tag.y =
					centerY.value + props.options.radius * Math.sin(a) * Math.sin(b);
				tag.z = props.options.radius * Math.cos(a);
				data.allTags.push(tag);
			}
		};
		const rotateX = function (angleX) {
			var cos = Math.cos(angleX);
			var sin = Math.sin(angleX);
			for (let tag of data.allTags) {
				var y1 = (tag.y - centerY.value) * cos - tag.z * sin + centerY.value;
				var z1 = tag.z * cos + (tag.y - centerY.value) * sin;
				tag.y = y1;
				tag.z = z1;
			}
		};
		const rotateY = function (angleY) {
			var cos = Math.cos(angleY);
			var sin = Math.sin(angleY);
			for (let tag of data.allTags) {
				var x1 = (tag.x - centerX.value) * cos - tag.z * sin + centerX.value;
				var z1 = tag.z * cos + (tag.x - centerX.value) * sin;
				tag.x = x1;
				tag.z = z1;
			}
		};
		const listener = function (event) {
			//响应鼠标移动
			var x = event.clientX - centerX.value;
			var y = event.clientY - centerY.value;
			data.speedX =
				x * 0.0001 > 0
					? Math.min(props.options.radius * 0.00003, x * 0.0001)
					: Math.max(-props.options.radius * 0.00003, x * 0.0001);
			data.speedY =
				y * 0.0001 > 0
					? Math.min(props.options.radius * 0.00003, y * 0.0001)
					: Math.max(-props.options.radius * 0.00003, y * 0.0001);
		};
		onMounted(() => {
			init();
			setInterval(() => {
				rotateX(data.speedX);
				rotateY(data.speedY);
			}, 17);
		});
		return {
			listener,
			centerX,
			centerY,
			...toRefs(data),
		};
	},
};

const _hoisted_1$2 = ["width", "height"];
const _hoisted_2 = ["x", "y", "font-size", "fill-opacity"];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    class: "tag-cloud",
    width: $props.options.width,
    height: $props.options.height,
    onMousemove: _cache[0] || (_cache[0] = $event => $setup.listener($event))
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allTags, (tag, index) => {
    return openBlock(), createElementBlock("a", {
      key: index
    }, [createElementVNode("text", {
      x: tag.x,
      y: tag.y,
      "font-size": 20 * ($props.options.fontSize / ($props.options.fontSize - tag.z)),
      "fill-opacity": ($props.options.opacity + tag.z) / 600,
      style: normalizeStyle({
        fill: tag.color
      })
    }, toDisplayString(tag.name), 13
    /* TEXT, STYLE, PROPS */
    , _hoisted_2)]);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 40
  /* PROPS, HYDRATE_EVENTS */
  , _hoisted_1$2);
}

var css_248z$3 = "\n.tag-cloud[data-v-b4886fa2] {\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tleft: 50%;\r\n\ttransform: translateX(-50%) translateY(-50%);\n}\r\n";
styleInject(css_248z$3);

script$4.render = render$4;
script$4.__scopeId = "data-v-b4886fa2";
script$4.__file = "src/components/TagCloud/TagCloud.vue";

function TagCloud (Vue) {
  Vue.component(script$4.name, script$4);
}

var script$3 = {
	name: "VToolTip",
	props: {
		content: {
			type: String,
		},
		placement: {
			type: String,
			validator: (value) => {
				return ["top", "bottom", "left", "right"].includes(value);
			},
			default: "top",
		},
	},
	setup(props) {
		let show = ref(false);
		let dom = ref();
		let style = ref({});
		let BoxDom = ref();
		const mouseleave = function () {
			show.value = false;
		};
		const mouseenter = function () {
			show.value = true;
		};
		const computedStyle = watch(
			() => show.value,
			() => {
				if (!show.value) return;
				let left, top;
				nextTick(() => {
					let _dom = dom.value;
					let _box = BoxDom.value;

					let currenLeft = _dom.offsetLeft,
						currenTop = _dom.offsetTop,
						currenWidth = _dom.offsetWidth,
						currenHeight = _dom.offsetHeight;
					let tipContentWidth = _box.offsetWidth,
						tipContentHeight = _box.offsetHeight;
					console.log(
						document.querySelector(".tool_tip").clientWidth,
						tipContentWidth
					);
					switch (props.placement) {
						case "top":
							left = currenLeft + currenWidth / 2 - tipContentWidth / 2 + "px";
							top = currenTop - 7 - tipContentHeight + "px";
							break;
						case "left":
							left = currenLeft - tipContentWidth - 7 + "px";
							top = currenTop + currenHeight / 2 - tipContentHeight / 2 + "px";
							break;
						case "right":
							left = currenLeft + currenWidth + 7 + "px";
							top = currenTop + currenHeight / 2 - tipContentHeight / 2 + "px";
							break;
						case "bottom":
							left = currenLeft + currenWidth / 2 - tipContentWidth / 2 + "px";
							top = currenTop + currenHeight + 7 + "px";
							break;
					}

					style.value = {
						left: left,
						top: top,
					};
					console.log(style.value);
				});
			}
		);
		return {
			dom,
			show,
			BoxDom,
			mouseleave,
			mouseenter,
			computedStyle,
			style,
		};
	},
};

const _hoisted_1$1 = ["innerHTML"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "vToolTip",
    onMouseenter: _cache[0] || (_cache[0] = (...args) => $setup.mouseenter && $setup.mouseenter(...args)),
    onMouseleave: _cache[1] || (_cache[1] = (...args) => $setup.mouseleave && $setup.mouseleave(...args)),
    ref: "dom"
  }, [$setup.show ? (openBlock(), createElementBlock("div", {
    key: 0,
    style: normalizeStyle($setup.style),
    class: normalizeClass(["tool_tip", `tool_tip_${$props.placement}`]),
    ref: "BoxDom",
    innerHTML: $props.content
  }, null, 14
  /* CLASS, STYLE, PROPS */
  , _hoisted_1$1)) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  );
}

var css_248z$2 = ".vToolTip[data-v-61e09817] .tool_tip[data-v-61e09817] {\n  background-color: rgba(0, 0, 0, 0.9);\n  padding: 4px 8px;\n  border-radius: 4px;\n  color: #fff;\n  font-size: 12px;\n  position: absolute;\n  z-index: 99999;\n  word-wrap: break-word;\n  max-width: 1000px;\n  box-sizing: border-box; }\n\n.vToolTip[data-v-61e09817] .tool_tip[data-v-61e09817]:before {\n  position: absolute;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0);\n  width: 0;\n  height: 0;\n  border-width: 5px;\n  border-style: solid; }\n\n.vToolTip[data-v-61e09817] .tool_tip_top[data-v-61e09817]:before {\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, 0);\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent; }\n\n.vToolTip[data-v-61e09817] .tool_tip_right[data-v-61e09817]:before {\n  top: 50%;\n  left: 0;\n  transform: translate(-100%, -50%);\n  -ms-transform: translate(-100%, -50%);\n  -webkit-transform: translate(-100%, -50%);\n  border-color: transparent rgba(0, 0, 0, 0.9) transparent transparent; }\n\n.vToolTip[data-v-61e09817] .tool_tip_bottom[data-v-61e09817]:before {\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, -100%);\n  -ms-transform: translate(-50%, -100%);\n  -webkit-transform: translate(-50%, -100%);\n  border-color: transparent transparent rgba(0, 0, 0, 0.9) transparent; }\n\n.vToolTip[data-v-61e09817] .tool_tip_left[data-v-61e09817]:before {\n  top: 50%;\n  left: 100%;\n  transform: translate(0, -50%);\n  -ms-transform: translate(0, -50%);\n  -webkit-transform: translate(0, -50%);\n  border-color: transparent transparent transparent rgba(0, 0, 0, 0.9); }\n";
styleInject(css_248z$2);

script$3.render = render$3;
script$3.__scopeId = "data-v-61e09817";
script$3.__file = "src/components/ToolTip/ToolTip.vue";

function ToolTip (Vue) {
  Vue.component(script$3.name, script$3);
}

function config(one, two) {
	return Object.assign(one, two);
}
var script$2 = {
	name: "VTransForm",
	props: {
		modelValue: {
			type: Boolean,
		},
		active: {
			type: Object,
		},
		leave: {
			type: Object,
		},
	},
	setup(props, { slots }) {
		let slot = slots.default();
		let dom = ref();
		let aniActive = ref();
		let aniOthre = ref();
		let defaultConfigActive = {
			duration: 0.4,
			ease: "none",
			paused: true,
		};
		let defaultConfigLeave = {
			duration: 0.4,
			ease: "none",
			paused: true,
		};

		const activeFn = function () {
			aniActive.value.restart();
		};
		const leaveFn = function () {
			aniOthre.value.restart();
		};
		watch(
			() => props.modelValue,
			() => {
				if (props.modelValue) {
					activeFn();
				} else {
					leaveFn();
				}
			}
		);
		onMounted(() => {
			dom.value = slot[0].el;
			aniOthre.value = to(dom.value, config(defaultConfigActive, props.active));
			aniActive.value = to(dom.value, config(defaultConfigLeave, props.leave));
		});
		return {
			dom,
			timeline,
			aniOthre,
			to,
			aniActive,
		};
	},
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" <transform name=\"style\">\r\n\t\t<slot></slot>\r\n\t</transform> "), createElementVNode("div", null, [renderSlot(_ctx.$slots, "default")])], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

var css_248z$1 = ".style-enter-active[data-v-7f8b5de9],\n.style-leave-active[data-v-7f8b5de9] {\n  transition: all 0.5s ease; }\n\n.style-enter-from[data-v-7f8b5de9],\n.style-leave-to[data-v-7f8b5de9] {\n  opacity: 0; }\n";
styleInject(css_248z$1);

script$2.render = render$2;
script$2.__scopeId = "data-v-7f8b5de9";
script$2.__file = "src/components/Transform/Transform.vue";

function Transform (Vue) {
  Vue.component(script$2.name, script$2);
}

var script$1 = {
  name: "vReverse",
  props: {
    modelValue: {
      type: Boolean
    },
    active: {
      type: String,
      default: "rotateX(75deg)"
    },
    leave: {
      type: String,
      default: "rotateX(0deg)"
    },
    transition: {
      type: String,
      default: "all 0.4s"
    },
    transformOrigin: {
      type: String,
      default: "161px 100%"
    }
  },

  setup() {
    let dom = ref();
    return {
      dom
    };
  }

};

const _hoisted_1 = {
  class: "test",
  ref: "dom"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [createElementVNode("div", {
    class: "main",
    style: normalizeStyle({
      transform: $props.modelValue ? $props.active : $props.leave,
      transition: $props.transition,
      transformOrigin: $props.transformOrigin
    })
  }, [renderSlot(_ctx.$slots, "default")], 4
  /* STYLE */
  )], 512
  /* NEED_PATCH */
  );
}

var css_248z = ".test[data-v-1d03d06f] {\n  perspective: 800px; }\n";
styleInject(css_248z);

script$1.render = render$1;
script$1.__scopeId = "data-v-1d03d06f";
script$1.__file = "src/components/Reverse/Test.vue";

function Reverse (Vue) {
  Vue.component(script$1.name, script$1);
}

function render(_ctx, _cache) {
  return openBlock(), createElementBlock("div");
}

const script = {};


script.render = render;
script.__file = "src/components/Notice/NoticeList.vue";

function Notice (Vue) {
  Vue.component(script.name, script);
}

const EchartsData = {
  bar: {
    title: {
      text: "第一个 ECharts 实例"
    },
    tooltip: {},
    legend: {
      data: ["销量"]
    },
    xAxis: {
      data: ["衬衫1", "羊毛衫2", "雪纺衫3", "裤子4", "高跟鞋5", "袜子1"]
    },
    yAxis: {},
    series: [{
      name: "销量",
      type: "bar",
      data: [500, 2000, 3600, 1000, 1000, 2000],
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(255, 255, 255,1)"
        }
      }
    }]
  },
  pie: {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
    },
    title: {
      text: "Traffic Sources",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} &lt;br/&gt;{b} : {c} ({d}%)"
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "left",
      data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
    },
    series: [{
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [{
        value: 335,
        name: "Direct"
      }, {
        value: 310,
        name: "Email"
      }, {
        value: 234,
        name: "Ad Networks"
      }, {
        value: 135,
        name: "Video Ads"
      }, {
        value: 1548,
        name: "Search Engines"
      }],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }]
  },
  ring: {
    textStyle: {
      fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif'
    },
    title: {
      text: "Traffic Sources",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      show: true,
      orient: "vertical",
      left: "left",
      data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
    },
    series: [{
      name: "Traffic Sources",
      type: "pie",
      radius: ["55%", "70%"],
      center: ["50%", "60%"],
      data: [{
        value: 335,
        name: "Direct"
      }, {
        value: 310,
        name: "Email"
      }, {
        value: 234,
        name: "Ad Networks"
      }, {
        value: 135,
        name: "Video Ads"
      }, {
        value: 1548,
        name: "Search Engines"
      }],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }]
  }
};

//interval 间隔
//option 配置

function useIntervalFn(cb, interval = 1000, options = {}) {
  // 指定空对象默认值
  const {
    // immediate 立即执行 【但是会有定时的timer】
    // immediateCallback // 立马执行函数 【timer为0】
    immediate = true,
    immediateCallback = false
  } = options; // 定时器对象

  let timer = null; // 控制是否暂停 false：暂停; true：继续

  const isActive = ref(false); // 删除

  function clean() {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  } // 暂停


  function pause() {
    isActive.value = false;
    clean();
  } // 恢复


  function resume() {
    if (interval < 0) return;
    isActive.value = true; // 是否立马执行函数

    if (immediateCallback) cb(); //确保只有一个定时器

    clean();
    timer = setInterval(cb, unref(interval));
  } //如果传入interval的是ref类型


  if (isRef(interval)) {
    const stopWatch = watch(interval, () => {
      if (immediate) resume();
    });
    onUnmounted(() => {
      stopWatch();
    });
  } //立即执行


  if (immediate) resume(); //出口

  return {
    isActive,
    pause,
    resume
  };
}

function resolveNestedOptions(options) {
  //不存在初始化
  if (options === true) return {};
  return options;
}

function useWebSocket(url, options = {}) {
  // 重连 retries：从连次数。delay：间隔。delay：onFailed：连接失败钩子。
  // autoReconnect = {retries，delay ,onFailed}  
  const {
    // connect钩子 第一个参数为ws
    onConnected,
    // close钩子 第一个参数为ws，第二个为关闭信息
    onDisconnected,
    // error钩子 第一个参数为ws，第二个为错误信息
    onError,
    // message钩子 第一个参数为ws，第二个参数为data
    onMessage,
    // 
    immediate = true,
    // 
    autoClose = true,
    // 指定ws可接受的子协议。
    protocols = []
  } = options; //数据

  const data = ref(null); //连接状态

  const status = ref('CONNECTING'); //ws

  const wsRef = ref(); // 心跳检测
  let heartbeatResume; // 关闭ws

  let explicitlyClosed = false; // 重连次数

  let retried = 0; //存放buffer数据

  let bufferedData = [];

  const close = (code = 1000, reason) => {};

  const _sendBuffer = () => {
    // 只有在open的状态才可以发送 
    // 发送没有绑定的数据
    if (bufferedData.length && wsRef.value && status.value === 'OPEN') {
      for (const buffer of bufferedData) wsRef.value.send(buffer);

      bufferedData = [];
    }
  };

  const send = (data, useBuffer = true) => {
    // 未绑定ws【open之前】调用send
    if (!wsRef.value || status.value !== 'OPEN') {
      if (useBuffer) bufferedData.push(data);
      return false;
    } //绑定了ws【open之后】调用send


    _sendBuffer();

    wsRef.value.send(data);
    return true;
  };

  const _init = () => {
    const ws = new WebSocket(url, protocols);
    wsRef.value = ws;
    status.value = 'CONNECTING';
    explicitlyClosed = false;

    ws.onopen = () => {
      status.value = 'OPEN'; // connect函数钩子

      onConnected?.(ws); // 恢复 心跳检测

      heartbeatResume?.();

      _sendBuffer();
    };

    ws.onmessage = e => {
      data.value = e.data;
      onMessage?.(ws, e);
    };

    ws.onclose = ev => {
      status.value = 'CLOSED';
      wsRef.value = undefined;
      onDisconnected?.(ws, ev);

      if (!explicitlyClosed && options.autoReconnect) {
        const {
          retries = -1,
          delay = 1000,
          onFailed
        } = resolveNestedOptions(options.autoReconnect);
        retried += 1;
        if (typeof retries === 'number' && (retries < 0 || retried < retries)) setTimeout(_init, delay);else if (typeof retries === 'function' && retries()) setTimeout(_init, delay);else {
          onFailed?.();
        }
      }
    };

    ws.onerror = e => {
      onError?.(ws, e);
    };
  }; //是否开启心跳


  if (options.heartbeat) {
    const {
      // 发送的消息
      message = 'ping',
      // 每次发送的间隔
      interval = 1000
    } = resolveNestedOptions(options.heartbeat);
    const {
      pause,
      resume
    } = useIntervalFn(() => send(message, false), interval, {
      immediate: false
    });
    heartbeatResume = resume;
  } //直接运行


  if (immediate) _init(); //自动关闭

  if (autoClose) {
    window.addEventListener("beforeunload", () => {
    });
    onUnmounted(() => {
    });
  } // 重新打开ws 【确保只能运行一个ws】 


  const open = () => {
    retried = 0;

    _init();
  };

  return {
    // 数据
    data,
    // 状态
    status,
    // 关闭函数
    close,
    // 发送函数
    send,
    // 打开函数
    open,
    // ws对象
    ws: wsRef
  };
}

function hook (Vue) {
  Vue.provide("useIntervalFn", useIntervalFn);
  Vue.provide("useWebSocket", useWebSocket);
}

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
  Vue.use(hook);
  Vue.provide("EchartsData", EchartsData);
};

export { component as default };

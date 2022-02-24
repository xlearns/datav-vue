(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('echarts')) :
	typeof define === 'function' && define.amd ? define(['vue', 'echarts'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.datav = factory(global.Vue, global.echarts));
})(this, (function (vue, Echarts) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Echarts__default = /*#__PURE__*/_interopDefaultLegacy(Echarts);

	var script$6 = {
	  name: "ComTest",
	  setup: function setup() {
	    var a = vue.ref("test");
	    return {
	      a: a
	    };
	  }
	};

	var _withScopeId$3 = function _withScopeId(n) {
	  return vue.pushScopeId("data-v-7cc4288f"), n = n(), vue.popScopeId(), n;
	};

	var _hoisted_1$6 = {
	  "class": "test"
	};

	var _hoisted_2$3 = /*#__PURE__*/_withScopeId$3(function () {
	  return /*#__PURE__*/vue.createElementVNode("svg", {
	    width: "20px",
	    height: "20px",
	    viewBox: "0 0 100 100"
	  }, [/*#__PURE__*/vue.createElementVNode("line", {
	    x1: "0",
	    y1: "50",
	    x2: "100",
	    y2: "50",
	    "stroke-width": "8",
	    stroke: "currentColor"
	  }), /*#__PURE__*/vue.createElementVNode("line", {
	    x1: "50",
	    y1: "0",
	    x2: "50",
	    y2: "100",
	    "stroke-width": "8",
	    stroke: "currentColor"
	  })], -1
	  /* HOISTED */
	  );
	});

	var _hoisted_3$2 = [_hoisted_2$3];
	function render$6(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, _hoisted_3$2);
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

	var css_248z$5 = ".test[data-v-7cc4288f] {\n  color: yellow;\n}";
	styleInject(css_248z$5);

	script$6.render = render$6;
	script$6.__scopeId = "data-v-7cc4288f";
	script$6.__file = "src/components/Test/Test.vue";

	function Test (Vue) {
	  Vue.component(script$6.name, script$6);
	}

	function debounce(delay, callback) {
	  var task;
	  return function () {
	    var _arguments = arguments,
	        _this = this;

	    clearTimeout(task);
	    task = setTimeout(function () {
	      callback.apply(_this, _arguments);
	    }, delay);
	  };
	}

	var script$5 = {
		name: "VFullSreen",
		props: {
			options: Object,
		},
		setup(props) {
			let dom = vue.ref();
			let width = vue.ref(0);
			let height = vue.ref(0);
			let originalWidth = vue.ref(0);
			let originalHeight = vue.ref(0);
			let ready = vue.ref(false);
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
					vue.nextTick(() => {
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

			vue.onMounted(async () => {
				ready.value = false;
				await init();
				updateSize();
				updateScale();
				window.addEventListener("resize", debounce(100, onResize));
				initMutationObserver();
				ready.value = true;
			});

			vue.onUnmounted(() => {
				window.removeEventListener("resize", onResize);
				removeMutationObserver();
			});

			return {
				ready,
				dom,
			};
		},
	};

	var _hoisted_1$5 = {
	  ref: "dom",
	  "class": "datav-full-sreen"
	};
	function render$5(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [$setup.ready ? vue.renderSlot(_ctx.$slots, "default", {
	    key: 0
	  }) : vue.createCommentVNode("v-if", true)], 512
	  /* NEED_PATCH */
	  );
	}

	var css_248z$4 = ".datav-full-sreen[data-v-8b5216c8] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  transform-origin: left top;\n  z-index: 999;\n}";
	styleInject(css_248z$4);

	script$5.render = render$5;
	script$5.__scopeId = "data-v-8b5216c8";
	script$5.__file = "src/components/FullScreen/FullSreen.vue";

	function FullSreen (Vue) {
	  Vue.component(script$5.name, script$5);
	}

	// 配合iconfont symbol
	var script$4 = {
	  name: "VIcon",
	  props: {
	    name: String,
	    style: Object,
	    prefix: {
	      type: String,
	      "default": ""
	    }
	  },
	  setup: function setup(props) {
	    var name = props.name,
	        prefix = props.prefix;
	    var iconName = "#".concat(prefix).concat(name);
	    return {
	      iconName: iconName
	    };
	  }
	};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var defineProperty = createCommonjsModule(function (module) {
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
	});

	var _defineProperty = unwrapExports(defineProperty);

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	var _hoisted_1$4 = {
	  "class": "icon"
	};
	var _hoisted_2$2 = ["href"];
	function render$4(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", {
	    "class": "icon-wrapper",
	    style: vue.normalizeStyle(_objectSpread({}, $props.style))
	  }, [(vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$4, [vue.createElementVNode("use", {
	    href: $setup.iconName
	  }, null, 8
	  /* PROPS */
	  , _hoisted_2$2)]))], 4
	  /* STYLE */
	  );
	}

	var css_248z$3 = "\n.icon-wrapper {\r\n\tdisplay: inline-block;\n}\n.icon {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tvertical-align: -0.15em;\r\n\tfill: currentColor;\r\n\toverflow: hidden;\n}\r\n";
	styleInject(css_248z$3);

	script$4.render = render$4;
	script$4.__file = "src/components/Icon/Icon.vue";

	function Icon (Vue) {
	  Vue.component(script$4.name, script$4);
	}

	var script$3 = {
	  name: "SvgAnimation",
	  props: {
	    name: String,
	    style: Object,
	    prefix: {
	      type: String,
	      "default": ""
	    }
	  },
	  setup: function setup(props) {
	    vue.onMounted(function () {
	      var logo = document.querySelector(".logo");
	      console.log(logo.getTotalLength());
	    });
	  }
	};

	var _withScopeId$2 = function _withScopeId(n) {
	  return vue.pushScopeId("data-v-5a151e4f"), n = n(), vue.popScopeId(), n;
	};

	var _hoisted_1$3 = /*#__PURE__*/vue.createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"500\" height=\"200\" viewBox=\"0 0 500 200\" data-v-5a151e4f><rect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"red\" transform=\"translate(0,0) rotate(30)\" data-v-5a151e4f></rect></svg></div><div class=\"contatiner\" data-v-5a151e4f><svg width=\"500\" height=\"500\" viewBox=\"0 0 200 200\" transform=\"rotate(270)\" data-v-5a151e4f><!-- 底 --><circle cx=\"100\" cy=\"100\" r=\"90\" stroke-width=\"10\" stroke=\"#d1d3d7\" fill=\"none\" data-v-5a151e4f></circle><!-- 实际 --><!-- 周长：2*PI*R --><!-- 2*3.14*90 = 566--><!--  --><circle class=\"circle-ring\" cx=\"100\" cy=\"100\" r=\"90\" stroke-width=\"10\" stroke=\"#00a5e0\" fill=\"none\" data-v-5a151e4f></circle></svg></div><div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 底 --><rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#d1d3d7\" stroke-width=\"10\" data-v-5a151e4f></rect><rect class=\"rectRing\" x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#00a5e0\" stroke-width=\"10\" data-v-5a151e4f></rect></svg></div>", 3);

	var _hoisted_4$2 = /*#__PURE__*/_withScopeId$2(function () {
	  return /*#__PURE__*/vue.createElementVNode("div", {
	    "class": "contatiner"
	  }, [/*#__PURE__*/vue.createCommentVNode(" 描边 "), /*#__PURE__*/vue.createElementVNode("svg", {
	    viewBox: "0 0 1024 1024"
	  }, [/*#__PURE__*/vue.createElementVNode("path", {
	    "class": "logo",
	    d: "M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z",
	    fill: "",
	    "p-id": "3769"
	  })])], -1
	  /* HOISTED */
	  );
	});

	var _hoisted_5$2 = /*#__PURE__*/_withScopeId$2(function () {
	  return /*#__PURE__*/vue.createElementVNode("div", {
	    "class": "contatiner"
	  }, [/*#__PURE__*/vue.createCommentVNode(" 矩形周长：4r"), /*#__PURE__*/vue.createElementVNode("svg", {
	    width: "500px",
	    height: "500px",
	    viewBox: "0 0 200 200"
	  }, [/*#__PURE__*/vue.createCommentVNode(" 底 "), /*#__PURE__*/vue.createElementVNode("rect", {
	    x: "0",
	    y: "0",
	    width: "200",
	    height: "200",
	    fill: "none",
	    stroke: "#d1d3d7",
	    "stroke-width": "10"
	  }), /*#__PURE__*/vue.createElementVNode("rect", {
	    "class": "rectRingFly",
	    x: "0",
	    y: "0",
	    width: "200",
	    height: "200",
	    fill: "none",
	    stroke: "#00a5e0",
	    "stroke-width": "10"
	  })])], -1
	  /* HOISTED */
	  );
	});

	var _hoisted_6$2 = /*#__PURE__*/vue.createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"200px\" height=\"200px\" data-v-5a151e4f><!-- set 延迟设置不会补间--><rect x=\"0\" y=\"0\" fill=\"red\" width=\"100\" height=\"50\" data-v-5a151e4f><set attributeName=\"x\" to=\"10\" begin=\"1s\" data-v-5a151e4f></set><set attributeName=\"x\" to=\"20\" begin=\"2s\" data-v-5a151e4f></set><set attributeName=\"x\" to=\"30\" begin=\"3s\" data-v-5a151e4f></set><set attributeName=\"fill\" to=\"blue\" begin=\"4s\" data-v-5a151e4f></set></rect></svg></div>", 1);

	var _hoisted_7$2 = /*#__PURE__*/vue.createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"200px\" height=\"200px\" data-v-5a151e4f><!-- animate 延迟设置不会补间--><!-- &lt;rect x=&quot;0&quot; y=&quot;0&quot; fill=&quot;blue&quot; width=&quot;100&quot; height=&quot;50&quot;&gt;&lt;/rect&gt; --><circle cx=\"0\" cy=\"0\" r=\"30\" fill=\"blue\" stroke=\"black\" stroke-width=\"1\" data-v-5a151e4f><animate repeatCount=\"1\" attributeName=\"cx\" attributeType=\"XML\" from=\"0\" to=\"100\" dur=\"2s\" fill=\"freeze\" data-v-5a151e4f></animate><animate repeatCount=\"1\" attributeName=\"cy\" attributeType=\"XML\" from=\"0\" to=\"100\" dur=\"2s\" fill=\"freeze\" data-v-5a151e4f></animate><animateTransform attributeName=\"transform\" attributeType=\"XML\" begin=\"0\" dur=\"3s\" type=\"scale\" from=\"1\" to=\"4\" fill=\"freeze\" repeatCount=\"1\" data-v-5a151e4f></animateTransform></circle></svg></div>", 1);

	var _hoisted_8$2 = /*#__PURE__*/vue.createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 运动的矩形 --><rect x=\"0\" y=\"0\" width=\"10\" height=\"10\" fill=\"red\" data-v-5a151e4f><animateMotion path=\"M10 10 L110 10 L110 110 L10 110 Z\" dur=\"5s\" rotate=\"0\" repeatCount=\"indefinite\" data-v-5a151e4f></animateMotion></rect><path d=\"M10 10 L110 10 L110 110 L10 110 Z\" fill=\"none\" stroke=\"black\" stroke-width=\"3\" data-v-5a151e4f></path></svg></div>", 1);

	var _hoisted_9$2 = /*#__PURE__*/vue.createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 运动的矩形 --><rect x=\"0\" y=\"0\" width=\"10\" height=\"10\" fill=\"red\" data-v-5a151e4f><animateMotion id=\"forward-rect\" path=\"M10 10 L110 10 L110 110 L10 110\" dur=\"2s\" rotate=\"0\" fill=\"freeze\" begin=\"0;backward-rect.end+0.5\" data-v-5a151e4f></animateMotion><animateMotion id=\"backward-rect\" path=\"M10 110 L110 110 L110 10 L10 10 \" dur=\"2s\" rotate=\"0\" fill=\"freeze\" begin=\"forward-rect.end + 0.5s\" data-v-5a151e4f></animateMotion></rect><path d=\"M10 10 L110 10 L110 110 L10 110\" fill=\"none\" stroke=\"black\" stroke-width=\"1\" data-v-5a151e4f></path></svg></div>", 1);

	function render$3(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", null, [_hoisted_1$3, _hoisted_4$2, _hoisted_5$2, vue.createCommentVNode(" set "), _hoisted_6$2, vue.createCommentVNode(" animate "), _hoisted_7$2, vue.createCommentVNode(" 路径运动 "), _hoisted_8$2, vue.createCommentVNode(" 翻转效果 "), _hoisted_9$2]);
	}

	var css_248z$2 = ".contatiner[data-v-5a151e4f] svg[data-v-5a151e4f] {\n  border: 1px solid #000;\n}\n\n.circle-ring[data-v-5a151e4f] {\n  stroke-dasharray: 566 566;\n  animation: circle-ring-5a151e4f 5s linear infinite;\n}\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 566;\n  }\n  to {\n    stroke-dasharray: 566 566;\n  }\n}\n.rectRing[data-v-5a151e4f] {\n  stroke-dasharray: 800 800;\n  animation: circle-ring-5a151e4f 5s linear infinite;\n}\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 800;\n  }\n  to {\n    stroke-dasharray: 800 800;\n  }\n}\n.logo[data-v-5a151e4f] {\n  fill: none;\n  stroke: #333;\n  stroke-width: 5;\n  animation: logoAnimation-5a151e4f 10s linear forwards;\n}\n\n@keyframes logoAnimation-5a151e4f {\n  0% {\n    stroke-dasharray: 5430;\n    stroke-dashoffset: 5430;\n  }\n  50% {\n    stroke-dasharray: 5430;\n    fill: none;\n    stroke-dashoffset: 0;\n  }\n  75% {\n    fill: red;\n  }\n  100% {\n    fill: blue;\n  }\n}\n.rectRingFly[data-v-5a151e4f] {\n  stroke-dasharray: 100 800;\n  animation: rectRingFly-5a151e4f 5s linear infinite;\n}\n\n@keyframes rectRingFly-5a151e4f {\n  from {\n    stroke-dashoffset: 800;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}";
	styleInject(css_248z$2);

	script$3.render = render$3;
	script$3.__scopeId = "data-v-5a151e4f";
	script$3.__file = "src/components/SvgAnimation/SvgAnimation.vue";

	function SvgAnimation (Vue) {
	  Vue.component(script$3.name, script$3);
	}

	var script$2 = {
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
			const outsideColorAimation = vue.computed(
				() => `${props.outsideColor};${props.insideColor};${props.outsideColor}`
			);
			const insideColorAimation = vue.computed(
				() => `${props.insideColor};${props.outsideColor};${props.insideColor}`
			);
			return {
				outsideColorAimation,
				insideColorAimation,
			};
		},
	};

	var _withScopeId$1 = function _withScopeId(n) {
	  return vue.pushScopeId("data-v-416d18c9"), n = n(), vue.popScopeId(), n;
	};

	var _hoisted_1$2 = {
	  "class": "vdata-loading"
	};
	var _hoisted_2$1 = ["width", "height"];
	var _hoisted_3$1 = ["stroke"];

	var _hoisted_4$1 = /*#__PURE__*/_withScopeId$1(function () {
	  return /*#__PURE__*/vue.createElementVNode("animateTransform", {
	    attributeName: "transform",
	    type: "rotate",
	    from: "0 25 25",
	    to: "360 25 25",
	    dur: "1.5s",
	    repeatCount: "indefinite"
	  }, null, -1
	  /* HOISTED */
	  );
	});

	var _hoisted_5$1 = ["values"];
	var _hoisted_6$1 = ["stroke"];

	var _hoisted_7$1 = /*#__PURE__*/_withScopeId$1(function () {
	  return /*#__PURE__*/vue.createElementVNode("animateTransform", {
	    attributeName: "transform",
	    type: "rotate",
	    values: "360 25 25;0 25 25",
	    dur: "1.5s",
	    repeatCount: "indefinite"
	  }, null, -1
	  /* HOISTED */
	  );
	});

	var _hoisted_8$1 = ["values"];
	var _hoisted_9$1 = {
	  "class": "vdata-loading-content"
	};
	function render$2(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [(vue.openBlock(), vue.createElementBlock("svg", {
	    width: $props.width,
	    height: $props.height,
	    viewBox: "0 0 50 50"
	  }, [vue.createCommentVNode(" \r\n\t\t\t\t2*3.14*22\r\n\t\t\t\tstroke-dasharray=\"34 34\" 切等比例4块 2*3.14*22/4\r\n\t\t\t\tstroke-linecap=\"round\" 圆角\r\n\t\t\t\t "), vue.createElementVNode("circle", {
	    cx: "25",
	    cy: "25",
	    r: "22",
	    fill: "none",
	    stroke: $props.insideColor,
	    "stroke-width": "3",
	    "stroke-dasharray": "34 34",
	    "stroke-linecap": "round"
	  }, [vue.createCommentVNode(" 过渡动画 "), vue.createCommentVNode(" from(度数,圆心坐标.x,圆心坐标.y) "), vue.createCommentVNode(" from='' to=''可以用values='a,b,c;a,b,c'替换 "), _hoisted_4$1, vue.createElementVNode("animate", {
	    attributeName: "stroke",
	    values: $setup.outsideColorAimation,
	    dur: "3s",
	    repeatCount: "indefinite"
	  }, null, 8
	  /* PROPS */
	  , _hoisted_5$1)], 8
	  /* PROPS */
	  , _hoisted_3$1), vue.createElementVNode("circle", {
	    cx: "25",
	    cy: "25",
	    r: "12",
	    fill: "none",
	    stroke: $props.outsideColor,
	    "stroke-width": "3",
	    "stroke-linecap": "round",
	    "stroke-dasharray": "19 19"
	  }, [_hoisted_7$1, vue.createElementVNode("animate", {
	    attributeName: "stroke",
	    values: $setup.insideColorAimation,
	    dur: "3s",
	    repeatCount: "indefinite"
	  }, null, 8
	  /* PROPS */
	  , _hoisted_8$1)], 8
	  /* PROPS */
	  , _hoisted_6$1)], 8
	  /* PROPS */
	  , _hoisted_2$1)), vue.createElementVNode("div", _hoisted_9$1, [vue.renderSlot(_ctx.$slots, "default")])]);
	}

	var css_248z$1 = "\n.vdata-loading[data-v-416d18c9] {\r\n\ttext-align: center;\n}\r\n";
	styleInject(css_248z$1);

	script$2.render = render$2;
	script$2.__scopeId = "data-v-416d18c9";
	script$2.__file = "src/components/Loading/Loading.vue";

	function Loading (Vue) {
	  Vue.component(script$2.name, script$2);
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

	var script$1 = {
	  name: "VFlyBox",
	  props: {
	    duration: {
	      type: [Number, String],
	      "default": 3
	    },
	    lineColor: {
	      type: String,
	      "default": "#235fa7"
	    },
	    starColor: {
	      type: String,
	      "default": "#4fd2dd"
	    },
	    starLength: {
	      type: [Number, String],
	      "default": 50
	    }
	  },
	  setup: function setup(props) {
	    var uuid = v4(); // svg适配需要动态获取dom，然后根据dom去计算path

	    var width = vue.ref(0);
	    var height = vue.ref(0);
	    var flybox = vue.ref();
	    var borderid = "borderid-".concat(uuid);
	    var maskid = "mask-".concat(uuid);
	    var radialGradientId = "radialGradient-".concat(uuid);
	    var path = vue.computed(function () {
	      return "M5 5 L".concat(width.value - 5, " 5 L").concat(width.value - 5, " ").concat(height.value - 5, " L5 ").concat(height.value - 5, " Z");
	    });
	    var dur = vue.computed(function () {
	      return "".concat(props.duration, "s");
	    });

	    var init = function init() {
	      var dom = flybox.value;
	      width.value = dom.clientWidth;
	      height.value = dom.clientHeight;
	    };

	    vue.onMounted(function () {
	      init();
	    });
	    return {
	      radialGradientId: radialGradientId,
	      maskid: maskid,
	      borderid: borderid,
	      dur: dur,
	      flybox: flybox,
	      width: width,
	      height: height,
	      path: path
	    };
	  }
	};

	var _withScopeId = function _withScopeId(n) {
	  return vue.pushScopeId("data-v-449c7e3b"), n = n(), vue.popScopeId(), n;
	};

	var _hoisted_1$1 = {
	  "class": "vdata-border-flybox",
	  ref: "flybox"
	};
	var _hoisted_2 = ["width:", "height:"];
	var _hoisted_3 = ["id", "d"];
	var _hoisted_4 = ["id"];

	var _hoisted_5 = /*#__PURE__*/_withScopeId(function () {
	  return /*#__PURE__*/vue.createElementVNode("stop", {
	    offset: "0%",
	    "stop-color": "#fff",
	    "stop-opacity": "1"
	  }, null, -1
	  /* HOISTED */
	  );
	});

	var _hoisted_6 = /*#__PURE__*/_withScopeId(function () {
	  return /*#__PURE__*/vue.createElementVNode("stop", {
	    offset: "100%",
	    "stop-color": "#fff",
	    "stop-opacity": "0"
	  }, null, -1
	  /* HOISTED */
	  );
	});

	var _hoisted_7 = [_hoisted_5, _hoisted_6];
	var _hoisted_8 = ["id"];
	var _hoisted_9 = ["r", "fill"];
	var _hoisted_10 = ["path", "dur"];
	var _hoisted_11 = ["href", "stroke"];
	var _hoisted_12 = ["href", "stroke", "mask"];
	var _hoisted_13 = {
	  "class": "content"
	};
	function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [(vue.openBlock(), vue.createElementBlock("svg", {
	    "width:": $setup.width,
	    "height:": $setup.height
	  }, [vue.createElementVNode("defs", null, [vue.createElementVNode("path", {
	    id: $setup.borderid,
	    fill: "none",
	    d: $setup.path
	  }, null, 8
	  /* PROPS */
	  , _hoisted_3), vue.createElementVNode("radialGradient", {
	    id: $setup.radialGradientId,
	    r: "50%",
	    cx: "50%",
	    cy: "50%",
	    fx: "100%",
	    fy: "50%"
	  }, _hoisted_7, 8
	  /* PROPS */
	  , _hoisted_4), vue.createElementVNode("mask", {
	    id: $setup.maskid
	  }, [vue.createElementVNode("circle", {
	    r: $props.starLength,
	    cx: "0",
	    cy: "0",
	    fill: "url(#".concat($setup.radialGradientId, ")")
	  }, [vue.createElementVNode("animateMotion", {
	    path: $setup.path,
	    dur: $setup.dur,
	    repeatCount: "indefinite",
	    rotate: "auto"
	  }, null, 8
	  /* PROPS */
	  , _hoisted_10)], 8
	  /* PROPS */
	  , _hoisted_9)], 8
	  /* PROPS */
	  , _hoisted_8)]), vue.createCommentVNode(" 背景 "), vue.createElementVNode("use", {
	    href: "#".concat($setup.borderid),
	    "stroke-width": "1",
	    stroke: $props.lineColor
	  }, null, 8
	  /* PROPS */
	  , _hoisted_11), vue.createCommentVNode(" 实际 "), vue.createElementVNode("use", {
	    href: "#".concat($setup.borderid),
	    "stroke-width": "3",
	    stroke: $props.starColor,
	    mask: "url(#".concat($setup.maskid, ")")
	  }, null, 8
	  /* PROPS */
	  , _hoisted_12)], 8
	  /* PROPS */
	  , _hoisted_2)), vue.createElementVNode("div", _hoisted_13, [vue.renderSlot(_ctx.$slots, "default")])], 512
	  /* NEED_PATCH */
	  );
	}

	var css_248z = ".vdata-border-flybox[data-v-449c7e3b] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.vdata-border-flybox[data-v-449c7e3b] svg[data-v-449c7e3b] {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.vdata-border-flybox[data-v-449c7e3b] .content[data-v-449c7e3b] {\n  width: 100%;\n  height: 100%;\n  padding: 5px;\n  box-sizing: border-box;\n}";
	styleInject(css_248z);

	script$1.render = render$1;
	script$1.__scopeId = "data-v-449c7e3b";
	script$1.__file = "src/components/Border/FlyBox.vue";

	function Border (Vue) {
	  Vue.component(script$1.name, script$1);
	}

	var script = {
	  name: "VEcharts",
	  props: {
	    options: Object,
	    theme: {
	      type: [Object, String],
	      "default": ""
	    },
	    open: {
	      type: Boolean,
	      "default": false
	    },
	    type: {
	      type: Object,
	      "default": {
	        renderer: "canvas"
	      }
	    }
	  },
	  setup: function setup(props) {
	    var dom = vue.ref();
	    var charts;
	    vue.watch(function () {
	      return props.options;
	    }, function () {
	      charts.setOption(props.options);
	    }, {
	      deep: true
	    });

	    var onResize = function onResize() {
	      var _charts;

	      (_charts = charts) === null || _charts === void 0 ? void 0 : _charts.resize();
	    };

	    vue.onMounted(function () {
	      var _dom = dom.value;

	      if (!props.open) {
	        _dom.style.height = "150px";
	        _dom.style.width = "300px";
	      } else {
	        _dom.style.height = "100%";
	        _dom.style.width = "100%";
	      }

	      charts = Echarts__default["default"].init(_dom, props.theme, props.type);
	      charts.setOption(props.options);
	      window.addEventListener("resize", onResize);
	    });
	    vue.onUnmounted(function () {
	      window.removeEventListener("resize", onResize);
	    });
	    return {
	      dom: dom
	    };
	  }
	};

	var _hoisted_1 = {
	  "class": "echats",
	  ref: "dom"
	};
	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, null, 512
	  /* NEED_PATCH */
	  );
	}

	script.render = render;
	script.__file = "src/components/VueEcharts/VueEcharts.vue";

	function VueEcharts (Vue) {
	  Vue.component(script.name, script);
	}

	var component = function component(Vue) {
	  Vue.use(Test);
	  Vue.use(FullSreen);
	  Vue.use(Icon);
	  Vue.use(SvgAnimation);
	  Vue.use(Loading);
	  Vue.use(Border);
	  Vue.use(VueEcharts);
	};

	return component;

}));
//# sourceMappingURL=datav.umd.js.map

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.datav = factory(global.Vue));
})(this, (function (vue) { 'use strict';

	var script$5 = {
	  name: "ComTest",
	  setup: function setup() {
	    var a = vue.ref("test");
	    return {
	      a: a
	    };
	  }
	};

	var _withId$2 = /*#__PURE__*/vue.withScopeId("data-v-7cc4288f");

	vue.pushScopeId("data-v-7cc4288f");

	var _hoisted_1$5 = {
	  "class": "test"
	};

	var _hoisted_2$3 = /*#__PURE__*/vue.createVNode("svg", {
	  width: "20px",
	  height: "20px",
	  viewBox: "0 0 100 100"
	}, [/*#__PURE__*/vue.createVNode("line", {
	  x1: "0",
	  y1: "50",
	  x2: "100",
	  y2: "50",
	  "stroke-width": "8",
	  stroke: "currentColor"
	}), /*#__PURE__*/vue.createVNode("line", {
	  x1: "50",
	  y1: "0",
	  x2: "50",
	  y2: "100",
	  "stroke-width": "8",
	  stroke: "currentColor"
	})], -1
	/* HOISTED */
	);

	vue.popScopeId();

	var render$5 = /*#__PURE__*/_withId$2(function (_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createBlock("div", _hoisted_1$5, [_hoisted_2$3]);
	});

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

	var css_248z$4 = ".test[data-v-7cc4288f] {\n  color: yellow;\n}";
	styleInject(css_248z$4);

	script$5.render = render$5;
	script$5.__scopeId = "data-v-7cc4288f";
	script$5.__file = "src/components/Test/Test.vue";

	function Test (Vue) {
	  Vue.component(script$5.name, script$5);
	}

	var script$4 = {
	  name: "VFullSreen",
	  setup: function setup() {
	    var a = "hello word";
	    return {
	      a: a
	    };
	  }
	};

	var _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-8b5216c8");

	vue.pushScopeId("data-v-8b5216c8");

	var _hoisted_1$4 = {
	  "class": "test"
	};

	vue.popScopeId();

	var render$4 = /*#__PURE__*/_withId$1(function (_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createBlock("div", _hoisted_1$4, vue.toDisplayString($setup.a), 1
	  /* TEXT */
	  );
	});

	var css_248z$3 = ".test[data-v-8b5216c8] {\n  color: red;\n}";
	styleInject(css_248z$3);

	script$4.render = render$4;
	script$4.__scopeId = "data-v-8b5216c8";
	script$4.__file = "src/components/FullScreen/FullSreen.vue";

	function FullSreen (Vue) {
	  Vue.component(script$4.name, script$4);
	}

	// 配合iconfont symbol
	var script$3 = {
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
	var _hoisted_1$3 = {
	  "class": "icon"
	};
	function render$3(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createBlock("div", {
	    "class": "icon-wrapper",
	    style: _objectSpread({}, $props.style)
	  }, [(vue.openBlock(), vue.createBlock("svg", _hoisted_1$3, [vue.createVNode("use", {
	    href: $setup.iconName
	  }, null, 8
	  /* PROPS */
	  , ["href"])]))], 4
	  /* STYLE */
	  );
	}

	var css_248z$2 = "\n.icon-wrapper {\r\n\tdisplay: inline-block;\n}\n.icon {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tvertical-align: -0.15em;\r\n\tfill: currentColor;\r\n\toverflow: hidden;\n}\r\n";
	styleInject(css_248z$2);

	script$3.render = render$3;
	script$3.__file = "src/components/Icon/Icon.vue";

	function Icon (Vue) {
	  Vue.component(script$3.name, script$3);
	}

	var script$2 = {
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

	var _withId = /*#__PURE__*/vue.withScopeId("data-v-5a151e4f");

	vue.pushScopeId("data-v-5a151e4f");

	var _hoisted_1$2 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createVNode("svg", {
	  width: "500",
	  height: "200",
	  viewBox: "0 0 500 200"
	}, [/*#__PURE__*/vue.createVNode("rect", {
	  x: "0",
	  y: "0",
	  width: "100",
	  height: "50",
	  fill: "red",
	  transform: "translate(0,0) rotate(30)"
	})])], -1
	/* HOISTED */
	);

	var _hoisted_2$2 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createVNode("svg", {
	  width: "500",
	  height: "500",
	  viewBox: "0 0 200 200",
	  transform: "rotate(270)"
	}, [/*#__PURE__*/vue.createCommentVNode(" 底 "), /*#__PURE__*/vue.createVNode("circle", {
	  cx: "100",
	  cy: "100",
	  r: "90",
	  "stroke-width": "10",
	  stroke: "#d1d3d7",
	  fill: "none"
	}), /*#__PURE__*/vue.createCommentVNode(" 实际 "), /*#__PURE__*/vue.createCommentVNode(" 周长：2*PI*R "), /*#__PURE__*/vue.createCommentVNode(" 2*3.14*90 = 566"), /*#__PURE__*/vue.createCommentVNode("  "), /*#__PURE__*/vue.createVNode("circle", {
	  "class": "circle-ring",
	  cx: "100",
	  cy: "100",
	  r: "90",
	  "stroke-width": "10",
	  stroke: "#00a5e0",
	  fill: "none"
	})])], -1
	/* HOISTED */
	);

	var _hoisted_3$1 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createCommentVNode(" 矩形周长：4r"), /*#__PURE__*/vue.createVNode("svg", {
	  width: "500px",
	  height: "500px",
	  viewBox: "0 0 200 200"
	}, [/*#__PURE__*/vue.createCommentVNode(" 底 "), /*#__PURE__*/vue.createVNode("rect", {
	  x: "0",
	  y: "0",
	  width: "200",
	  height: "200",
	  fill: "none",
	  stroke: "#d1d3d7",
	  "stroke-width": "10"
	}), /*#__PURE__*/vue.createVNode("rect", {
	  "class": "rectRing",
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

	var _hoisted_4$1 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createCommentVNode(" 描边 "), /*#__PURE__*/vue.createVNode("svg", {
	  viewBox: "0 0 1024 1024"
	}, [/*#__PURE__*/vue.createVNode("path", {
	  "class": "logo",
	  d: "M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z",
	  fill: "",
	  "p-id": "3769"
	})])], -1
	/* HOISTED */
	);

	var _hoisted_5 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createCommentVNode(" 矩形周长：4r"), /*#__PURE__*/vue.createVNode("svg", {
	  width: "500px",
	  height: "500px",
	  viewBox: "0 0 200 200"
	}, [/*#__PURE__*/vue.createCommentVNode(" 底 "), /*#__PURE__*/vue.createVNode("rect", {
	  x: "0",
	  y: "0",
	  width: "200",
	  height: "200",
	  fill: "none",
	  stroke: "#d1d3d7",
	  "stroke-width": "10"
	}), /*#__PURE__*/vue.createVNode("rect", {
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

	var _hoisted_6 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createVNode("svg", {
	  width: "200px",
	  height: "200px"
	}, [/*#__PURE__*/vue.createCommentVNode(" set 延迟设置不会补间"), /*#__PURE__*/vue.createVNode("rect", {
	  x: "0",
	  y: "0",
	  fill: "red",
	  width: "100",
	  height: "50"
	}, [/*#__PURE__*/vue.createVNode("set", {
	  attributeName: "x",
	  to: "10",
	  begin: "1s"
	}), /*#__PURE__*/vue.createVNode("set", {
	  attributeName: "x",
	  to: "20",
	  begin: "2s"
	}), /*#__PURE__*/vue.createVNode("set", {
	  attributeName: "x",
	  to: "30",
	  begin: "3s"
	}), /*#__PURE__*/vue.createVNode("set", {
	  attributeName: "fill",
	  to: "blue",
	  begin: "4s"
	})])])], -1
	/* HOISTED */
	);

	var _hoisted_7 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createVNode("svg", {
	  width: "200px",
	  height: "200px"
	}, [/*#__PURE__*/vue.createCommentVNode(" animate 延迟设置不会补间"), /*#__PURE__*/vue.createCommentVNode(" <rect x=\"0\" y=\"0\" fill=\"blue\" width=\"100\" height=\"50\"></rect> "), /*#__PURE__*/vue.createVNode("circle", {
	  cx: "0",
	  cy: "0",
	  r: "30",
	  fill: "blue",
	  stroke: "black",
	  "stroke-width": "1"
	}, [/*#__PURE__*/vue.createVNode("animate", {
	  repeatCount: "1",
	  attributeName: "cx",
	  attributeType: "XML",
	  from: "0",
	  to: "100",
	  dur: "2s",
	  fill: "freeze"
	}), /*#__PURE__*/vue.createVNode("animate", {
	  repeatCount: "1",
	  attributeName: "cy",
	  attributeType: "XML",
	  from: "0",
	  to: "100",
	  dur: "2s",
	  fill: "freeze"
	}), /*#__PURE__*/vue.createVNode("animateTransform", {
	  attributeName: "transform",
	  attributeType: "XML",
	  begin: "0",
	  dur: "3s",
	  type: "scale",
	  from: "1",
	  to: "4",
	  fill: "freeze",
	  repeatCount: "1"
	})])])], -1
	/* HOISTED */
	);

	var _hoisted_8 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createCommentVNode(" 矩形周长：4r"), /*#__PURE__*/vue.createVNode("svg", {
	  width: "500px",
	  height: "500px",
	  viewBox: "0 0 200 200"
	}, [/*#__PURE__*/vue.createCommentVNode(" 运动的矩形 "), /*#__PURE__*/vue.createVNode("rect", {
	  x: "0",
	  y: "0",
	  width: "10",
	  height: "10",
	  fill: "red"
	}, [/*#__PURE__*/vue.createVNode("animateMotion", {
	  path: "M10 10 L110 10 L110 110 L10 110 Z",
	  dur: "5s",
	  rotate: "0",
	  repeatCount: "indefinite"
	})]), /*#__PURE__*/vue.createVNode("path", {
	  d: "M10 10 L110 10 L110 110 L10 110 Z",
	  fill: "none",
	  stroke: "black",
	  "stroke-width": "3"
	})])], -1
	/* HOISTED */
	);

	var _hoisted_9 = /*#__PURE__*/vue.createVNode("div", {
	  "class": "contatiner"
	}, [/*#__PURE__*/vue.createCommentVNode(" 矩形周长：4r"), /*#__PURE__*/vue.createVNode("svg", {
	  width: "500px",
	  height: "500px",
	  viewBox: "0 0 200 200"
	}, [/*#__PURE__*/vue.createCommentVNode(" 运动的矩形 "), /*#__PURE__*/vue.createVNode("rect", {
	  x: "0",
	  y: "0",
	  width: "10",
	  height: "10",
	  fill: "red"
	}, [/*#__PURE__*/vue.createVNode("animateMotion", {
	  id: "forward-rect",
	  path: "M10 10 L110 10 L110 110 L10 110",
	  dur: "2s",
	  rotate: "0",
	  fill: "freeze",
	  begin: "0;backward-rect.end+0.5"
	}), /*#__PURE__*/vue.createVNode("animateMotion", {
	  id: "backward-rect",
	  path: "M10 110 L110 110 L110 10 L10 10 ",
	  dur: "2s",
	  rotate: "0",
	  fill: "freeze",
	  begin: "forward-rect.end + 0.5s"
	})]), /*#__PURE__*/vue.createVNode("path", {
	  d: "M10 10 L110 10 L110 110 L10 110",
	  fill: "none",
	  stroke: "black",
	  "stroke-width": "1"
	})])], -1
	/* HOISTED */
	);

	vue.popScopeId();

	var render$2 = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createBlock("div", null, [_hoisted_1$2, _hoisted_2$2, _hoisted_3$1, _hoisted_4$1, _hoisted_5, vue.createCommentVNode(" set "), _hoisted_6, vue.createCommentVNode(" animate "), _hoisted_7, vue.createCommentVNode(" 路径运动 "), _hoisted_8, vue.createCommentVNode(" 翻转效果 "), _hoisted_9]);
	});

	var css_248z$1 = ".contatiner[data-v-5a151e4f] svg[data-v-5a151e4f] {\n  border: 1px solid #000;\n}\n\n.circle-ring[data-v-5a151e4f] {\n  stroke-dasharray: 566 566;\n  animation: circle-ring-5a151e4f 5s linear infinite;\n}\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 566;\n  }\n  to {\n    stroke-dasharray: 566 566;\n  }\n}\n.rectRing[data-v-5a151e4f] {\n  stroke-dasharray: 800 800;\n  animation: circle-ring-5a151e4f 5s linear infinite;\n}\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 800;\n  }\n  to {\n    stroke-dasharray: 800 800;\n  }\n}\n.logo[data-v-5a151e4f] {\n  fill: none;\n  stroke: #333;\n  stroke-width: 5;\n  animation: logoAnimation-5a151e4f 10s linear forwards;\n}\n\n@keyframes logoAnimation-5a151e4f {\n  0% {\n    stroke-dasharray: 5430;\n    stroke-dashoffset: 5430;\n  }\n  50% {\n    stroke-dasharray: 5430;\n    fill: none;\n    stroke-dashoffset: 0;\n  }\n  75% {\n    fill: red;\n  }\n  100% {\n    fill: blue;\n  }\n}\n.rectRingFly[data-v-5a151e4f] {\n  stroke-dasharray: 100 800;\n  animation: rectRingFly-5a151e4f 5s linear infinite;\n}\n\n@keyframes rectRingFly-5a151e4f {\n  from {\n    stroke-dashoffset: 800;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}";
	styleInject(css_248z$1);

	script$2.render = render$2;
	script$2.__scopeId = "data-v-5a151e4f";
	script$2.__file = "src/components/SvgAnimation/SvgAnimation.vue";

	function SvgAnimation (Vue) {
	  Vue.component(script$2.name, script$2);
	}

	var script$1 = {
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

	var _hoisted_1$1 = {
	  "class": "vdata-loading"
	};

	var _hoisted_2$1 = /*#__PURE__*/vue.createVNode("animateTransform", {
	  attributeName: "transform",
	  type: "rotate",
	  from: "0 25 25",
	  to: "360 25 25",
	  dur: "1.5s",
	  repeatCount: "indefinite"
	}, null, -1
	/* HOISTED */
	);

	var _hoisted_3 = /*#__PURE__*/vue.createVNode("animateTransform", {
	  attributeName: "transform",
	  type: "rotate",
	  values: "360 25 25;0 25 25",
	  dur: "1.5s",
	  repeatCount: "indefinite"
	}, null, -1
	/* HOISTED */
	);

	var _hoisted_4 = {
	  "class": "vdata-loading-content"
	};
	function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [(vue.openBlock(), vue.createBlock("svg", {
	    width: $props.width,
	    height: $props.height,
	    viewBox: "0 0 50 50"
	  }, [vue.createCommentVNode(" \r\n\t\t\t\t2*3.14*22\r\n\t\t\t\tstroke-dasharray=\"34 34\" 切等比例4块 2*3.14*22/4\r\n\t\t\t\tstroke-linecap=\"round\" 圆角\r\n\t\t\t\t "), vue.createVNode("circle", {
	    cx: "25",
	    cy: "25",
	    r: "22",
	    fill: "none",
	    stroke: $props.insideColor,
	    "stroke-width": "3",
	    "stroke-dasharray": "34 34",
	    "stroke-linecap": "round"
	  }, [vue.createCommentVNode(" 过渡动画 "), vue.createCommentVNode(" from(度数,圆心坐标.x,圆心坐标.y) "), vue.createCommentVNode(" from='' to=''可以用values='a,b,c;a,b,c'替换 "), _hoisted_2$1, vue.createVNode("animate", {
	    attributeName: "stroke",
	    values: $setup.outsideColorAimation,
	    dur: "3s",
	    repeatCount: "indefinite"
	  }, null, 8
	  /* PROPS */
	  , ["values"])], 8
	  /* PROPS */
	  , ["stroke"]), vue.createVNode("circle", {
	    cx: "25",
	    cy: "25",
	    r: "12",
	    fill: "none",
	    stroke: $props.outsideColor,
	    "stroke-width": "3",
	    "stroke-linecap": "round",
	    "stroke-dasharray": "19 19"
	  }, [_hoisted_3, vue.createVNode("animate", {
	    attributeName: "stroke",
	    values: $setup.insideColorAimation,
	    dur: "3s",
	    repeatCount: "indefinite"
	  }, null, 8
	  /* PROPS */
	  , ["values"])], 8
	  /* PROPS */
	  , ["stroke"])], 8
	  /* PROPS */
	  , ["width", "height"])), vue.createVNode("div", _hoisted_4, [vue.renderSlot(_ctx.$slots, "default")])]);
	}

	var css_248z = "\n.vdata-loading[data-v-416d18c9] {\r\n\ttext-align: center;\n}\r\n";
	styleInject(css_248z);

	script$1.render = render$1;
	script$1.__scopeId = "data-v-416d18c9";
	script$1.__file = "src/components/Loading/Loading.vue";

	function Loading (Vue) {
	  Vue.component(script$1.name, script$1);
	}

	var script = {
		name: "VFlyBox",
		setup() {
			return {};
		},
	};

	var _hoisted_1 = {
	  "class": "vdata-border-flybox"
	};

	var _hoisted_2 = /*#__PURE__*/vue.createVNode("svg", {
	  width: "400",
	  height: "400"
	}, [/*#__PURE__*/vue.createVNode("defs", null, [/*#__PURE__*/vue.createVNode("path", {
	  id: "border",
	  fill: "none",
	  d: "M 2.5, 2.5 L 2.5, 237.5 L 396.5, 237.5 L 396.5, 2.5 L 2.5, 2.5"
	}), /*#__PURE__*/vue.createVNode("mask", {
	  id: "mask"
	}, [/*#__PURE__*/vue.createVNode("circle", {
	  r: "100",
	  cx: "0",
	  cy: "0",
	  fill: "white"
	}, [/*#__PURE__*/vue.createVNode("animateMotion", {
	  path: "M 2.5, 2.5 L 2.5, 237.5 L 396.5, 237.5 L 396.5, 2.5 L 2.5, 2.5",
	  dur: "1.5s",
	  repeatCount: "indefinite",
	  rotate: "0"
	})])])]), /*#__PURE__*/vue.createCommentVNode(" 背景 "), /*#__PURE__*/vue.createVNode("use", {
	  href: "#border",
	  "stroke-width": "1",
	  stroke: "#235fa7"
	}), /*#__PURE__*/vue.createCommentVNode(" 实际 "), /*#__PURE__*/vue.createVNode("use", {
	  href: "#border",
	  "stroke-width": "3",
	  stroke: "#4fd2dd",
	  mask: "url(#mask)"
	})], -1
	/* HOISTED */
	);

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [_hoisted_2]);
	}

	script.render = render;
	script.__file = "src/components/Border/FlyBox.vue";

	function Border (Vue) {
	  Vue.component(script.name, script);
	}

	var component = function component(Vue) {
	  Vue.use(Test);
	  Vue.use(FullSreen);
	  Vue.use(Icon);
	  Vue.use(SvgAnimation);
	  Vue.use(Loading);
	  Vue.use(Border);
	};

	return component;

}));
//# sourceMappingURL=datav.umd.js.map

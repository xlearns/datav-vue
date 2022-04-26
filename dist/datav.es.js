import { ref, onMounted, nextTick, onUnmounted, openBlock, createElementBlock, renderSlot, createCommentVNode, computed, createElementVNode, pushScopeId, popScopeId, watch, normalizeStyle, Fragment, renderList, resolveComponent, normalizeClass, createVNode, createStaticVNode, toDisplayString, reactive, toRefs, isRef, unref } from 'vue';
import { to, timeline } from 'gsap';
import Echarts from 'echarts';

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
function isNumber(val) {
  return typeof val == 'number' && !isNaN(val);
}
function sleep(timer) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timer);
  });
}
function formatNumber(num, decimals, decimal, separator, prefix, suffix) {
  num = num.toFixed(decimals);
  num += '';
  var x = num.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? decimal + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }

  return prefix + x1 + x2 + suffix;
}

var script$l = {
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

var _hoisted_1$h = {
  ref: "dom",
  "class": "datav-full-sreen"
};
function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$h, [$setup.ready ? renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : createCommentVNode("v-if", true)], 512
  /* NEED_PATCH */
  );
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

var css_248z$g = ".datav-full-sreen[data-v-8b5216c8] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  transform-origin: left top;\n  z-index: 999;\n}";
styleInject(css_248z$g);

script$l.render = render$l;
script$l.__scopeId = "data-v-8b5216c8";
script$l.__file = "src/components/FullScreen/FullSreen.vue";

var DFullSreen = {
  install: function install(Vue) {
    Vue.component(script$l.name, script$l);
  }
};

var script$k = {
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

var _withScopeId$6 = function _withScopeId(n) {
  return pushScopeId("data-v-416d18c9"), n = n(), popScopeId(), n;
};

var _hoisted_1$g = {
  "class": "vdata-loading"
};
var _hoisted_2$c = ["width", "height"];
var _hoisted_3$7 = ["stroke"];

var _hoisted_4$5 = /*#__PURE__*/_withScopeId$6(function () {
  return /*#__PURE__*/createElementVNode("animateTransform", {
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

var _hoisted_5$5 = ["values"];
var _hoisted_6$5 = ["stroke"];

var _hoisted_7$3 = /*#__PURE__*/_withScopeId$6(function () {
  return /*#__PURE__*/createElementVNode("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    values: "360 25 25;0 25 25",
    dur: "1.5s",
    repeatCount: "indefinite"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_8$3 = ["values"];
var _hoisted_9$3 = {
  "class": "vdata-loading-content"
};
function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$g, [(openBlock(), createElementBlock("svg", {
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
  }, [createCommentVNode(" 过渡动画 "), createCommentVNode(" from(度数,圆心坐标.x,圆心坐标.y) "), createCommentVNode(" from='' to=''可以用values='a,b,c;a,b,c'替换 "), _hoisted_4$5, createElementVNode("animate", {
    attributeName: "stroke",
    values: $setup.outsideColorAimation,
    dur: "3s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_5$5)], 8
  /* PROPS */
  , _hoisted_3$7), createElementVNode("circle", {
    cx: "25",
    cy: "25",
    r: "12",
    fill: "none",
    stroke: $props.outsideColor,
    "stroke-width": "3",
    "stroke-linecap": "round",
    "stroke-dasharray": "19 19"
  }, [_hoisted_7$3, createElementVNode("animate", {
    attributeName: "stroke",
    values: $setup.insideColorAimation,
    dur: "3s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_8$3)], 8
  /* PROPS */
  , _hoisted_6$5)], 8
  /* PROPS */
  , _hoisted_2$c)), createElementVNode("div", _hoisted_9$3, [renderSlot(_ctx.$slots, "default")])]);
}

var css_248z$f = "\n.vdata-loading[data-v-416d18c9] {\r\n\ttext-align: center;\n}\r\n";
styleInject(css_248z$f);

script$k.render = render$k;
script$k.__scopeId = "data-v-416d18c9";
script$k.__file = "src/components/Loading/Loading.vue";

var DLoading = {
  install: function install(Vue) {
    Vue.component(script$k.name, script$k);
  }
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var asyncToGenerator = createCommonjsModule(function (module) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _asyncToGenerator = unwrapExports(asyncToGenerator);

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(arrayLikeToArray);

var arrayWithoutHoles = createCommonjsModule(function (module) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(arrayWithoutHoles);

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(iterableToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(unsupportedIterableToArray);

var nonIterableSpread = createCommonjsModule(function (module) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

unwrapExports(nonIterableSpread);

var toConsumableArray = createCommonjsModule(function (module) {
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _toConsumableArray = unwrapExports(toConsumableArray);

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var regenerator = runtime_1;

function useScreen(dom) {
  var width = 0;
  var height = 0;
  width = dom.clientWidth;
  height = dom.clientHeight;
  return {
    width: width,
    height: height
  };
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

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
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

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
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

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

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

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
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

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
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
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

var _getRawTag = getRawTag;

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
function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

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
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

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
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

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
function toSource(func) {
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

var _toSource = toSource;

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
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

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
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

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
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

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
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas;

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
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

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
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

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
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

var defineProperty$1 = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty$1 = defineProperty$1;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty$1) {
    _defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

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
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

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
function copyObject(source, props, object, customizer) {
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
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

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
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments;

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
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments;

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
var isArray = Array.isArray;

var isArray_1 = isArray;

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

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

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
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

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
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

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
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

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
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

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
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

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
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

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
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
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
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

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
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

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
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

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
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

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
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

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
function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
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
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
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

var _arrayFilter = arrayFilter;

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
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

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
var getSymbols = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

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
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$3) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$3) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

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

var _getTag = getTag;

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
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray;

/** Built-in value references. */
var Uint8Array$1 = _root.Uint8Array;

var _Uint8Array = Uint8Array$1;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

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
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return _cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return _cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return _cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

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
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
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

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$1;
}

var _baseIsMap = baseIsMap;

/* Node.js helper references. */
var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

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
var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

var isMap_1 = isMap;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$1;
}

var _baseIsSet = baseIsSet;

/* Node.js helper references. */
var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

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
var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

var isSet_1 = isSet;

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
function baseClone(value, bitmask, customizer, key, object, stack) {
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
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _baseAssignIn(result, value))
          : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn_1 : keys_1);

  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

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
  return _baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
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
function identity(value) {
  return value;
}

var identity_1 = identity;

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
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

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
function overRest(func, start, transform) {
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
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

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
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty$1 ? identity_1 : function(func, string) {
  return _defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

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
function shortOut(func) {
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

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

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
function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
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

var _createAssigner = createAssigner;

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
var assign = _createAssigner(function(object, source) {
  if (_isPrototype(source) || isArrayLike_1(source)) {
    _copyObject(source, keys_1(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      _assignValue(object, key, source[key]);
    }
  }
});

var assign_1 = assign;

var defaultConfig$1 = {
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
var script$j = {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  setup: function setup(props) {
    var dom = ref();
    var actualConfig = ref([]);
    var headerDataVal = ref([]);
    var headerStyleVal = ref([]);
    var rowsData = ref([]);
    var rowStyle = ref([]);
    var currentRowsData = ref([]);
    var currentIndex = ref(0); // 动画指针

    var columnWidths = ref([]);
    var aligns = ref([]);
    var domWidth = ref(0);
    var domHeight = ref(0);
    var rowNum = ref(0);
    var rowHeights = ref([]);
    var rowBg = ref([]);
    var avgHeight;
    var isAnimationStart = ref(true);

    var handleHeader = function handleHeader(config) {
      var _headerData = cloneDeep_1(config.headerData);

      var _headerStyle = cloneDeep_1(config.headerStyle);

      var _rowStyle = cloneDeep_1(config.rowStyle);

      var _rowsData = cloneDeep_1(config.data); // 获取居中方式


      var _aligns = cloneDeep_1(config.aligns);

      if (_headerData.length <= 0) return;

      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent);

        _headerStyle.unshift(config.headerIndexStyle);

        _rowStyle.unshift(config.rowIndexStyle); // 二维数组


        _rowsData.forEach(function (rows, index) {
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
      headerStyleVal.value = _headerStyle;
      columnWidths.value = _columnWidths;
      rowStyle.value = _rowStyle;
      aligns.value = _aligns; // 动态计算header中每一列的宽度

      var usedWidth = 0;
      var usedColumnNum = 0; // 判断是否存在自定义width

      _headerStyle.forEach(function (style) {
        if (style.width) {
          usedWidth += Number(style.width.replace("px", ""));
          usedColumnNum++;
        }
      }); // 动态计算列宽时，使用剩余未定义的宽度除以剩余的列数


      var avgWidth = (domWidth.value - usedWidth) / (_headerData.length - usedColumnNum);

      var _columnWidths = new Array(_headerData.length).fill(avgWidth);

      _headerStyle.forEach(function (style, index) {
        if (style.width) {
          var headerWidth = Number(style.width.replace("px", ""));
          _columnWidths[index] = headerWidth;
        }
      });

      columnWidths.value = _columnWidths;
      var rowNum = config.rowNum;

      if (_rowsData.length >= rowNum && _rowsData.length < rowNum * 2) {
        var newRowData = [].concat(_toConsumableArray(_rowsData), _toConsumableArray(_rowsData));
        rowsData.value = newRowData.map(function (item, index) {
          return {
            data: item,
            rowIndex: index
          };
        });
      } else {
        rowsData.value = _rowsData.map(function (item, index) {
          return {
            data: item,
            rowIndex: index
          };
        });
      }
    };

    var handleRows = function handleRows(config) {
      // 动态计算每行数据的高度
      var headerHeight = config.headerHeight;
      var unusedHeight = domHeight.value - headerHeight;
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

    var startAnimation = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var _rowHeights$value;

        var config, rowNum, moveNum, duration, totalLength, index, _rowsData, rows, waitTime, isLast;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (isAnimationStart.value) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                config = actualConfig.value;
                rowNum = config.rowNum, moveNum = config.moveNum, duration = config.duration;
                totalLength = rowsData.value.length;

                if (!(totalLength < rowNum)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return");

              case 7:
                // 动画索引
                index = currentIndex.value; // 表格数据

                _rowsData = cloneDeep_1(rowsData.value); // 数据重新头尾连接

                rows = _rowsData.slice(index);
                rows.push.apply(rows, _toConsumableArray(_rowsData.slice(0, index)));
                currentRowsData.value = rows; // 动画start
                // 先将所有行的高度还原

                rowHeights.value = new Array(totalLength).fill(avgHeight);
                waitTime = 300;

                if (isAnimationStart.value) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return");

              case 16:
                _context.next = 18;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, waitTime);
                });

              case 18:
                // 将moveNum的行高度设置0
                // 这里splice将指定元素删除并替换
                (_rowHeights$value = rowHeights.value).splice.apply(_rowHeights$value, [0, moveNum].concat(_toConsumableArray(new Array(moveNum).fill(0))));

                currentIndex.value += moveNum; // 动画end
                // 判断是否到达最后一组数据

                isLast = currentIndex.value - totalLength;

                if (isLast >= 0) {
                  currentIndex.value = isLast;
                }

                if (isAnimationStart.value) {
                  _context.next = 24;
                  break;
                }

                return _context.abrupt("return");

              case 24:
                _context.next = 26;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, duration - waitTime);
                });

              case 26:
                _context.next = 28;
                return startAnimation();

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function startAnimation() {
        return _ref.apply(this, arguments);
      };
    }();

    var stopAnimation = function stopAnimation() {
      isAnimationStart.value = false;
    };

    var update = function update() {
      stopAnimation();

      var _useScreen = useScreen(dom.value),
          width = _useScreen.width,
          height = _useScreen.height;

      domWidth.value = width;
      domHeight.value = height;

      var _actualConfig = assign_1(defaultConfig$1, props.config);

      rowsData.value = _actualConfig.data || [];
      handleHeader(_actualConfig);
      handleRows(_actualConfig);
      actualConfig.value = _actualConfig;
      isAnimationStart.value = true;
      startAnimation();
    };

    watch(function () {
      return props.config;
    }, function () {
      nextTick(function () {
        update();
      });
    }, {
      immediate: true
    });
    onMounted(function () {});
    return {
      dom: dom,
      columnWidths: columnWidths,
      actualConfig: actualConfig,
      currentRowsData: currentRowsData,
      headerDataVal: headerDataVal,
      headerStyleVal: headerStyleVal,
      rowsData: rowsData,
      rowStyle: rowStyle,
      rowHeights: rowHeights,
      rowBg: rowBg,
      aligns: aligns,
      domHeight: domHeight
    };
  }
};

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

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _hoisted_1$f = {
  "class": "base-scroll-list",
  ref: "dom"
};
var _hoisted_2$b = ["align", "innerHTML"];
var _hoisted_3$6 = ["align", "innerHTML"];
function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$f, [createElementVNode("div", {
    "class": "base-scroll-list-header",
    style: normalizeStyle({
      background: $setup.actualConfig.headerBg,
      height: "".concat($setup.actualConfig.headerHeight, "px"),
      fontSize: "".concat($setup.actualConfig.headerFontSize, "px"),
      color: $setup.actualConfig.headerColor
    })
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.headerDataVal, function (headerItem, i) {
    return openBlock(), createElementBlock("div", {
      "class": "header-item base-scroll-list-text",
      key: headerItem + i,
      style: normalizeStyle(_objectSpread$1(_objectSpread$1({}, $setup.headerStyleVal[i]), {}, {
        width: "".concat($setup.columnWidths[i], "px")
      })),
      align: $setup.aligns[i],
      innerHTML: headerItem
    }, null, 12
    /* STYLE, PROPS */
    , _hoisted_2$b);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 4
  /* STYLE */
  ), createElementVNode("div", {
    "class": "base-scroll-list-rows-wrapper",
    style: normalizeStyle({
      height: "".concat($setup.domHeight - $setup.actualConfig.headerHeight, "px")
    })
  }, [createCommentVNode(" key必须是rowData.rowIndex既然唯一性否则会出现渲染错乱 "), (openBlock(true), createElementBlock(Fragment, null, renderList($setup.currentRowsData, function (rowData, index) {
    return openBlock(), createElementBlock("div", {
      "class": "base-scroll-list-rows",
      style: normalizeStyle({
        height: "".concat($setup.rowHeights[index], "px"),
        lineHeight: "".concat($setup.rowHeights[index], "px"),
        background: rowData.rowIndex % 2 ? $setup.rowBg[1] : $setup.rowBg[0],
        fontSize: "".concat($setup.actualConfig.rowFontSize, "px"),
        color: $setup.actualConfig.rowColor
      }),
      key: rowData
    }, [(openBlock(true), createElementBlock(Fragment, null, renderList(rowData.data, function (colData, colIndex) {
      return openBlock(), createElementBlock("div", {
        "class": "base-scroll-list-columns base-scroll-list-text",
        style: normalizeStyle(_objectSpread$1({
          width: "".concat($setup.columnWidths[colIndex], "px")
        }, $setup.rowStyle[colIndex])),
        align: $setup.aligns[colIndex],
        innerHTML: colData
      }, null, 12
      /* STYLE, PROPS */
      , _hoisted_3$6);
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

var css_248z$e = ".base-scroll-list[data-v-69eed30f] {\n  height: 100%;\n}\n.base-scroll-list[data-v-69eed30f] .base-scroll-list-text[data-v-69eed30f] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  box-sizing: border-box;\n}\n.base-scroll-list[data-v-69eed30f] .base-scroll-list-header[data-v-69eed30f] {\n  display: flex;\n  font-size: 15px;\n  align-items: center;\n}\n.base-scroll-list[data-v-69eed30f] .base-scroll-list-rows-wrapper[data-v-69eed30f] {\n  overflow: hidden;\n}\n.base-scroll-list[data-v-69eed30f] .base-scroll-list-rows-wrapper[data-v-69eed30f] .base-scroll-list-rows[data-v-69eed30f] {\n  display: flex;\n  align-items: center;\n  transition: all 0.3s linear;\n}\n.base-scroll-list[data-v-69eed30f] .base-scroll-list-rows-wrapper[data-v-69eed30f] .base-scroll-list-rows[data-v-69eed30f] .base-scroll-list-columns[data-v-69eed30f] {\n  height: 100%;\n}";
styleInject(css_248z$e);

script$j.render = render$j;
script$j.__scopeId = "data-v-69eed30f";
script$j.__file = "src/components/BaseScrollList/BaseScrollList.vue";

var DBaseScrollList = {
  install: function install(Vue) {
    Vue.component(script$j.name, script$j);
  }
};

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

for (var i$1 = 0; i$1 < 256; ++i$1) {
  byteToHex.push((i$1 + 0x100).toString(16).substr(1));
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

var script$i = {
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

    var width = ref(0);
    var height = ref(0);
    var flybox = ref();
    var borderid = "borderid-".concat(uuid);
    var maskid = "mask-".concat(uuid);
    var radialGradientId = "radialGradient-".concat(uuid);
    var path = computed(function () {
      return "M5 5 L".concat(width.value - 5, " 5 L").concat(width.value - 5, " ").concat(height.value - 5, " L5 ").concat(height.value - 5, " Z");
    });
    var dur = computed(function () {
      return "".concat(props.duration, "s");
    });

    var init = function init() {
      var dom = flybox.value;
      width.value = dom.clientWidth;
      height.value = dom.clientHeight;
    };

    onMounted(function () {
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

var _withScopeId$5 = function _withScopeId(n) {
  return pushScopeId("data-v-449c7e3b"), n = n(), popScopeId(), n;
};

var _hoisted_1$e = {
  "class": "vdata-border-flybox",
  ref: "flybox"
};
var _hoisted_2$a = ["width:", "height:"];
var _hoisted_3$5 = ["id", "d"];
var _hoisted_4$4 = ["id"];

var _hoisted_5$4 = /*#__PURE__*/_withScopeId$5(function () {
  return /*#__PURE__*/createElementVNode("stop", {
    offset: "0%",
    "stop-color": "#fff",
    "stop-opacity": "1"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_6$4 = /*#__PURE__*/_withScopeId$5(function () {
  return /*#__PURE__*/createElementVNode("stop", {
    offset: "100%",
    "stop-color": "#fff",
    "stop-opacity": "0"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_7$2 = [_hoisted_5$4, _hoisted_6$4];
var _hoisted_8$2 = ["id"];
var _hoisted_9$2 = ["r", "fill"];
var _hoisted_10$1 = ["path", "dur"];
var _hoisted_11$1 = ["href", "stroke"];
var _hoisted_12$1 = ["href", "stroke", "mask"];
var _hoisted_13$1 = {
  "class": "content"
};
function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$e, [(openBlock(), createElementBlock("svg", {
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
  }, _hoisted_7$2, 8
  /* PROPS */
  , _hoisted_4$4), createElementVNode("mask", {
    id: $setup.maskid
  }, [createElementVNode("circle", {
    r: $props.starLength,
    cx: "0",
    cy: "0",
    fill: "url(#".concat($setup.radialGradientId, ")")
  }, [createElementVNode("animateMotion", {
    path: $setup.path,
    dur: $setup.dur,
    repeatCount: "indefinite",
    rotate: "auto"
  }, null, 8
  /* PROPS */
  , _hoisted_10$1)], 8
  /* PROPS */
  , _hoisted_9$2)], 8
  /* PROPS */
  , _hoisted_8$2)]), createCommentVNode(" 背景 "), createElementVNode("use", {
    href: "#".concat($setup.borderid),
    "stroke-width": "1",
    stroke: $props.lineColor
  }, null, 8
  /* PROPS */
  , _hoisted_11$1), createCommentVNode(" 实际 "), createElementVNode("use", {
    href: "#".concat($setup.borderid),
    "stroke-width": "3",
    stroke: $props.starColor,
    mask: "url(#".concat($setup.maskid, ")")
  }, null, 8
  /* PROPS */
  , _hoisted_12$1)], 8
  /* PROPS */
  , _hoisted_2$a)), createElementVNode("div", _hoisted_13$1, [renderSlot(_ctx.$slots, "default")])], 512
  /* NEED_PATCH */
  );
}

var css_248z$d = ".vdata-border-flybox[data-v-449c7e3b] {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.vdata-border-flybox[data-v-449c7e3b] svg[data-v-449c7e3b] {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.vdata-border-flybox[data-v-449c7e3b] .content[data-v-449c7e3b] {\n  width: 100%;\n  height: 100%;\n  padding: 5px;\n  box-sizing: border-box;\n}";
styleInject(css_248z$d);

script$i.render = render$i;
script$i.__scopeId = "data-v-449c7e3b";
script$i.__file = "src/components/Border/FlyBox.vue";

var script$h = {
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

var _hoisted_1$d = {
  "class": "btnAnimation"
};
var _hoisted_2$9 = {
  "class": "btnAnimation-box"
};
function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$d, [createElementVNode("span", {
    "class": "btnAnimation-span",
    style: normalizeStyle({
      background: "linear-gradient(to right, ".concat($props.topColor[0], ", ").concat($props.topColor[1], ")")
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("span", {
    "class": "btnAnimation-span",
    style: normalizeStyle({
      background: "linear-gradient(to right, ".concat($props.rightColor[0], ", ").concat($props.rightColor[1], ")")
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("span", {
    "class": "btnAnimation-span",
    style: normalizeStyle({
      background: "linear-gradient(to right, ".concat($props.bottomColor[0], ", ").concat($props.bottomColor[1], ")")
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("span", {
    "class": "btnAnimation-span",
    style: normalizeStyle({
      background: "linear-gradient(to right, ".concat($props.leftColor[0], ", ").concat($props.leftColor[1], ")")
    })
  }, null, 4
  /* STYLE */
  ), createElementVNode("div", _hoisted_2$9, [renderSlot(_ctx.$slots, "default")])]);
}

var css_248z$c = ".btnAnimation[data-v-7289f2a7] {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n\n.btnAnimation-box[data-v-7289f2a7] {\n  height: 100%;\n  width: 100%;\n}\n\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(1) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(to right, #035f3c, #16f03a);\n  animation: animate1-7289f2a7 2s linear infinite;\n  -webkit-animation: animate1-7289f2a7 2s linear infinite;\n}\n\n@keyframes animate1-7289f2a7 {\n  0% {\n    transform: translateX(-100%);\n    -webkit-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -o-transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(100%);\n    -webkit-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -o-transform: translateX(100%);\n  }\n}\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(2) {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(to bottom, #035f3c, #16f03a);\n  animation: animate2-7289f2a7 2s linear infinite;\n  -webkit-animation: animate2-7289f2a7 2s linear infinite;\n  animation-delay: 1s;\n}\n\n@keyframes animate2-7289f2a7 {\n  0% {\n    transform: translateY(-100%);\n    -webkit-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -o-transform: translateY(-100%);\n  }\n  100% {\n    transform: translateY(100%);\n    -webkit-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -o-transform: translateX(100%);\n  }\n}\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(3) {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 2px;\n  background: linear-gradient(to left, #035f3c, #16f03a);\n  animation: animate3-7289f2a7 2s linear infinite;\n  -webkit-animation: animate3-7289f2a7 2s linear infinite;\n}\n\n@keyframes animate3-7289f2a7 {\n  0% {\n    transform: translateX(100%);\n    -webkit-transform: translateX(100%);\n    -moz-transform: translateX(100%);\n    -ms-transform: translateX(100%);\n    -o-transform: translateX(100%);\n  }\n  100% {\n    transform: translateX(-100%);\n    -webkit-transform: translateX(-100%);\n    -moz-transform: translateX(-100%);\n    -ms-transform: translateX(-100%);\n    -o-transform: translateX(-100%);\n  }\n}\n.btnAnimation .btnAnimation-span[data-v-7289f2a7]:nth-child(4) {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 2px;\n  height: 100%;\n  background: linear-gradient(to top, #035f3c, #16f03a);\n  animation: animate4-7289f2a7 2s linear infinite;\n  -webkit-animation: animate4-7289f2a7 2s linear infinite;\n  animation-delay: 1s;\n}\n\n@keyframes animate4-7289f2a7 {\n  0% {\n    transform: translateY(100%);\n    -webkit-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -o-transform: translateY(100%);\n  }\n  100% {\n    transform: translateY(-100%);\n    -webkit-transform: translateY(-100%);\n    -moz-transform: translateY(-100%);\n    -ms-transform: translateY(-100%);\n    -o-transform: translateY(-100%);\n  }\n}";
styleInject(css_248z$c);

script$h.render = render$h;
script$h.__scopeId = "data-v-7289f2a7";
script$h.__file = "src/components/Border/DoubleBox.vue";

var script$g = {
  name: "VBorderThree",
  data: function data() {
    var timestamp = Date.now();
    return {
      width: 0,
      height: 0,
      svgStatus: false,
      ref: "border-box-9",
      gradientId: "border-box-9-gradient-".concat(timestamp),
      maskId: "border-box-9-mask-".concat(timestamp),
      defaultColor: ["#11eefd", "#0078d2"],
      mergedColor: ["#468ef4", "#0078d2"]
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.width = this.$refs[this.ref].clientWidth;
    this.height = this.$refs[this.ref].clientHeight;
    this.$nextTick(function () {
      _this.svgStatus = true;
    });
  }
};

var _withScopeId$4 = function _withScopeId(n) {
  return pushScopeId("data-v-3b192cab"), n = n(), popScopeId(), n;
};

var _hoisted_1$c = ["width", "height"];
var _hoisted_2$8 = ["id"];

var _hoisted_3$4 = /*#__PURE__*/_withScopeId$4(function () {
  return /*#__PURE__*/createElementVNode("animate", {
    attributeName: "x1",
    values: "0%;100%;0%",
    dur: "10s",
    begin: "0s",
    repeatCount: "indefinite"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_4$3 = /*#__PURE__*/_withScopeId$4(function () {
  return /*#__PURE__*/createElementVNode("animate", {
    attributeName: "x2",
    values: "100%;0%;100%",
    dur: "10s",
    begin: "0s",
    repeatCount: "indefinite"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_5$3 = ["stop-color"];
var _hoisted_6$3 = ["values"];
var _hoisted_7$1 = ["stop-color"];
var _hoisted_8$1 = ["values"];
var _hoisted_9$1 = ["id"];
var _hoisted_10 = ["points"];
var _hoisted_11 = ["points"];
var _hoisted_12 = ["points"];
var _hoisted_13 = ["points"];
var _hoisted_14 = ["points"];
var _hoisted_15 = ["points"];
var _hoisted_16 = ["points"];
var _hoisted_17 = ["points"];
var _hoisted_18 = ["points"];
var _hoisted_19 = ["width", "height", "fill", "mask"];
var _hoisted_20 = {
  "class": "border-box-content"
};
function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "class": "dv-border-box-9",
    ref: $data.ref
  }, [$data.svgStatus ? (openBlock(), createElementBlock("svg", {
    key: 0,
    "class": "dv-svg-container",
    width: $data.width,
    height: $data.height
  }, [createElementVNode("defs", null, [createElementVNode("linearGradient", {
    id: $data.gradientId,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, [_hoisted_3$4, _hoisted_4$3, createElementVNode("stop", {
    offset: "0%",
    "stop-color": $data.mergedColor[0]
  }, [createElementVNode("animate", {
    attributeName: "stop-color",
    values: "".concat($data.mergedColor[0], ";").concat($data.mergedColor[1], ";").concat($data.mergedColor[0]),
    dur: "10s",
    begin: "0s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_6$3)], 8
  /* PROPS */
  , _hoisted_5$3), createElementVNode("stop", {
    offset: "100%",
    "stop-color": $data.mergedColor[1]
  }, [createElementVNode("animate", {
    attributeName: "stop-color",
    values: "".concat($data.mergedColor[1], ";").concat($data.mergedColor[0], ";").concat($data.mergedColor[1]),
    dur: "10s",
    begin: "0s",
    repeatCount: "indefinite"
  }, null, 8
  /* PROPS */
  , _hoisted_8$1)], 8
  /* PROPS */
  , _hoisted_7$1)], 8
  /* PROPS */
  , _hoisted_2$8), createElementVNode("mask", {
    id: $data.maskId
  }, [createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: "8, ".concat($data.height * 0.4, " 8, 3, ").concat($data.width * 0.4 + 7, ", 3")
  }, null, 8
  /* PROPS */
  , _hoisted_10), createElementVNode("polyline", {
    fill: "#fff",
    points: "8, ".concat($data.height * 0.15, " 8, 3, ").concat($data.width * 0.1 + 7, ", 3\n              ").concat($data.width * 0.1, ", 8 14, 8 14, ").concat($data.height * 0.15 - 7, "\n            ")
  }, null, 8
  /* PROPS */
  , _hoisted_11), createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: "".concat($data.width * 0.5, ", 3 ").concat($data.width - 3, ", 3, ").concat($data.width - 3, ", ").concat($data.height * 0.25)
  }, null, 8
  /* PROPS */
  , _hoisted_12), createElementVNode("polyline", {
    fill: "#fff",
    points: "\n              ".concat($data.width * 0.52, ", 3 ").concat($data.width * 0.58, ", 3\n              ").concat($data.width * 0.58 - 7, ", 9 ").concat($data.width * 0.52 + 7, ", 9\n            ")
  }, null, 8
  /* PROPS */
  , _hoisted_13), createElementVNode("polyline", {
    fill: "#fff",
    points: "\n              ".concat($data.width * 0.9, ", 3 ").concat($data.width - 3, ", 3 ").concat($data.width - 3, ", ").concat($data.height * 0.1, "\n              ").concat($data.width - 9, ", ").concat($data.height * 0.1 - 7, " ").concat($data.width - 9, ", 9 ").concat($data.width * 0.9 + 7, ", 9\n            ")
  }, null, 8
  /* PROPS */
  , _hoisted_14), createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: "8, ".concat($data.height * 0.5, " 8, ").concat($data.height - 3, " ").concat($data.width * 0.3 + 7, ", ").concat($data.height - 3)
  }, null, 8
  /* PROPS */
  , _hoisted_15), createElementVNode("polyline", {
    fill: "#fff",
    points: "\n              8, ".concat($data.height * 0.55, " 8, ").concat($data.height * 0.7, "\n              2, ").concat($data.height * 0.7 - 7, " 2, ").concat($data.height * 0.55 + 7, "\n            ")
  }, null, 8
  /* PROPS */
  , _hoisted_16), createElementVNode("polyline", {
    stroke: "#fff",
    "stroke-width": "3",
    fill: "transparent",
    points: "".concat($data.width * 0.35, ", ").concat($data.height - 3, " ").concat($data.width - 3, ", ").concat($data.height - 3, " ").concat($data.width - 3, ", ").concat($data.height * 0.35)
  }, null, 8
  /* PROPS */
  , _hoisted_17), createElementVNode("polyline", {
    fill: "#fff",
    points: "\n              ".concat($data.width * 0.92, ", ").concat($data.height - 3, " ").concat($data.width - 3, ", ").concat($data.height - 3, " ").concat($data.width - 3, ", ").concat($data.height * 0.8, "\n              ").concat($data.width - 9, ", ").concat($data.height * 0.8 + 7, " ").concat($data.width - 9, ", ").concat($data.height - 9, " ").concat($data.width * 0.92 + 7, ", ").concat($data.height - 9, "\n            ")
  }, null, 8
  /* PROPS */
  , _hoisted_18)], 8
  /* PROPS */
  , _hoisted_9$1)]), createElementVNode("rect", {
    x: "0",
    y: "0",
    width: $data.width,
    height: $data.height,
    fill: "url(#".concat($data.gradientId, ")"),
    mask: "url(#".concat($data.maskId, ")")
  }, null, 8
  /* PROPS */
  , _hoisted_19)], 8
  /* PROPS */
  , _hoisted_1$c)) : createCommentVNode("v-if", true), createElementVNode("div", _hoisted_20, [renderSlot(_ctx.$slots, "default")])], 512
  /* NEED_PATCH */
  );
}

var css_248z$b = "\n.dv-border-box-9[data-v-3b192cab] {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\n}\nsvg[data-v-3b192cab] {\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tleft: 0px;\r\n\ttop: 0px;\n}\n.border-box-content[data-v-3b192cab] {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\n}\r\n";
styleInject(css_248z$b);

script$g.render = render$g;
script$g.__scopeId = "data-v-3b192cab";
script$g.__file = "src/components/Border/three.vue";

var DFlyBox = {
  install: function install(Vue) {
    Vue.component(script$i.name, script$i);
    Vue.component(script$h.name, script$h);
    Vue.component(script$g.name, script$g);
  }
};

var script$f = {
	name: "VButton",
	setup() {
		return {};
	},
};

var _withScopeId$3 = function _withScopeId(n) {
  return pushScopeId("data-v-4439b54f"), n = n(), popScopeId(), n;
};

var _hoisted_1$b = {
  "class": "btn vb"
};

var _hoisted_2$7 = /*#__PURE__*/_withScopeId$3(function () {
  return /*#__PURE__*/createElementVNode("div", {
    "class": "dot"
  }, null, -1
  /* HOISTED */
  );
});

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", _hoisted_1$b, [createElementVNode("span", null, [renderSlot(_ctx.$slots, "default")]), _hoisted_2$7]);
}

var css_248z$a = ".btn[data-v-4439b54f] {\n  vertical-align: top;\n  margin: 15px;\n  display: inline-block;\n  text-align: center;\n  width: 122px;\n  height: 44px;\n  line-height: 44px;\n  border-radius: 4px;\n  color: #fff;\n  cursor: pointer;\n}\n.btn[data-v-4439b54f] .dot[data-v-4439b54f] {\n  content: \"\";\n  animation: atom-4439b54f 2s infinite linear;\n  position: absolute;\n  top: 0;\n  width: 32px;\n  height: 100%;\n  border-radius: 50%;\n  transition: all 300ms ease;\n}\n.btn[data-v-4439b54f] .dot[data-v-4439b54f][data-v-4439b54f]::after {\n  content: \"\";\n  position: absolute;\n  top: -6px;\n  height: 5px;\n  width: 5px;\n  background: #fa5555;\n  border-radius: 50%;\n  border: 4px solid #fa5555;\n  box-shadow: 0 0 0.7em #fff, 0 0 2em #fa5555;\n}\n\n.vb[data-v-4439b54f] {\n  position: relative;\n  width: 120px;\n  color: #fa5555;\n  height: 40px;\n  line-height: 42px;\n  border: 2px solid #fa5555;\n  border-radius: 14px;\n  text-transform: uppercase;\n}\n\n@keyframes atom-4439b54f {\n  0% {\n    transform: translateX(0) rotate(0);\n  }\n  30% {\n    transform: translateX(86px) rotate(0);\n  }\n  50% {\n    transform: translateX(86px) rotate(180deg);\n  }\n  80% {\n    transform: translateX(0) rotate(180deg);\n  }\n  100% {\n    transform: translateX(0) rotate(360deg);\n  }\n}";
styleInject(css_248z$a);

script$f.render = render$f;
script$f.__scopeId = "data-v-4439b54f";
script$f.__file = "src/components/Button/Button.vue";

function BUtton (Vue) {
  Vue.component(script$f.name, script$f);
}

var EchartsData = {
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

// 配合iconfont symbol
var script$e = {
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _hoisted_1$a = {
  "class": "icon"
};
var _hoisted_2$6 = ["href"];
function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "class": "icon-wrapper",
    style: normalizeStyle(_objectSpread({}, $props.style))
  }, [(openBlock(), createElementBlock("svg", _hoisted_1$a, [createElementVNode("use", {
    href: $setup.iconName
  }, null, 8
  /* PROPS */
  , _hoisted_2$6)]))], 4
  /* STYLE */
  );
}

var css_248z$9 = "\n.icon-wrapper {\r\n\tdisplay: inline-block;\n}\n.icon {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tvertical-align: -0.15em;\r\n\tfill: currentColor;\r\n\toverflow: hidden;\n}\r\n";
styleInject(css_248z$9);

script$e.render = render$e;
script$e.__file = "src/components/Icon/Icon.vue";

var DIcon = {
  install: function install(Vue) {
    Vue.component(script$e.name, script$e);
  }
};

var _hoisted_1$9 = {
  viewBox: "0 0 1024 1024"
};

var _hoisted_2$5 = /*#__PURE__*/createElementVNode("path", {
  d: "M499.2 951.466667c-234.666667 0-426.666667-192-426.666667-426.666667 0-17.066667 0-38.4 4.266667-55.466667 4.266667-12.8 12.8-17.066667 25.6-17.066666 12.8 4.266667 17.066667 12.8 17.066667 25.6-4.266667 12.8-4.266667 29.866667-4.266667 46.933333 0 213.333333 170.666667 384 384 384s384-170.666667 384-384-170.666667-384-384-384c-25.6 0-46.933333 4.266667-72.533333 8.533333-12.8 0-21.333333-4.266667-25.6-17.066666 0-12.8 4.266667-21.333333 17.066666-25.6 25.6-4.266667 51.2-8.533333 81.066667-8.533334 234.666667 0 426.666667 192 426.666667 426.666667s-192 426.666667-426.666667 426.666667z",
  fill: "#7162AD",
  "p-id": "2204"
}, null, -1
/* HOISTED */
);

var _hoisted_3$3 = /*#__PURE__*/createElementVNode("path", {
  d: "M119.466667 418.133333h-8.533334c-8.533333-4.266667-17.066667-17.066667-12.8-29.866666 42.666667-119.466667 128-213.333333 238.933334-256 12.8-4.266667 21.333333 0 25.6 12.8 4.266667 12.8 0 21.333333-12.8 25.6C256 213.333333 174.933333 298.666667 140.8 405.333333c-4.266667 8.533333-12.8 12.8-21.333333 12.8z",
  fill: "#A495FC",
  "p-id": "2205"
}, null, -1
/* HOISTED */
);

var _hoisted_4$2 = /*#__PURE__*/createElementVNode("path", {
  d: "M392.533333 657.066667c-4.266667 0-12.8 0-17.066666-4.266667-8.533333-8.533333-8.533333-21.333333 0-29.866667l213.333333-213.333333c8.533333-8.533333 21.333333-8.533333 29.866667 0s8.533333 21.333333 0 29.866667l-213.333334 213.333333c0 4.266667-8.533333 4.266667-12.8 4.266667z",
  fill: "#7162AD",
  "p-id": "2206"
}, null, -1
/* HOISTED */
);

var _hoisted_5$2 = /*#__PURE__*/createElementVNode("path", {
  d: "M605.866667 657.066667c-4.266667 0-12.8 0-17.066667-4.266667l-213.333333-213.333333c-8.533333-8.533333-8.533333-21.333333 0-29.866667s21.333333-8.533333 29.866666 0l213.333334 213.333333c8.533333 8.533333 8.533333 21.333333 0 29.866667 0 4.266667-8.533333 4.266667-12.8 4.266667z",
  fill: "#7162AD",
  "p-id": "2207"
}, null, -1
/* HOISTED */
);

var _hoisted_6$2 = [_hoisted_2$5, _hoisted_3$3, _hoisted_4$2, _hoisted_5$2];
function render$d(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$9, _hoisted_6$2);
}

const script$d = {};


script$d.render = render$d;
script$d.__file = "src/components/Modal/close.vue";

var script$c = {
	name: "VModel",
	components: {
		close: script$d,
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

var _hoisted_1$8 = {
  key: 0,
  "class": "filterbg"
};
var _hoisted_2$4 = {
  key: 0,
  "class": "content"
};
function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_close = resolveComponent("close");

  return $setup.openDom ? (openBlock(), createElementBlock("div", _hoisted_1$8, [createElementVNode("div", {
    "class": normalizeClass(["popup", {
      openHeight: $setup.openHeight,
      openWidth: $setup.openWidth
    }])
  }, [$setup.ready ? (openBlock(), createElementBlock("div", _hoisted_2$4, [createElementVNode("div", {
    "class": "popupClose",
    onClick: _cache[0] || (_cache[0] = function () {
      return $setup.close && $setup.close.apply($setup, arguments);
    })
  }, [createVNode(_component_close)]), renderSlot(_ctx.$slots, "default")])) : createCommentVNode("v-if", true)], 2
  /* CLASS */
  )])) : createCommentVNode("v-if", true);
}

var css_248z$8 = ".filterbg[data-v-47db75aa] {\n  width: 100%;\n  height: 100%;\n  background: rgba(30, 182, 254, 0.5);\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 998;\n}\n.filterbg[data-v-47db75aa] .content[data-v-47db75aa] {\n  height: 100%;\n}\n.filterbg[data-v-47db75aa] .openHeight[data-v-47db75aa] {\n  height: 76% !important;\n}\n.filterbg[data-v-47db75aa] .openWidth[data-v-47db75aa] {\n  width: 82% !important;\n}\n.filterbg[data-v-47db75aa] .popup[data-v-47db75aa] {\n  overflow: hidden;\n  transition: all 0.4s;\n  width: 3px;\n  height: 0;\n  background: #061f3e;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: 999;\n  border-radius: 8px;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.filterbg[data-v-47db75aa] .popup[data-v-47db75aa] .popupClose[data-v-47db75aa] {\n  z-index: 100;\n  transition: all 0.2s;\n  cursor: pointer;\n  position: absolute;\n  width: 32px;\n  height: 32px;\n  top: 15px;\n  right: 18px;\n  background-size: 100%;\n}\n.filterbg[data-v-47db75aa] .popup[data-v-47db75aa] .popupClose[data-v-47db75aa][data-v-47db75aa]:hover {\n  transform: rotateZ(360deg);\n}";
styleInject(css_248z$8);

script$c.render = render$c;
script$c.__scopeId = "data-v-47db75aa";
script$c.__file = "src/components/Modal/Modal.vue";

var DModal = {
  install: function install(Vue) {
    Vue.component(script$c.name, script$c);
  }
};

function render$b(_ctx, _cache) {
  return openBlock(), createElementBlock("div");
}

const script$b = {};


script$b.render = render$b;
script$b.__file = "src/components/Notice/NoticeList.vue";

var DNoticeList = {
  install: function install(Vue) {
    Vue.component(script$b.name, script$b);
  }
};

var script$a = {
  name: "vReverse",
  props: {
    modelValue: {
      type: Boolean
    },
    active: {
      type: String,
      "default": "rotateX(75deg)"
    },
    leave: {
      type: String,
      "default": "rotateX(0deg)"
    },
    transition: {
      type: String,
      "default": "all 0.4s"
    },
    transformOrigin: {
      type: String,
      "default": "161px 100%"
    }
  },
  setup: function setup() {
    var dom = ref();
    return {
      dom: dom
    };
  }
};

var _hoisted_1$7 = {
  "class": "test",
  ref: "dom"
};
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$7, [createElementVNode("div", {
    "class": "main",
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

var css_248z$7 = ".test[data-v-681fe668] {\n  perspective: 800px;\n}";
styleInject(css_248z$7);

script$a.render = render$a;
script$a.__scopeId = "data-v-681fe668";
script$a.__file = "src/components/Reverse/compoent.vue";

var DReverse = {
  install: function install(Vue) {
    Vue.component(script$a.name, script$a);
  }
};

var script$9 = {
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
    onMounted(function () {
      var logo = document.querySelector(".logo");
      console.log(logo.getTotalLength());
    });
  }
};

var _withScopeId$2 = function _withScopeId(n) {
  return pushScopeId("data-v-5a151e4f"), n = n(), popScopeId(), n;
};

var _hoisted_1$6 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"500\" height=\"200\" viewBox=\"0 0 500 200\" data-v-5a151e4f><rect x=\"0\" y=\"0\" width=\"100\" height=\"50\" fill=\"red\" transform=\"translate(0,0) rotate(30)\" data-v-5a151e4f></rect></svg></div><div class=\"contatiner\" data-v-5a151e4f><svg width=\"500\" height=\"500\" viewBox=\"0 0 200 200\" transform=\"rotate(270)\" data-v-5a151e4f><!-- 底 --><circle cx=\"100\" cy=\"100\" r=\"90\" stroke-width=\"10\" stroke=\"#d1d3d7\" fill=\"none\" data-v-5a151e4f></circle><!-- 实际 --><!-- 周长：2*PI*R --><!-- 2*3.14*90 = 566--><!--  --><circle class=\"circle-ring\" cx=\"100\" cy=\"100\" r=\"90\" stroke-width=\"10\" stroke=\"#00a5e0\" fill=\"none\" data-v-5a151e4f></circle></svg></div><div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 底 --><rect x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#d1d3d7\" stroke-width=\"10\" data-v-5a151e4f></rect><rect class=\"rectRing\" x=\"0\" y=\"0\" width=\"200\" height=\"200\" fill=\"none\" stroke=\"#00a5e0\" stroke-width=\"10\" data-v-5a151e4f></rect></svg></div>", 3);

var _hoisted_4$1 = /*#__PURE__*/_withScopeId$2(function () {
  return /*#__PURE__*/createElementVNode("div", {
    "class": "contatiner"
  }, [/*#__PURE__*/createCommentVNode(" 描边 "), /*#__PURE__*/createElementVNode("svg", {
    viewBox: "0 0 1024 1024"
  }, [/*#__PURE__*/createElementVNode("path", {
    "class": "logo",
    d: "M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z",
    fill: "",
    "p-id": "3769"
  })])], -1
  /* HOISTED */
  );
});

var _hoisted_5$1 = /*#__PURE__*/_withScopeId$2(function () {
  return /*#__PURE__*/createElementVNode("div", {
    "class": "contatiner"
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

var _hoisted_6$1 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"200px\" height=\"200px\" data-v-5a151e4f><!-- set 延迟设置不会补间--><rect x=\"0\" y=\"0\" fill=\"red\" width=\"100\" height=\"50\" data-v-5a151e4f><set attributeName=\"x\" to=\"10\" begin=\"1s\" data-v-5a151e4f></set><set attributeName=\"x\" to=\"20\" begin=\"2s\" data-v-5a151e4f></set><set attributeName=\"x\" to=\"30\" begin=\"3s\" data-v-5a151e4f></set><set attributeName=\"fill\" to=\"blue\" begin=\"4s\" data-v-5a151e4f></set></rect></svg></div>", 1);

var _hoisted_7 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><svg width=\"200px\" height=\"200px\" data-v-5a151e4f><!-- animate 延迟设置不会补间--><!-- &lt;rect x=&quot;0&quot; y=&quot;0&quot; fill=&quot;blue&quot; width=&quot;100&quot; height=&quot;50&quot;&gt;&lt;/rect&gt; --><circle cx=\"0\" cy=\"0\" r=\"30\" fill=\"blue\" stroke=\"black\" stroke-width=\"1\" data-v-5a151e4f><animate repeatCount=\"1\" attributeName=\"cx\" attributeType=\"XML\" from=\"0\" to=\"100\" dur=\"2s\" fill=\"freeze\" data-v-5a151e4f></animate><animate repeatCount=\"1\" attributeName=\"cy\" attributeType=\"XML\" from=\"0\" to=\"100\" dur=\"2s\" fill=\"freeze\" data-v-5a151e4f></animate><animateTransform attributeName=\"transform\" attributeType=\"XML\" begin=\"0\" dur=\"3s\" type=\"scale\" from=\"1\" to=\"4\" fill=\"freeze\" repeatCount=\"1\" data-v-5a151e4f></animateTransform></circle></svg></div>", 1);

var _hoisted_8 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 运动的矩形 --><rect x=\"0\" y=\"0\" width=\"10\" height=\"10\" fill=\"red\" data-v-5a151e4f><animateMotion path=\"M10 10 L110 10 L110 110 L10 110 Z\" dur=\"5s\" rotate=\"0\" repeatCount=\"indefinite\" data-v-5a151e4f></animateMotion></rect><path d=\"M10 10 L110 10 L110 110 L10 110 Z\" fill=\"none\" stroke=\"black\" stroke-width=\"3\" data-v-5a151e4f></path></svg></div>", 1);

var _hoisted_9 = /*#__PURE__*/createStaticVNode("<div class=\"contatiner\" data-v-5a151e4f><!-- 矩形周长：4r--><svg width=\"500px\" height=\"500px\" viewBox=\"0 0 200 200\" data-v-5a151e4f><!-- 运动的矩形 --><rect x=\"0\" y=\"0\" width=\"10\" height=\"10\" fill=\"red\" data-v-5a151e4f><animateMotion id=\"forward-rect\" path=\"M10 10 L110 10 L110 110 L10 110\" dur=\"2s\" rotate=\"0\" fill=\"freeze\" begin=\"0;backward-rect.end+0.5\" data-v-5a151e4f></animateMotion><animateMotion id=\"backward-rect\" path=\"M10 110 L110 110 L110 10 L10 10 \" dur=\"2s\" rotate=\"0\" fill=\"freeze\" begin=\"forward-rect.end + 0.5s\" data-v-5a151e4f></animateMotion></rect><path d=\"M10 10 L110 10 L110 110 L10 110\" fill=\"none\" stroke=\"black\" stroke-width=\"1\" data-v-5a151e4f></path></svg></div>", 1);

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [_hoisted_1$6, _hoisted_4$1, _hoisted_5$1, createCommentVNode(" set "), _hoisted_6$1, createCommentVNode(" animate "), _hoisted_7, createCommentVNode(" 路径运动 "), _hoisted_8, createCommentVNode(" 翻转效果 "), _hoisted_9]);
}

var css_248z$6 = ".contatiner[data-v-5a151e4f] svg[data-v-5a151e4f] {\n  border: 1px solid #000;\n}\n\n.circle-ring[data-v-5a151e4f] {\n  stroke-dasharray: 566 566;\n  animation: circle-ring-5a151e4f 5s linear infinite;\n}\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 566;\n  }\n  to {\n    stroke-dasharray: 566 566;\n  }\n}\n.rectRing[data-v-5a151e4f] {\n  stroke-dasharray: 800 800;\n  animation: circle-ring-5a151e4f 5s linear infinite;\n}\n\n@keyframes circle-ring-5a151e4f {\n  from {\n    stroke-dasharray: 0 800;\n  }\n  to {\n    stroke-dasharray: 800 800;\n  }\n}\n.logo[data-v-5a151e4f] {\n  fill: none;\n  stroke: #333;\n  stroke-width: 5;\n  animation: logoAnimation-5a151e4f 10s linear forwards;\n}\n\n@keyframes logoAnimation-5a151e4f {\n  0% {\n    stroke-dasharray: 5430;\n    stroke-dashoffset: 5430;\n  }\n  50% {\n    stroke-dasharray: 5430;\n    fill: none;\n    stroke-dashoffset: 0;\n  }\n  75% {\n    fill: red;\n  }\n  100% {\n    fill: blue;\n  }\n}\n.rectRingFly[data-v-5a151e4f] {\n  stroke-dasharray: 100 800;\n  animation: rectRingFly-5a151e4f 5s linear infinite;\n}\n\n@keyframes rectRingFly-5a151e4f {\n  from {\n    stroke-dashoffset: 800;\n  }\n  to {\n    stroke-dashoffset: 0;\n  }\n}";
styleInject(css_248z$6);

script$9.render = render$9;
script$9.__scopeId = "data-v-5a151e4f";
script$9.__file = "src/components/SvgAnimation/SvgAnimation.vue";

var DSvgAnimation = {
  install: function install(Vue) {
    Vue.component(script$9.name, script$9);
  }
};

var script$8 = {
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

var _withScopeId$1 = function _withScopeId(n) {
  return pushScopeId("data-v-0051a1e2"), n = n(), popScopeId(), n;
};

var _hoisted_1$5 = {
  "class": "item"
};

var _hoisted_2$3 = /*#__PURE__*/_withScopeId$1(function () {
  return /*#__PURE__*/createElementVNode("span", {
    "class": "ball"
  }, null, -1
  /* HOISTED */
  );
});

var _hoisted_3$2 = {
  key: 0
};
var _hoisted_4 = {
  key: 1,
  "class": "content"
};
var _hoisted_5 = {
  "class": "item"
};
var _hoisted_6 = {
  "class": "item"
};
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    onClick: _cache[0] || (_cache[0] = function () {
      return $setup.click && $setup.click.apply($setup, arguments);
    }),
    "class": normalizeClass([$setup.classComputed, "box"]),
    style: normalizeStyle({
      backgroundColor: $props.modelValue ? $props.leftColor : $props.rightColor
    })
  }, [$props.type == 2 ? (openBlock(), createElementBlock("div", {
    key: 0,
    "class": normalizeClass([$props.modelValue ? 'left' : 'right'])
  }, [createElementVNode("div", _hoisted_1$5, toDisplayString($props.modelValue ? $props.leftValue : $props.rightValue), 1
  /* TEXT */
  ), _hoisted_2$3], 2
  /* CLASS */
  )) : (openBlock(), createElementBlock("div", {
    key: 1,
    "class": normalizeClass([[$props.modelValue ? 'left' : 'right'], "ani"])
  }, [$props.type == 1 ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString($props.modelValue ? $props.leftValue : $props.rightValue), 1
  /* TEXT */
  )) : (openBlock(), createElementBlock("span", _hoisted_4, [createElementVNode("span", _hoisted_5, toDisplayString($props.leftValue), 1
  /* TEXT */
  ), createElementVNode("span", {
    "class": normalizeClass(["box-block ani", [$props.modelValue ? 'leftActive' : 'rightActive']])
  }, null, 2
  /* CLASS */
  ), createElementVNode("span", _hoisted_6, toDisplayString($props.rightValue), 1
  /* TEXT */
  )]))], 2
  /* CLASS */
  ))], 6
  /* CLASS, STYLE */
  );
}

var css_248z$5 = ".ani[data-v-0051a1e2] {\n  transition: all 0.3s;\n}\n\n.box[data-v-0051a1e2] {\n  position: relative;\n  height: 100%;\n  min-height: 36px;\n  width: 76px;\n}\n\n.isRadius[data-v-0051a1e2] {\n  border-radius: 100px;\n}\n\n.one[data-v-0051a1e2] .left[data-v-0051a1e2] {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: 20px;\n  height: 10px;\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1;\n  padding: 9px 4px;\n  background-color: #03a9f4;\n  border-radius: 50%;\n}\n.one[data-v-0051a1e2] .right[data-v-0051a1e2] {\n  position: absolute;\n  top: 4px;\n  left: calc(100% - 30px);\n  width: 20px;\n  height: 10px;\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1;\n  padding: 9px 4px;\n  background-color: #f44336;\n  border-radius: 50%;\n}\n\n.two[data-v-0051a1e2] .left[data-v-0051a1e2] {\n  transition: all 0.3s;\n}\n.two[data-v-0051a1e2] .left[data-v-0051a1e2] .item[data-v-0051a1e2] {\n  transition: all 0.3s;\n  position: absolute;\n  left: calc(100% - 30px);\n  top: 6px;\n  color: #fff;\n}\n.two[data-v-0051a1e2] .left[data-v-0051a1e2] .ball[data-v-0051a1e2] {\n  transition: all 0.3s;\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: 20px;\n  height: 10px;\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1;\n  padding: 9px 4px;\n  background-color: #fff;\n  border-radius: 50%;\n}\n.two[data-v-0051a1e2] .right[data-v-0051a1e2] {\n  transition: all 0.3s;\n}\n.two[data-v-0051a1e2] .right[data-v-0051a1e2] .item[data-v-0051a1e2] {\n  color: #fff;\n  transition: all 0.3s;\n  position: absolute;\n  left: 4px;\n  top: 6px;\n}\n.two[data-v-0051a1e2] .right[data-v-0051a1e2] .ball[data-v-0051a1e2] {\n  transition: all 0.3s;\n  position: absolute;\n  top: 4px;\n  left: calc(100% - 30px);\n  width: 20px;\n  height: 10px;\n  color: #fff;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  line-height: 1;\n  padding: 9px 4px;\n  background-color: #fff;\n  border-radius: 50%;\n}\n\n.three[data-v-0051a1e2] {\n  height: 36px;\n}\n.three[data-v-0051a1e2] .left[data-v-0051a1e2],\n.three[data-v-0051a1e2] .right[data-v-0051a1e2] {\n  display: inline-block;\n  height: 100%;\n  width: 100%;\n}\n.three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2],\n.three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  perspective: 70px;\n}\n.three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2] .item[data-v-0051a1e2],\n.three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] .item[data-v-0051a1e2] {\n  display: inline-block;\n}\n.three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2] .leftActive[data-v-0051a1e2],\n.three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] .leftActive[data-v-0051a1e2] {\n  transform: rotateY(-180deg) !important;\n  background-color: #03a9f4 !important;\n}\n.three[data-v-0051a1e2] .left[data-v-0051a1e2] .content[data-v-0051a1e2] .box-block[data-v-0051a1e2],\n.three[data-v-0051a1e2] .right[data-v-0051a1e2] .content[data-v-0051a1e2] .box-block[data-v-0051a1e2] {\n  position: absolute;\n  top: 4px;\n  border-radius: 2px;\n  right: 4px;\n  width: 33px;\n  height: 28px;\n  background-color: #f44336;\n  transform: rotateY(0);\n  transform-origin: 0% 50%;\n  transition: 0.6s ease all;\n  z-index: 1;\n}";
styleInject(css_248z$5);

script$8.render = render$8;
script$8.__scopeId = "data-v-0051a1e2";
script$8.__file = "src/components/Switch/Switch.vue";

var DSwitch = {
  install: function install(Vue) {
    Vue.component(script$8.name, script$8);
  }
};

var script$7 = {
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

var _hoisted_1$4 = ["width", "height"];
var _hoisted_2$2 = ["x", "y", "font-size", "fill-opacity"];
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", {
    "class": "tag-cloud",
    width: $props.options.width,
    height: $props.options.height,
    onMousemove: _cache[0] || (_cache[0] = function ($event) {
      return $setup.listener($event);
    })
  }, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allTags, function (tag, index) {
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
    , _hoisted_2$2)]);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 40
  /* PROPS, HYDRATE_EVENTS */
  , _hoisted_1$4);
}

var css_248z$4 = "\n.tag-cloud[data-v-b4886fa2] {\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tleft: 50%;\r\n\ttransform: translateX(-50%) translateY(-50%);\n}\r\n";
styleInject(css_248z$4);

script$7.render = render$7;
script$7.__scopeId = "data-v-b4886fa2";
script$7.__file = "src/components/TagCloud/TagCloud.vue";

var DTagCloud = {
  install: function install(Vue) {
    Vue.component(script$7.name, script$7);
  }
};

var script$6 = {
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

var _hoisted_1$3 = ["innerHTML"];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    "class": "vToolTip",
    onMouseenter: _cache[0] || (_cache[0] = function () {
      return $setup.mouseenter && $setup.mouseenter.apply($setup, arguments);
    }),
    onMouseleave: _cache[1] || (_cache[1] = function () {
      return $setup.mouseleave && $setup.mouseleave.apply($setup, arguments);
    }),
    ref: "dom"
  }, [$setup.show ? (openBlock(), createElementBlock("div", {
    key: 0,
    style: normalizeStyle($setup.style),
    "class": normalizeClass(["tool_tip", "tool_tip_".concat($props.placement)]),
    ref: "BoxDom",
    innerHTML: $props.content
  }, null, 14
  /* CLASS, STYLE, PROPS */
  , _hoisted_1$3)) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  );
}

var css_248z$3 = ".vToolTip[data-v-61e09817] .tool_tip[data-v-61e09817] {\n  background-color: rgba(0, 0, 0, 0.9);\n  padding: 4px 8px;\n  border-radius: 4px;\n  color: #fff;\n  font-size: 12px;\n  position: absolute;\n  z-index: 99999;\n  word-wrap: break-word;\n  max-width: 1000px;\n  box-sizing: border-box;\n}\n.vToolTip[data-v-61e09817] .tool_tip[data-v-61e09817]:before {\n  position: absolute;\n  content: \"\";\n  background-color: rgba(0, 0, 0, 0);\n  width: 0;\n  height: 0;\n  border-width: 5px;\n  border-style: solid;\n}\n.vToolTip[data-v-61e09817] .tool_tip_top[data-v-61e09817]:before {\n  top: 100%;\n  left: 50%;\n  transform: translate(-50%, 0);\n  -ms-transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;\n}\n.vToolTip[data-v-61e09817] .tool_tip_right[data-v-61e09817]:before {\n  top: 50%;\n  left: 0;\n  transform: translate(-100%, -50%);\n  -ms-transform: translate(-100%, -50%);\n  -webkit-transform: translate(-100%, -50%);\n  border-color: transparent rgba(0, 0, 0, 0.9) transparent transparent;\n}\n.vToolTip[data-v-61e09817] .tool_tip_bottom[data-v-61e09817]:before {\n  top: 0;\n  left: 50%;\n  transform: translate(-50%, -100%);\n  -ms-transform: translate(-50%, -100%);\n  -webkit-transform: translate(-50%, -100%);\n  border-color: transparent transparent rgba(0, 0, 0, 0.9) transparent;\n}\n.vToolTip[data-v-61e09817] .tool_tip_left[data-v-61e09817]:before {\n  top: 50%;\n  left: 100%;\n  transform: translate(0, -50%);\n  -ms-transform: translate(0, -50%);\n  -webkit-transform: translate(0, -50%);\n  border-color: transparent transparent transparent rgba(0, 0, 0, 0.9);\n}";
styleInject(css_248z$3);

script$6.render = render$6;
script$6.__scopeId = "data-v-61e09817";
script$6.__file = "src/components/ToolTip/ToolTip.vue";

var DToolTip = {
  install: function install(Vue) {
    Vue.component(script$6.name, script$6);
  }
};

function config(one, two) {
	return Object.assign(one, two);
}
var script$5 = {
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

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" <transform name=\"style\">\r\n\t\t<slot></slot>\r\n\t</transform> "), createElementVNode("div", null, [renderSlot(_ctx.$slots, "default")])], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

var css_248z$2 = ".style-enter-active[data-v-7f8b5de9],\n.style-leave-active[data-v-7f8b5de9] {\n  transition: all 0.5s ease;\n}\n\n.style-enter-from[data-v-7f8b5de9],\n.style-leave-to[data-v-7f8b5de9] {\n  opacity: 0;\n}";
styleInject(css_248z$2);

script$5.render = render$5;
script$5.__scopeId = "data-v-7f8b5de9";
script$5.__file = "src/components/Transform/Transform.vue";

var DTransform = {
  install: function install(Vue) {
    Vue.component(script$5.name, script$5);
  }
};

var script$4 = {
  name: "TransformCategory",
  props: {
    data: Array,
    color: {
      type: Array,
      "default": function _default() {
        return ["rgb(140, 160, 173)", "rgb(80, 80, 80)"];
      }
    }
  },
  emits: ["click"],
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var selected = ref(0);
    var hover = ref(-1);
    var task;

    var onClick = function onClick(index) {
      selected.value = index;
      emit("click", index);
    };

    var onMounseEnter = function onMounseEnter(index) {
      hover.value = index;
    };

    var onMounseLeave = function onMounseLeave(index) {
      hover.value = -1;
    };

    var update = function update() {
      task && clearInterval(task);
      task = setInterval(function () {
        if (selected.value + 1 > props.data.length - 1) {
          selected.value = 0;
        } else {
          selected.value += 1;
        }
      }, 2000);
    };

    onMounted(update);
    onUnmounted(function () {
      task && clearInterval(task);
    });
    return {
      selected: selected,
      hover: hover,
      onClick: onClick,
      onMounseEnter: onMounseEnter,
      onMounseLeave: onMounseLeave
    };
  }
};

var _hoisted_1$2 = {
  "class": "country-category"
};
var _hoisted_2$1 = ["onClick", "onMouseenter", "onMouseleave", "onMousemove"];
var _hoisted_3$1 = {
  key: 2
};
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.data, function (item, index) {
    return openBlock(), createElementBlock("div", {
      "class": "category",
      key: item,
      onClick: function onClick($event) {
        return $setup.onClick(index);
      },
      onMouseenter: function onMouseenter($event) {
        return $setup.onMounseEnter(index);
      },
      onMouseleave: function onMouseleave($event) {
        return $setup.onMounseLeave(index);
      },
      onMousemove: function onMousemove($event) {
        return $setup.onMounseEnter(index);
      }
    }, [index === $setup.selected ? (openBlock(), createElementBlock("div", {
      key: 0,
      "class": "selected",
      style: normalizeStyle({
        background: $props.color[0]
      })
    }, toDisplayString(item), 5
    /* TEXT, STYLE */
    )) : index === $setup.hover ? (openBlock(), createElementBlock("div", {
      key: 1,
      "class": "hovered",
      style: normalizeStyle({
        background: $props.color[1]
      })
    }, toDisplayString(item), 5
    /* TEXT, STYLE */
    )) : (openBlock(), createElementBlock("div", _hoisted_3$1, toDisplayString(item), 1
    /* TEXT */
    ))], 40
    /* PROPS, HYDRATE_EVENTS */
    , _hoisted_2$1);
  }), 128
  /* KEYED_FRAGMENT */
  ))]);
}

var css_248z$1 = ".country-category[data-v-0ce021a5] {\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.country-category[data-v-0ce021a5] .category[data-v-0ce021a5] {\n  flex: 1;\n  background: rgb(53, 57, 65);\n  font-size: 24px;\n  color: rgb(144, 160, 174);\n}\n.country-category[data-v-0ce021a5] .category[data-v-0ce021a5] .hovered[data-v-0ce021a5] {\n  background: rgb(80, 80, 80);\n  color: #ffffff;\n}\n.country-category[data-v-0ce021a5] .category[data-v-0ce021a5] .selected[data-v-0ce021a5] {\n  background: rgb(140, 160, 173);\n  color: #fff;\n}\n.country-category[data-v-0ce021a5] .category[data-v-0ce021a5] div[data-v-0ce021a5] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}";
styleInject(css_248z$1);

script$4.render = render$4;
script$4.__scopeId = "data-v-0ce021a5";
script$4.__file = "src/components/TransformCategory/TransformCategory.vue";

var DTransformCategory = {
  install: function install(Vue) {
    Vue.component(script$4.name, script$4);
  }
};

var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' '); // 各浏览器前缀

var requestAnimationFrame;
var cancelAnimationFrame;
var isServer = typeof window === 'undefined';

if (isServer) {
  requestAnimationFrame = function requestAnimationFrame() {};

  cancelAnimationFrame = function cancelAnimationFrame() {};
} else {
  requestAnimationFrame = window.requestAnimationFrame;
  cancelAnimationFrame = window.cancelAnimationFrame;
  var prefix; // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式

  for (var i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
      break;
    }

    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
    cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
  } // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout


  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function requestAnimationFrame(callback) {
      var currTime = new Date().getTime(); // 为了使setTimteout的尽可能的接近每秒60帧的效果

      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    cancelAnimationFrame = function cancelAnimationFrame(id) {
      window.clearTimeout(id);
    };
  }
}

var script$3 = {
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

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, toDisplayString(_ctx.displayValue), 1
  /* TEXT */
  );
}

script$3.render = render$3;
script$3.__file = "src/components/VueCountTo/VueCountTo.vue";

var DVueCountTo = {
  install: function install(Vue) {
    Vue.component(script$3.name, script$3);
  }
};

var script$2 = {
  name: "VEcharts",
  props: {
    options: Object,
    // 主题
    theme: {
      type: [Object, String],
      "default": ""
    },
    // 适配 默认300*150
    open: {
      type: Boolean,
      "default": false
    },
    // svg or canvas
    type: {
      type: Object,
      "default": {
        renderer: "canvas"
      }
    },
    animation: {
      type: Object
    }
  },
  setup: function setup(props) {
    var dom = ref();
    var charts = null; //animation

    var dataIndex = -1;
    var timerObj = null;
    var defaultAnimationConfig = {
      open: false,
      time: 3000,
      highlight: true,
      showTip: false
    };
    watch(function () {
      return props.options;
    }, function () {
      var _charts;

      (_charts = charts) === null || _charts === void 0 ? void 0 : _charts.setOption(props.options);
    }, {
      deep: true
    });

    var onResize = function onResize() {
      var _charts2;

      (_charts2 = charts) === null || _charts2 === void 0 ? void 0 : _charts2.resize();
    };

    var ani = function ani(timer) {
      timerObj = setInterval(function () {
        var _charts3;

        (_charts3 = charts) === null || _charts3 === void 0 ? void 0 : _charts3.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: dataIndex
        }); // props.options  图例会有问题

        dataIndex = (dataIndex + 1) % props.options.series[0].data.length;

        if (defaultAnimationConfig.highlight) {
          var _charts4;

          (_charts4 = charts) === null || _charts4 === void 0 ? void 0 : _charts4.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: dataIndex
          });
        }

        if (defaultAnimationConfig.showTip) {
          var _charts5;

          (_charts5 = charts) === null || _charts5 === void 0 ? void 0 : _charts5.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: dataIndex
          });
        }
      }, timer);
    };

    onMounted(function () {
      var _dom = dom.value;

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
    onUnmounted(function () {
      clearInterval(timerObj);
      window.removeEventListener("resize", onResize);
    });
    return {
      dom: dom,
      charts: charts
    };
  }
};

var _hoisted_1$1 = {
  "class": "echats",
  ref: "dom"
};
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, null, 512
  /* NEED_PATCH */
  );
}

script$2.render = render$2;
script$2.__file = "src/components/VueEcharts/VueEcharts.vue";

var DVueEcharts = {
  install: function install(Vue) {
    Vue.component(script$2.name, script$2);
  }
};

var script$1 = {
  name: "ComTest",
  setup: function setup() {
    var a = ref("test");
    return {
      a: a
    };
  }
};

var _withScopeId = function _withScopeId(n) {
  return pushScopeId("data-v-7cc4288f"), n = n(), popScopeId(), n;
};

var _hoisted_1 = {
  "class": "test"
};

var _hoisted_2 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/createElementVNode("svg", {
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
  );
});

var _hoisted_3 = [_hoisted_2];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, _hoisted_3);
}

var css_248z = ".test[data-v-7cc4288f] {\n  color: yellow;\n}";
styleInject(css_248z);

script$1.render = render$1;
script$1.__scopeId = "data-v-7cc4288f";
script$1.__file = "src/components/Test/Test.vue";

function Test (Vue) {
  Vue.component(script$1.name, script$1);
}

var request = function request(_ref) {
  var url = _ref.url,
      _ref$methods = _ref.methods,
      methods = _ref$methods === void 0 ? 'post' : _ref$methods,
      data = _ref.data,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers;
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open(methods, url);
    Object.keys(headers).forEach(function (key) {
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
var script = {
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [createElementVNode("input", {
    type: "file",
    onChange: _cache[0] || (_cache[0] = function () {
      return $setup.handleFileChange && $setup.handleFileChange.apply($setup, arguments);
    })
  }, null, 32
  /* HYDRATE_EVENTS */
  )]);
}

script.render = render;
script.__file = "src/components/Upload/Upload.vue";

function Upload (Vue) {
  Vue.component(script.name, script);
}

//interval 间隔
//option 配置

function useIntervalFn(cb) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // 指定空对象默认值
  var _options$immediate = options.immediate,
      immediate = _options$immediate === void 0 ? true : _options$immediate,
      _options$immediateCal = options.immediateCallback,
      immediateCallback = _options$immediateCal === void 0 ? false : _options$immediateCal; // 定时器对象

  var timer = null; // 控制是否暂停 false：暂停; true：继续

  var isActive = ref(false); // 删除

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
    var stopWatch = watch(interval, function () {
      if (immediate) resume();
    });
    onUnmounted(function () {
      stopWatch();
    });
  } //立即执行


  if (immediate) resume(); //出口

  return {
    isActive: isActive,
    pause: pause,
    resume: resume
  };
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function resolveNestedOptions(options) {
  //不存在初始化
  if (options === true) return {};
  return options;
}

function useWebSocket(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // 重连 retries：从连次数。delay：间隔。delay：onFailed：连接失败钩子。
  // autoReconnect = {retries，delay ,onFailed}  
  var onConnected = options.onConnected,
      onDisconnected = options.onDisconnected,
      onError = options.onError,
      onMessage = options.onMessage,
      _options$immediate = options.immediate,
      immediate = _options$immediate === void 0 ? true : _options$immediate,
      _options$autoClose = options.autoClose,
      autoClose = _options$autoClose === void 0 ? true : _options$autoClose,
      _options$protocols = options.protocols,
      protocols = _options$protocols === void 0 ? [] : _options$protocols; //数据

  var data = ref(null); //连接状态

  var status = ref('CONNECTING'); //ws

  var wsRef = ref(); // 心跳检测
  var heartbeatResume; // 关闭ws

  var explicitlyClosed = false; // 重连次数

  var retried = 0; //存放buffer数据

  var bufferedData = [];

  var close = function close() {
  };

  var _sendBuffer = function _sendBuffer() {
    // 只有在open的状态才可以发送 
    // 发送没有绑定的数据
    if (bufferedData.length && wsRef.value && status.value === 'OPEN') {
      var _iterator = _createForOfIteratorHelper(bufferedData),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var buffer = _step.value;
          wsRef.value.send(buffer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      bufferedData = [];
    }
  };

  var send = function send(data) {
    var useBuffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    // 未绑定ws【open之前】调用send
    if (!wsRef.value || status.value !== 'OPEN') {
      if (useBuffer) bufferedData.push(data);
      return false;
    } //绑定了ws【open之后】调用send


    _sendBuffer();

    wsRef.value.send(data);
    return true;
  };

  var _init = function _init() {
    var ws = new WebSocket(url, protocols);
    wsRef.value = ws;
    status.value = 'CONNECTING';
    explicitlyClosed = false;

    ws.onopen = function () {
      var _heartbeatResume;

      status.value = 'OPEN'; // connect函数钩子

      onConnected === null || onConnected === void 0 ? void 0 : onConnected(ws); // 恢复 心跳检测

      (_heartbeatResume = heartbeatResume) === null || _heartbeatResume === void 0 ? void 0 : _heartbeatResume();

      _sendBuffer();
    };

    ws.onmessage = function (e) {
      data.value = e.data;
      onMessage === null || onMessage === void 0 ? void 0 : onMessage(ws, e);
    };

    ws.onclose = function (ev) {
      status.value = 'CLOSED';
      wsRef.value = undefined;
      onDisconnected === null || onDisconnected === void 0 ? void 0 : onDisconnected(ws, ev);

      if (!explicitlyClosed && options.autoReconnect) {
        var _resolveNestedOptions = resolveNestedOptions(options.autoReconnect),
            _resolveNestedOptions2 = _resolveNestedOptions.retries,
            retries = _resolveNestedOptions2 === void 0 ? -1 : _resolveNestedOptions2,
            _resolveNestedOptions3 = _resolveNestedOptions.delay,
            delay = _resolveNestedOptions3 === void 0 ? 1000 : _resolveNestedOptions3,
            onFailed = _resolveNestedOptions.onFailed;

        retried += 1;
        if (typeof retries === 'number' && (retries < 0 || retried < retries)) setTimeout(_init, delay);else if (typeof retries === 'function' && retries()) setTimeout(_init, delay);else {
          onFailed === null || onFailed === void 0 ? void 0 : onFailed();
        }
      }
    };

    ws.onerror = function (e) {
      onError === null || onError === void 0 ? void 0 : onError(ws, e);
    };
  }; //是否开启心跳


  if (options.heartbeat) {
    var _resolveNestedOptions4 = resolveNestedOptions(options.heartbeat),
        _resolveNestedOptions5 = _resolveNestedOptions4.message,
        message = _resolveNestedOptions5 === void 0 ? 'ping' : _resolveNestedOptions5,
        _resolveNestedOptions6 = _resolveNestedOptions4.interval,
        interval = _resolveNestedOptions6 === void 0 ? 1000 : _resolveNestedOptions6;

    var _useIntervalFn = useIntervalFn(function () {
      return send(message, false);
    }, interval, {
      immediate: false
    });
        _useIntervalFn.pause;
        var resume = _useIntervalFn.resume;
    heartbeatResume = resume;
  } //直接运行


  if (immediate) _init(); //自动关闭

  if (autoClose) {
    window.addEventListener("beforeunload", function () {
    });
    onUnmounted(function () {
    });
  } // 重新打开ws 【确保只能运行一个ws】 


  var open = function open() {
    retried = 0;

    _init();
  };

  return {
    // 数据
    data: data,
    // 状态
    status: status,
    // 关闭函数
    close: close,
    // 发送函数
    send: send,
    // 打开函数
    open: open,
    // ws对象
    ws: wsRef
  };
}

function hook (Vue) {
  Vue.provide("useIntervalFn", useIntervalFn);
  Vue.provide("useWebSocket", useWebSocket);
}

var install = function install(Vue) {
  Vue.use(Test);
  Vue.use(DToolTip);
  Vue.use(DFullSreen);
  Vue.use(DIcon);
  Vue.use(DSvgAnimation);
  Vue.use(DLoading);
  Vue.use(DFlyBox);
  Vue.use(DVueEcharts);
  Vue.use(DVueCountTo);
  Vue.use(DBaseScrollList);
  Vue.use(DTransformCategory);
  Vue.use(Upload);
  Vue.use(BUtton);
  Vue.use(DSwitch);
  Vue.use(DModal);
  Vue.use(DTagCloud);
  Vue.use(DTransform);
  Vue.use(DReverse);
  Vue.use(DNoticeList);
  Vue.use(hook);
  Vue.provide("EchartsData", EchartsData);
};

export { DBaseScrollList, DFlyBox, DFullSreen, DIcon, DLoading, DModal, DNoticeList, DReverse, DSvgAnimation, DSwitch, DTagCloud, DToolTip, DTransform, DTransformCategory, DVueCountTo, DVueEcharts, EchartsData, install };

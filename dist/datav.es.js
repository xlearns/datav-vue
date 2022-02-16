import { ref, pushScopeId, popScopeId, openBlock, createBlock, toDisplayString, withScopeId } from 'vue';

var script$1 = {
  name: "comTest",
  setup: function setup() {
    var a = ref(222);
    return {
      a: a
    };
  }
};

var _withId$1 = /*#__PURE__*/withScopeId("data-v-7cc4288f");

pushScopeId("data-v-7cc4288f");

var _hoisted_1$1 = {
  "class": "test"
};

popScopeId();

var render$1 = /*#__PURE__*/_withId$1(function (_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1$1, toDisplayString($setup.a), 1
  /* TEXT */
  );
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

var css_248z$1 = ".test[data-v-7cc4288f] {\n  color: #6fc;\n}";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-7cc4288f";
script$1.__file = "src/components/Test/Test.vue";

function Test (Vue) {
  Vue.component(script$1.name, script$1);
}

var script = {
  name: "FullSreen",
  setup: function setup() {
    var a = "hello word";
    return {
      a: a
    };
  }
};

var _withId = /*#__PURE__*/withScopeId("data-v-8b5216c8");

pushScopeId("data-v-8b5216c8");

var _hoisted_1 = {
  "class": "test"
};

popScopeId();

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, toDisplayString($setup.a), 1
  /* TEXT */
  );
});

var css_248z = ".test[data-v-8b5216c8] {\n  color: red;\n}";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-8b5216c8";
script.__file = "src/components/FullScreen/FullSreen.vue";

function FullSreen (Vue) {
  Vue.component(script.name, script);
}

var component = function component(Vue) {
  Vue.use(Test);
  Vue.use(FullSreen);
};

export { component as default };

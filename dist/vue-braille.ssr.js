'use strict';Object.defineProperty(exports,'__esModule',{value:true});//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  props: {
    text: { default: null },
    showTip: { default: "true" },
    design: { default: "style1" },
    size: { default: "10" }
  },
  data: function() {
    return {
      braille: {
        "0": {
          symbole: "⠚",
          dots: ["245"]
        },
        "1": {
          symbole: "⠁",
          dots: ["1"]
        },
        "2": {
          symbole: "⠃",
          dots: ["12"]
        },
        "3": {
          symbole: "⠉",
          dots: ["14"]
        },
        "4": {
          symbole: "⠙",
          dots: ["145"]
        },
        "5": {
          symbole: "⠑",
          dots: ["15"]
        },
        "6": {
          symbole: "⠋",
          dots: ["124"]
        },
        "7": {
          symbole: "⠛",
          dots: ["1245"]
        },
        "8": {
          symbole: "⠓",
          dots: ["125"]
        },
        "9": {
          symbole: "⠊",
          dots: ["24"]
        },
        a: {
          symbole: "⠁",
          dots: ["1"]
        },
        b: {
          symbole: "⠃",
          dots: ["12"]
        },
        c: {
          symbole: "⠉",
          dots: ["14"]
        },
        d: {
          symbole: "⠙",
          dots: ["145"]
        },
        e: {
          symbole: "⠑",
          dots: ["15"]
        },
        f: {
          symbole: "⠋",
          dots: ["124"]
        },
        g: {
          symbole: "⠛",
          dots: ["1245"]
        },
        h: {
          symbole: "⠓",
          dots: ["125"]
        },
        i: {
          symbole: "⠊",
          dots: ["24"]
        },
        j: {
          symbole: "⠚",
          dots: ["245"]
        },
        k: {
          symbole: "⠅",
          dots: ["13"]
        },
        l: {
          symbole: "⠇",
          dots: ["123"]
        },
        m: {
          symbole: "⠍",
          dots: ["134"]
        },
        n: {
          symbole: "⠝",
          dots: ["1345"]
        },
        o: {
          symbole: "⠕",
          dots: ["135"]
        },
        p: {
          symbole: "⠏",
          dots: ["1234"]
        },
        q: {
          symbole: "⠟",
          dots: ["12345"]
        },
        r: {
          symbole: "⠗",
          dots: ["1235"]
        },
        s: {
          symbole: "⠎",
          dots: ["234"]
        },
        t: {
          symbole: "⠞",
          dots: ["2345"]
        },
        u: {
          symbole: "⠥",
          dots: ["136"]
        },
        v: {
          symbole: "⠧",
          dots: ["1236"]
        },
        w: {
          symbole: "⠺",
          dots: ["2456"]
        },
        x: {
          symbole: "⠭",
          dots: ["1346"]
        },
        y: {
          symbole: "⠽",
          dots: ["13456"]
        },
        z: {
          symbole: "⠵",
          dots: ["1356"]
        },
        space: {
          symbole: "  -  ",
          dots: ["  -  "]
        },
        "#": {
          symbole: "⠼",
          dots: ["3456"]
        },
        ",": {
          symbole: "⠂",
          dots: ["2"]
        },
        ";": {
          symbole: "⠆",
          dots: ["23"]
        },
        ":": {
          symbole: "⠒",
          dots: ["25"]
        },
        ".": {
          symbole: "⠲",
          dots: ["256"]
        },
        "?": {
          symbole: "⠦",
          dots: ["236"]
        },
        "!": {
          symbole: "⠖",
          dots: ["235"]
        },
        "'": {
          symbole: "⠄⠦",
          dots: ["3", "236"]
        },
        "“": {
          symbole: "⠘⠦",
          dots: ["45", "236"]
        },
        "”": {
          symbole: "⠘⠴",
          dots: ["45", "356"]
        },
        "’": {
          symbole: "⠄⠴",
          dots: ["3", "356"]
        },
        "(": {
          symbole: "⠐⠣",
          dots: ["5", "126"]
        },
        ")": {
          symbole: "⠐⠜",
          dots: ["5", "345"]
        },
        "/": {
          symbole: "⠸⠌",
          dots: ["456", "34"]
        },
        "\\": {
          symbole: "⠸⠡",
          dots: ["456", "16"]
        },
        letter: {
          symbole: "⠰",
          dots: "56"
        },
        caps: {
          symbole: "⠠",
          dots: "6"
        }
      },
      lastCharType: "",
      emptySlot: false
    };
  },
  methods: {
    getCharObj: function(char) {
      var returnChars = [];
      var isPunc = !!char.match(/^[.,:!;?'"()/\\-]/);
      var isSmallCase = !!char.match(/^[a-z]/);
      var isCapCase = !!char.match(/^[A-Z]/);
      var isNumber = !isNaN(char);
      var isSpace = char === " ";
      var obj = { char: char };
      var resultObj = {};

      if (isCapCase) {
        resultObj = Object.assign({}, this.braille[char.toLowerCase()]);

        if (this.lastCharType !== "caps")
          { resultObj.dots.unshift(this.braille["caps"].dots); }

        this.lastCharType = "caps";
      } else if (isSmallCase) {
        resultObj = Object.assign({}, this.braille[char.toLowerCase()]);

        if (this.lastCharType === "number")
          { resultObj.dots.unshift(this.braille["letter"].dots); }

        this.lastCharType = "letter";
      } else if (isSpace) {
        resultObj = this.braille["space"];
        this.lastCharType = "space";
      } else if (isNumber) {
        if (this.lastCharType !== "number") {
          var hashObj = Object.assign({ char: "#" }, this.braille["#"]);
          returnChars.push(hashObj);
        }
        this.lastCharType = "number";
        resultObj = this.braille[char];
      } else if (isPunc) {
        resultObj = this.braille[char];
        this.lastCharType = "punc";
      }
      obj = Object.assign(obj, resultObj);
      returnChars.push(obj);
      return returnChars;
    }
  },
  computed: {
    getText: function() {
      var this$1 = this;

      if (this.$slots.default === undefined) {
        this.emptySlot = true;
        return "";
      }
      var text = this.$slots.default[0].text.trim();
      var brailleArray = [];
      text.split("").forEach(function (l) {
        var charObject = this$1.getCharObj(l);
        brailleArray = brailleArray.concat(charObject);
      });
      return brailleArray;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;function createInjectorSSR(context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__;
  }

  if (!context) { return function () {}; }

  if (!('styles' in context)) {
    context._styles = context._styles || {};
    Object.defineProperty(context, 'styles', {
      enumerable: true,
      get: function get() {
        return context._renderStyles(context._styles);
      }
    });
    context._renderStyles = context._renderStyles || renderStyles;
  }

  return function (id, style) {
    return addStyle(id, style, context);
  };
}

function addStyle(id, css, context) {
  var group = css.media || 'default';
  var style = context._styles[group] || (context._styles[group] = {
    ids: [],
    css: ''
  });

  if (!style.ids.includes(id)) {
    style.media = css.media;
    style.ids.push(id);
    var code = css.source;

    style.css += code + '\n';
  }
}

function renderStyles(styles) {
  var css = '';

  for (var key in styles) {
    var style = styles[key];
    css += '<style data-vue-ssr-id="' + Array.from(style.ids).join(' ') + '"' + (style.media ? ' media="' + style.media + '"' : '') + '>' + style.css + '</style>';
  }

  return css;
}

var server = createInjectorSSR;/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"braille-code"},[_vm._e(),_vm._ssrNode(" "+((_vm.emptySlot == true)?("<span class=\"empty\"></span>"):"<!---->")+" "+(_vm._ssrList((_vm.getText),function(obj){return ("<div"+(_vm._ssrAttr("data-char",obj.char))+(_vm._ssrAttr("data-style",_vm.design))+(_vm._ssrAttr("data-tip",_vm.showTip))+" class=\"braille-block\">"+(_vm._ssrList((obj.dots),function(dots){return ("<span class=\"braille-cell\""+(_vm._ssrStyle(null,{'font-size': _vm.size+'px'}, null))+">"+(_vm._ssrList((6),function(i){return ("<i"+(_vm._ssrClass(null,[dots.indexOf(i) > -1 ? 'fill' : 'empty']))+"></i>")}))+"</span>")}))+"</div>")})))],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-c4c3169e_0", { source: ".braille-code{display:flex;flex-wrap:wrap}.braille-code .braille-block{display:flex;flex-wrap:wrap;position:relative;transition:all .3s}.braille-code .braille-block[data-tip=true]::before{content:attr(data-char);padding:.2em 1.3em;background-color:#95a5a6;border-radius:.1em;position:absolute;top:0;left:50%;transform:translateX(-50%);transition:all .3s;opacity:0;pointer-events:none;font-size:1em;color:#fff;font-weight:700}.braille-code .braille-block[data-tip=true]:hover{box-shadow:0 0 .3em 0 rgba(0,0,0,.1)}.braille-code .braille-block[data-tip=true]:hover::before{opacity:1;transform:scale(1) translate(-50%,-100%)}.braille-code .braille-block .braille-cell{display:flex;flex-wrap:wrap;flex-direction:column;width:2em;height:3em;margin:.4em;position:relative;font-size:20px}.braille-code .braille-block .braille-cell>i{width:50%;height:33.3%;position:relative}.braille-code .braille-block .braille-cell>i.fill::before{content:\"\";width:50%;height:50%;background-color:#000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.braille-code .braille-block[data-style=style2] i.empty::before{content:\"\";width:15%;height:15%;background-color:#000;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.braille-code .braille-block[data-style=style3] i.empty::before{content:\"\";width:50%;height:50%;background-color:rgba(0,0,0,.1);border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.braille-code .braille-block[data-style=style4] i.fill::before{content:\"\";width:70%;height:70%;background-color:#fff;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:1px solid rgba(0,0,0,.1);box-shadow:inset 0 2px 3px rgba(255,255,255,.3),inset 0 -2px 3px rgba(0,0,0,.3),0 1px 1px rgba(255,255,255,.9)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-c4c3169e";
  /* functional template */
  var __vue_is_functional_template__ = false;

  
  var component = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    server
  );// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('VueBraille', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=component;
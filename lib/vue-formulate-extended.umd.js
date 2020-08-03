!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@braid/vue-formulate"),require("@braid/vue-formulate/src/libs/utils.js"),require("imask"),require("@braid/vue-formulate/src/Formulate")):"function"==typeof define&&define.amd?define(["exports","@braid/vue-formulate","@braid/vue-formulate/src/libs/utils.js","imask","@braid/vue-formulate/src/Formulate"],t):t((e=e||self).VueFormulateExtended={},e.VueFormulate,e.utils_js,e.IMask,e.Formulate$1)}(this,(function(e,t,o,r,n){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r,n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n;var s=function(e){return void 0===e&&(e=[]),this.defaultHook=function(e){return e},this.setHooks(e)};s.prototype.parse=function(e){void 0===e&&(e=[]);var t=Array.isArray(e)?e:[];for(var o of t)this.isProperHook(o)&&this.hooks.push(o);return this},s.prototype.addHook=function(e){return this.isProperHook(e)&&this.isNewHook(e)&&this.hooks.push(e),this},s.prototype.setHooks=function(e){return void 0===e&&(e=[]),this.hooks=e.filter(this.isProperHook),this},s.prototype.setDefault=function(e){return this.defaultHook=e,this},s.prototype.isProperHook=function(e){return e&&"object"==typeof e&&"function"==typeof e.handler},s.prototype.isNewHook=function(e){return this.hooks.findIndex((function(t){return t===e}))<0},s.prototype.getHooks=function(){return this.hooks},s.prototype.empty=function(){return 0===this.hooks.length},s.prototype.apply=function(e,t){return this.empty()?this.defaultHook(e,t):this.hooks.reduce((function(e,o){return o.handler(e,t)}),e)},s.prototype.asSingleHook=function(){var e=this;return{handler:function(t,o){return e.apply(t,o)}}};var i={type:Object,default:function(){return{model:[],schema:[],schemaOptions:[],schemaNode:[],schemaComponent:[]}}};function a(e,t,o,r,n,s,i,a,u,c){"boolean"!=typeof i&&(u=a,a=i,i=!1);var f,l="function"==typeof o?o.options:o;if(e&&e.render&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0,n&&(l.functional=!0)),r&&(l._scopeId=r),s?(f=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,u(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=f):t&&(f=i?function(e){t.call(this,c(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,a(e))}),f)if(l.functional){var d=l.render;l.render=function(e,t){return f.call(t),d(e,t)}}else{var p=l.beforeCreate;l.beforeCreate=p?[].concat(p,f):[f]}return o}var u=a({},void 0,{extends:t.defaults.components.FormulateInput,props:{modelHook:{type:[Function,Object,Array],default:null}},watch:{"context.model":{handler:function(e,t){var o=new s;Array.isArray(this.modelHook)?this.modelHook.map((function(e){return o.addHook(e)})):"function"==typeof this.modelHook?o.addHook({handler:this.modelHook}):o.addHook(this.modelHook),(this.$formulate.options.hooks&&this.$formulate.options.hooks.model?this.$formulate.options.hooks.model:[]).map((function(e){return o.addHook(e)})),e!==t&&(this.context.model=o.apply(e,{oldModel:t,context:this.context}))}}}},void 0,void 0,void 0,!1,void 0,void 0,void 0);function c(e,t,o){void 0===o&&(o={});var r=o.hooks,n=o.h,i=o.state;if(e&&"object"==typeof e&&!Array.isArray(e)){var a=e.children;void 0===a&&(a=null);var c=e.component;void 0===c&&(c=u);var l=e.depth;void 0===l&&(l=1);var d=e.modelHook,p=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(o[r]=e[r]);return o}(e,["children","component","depth","modelHook"]),h=c===u?p.type||"text":"",m=p.name||h||"el",v=p.id||m+"-"+l+"-"+t,k=Array.isArray(a)?a.map((function(e){return Object.assign(e,{depth:l+1})})):a,y=(new s).setHooks(r.model).addHook(d).asSingleHook(),b=Object.assign({type:h,key:v,depth:l,component:c,definition:{attrs:Object.assign({},p,{modelHook:y})},children:f(k,{hooks:r,h:n,state:i})});return(new s).setHooks(r.schemaNode).setDefault((function(){return b})).apply(b,{state:i})}return null}function f(e,t){void 0===t&&(t={});var o=t.hooks,r=t.h,n=t.state;return Array.isArray(e)?e.map((function(e,t){var i=c(e,t,{hooks:o,h:r,state:n});return(new s).setHooks(o.schemaComponent).setDefault((function(){return r(i.component,i.definition,i.children)})).apply(i)})):e}var l={functional:!1,name:"FormulateSchema",props:{schema:t.defaults.components.FormulateForm.props.schema,hooks:i,formClass:{type:String,default:null}},data:function(){return{schemaHooks:null,schemaOptionsHooks:null}},methods:{emit:function(e,t){this.$emit(e,t)}},beforeMount:function(){this.schemaHooks=(new s).setHooks(this.hooks.schema),this.schemaOptionsHooks=(new s).setHooks(this.hooks.schemaOptions).setDefault((function(e){return e}))},render:function(e){return this.schemaHooks.apply(e("div",{class:this.$props.formClass},f(this.schema,this.schemaOptionsHooks.apply({hooks:this.hooks,h:e,state:{}},{emit:this.emit,props:this.$props}))),{emit:this.emit,props:this.$props})}},d={extends:t.defaults.components.FormulateForm,components:{FormulateSchema:l},props:{hooks:i,formClass:{type:String,default:null}},computed:{cleanedHooks:function(){var e=this,o=i.default();return Object.keys(o).forEach((function(t){o[t]=(new s).parse(e.hooks[t]).getHooks()})),t.merge(this.$formulate.options.hooks||{},o)}},watch:{formulateValue:{handler:function(e){var t=this;this.isVmodeled&&e&&"object"==typeof e&&Array.from(new Set(Object.keys(e).concat(Object.keys(this.proxy)))).forEach((function(r){o.shallowEqualObjects(e[r],t.proxy[r])||(t.setFieldValue(r,e[r]),t.registry.has(r)&&!o.shallowEqualObjects(e[r],t.registry.get(r).proxy)&&(t.registry.get(r).context.model=e[r]))}))},deep:!0}}},p=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("form",{class:e.classes,on:{submit:function(t){return t.preventDefault(),e.formSubmitted(t)}}},[e.schema?o("FormulateSchema",{attrs:{schema:e.schema,hooks:e.cleanedHooks},on:{events:function(t){return e.$emit("events",t)}}}):e._e(),e._v(" "),e.hasFormErrorObservers?e._e():o("FormulateErrors",{attrs:{context:e.formContext}}),e._v(" "),e._t("default")],2)};p._withStripped=!0;var h=a({render:p,staticRenderFns:[]},void 0,d,void 0,!1,void 0,!1,void 0,void 0,void 0),m=function(){this.store=new Map};m.prototype.on=function(e,t){var o=this.store.get(e);o&&o.push(t)||this.store.set(e,[t])},m.prototype.off=function(e,t){var o=this.store.get(e),r=o.indexOf(t);o&&r>-1&&o.splice(r,1)},m.prototype.emit=function(e,t){this.store.get(e).slice().map((function(e){return e(t)}))};var v={hooks:{schemaOptions:[{handler:function(e,t){void 0===t&&(t={});var o=t.emit;return e.state=e.state||{},e.state.eventBus=new m,e.state.eventBus.on("events",(function(e){return o("events",e)})),e}}],schemaNode:[{handler:function(e,t){void 0===t&&(t={});var o=t.state,r=e.definition.attrs,n=r.events;void 0===n&&(n=[]);var s=r.on;void 0===s&&(s={});var i=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(o[r]=e[r]);return o}(r,["events","on"]);return e.definition.attrs=i,e.definition.on=Object.assign({},s,n.reduce((function(t,r){return t[r]=function(t){s[r]&&s[r](t),o.eventBus.emit("events",{eventName:r,name:e.name,type:e.type,key:e.key,payload:t})},t}),{})),e}}]}},k={hooks:{model:[{handler:function(e,t){var o=t.context,n="vfe-mask"in o.attributes||"vfeMask"in o.attributes;if("text"===o.classification&&n){var s=o.attributes["vfe-mask"]||o.attributes.vfeMask,i="object"==typeof s&&s.mask?s:{mask:s};return r.createMask(i).resolve(e)}return e}}]}},y={hooks:{model:[{handler:function(e,t){var o=t.context,r="string"==typeof o.attributes.vfeNumber||o.attributes.vfeNumber||"string"==typeof o.attributes["vfe-number"]||o.attributes["vfe-number"];return"number"===o.type&&"string"==typeof e&&r?+e:e}}]}},b={FormulateForm:h,FormulateSchema:l,FormulateInput:u},H={formEvents:v,textMask:k,enforceNumber:y};e.components=b,e.default=function(e){void 0===e&&(e={});var t=n.merge({features:{formEvents:!0,textMask:!1,enforceNumber:!1},override:{FormulateForm:!0,FormulateInput:!0,FormulateSchema:!0}},e);return function(e){t.override.FormulateForm&&e.extend({components:{FormulateForm:h}}),t.override.FormulateInput&&e.extend({components:{FormulateInput:u}}),t.override.FormulateSchema&&e.extend({components:{FormulateSchema:l}}),t.features.formEvents&&e.extend(v),t.features.textMask&&e.extend(k),t.features.enforceNumber&&e.extend(y)}},e.features=H,Object.defineProperty(e,"__esModule",{value:!0})}));
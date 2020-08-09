import Formulate from '@braid/vue-formulate';
import { shallowEqualObjects } from '@braid/vue-formulate/src/libs/utils.js';
import IMask from 'imask';
import Formulate$1 from '@braid/vue-formulate/src/Formulate';

var Hooks = function Hooks(hooks) {
  if ( hooks === void 0 ) hooks = [];

  this.defaultHook = function (v) { return v; };
  return this.setHooks(hooks)
};

// chainables

Hooks.prototype.parse = function parse (hooks) {
    if ( hooks === void 0 ) hooks = [];

  var _hookList = Array.isArray(hooks) ? hooks : [];
  for (var _hook of _hookList) {
    if (this.isProperHook(_hook)) {
      this.hooks.push(_hook);
    }
  }
  return this
};

Hooks.prototype.addHook = function addHook (hook) {
  if (this.isProperHook(hook) && this.isNewHook(hook)) {
    this.hooks.push(hook);
  }
  return this
};

Hooks.prototype.setHooks = function setHooks (hooks) {
    if ( hooks === void 0 ) hooks = [];

  this.hooks = hooks.filter(this.isProperHook);
  return this
};

Hooks.prototype.setDefault = function setDefault (hook) {
  this.defaultHook = hook;
  return this
};

// not chainables

Hooks.prototype.isProperHook = function isProperHook (hook) {
  return hook && typeof hook === 'object' && typeof hook.handler === 'function'
};

Hooks.prototype.isNewHook = function isNewHook (hook) {
  return this.hooks.findIndex(function (h) { return h === hook; }) < 0
};

Hooks.prototype.getHooks = function getHooks () {
  return this.hooks
};

Hooks.prototype.empty = function empty () {
  return this.hooks.length === 0
};

Hooks.prototype.apply = function apply (value, options) {
  if (this.empty()) {
    return this.defaultHook(value, options)
  } else {
    return this.hooks.reduce(function (result, hook) { return hook.handler(result, options); }, value)
  }
};

Hooks.prototype.asSingleHook = function asSingleHook () {
  var self = this;
  return {
    handler: function handler(value, options) {
      return self.apply(value, options)
    },
  }
};

var hooksProp = {
  type: Object,
  default: function () { return ({
    model: [],
    schema: [],
    schemaOptions: [],
    schemaNode: [],
    schemaComponent: [],
  }); },
};

//
var script = {
  extends: Formulate.defaults.components.FormulateInput,
  props: {
    modelHook: {
      type: [Function, Object, Array],
      default: null,
    },
  },
  watch: {
    "context.model": {
      handler: function handler(newModel, oldModel) {
        var _modelHook = new Hooks();
        if (Array.isArray(this.modelHook)) {
          this.modelHook.map(function (m) { return _modelHook.addHook(m); });
        } else if (typeof this.modelHook === "function") {
          _modelHook.addHook({ handler: this.modelHook });
        } else {
          _modelHook.addHook(this.modelHook);
        }

        var defaultModelHooks =
          this.$formulate.options.hooks && this.$formulate.options.hooks.model
            ? this.$formulate.options.hooks.model
            : [];
        defaultModelHooks.map(function (h) { return _modelHook.addHook(h); });

        var updatedModel = newModel;

        if (this.context.classification === "box") {
          if (typeof newModel === "string" && newModel.length === 0) {
            updatedModel = false;
          }
        }

        if (newModel !== oldModel) {
          this.context.model = _modelHook.apply(updatedModel, {
            oldModel: oldModel,
            context: this.context,
          });
        }
      },
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
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
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: _vm.context.classes.outer,
      attrs: {
        "data-classification": _vm.classification,
        "data-has-errors": _vm.hasErrors,
        "data-is-showing-errors": _vm.hasVisibleErrors,
        "data-has-value": _vm.hasValue,
        "data-type": _vm.type
      },
      on: {
        click: function($event) {
          return _vm.$emit("outer-click")
        }
      }
    },
    [
      _c(
        "div",
        {
          class: _vm.context.classes.wrapper,
          on: {
            click: function($event) {
              return _vm.$emit("wrapper-click")
            }
          }
        },
        [
          _vm.context.labelPosition === "before"
            ? _vm._t(
                "label",
                [
                  _vm.context.hasLabel
                    ? _c(
                        _vm.context.slotComponents.label,
                        _vm._b(
                          { tag: "component", attrs: { context: _vm.context } },
                          "component",
                          _vm.context.slotProps.label,
                          false
                        )
                      )
                    : _vm._e()
                ],
                null,
                _vm.context
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.context.helpPosition === "before"
            ? _vm._t(
                "help",
                [
                  _vm.context.help
                    ? _c(
                        _vm.context.slotComponents.help,
                        _vm._b(
                          { tag: "component", attrs: { context: _vm.context } },
                          "component",
                          _vm.context.slotProps.help,
                          false
                        )
                      )
                    : _vm._e()
                ],
                null,
                _vm.context
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._t(
            "element",
            [
              _c(
                _vm.context.component,
                _vm._g(
                  _vm._b(
                    { tag: "component", attrs: { context: _vm.context } },
                    "component",
                    _vm.context.slotProps.component,
                    false
                  ),
                  _vm.listeners
                ),
                [_vm._t("default", null, null, _vm.context)],
                2
              )
            ],
            null,
            _vm.context
          ),
          _vm._v(" "),
          _vm.context.labelPosition === "after"
            ? _vm._t(
                "label",
                [
                  _vm.context.hasLabel
                    ? _c(
                        _vm.context.slotComponents.label,
                        _vm._b(
                          { tag: "component", attrs: { context: _vm.context } },
                          "component",
                          _vm.context.slotProps.label,
                          false
                        )
                      )
                    : _vm._e()
                ],
                null,
                _vm.context
              )
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _vm.context.helpPosition === "after"
        ? _vm._t(
            "help",
            [
              _vm.context.help
                ? _c(
                    _vm.context.slotComponents.help,
                    _vm._b(
                      { tag: "component", attrs: { context: _vm.context } },
                      "component",
                      _vm.context.slotProps.help,
                      false
                    )
                  )
                : _vm._e()
            ],
            null,
            _vm.context
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t(
        "errors",
        [
          !_vm.context.disableErrors
            ? _c(
                _vm.context.slotComponents.errors,
                _vm._b(
                  {
                    tag: "component",
                    attrs: {
                      type:
                        _vm.context.slotComponents.errors === "FormulateErrors"
                          ? "input"
                          : false,
                      context: _vm.context
                    }
                  },
                  "component",
                  _vm.context.slotProps.errors,
                  false
                )
              )
            : _vm._e()
        ],
        null,
        _vm.context
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

function leaf(item, index, ref) {
  if ( ref === void 0 ) ref = {};
  var hooks = ref.hooks;
  var h = ref.h;
  var state = ref.state;

  if (item && typeof item === 'object' && !Array.isArray(item)) {
    var children = item.children; if ( children === void 0 ) children = null;
    var component = item.component; if ( component === void 0 ) component = __vue_component__;
    var depth = item.depth; if ( depth === void 0 ) depth = 1;
    var modelHook = item.modelHook;
    var rest = objectWithoutProperties( item, ["children", "component", "depth", "modelHook"] );
    var attrs = rest;
    var type = component === __vue_component__ ? attrs.type || 'text' : '';
    var name = attrs.name || type || 'el';
    var key = attrs.id || (name + "-" + depth + "-" + index);
    var els = Array.isArray(children) ? children.map(function (child) { return Object.assign(child, { depth: depth + 1 }); }) : children;
    var _modelHook = new Hooks()
      .setHooks(hooks.model)
      .addHook(modelHook)
      .asSingleHook();

    var node = Object.assign({ name: name, type: type, key: key, depth: depth, component: component, definition: { attrs: Object.assign({}, attrs, {modelHook: _modelHook}) }, children: tree(els, { hooks: hooks, h: h, state: state }) });

    return new Hooks()
      .setHooks(hooks.schemaNode)
      .setDefault(function () { return node; })
      .apply(node, { state: state })
  }
  return null
}

function tree(schema, ref) {
  if ( ref === void 0 ) ref = {};
  var hooks = ref.hooks;
  var h = ref.h;
  var state = ref.state;

  if (Array.isArray(schema)) {
    return schema.map(function (el, idx) {
      var item = leaf(el, idx, { hooks: hooks, h: h, state: state });
      return new Hooks()
        .setHooks(hooks.schemaComponent)
        .setDefault(function () { return h(item.component, item.definition, item.children); })
        .apply(item)
    })
  }
  return schema
}

var FormulateSchema = {
  functional: false,
  name: 'FormulateSchema',
  props: {
    schema: Formulate.defaults.components.FormulateForm.props.schema,
    hooks: hooksProp,
    formClass: {
      type: String,
      default: null,
    },
  },
  data: function () { return ({
    schemaHooks: null,
    schemaOptionsHooks: null,
  }); },
  methods: {
    emit: function emit(event, payload) {
      this.$emit(event, payload);
    },
  },
  beforeMount: function beforeMount() {
    this.schemaHooks = new Hooks().setHooks(this.hooks.schema);
    this.schemaOptionsHooks = new Hooks().setHooks(this.hooks.schemaOptions).setDefault(function (x) { return x; });
  },
  render: function render(createElement) {
    return this.schemaHooks.apply(createElement('div', { class: this.$props.formClass }, tree(this.schema, this.schemaOptionsHooks.apply({ hooks: this.hooks, h: createElement, state: {} }, { emit: this.emit, props: this.$props }))), { emit: this.emit, props: this.$props })
  },
};

//

var script$1 = {
  extends: Formulate.defaults.components.FormulateForm,
  components: {
    FormulateSchema: FormulateSchema,
  },
  props: {
    hooks: hooksProp,
    formClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    cleanedHooks: function cleanedHooks() {
      var this$1 = this;

      var _hooks = hooksProp.default();

      Object.keys(_hooks).forEach(function (key) {
        _hooks[key] = new Hooks().parse(this$1.hooks[key]).getHooks();
      });

      return Formulate.merge(this.$formulate.options.hooks || {}, _hooks);
    },
  },
  watch: {
    formulateValue: {
      handler: function handler(values) {
        var this$1 = this;

        /**
         * Overrides the default behavior to properly share v-model updates
         */
        if (this.isVmodeled && values && typeof values === "object") {
          var keys = Array.from(
            new Set(Object.keys(values).concat(Object.keys(this.proxy)))
          );
          keys.forEach(function (field) {
            if (!shallowEqualObjects(values[field], this$1.proxy[field])) {
              this$1.setFieldValue(field, values[field]);
              if (
                this$1.registry.has(field) &&
                !shallowEqualObjects(
                  values[field],
                  this$1.registry.get(field).proxy
                )
              ) {
                this$1.registry.get(field).context.model = values[field];
              }
            }
          });
        }
      },
      deep: true,
    },
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      class: _vm.classes,
      on: {
        submit: function($event) {
          $event.preventDefault();
          return _vm.formSubmitted($event)
        }
      }
    },
    [
      _vm.schema
        ? _c("FormulateSchema", {
            attrs: {
              schema: _vm.schema,
              hooks: _vm.cleanedHooks,
              formClass: _vm.formClass
            },
            on: {
              events: function($event) {
                return _vm.$emit("events", $event)
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      !_vm.hasFormErrorObservers
        ? _c("FormulateErrors", { attrs: { context: _vm.formContext } })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var EventBus = function EventBus() {
  this.store = new Map();
};

EventBus.prototype.on = function on (type, handler) {
  var handlers = this.store.get(type);
  var added = handlers && handlers.push(handler);
  if (!added) {
    this.store.set(type, [handler]);
  }
};

EventBus.prototype.off = function off (type, handler) {
  var handlers = this.store.get(type);
  var index = handlers.indexOf(handler);
  if (handlers && index > -1) {
    handlers.splice(index, 1);
  }
};

EventBus.prototype.emit = function emit (type, payload) {
  this.store
    .get(type)
    .slice()
    .map(function (handler) { return handler(payload); });
};

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var formEvents = {
  hooks: {
    schemaOptions: [
      {
        handler: function handler(options, ref) {
          if ( ref === void 0 ) ref = {};
          var emit = ref.emit;

          options.state = options.state || {};
          options.state.eventBus = new EventBus();
          options.state.eventBus.on('events', function (payload) { return emit('events', payload); });
          return options
        },
      } ],
    schemaNode: [
      {
        handler: function handler(node, ref) {
          if ( ref === void 0 ) ref = {};
          var state = ref.state;

          var ref$1 = node.definition.attrs;
          var events = ref$1.events; if ( events === void 0 ) events = [];
          var on = ref$1.on; if ( on === void 0 ) on = {};
          var rest = objectWithoutProperties$1( ref$1, ["events", "on"] );
          var attrs = rest;
          node.definition.attrs = attrs;
          node.definition.on = Object.assign({}, on,
            events.reduce(function (onEvents, eventName) {
              onEvents[eventName] = function(payload) {
                if (on[eventName]) { on[eventName](payload); }
                console.log("node", node);
                state.eventBus.emit('events', { eventName: eventName, name: node.name, type: node.type, key: node.key, payload: payload });
              };
              return onEvents
            }, {}));

          return node
        },
      } ],
  },
};

var textMask = {
  hooks: {
    model: [
      {
        handler: function handler(value, ref) {
          var context = ref.context;

          var hasMask = 'vfe-mask' in context.attributes || 'vfeMask' in context.attributes;
          if (context.classification === 'text' && hasMask) {
            var options = context.attributes['vfe-mask'] || context.attributes.vfeMask;
            var maskOptions = typeof options === 'object' && options.mask ? options : { mask: options };
            var masked = IMask.createMask(maskOptions);
            var resolved = masked.resolve(value);
            return resolved
          } else {
            return value
          }
        },
      } ],
  },
};

var enforceNumber = {
  hooks: {
    model: [
      {
        handler: function handler(value, ref) {
          var context = ref.context;

          var hasEnforceNumber = (typeof context.attributes.vfeNumber === 'string' ? true : context.attributes.vfeNumber) || (typeof context.attributes['vfe-number'] === 'string' ? true : context.attributes['vfe-number']);

          if (context.type === 'number' && typeof value === 'string' && hasEnforceNumber) {
            return +value
          } else {
            return value
          }
        },
      } ],
  },
};

var components = { FormulateForm: __vue_component__$1, FormulateSchema: FormulateSchema, FormulateInput: __vue_component__ };
var features = { formEvents: formEvents, textMask: textMask, enforceNumber: enforceNumber };

function index(options) {
  if ( options === void 0 ) options = {};

  var extended = {
    options: Formulate$1.merge(
      {
        features: {
          formEvents: true,
          textMask: false,
          enforceNumber: false,
        },
        override: {
          FormulateForm: true,
          FormulateInput: true,
          FormulateSchema: true,
        },
      },
      options
    ),
  };

  return function plugin(instance) {
    if (extended.options.override.FormulateForm) {
      instance.extend({ components: { FormulateForm: __vue_component__$1 } });
    }

    if (extended.options.override.FormulateInput) {
      instance.extend({ components: { FormulateInput: __vue_component__ } });
    }

    if (extended.options.override.FormulateSchema) {
      instance.extend({ components: { FormulateSchema: FormulateSchema } });
    }

    if (extended.options.features.formEvents) {
      instance.extend(formEvents);
    }

    if (extended.options.features.textMask) {
      instance.extend(textMask);
    }

    if (extended.options.features.enforceNumber) {
      instance.extend(enforceNumber);
    }
  }
}

export default index;
export { components, features };

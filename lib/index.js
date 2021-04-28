'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Formulate = _interopDefault(require('@braid/vue-formulate'));
var utils_js = require('@braid/vue-formulate/src/libs/utils.js');
var IMask = _interopDefault(require('imask'));
var Formulate$1 = _interopDefault(require('@braid/vue-formulate/src/Formulate'));

class Hooks {
  constructor(hooks = []) {
    this.defaultHook = (v) => v;
    return this.setHooks(hooks)
  }

  // chainables

  parse(hooks = []) {
    const _hookList = Array.isArray(hooks) ? hooks : [];
    for (let _hook of _hookList) {
      if (this.isProperHook(_hook)) {
        this.hooks.push(_hook);
      }
    }
    return this
  }

  addHook(hook) {
    if (this.isProperHook(hook) && this.isNewHook(hook)) {
      this.hooks.push(hook);
    }
    return this
  }

  setHooks(hooks = []) {
    this.hooks = hooks.filter(this.isProperHook);
    return this
  }

  setDefault(hook) {
    this.defaultHook = hook;
    return this
  }

  // not chainables

  isProperHook(hook) {
    return hook && typeof hook === 'object' && typeof hook.handler === 'function'
  }

  isNewHook(hook) {
    return this.hooks.findIndex((h) => h === hook) < 0
  }

  getHooks() {
    return this.hooks
  }

  empty() {
    return this.hooks.length === 0
  }

  apply(value, options) {
    if (this.empty()) {
      return this.defaultHook(value, options)
    } else {
      return this.hooks.reduce((result, hook) => hook.handler(result, options), value)
    }
  }

  asSingleHook() {
    const self = this;
    return {
      handler(value, options) {
        return self.apply(value, options)
      },
    }
  }
}

var hooksProp = {
  type: Object,
  default: () => ({
    model: [],
    schema: [],
    schemaOptions: [],
    schemaNode: [],
    schemaComponent: [],
  }),
};

//
const {
  props,
  created, // replace
  watch,
  computed,
  ...others
} = Formulate.defaults.components.FormulateInput;

var script = {
  ...others,
  props: {
    ...props,
    modelHook: {
      type: [Function, Object, Array],
      default: null,
    },
    standalone: {
      type: Boolean,
      default: () => false,
    },
  },

  created() {
    this.applyInitialValue();
    if (
      !this.standalone &&
      this.formulateRegister &&
      typeof this.formulateRegister === "function"
    ) {
      this.formulateRegister(this.nameOrFallback, this);
    }
    this.applyDefaultValue();
    if (!this.disableErrors && typeof this.observeErrors === "function") {
      this.observeErrors({
        callback: this.setErrors,
        type: "input",
        field: this.nameOrFallback,
      });
    }
    this.updateLocalAttributes(this.$attrs);
    this.performValidation();
  },
  computed: {
    ...computed,
    slotProps() {
      const fn = this.$formulate.slotProps.bind(this.$formulate);
      return {
        label: fn(this.type, "label", this.typeProps),
        help: fn(this.type, "help", this.typeProps),
        errors: fn(this.type, "errors", this.typeProps),
        repeatable: fn(this.type, "repeatable", this.typeProps),
        addMore: fn(this.type, "addMore", this.typeProps),
        remove: fn(this.type, "remove", this.typeProps),
        component: fn(this.type, "component", this.typeProps),
      };
    },
  },
  watch: {
    ...watch,
    "context.model": {
      handler(newModel, oldModel) {
        const _modelHook = new Hooks();
        if (Array.isArray(this.modelHook)) {
          this.modelHook.map((m) => _modelHook.addHook(m));
        } else if (typeof this.modelHook === "function") {
          _modelHook.addHook({ handler: this.modelHook });
        } else {
          _modelHook.addHook(this.modelHook);
        }

        const defaultModelHooks =
          this.$formulate.options.hooks && this.$formulate.options.hooks.model
            ? this.$formulate.options.hooks.model
            : [];

        defaultModelHooks.map((h) => _modelHook.addHook(h));

        let updatedModel = newModel;

        if (this.context.classification === "box") {
          if (typeof newModel === "string" && newModel.length === 0) {
            updatedModel = false;
          }
        }

        if (newModel !== oldModel && _modelHook.hooks.length > 0) {
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
    const options = typeof script === 'function' ? script.options : script;
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
    let hook;
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
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

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
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
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

function leaf(item, index, { hooks, h, state } = {}) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    const { children = null, component = __vue_component__, depth = 1, modelHook, ...attrs } = item;
    const type = component === __vue_component__ ? attrs.type || 'text' : '';
    const name = attrs.name || type || 'el';
    const key = attrs.id || `${name}-${depth}-${index}`;
    const els = Array.isArray(children) ? children.map((child) => Object.assign(child, { depth: depth + 1 })) : children;
    const _modelHook = new Hooks()
      .setHooks(hooks.model)
      .addHook(modelHook)
      .asSingleHook();

    const node = Object.assign({ name, type, key, depth, component, definition: { attrs: { ...attrs, modelHook: _modelHook } }, children: tree(els, { hooks, h, state }) });

    return new Hooks()
      .setHooks(hooks.schemaNode)
      .setDefault(() => node)
      .apply(node, { state })
  }
  return null
}

function tree(schema, { hooks, h, state } = {}) {
  if (Array.isArray(schema)) {
    return schema.map((el, idx) => {
      const item = leaf(el, idx, { hooks, h, state });
      return new Hooks()
        .setHooks(hooks.schemaComponent)
        .setDefault(() => h(item.component, item.definition, item.children))
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
  data: () => ({
    schemaHooks: null,
    schemaOptionsHooks: null,
  }),
  methods: {
    emit(event, payload) {
      this.$emit(event, payload);
    },
  },
  beforeMount() {
    this.schemaHooks = new Hooks().setHooks(this.hooks.schema);
    this.schemaOptionsHooks = new Hooks().setHooks(this.hooks.schemaOptions).setDefault((x) => x);
  },
  render(createElement) {
    return this.schemaHooks.apply(createElement('div', { class: this.$props.formClass }, tree(this.schema, this.schemaOptionsHooks.apply({ hooks: this.hooks, h: createElement, state: {} }, { emit: this.emit, props: this.$props }))), { emit: this.emit, props: this.$props })
  },
};

//

var script$1 = {
  extends: Formulate.defaults.components.FormulateForm,
  components: {
    FormulateSchema,
  },
  props: {
    hooks: hooksProp,
    formClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    cleanedHooks() {
      const _hooks = hooksProp.default();

      Object.keys(_hooks).forEach((key) => {
        _hooks[key] = new Hooks().parse(this.hooks[key]).getHooks();
      });

      return Formulate.merge(this.$formulate.options.hooks || {}, _hooks);
    },
  },
  watch: {
    formulateValue: {
      handler(values) {
        /**
         * Overrides the default behavior to properly share v-model updates
         */
        if (this.isVmodeled && values && typeof values === "object") {
          const keys = Array.from(
            new Set(Object.keys(values).concat(Object.keys(this.proxy)))
          );
          keys.forEach((field) => {
            if (!utils_js.equals(values[field], this.proxy[field])) {
              this.setFieldValue(field, values[field]);
              if (
                this.registry.has(field) &&
                !utils_js.equals(
                  values[field],
                  this.registry.get(field).proxy
                )
              ) {
                this.registry.get(field).context.model = values[field];
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
const __vue_script__$1 = script$1;

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
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
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

class EventBus {
  constructor() {
    this.store = new Map();
  }

  on(type, handler) {
    const handlers = this.store.get(type);
    const added = handlers && handlers.push(handler);
    if (!added) {
      this.store.set(type, [handler]);
    }
  }

  off(type, handler) {
    const handlers = this.store.get(type);
    const index = handlers.indexOf(handler);
    if (handlers && index > -1) {
      handlers.splice(index, 1);
    }
  }

  emit(type, payload) {
    this.store
      .get(type)
      .slice()
      .map((handler) => handler(payload));
  }
}

var formEvents = {
  hooks: {
    schemaOptions: [
      {
        handler(options, { emit } = {}) {
          options.state = options.state || {};
          options.state.eventBus = new EventBus();
          options.state.eventBus.on('events', (payload) => emit('events', payload));
          return options
        },
      },
    ],
    schemaNode: [
      {
        handler(node, { state } = {}) {
          const { events = [], on = {}, ...attrs } = node.definition.attrs;
          node.definition.attrs = attrs;
          node.definition.on = {
            ...on,
            ...events.reduce((onEvents, eventName) => {
              onEvents[eventName] = function(payload) {
                if (on[eventName]) on[eventName](payload);
                state.eventBus.emit('events', { eventName, name: node.name, type: node.type, key: node.key, payload });
              };
              return onEvents
            }, {}),
          };

          return node
        },
      },
    ],
  },
};

var textMask = {
  hooks: {
    model: [
      {
        handler(value, { context }) {
          const hasMask = 'vfe-mask' in context.attributes || 'vfeMask' in context.attributes;
          if (context.classification === 'text' && hasMask) {
            const options = context.attributes['vfe-mask'] || context.attributes.vfeMask;
            const maskOptions = typeof options === 'object' && options.mask ? options : { mask: options };
            const masked = IMask.createMask(maskOptions);
            const resolved = masked.resolve(value);
            return resolved
          } else {
            return value
          }
        },
      },
    ],
  },
};

var enforceNumber = {
  hooks: {
    model: [
      {
        handler(value, { context }) {
          const hasEnforceNumber = (typeof context.attributes.vfeNumber === 'string' ? true : context.attributes.vfeNumber) || (typeof context.attributes['vfe-number'] === 'string' ? true : context.attributes['vfe-number']);

          if (context.type === 'number' && typeof value === 'string' && hasEnforceNumber) {
            return +value
          } else {
            return value
          }
        },
      },
    ],
  },
};

const components = { FormulateForm: __vue_component__$1, FormulateSchema, FormulateInput: __vue_component__ };
const features = { formEvents, enforceNumber, textMask }; // textMask - need to be removed to avoid required dependency

function index(options = {}) {
  let extended = {
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
      instance.extend({ components: { FormulateSchema } });
    }

    if (extended.options.features.formEvents) {
      instance.extend(formEvents);
    }

    if (extended.options.features.textMask) {
      instance.extend(textMask);
      // lazy loaded
      // import('./features/text-mask').then((textMask) => {
      //   instance.extend(textMask.default)
      // })
    }

    if (extended.options.features.enforceNumber) {
      instance.extend(enforceNumber);
    }
  }
}

exports.components = components;
exports.default = index;
exports.features = features;

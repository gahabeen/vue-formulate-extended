export class Hooks {
  constructor(hooks = []) {
    this.defaultHook = (v) => v
    return this.setHooks(hooks)
  }

  // chainables

  parse(hooks = []) {
    const _hookList = Array.isArray(hooks) ? hooks : []
    for (let _hook of _hookList) {
      if (this.isProperHook(_hook)) {
        this.hooks.push(_hook)
      }
    }
    return this
  }

  addHook(hook) {
    if (this.isProperHook(hook)) {
      this.hooks.push(hook)
    }
    return this
  }

  setHooks(hooks = []) {
    this.hooks = hooks.filter(this.isProperHook)
    return this
  }

  setDefault(hook) {
    this.defaultHook = hook
    return this
  }

  isProperHook(hook) {
    return hook && typeof hook === 'object' && typeof hook.handler === 'function'
  }

  // not chainables

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

  handler() {
    return (value, options) => this.apply(value, options)
  }
}

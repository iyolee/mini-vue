import Compile from './compile'
import Observer from './observer'

class Vue {
  constructor(options) {
    options = options || {}
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods

    new Observer(this.$data)

    if (this.$el) {
      new Compile(this.$el, this)
    }
  }
}

window.Vue = Vue

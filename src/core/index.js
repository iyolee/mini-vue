import Compile from './compile'

class Vue {
  constructor(options) {
    options = options || {}
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods

    if (this.$el) {
      new Compile(this.$el, this)
    }
  }
}

window.Vue = Vue

class Vue {
  constructor(options) {
    options = options || {};
    this.$el = options.el;
    this.$data = options.data;

    if (this.$el) {
      const c = new Compile(this.$el, this);
      console.log(c);
    }
  }
}
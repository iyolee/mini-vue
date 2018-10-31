class Compile {
  /**
   *
   * @param {*} el 模板
   * @param {*} vm vue实例
   */
  constructor(el, vm) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.vm = vm;

    if (this.el) {
      const fragment = this.nodeToFragment(this.el);
      this.compile(fragment);
      this.el.appendChild(fragment);
    }
  }

  // 核心方法
  nodeToFragment(node) {
    const fragment = document.createDocumentFragment();
    const childNodes = node.childNodes;
    this.toArray(childNodes).forEach(node => {
      fragment.appendChild(node);
    })
    return fragment;
  }

  compile(fragment) {
    const childNodes = fragment.childNodes;
    this.toArray(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
      }

      if (this.isTextNode(node)) {
        this.compileText(node);
      }

      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    })
  }

  // 解析html标签
  compileElement(node) {
    const attributes = node.attributes;
    this.toArray(attributes).forEach(attr => {
      const attrName = attr.name;
      if (this.isDirective(attrName)) {
        const type = attrName.slice(2);
        const attrValue = attr.value;

        if (type === 'text') {
          node.textContent = this.vm.$data[attrValue];
        }

        if (type === 'html') {
          node.innerHTML = this.vm.$data[attrValue];
        }

        if (type === 'model') {
          node.value = this.vm.$data[attrValue];
        }
      }
    })
  }

  // 解析文本节点
  compileText(node) {
    
  }


  // 工具方法
  toArray(likeArray) {
    return [].slice.call(likeArray);
  }

  isElementNode(node) {
    const elementNode = 1;
    return node.nodeType === elementNode;
  }

  isTextNode(node) {
    const textNode = 3;
    return node.nodeType === textNode;
  }

  isDirective(attr) {
    return attr.startsWith('v-');
  }
}

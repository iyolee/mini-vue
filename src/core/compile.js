import { toArray } from '../util/array'
import { ParserUtil } from '../compile/parser'
import { isElementNode, isTextNode, isDirective, isEventDirective } from '../util/type'

class Compile {
  /**
   *
   * @param {String | HTMLElement} el Provide mount elements for an instance
   * @param {Object} vm Instance
   */
  constructor(el, vm) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.vm = vm

    if (this.el) {
      const fragment = this.nodeToFragment(this.el)
      this.compile(fragment)
      this.el.appendChild(fragment)
    }
  }

  nodeToFragment(node) {
    const fragment = document.createDocumentFragment()
    const childNodes = node.childNodes
    toArray(childNodes).forEach(node => {
      fragment.appendChild(node)
    })
    return fragment
  }

  compile(fragment) {
    const childNodes = fragment.childNodes
    toArray(childNodes).forEach(node => {
      if (isElementNode(node)) {
        this.compileElement(node)
      }

      if (isTextNode(node)) {
        this.compileText(node)
      }

      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // compile HTML tag
  compileElement(node) {
    const attributes = node.attributes
    toArray(attributes).forEach(attr => {
      const attrName = attr.name
      if (isDirective(attrName)) {
        const type = attrName.slice(2)
        const expr = attr.value

        if (isEventDirective(type)) {
          ParserUtil['eventHandler'](node, this.vm, type, expr)
        } else {
          ParserUtil[type] && ParserUtil[type](node, this.vm, expr)
        }
      }
    })
  }

  // compile text node
  compileText(node) {
    ParserUtil.template(node, this.vm)
  }
}

export default Compile

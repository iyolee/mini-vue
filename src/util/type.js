export const isElementNode = node => {
  const elementNode = 1
  return node.nodeType === elementNode
}

export const isTextNode = node => {
  const textNode = 3
  return node.nodeType === textNode
}

export const isDirective = attr => {
  return attr.startsWith('v-')
}

export const isEventDirective = attr => {
  return attr.split(':')[0] === 'on'
}

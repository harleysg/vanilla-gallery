export default function html (tagName, props = {}, children = []) {
  const newElm = Object.assign(document.createElement(tagName), props)

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (child.nodeType && (child.nodeType === 1 || child.nodeType === 11)) {
        newElm.appendChild(child)
      } else {
        newElm.innerHTML += child
      }
    })
  }

  return newElm
}

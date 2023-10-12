import './globals.css'

const app = document.getElementById('app')

function html (tagName, props = {}, children = []) {
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

const span = (() => {
  const children = document.createElement('span')
  children.textContent = 'World'
  return html('p', {
    className: 'awesome-paragraph',
    innerHTML: '<strong>Hello</strong> '
  }, [children])
})()

app.appendChild(span)

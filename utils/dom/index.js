const updateCursor = ({ x, y }) => {
  document.documentElement.style.setProperty('--x', x)
  document.documentElement.style.setProperty('--y', y)
}

const loadImage = (url) => new Promise((resolve, reject) => {
  const img = new globalThis.Image()
  img.addEventListener('load', () => resolve(img))
  img.addEventListener('error', (err) => reject(err))
  img.src = url
})

export {
  loadImage,
  updateCursor
}

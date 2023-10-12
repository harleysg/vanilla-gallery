import { IMAGES } from './images'
import html from './createHtml.js'

export function vanillaGallery ({ gallery, dialog }) {
  ;(() => {
    IMAGES.forEach((image, index) => {
      const img = html('a', {
        className: 'group rounded-lg overflow-hidden cursor-zoom-in',
        href: `#${index}`,
        innerHTML: `<img src="${image.src}" class="object-cover h-full brightness-90 group-hover:brightness-110" />`
      })

      gallery.appendChild(img)
    })
  })()

  ;(() => {
    IMAGES.forEach((image, index) => {
      const img = html('a', {
        className: 'group rounded-lg overflow-hidden cursor-zoom-in',
        href: `#${index}`,
        innerHTML: `<img src="${image.src}" class="object-cover h-full brightness-90 group-hover:brightness-110" />`
      })

      dialog.querySelector('footer').appendChild(img)
    })
  })()

  gallery.addEventListener('click', event => {
    const { target } = event
    if (target.nodeName === 'IMG') {
      dialog.querySelector('figure img').setAttribute('src', target.src)
      dialog.showModal()
    }
  })

  dialog.addEventListener('click', event => {
    const { target } = event
    if (target.nodeName === 'BUTTON') {
      if (target.dataset.action === 'close') {
        dialog.close()
        const URI = window.location.toString().substring(0, window.location.toString().indexOf('#'))
        window.history.replaceState({}, document.title, URI)
      }
    }
  })

  _routeHandler()
  window.addEventListener('hashchange', _routeHandler)

  function _routeHandler () {
    const { hash } = window.location
    const _HASH = hash.split('#')[1] || '/'

    if (Number(_HASH) > -1) {
      const target = dialog.querySelectorAll('footer img')?.[_HASH]
      dialog.querySelector('figure img').setAttribute('src', target.src)

      if (!dialog.open) {
        dialog.showModal()
      }
    } else if (isNaN(Number(_HASH)) && dialog.open) {
      dialog.close()
    }
  }
}

import { HTMLError } from '../helpers/errors'
import { _renderImages } from './_renderImages'

export async function galleryService ({ gallery, option: { emitImageSelected } }) {
  if (
    !gallery ||
    !(gallery instanceof window.HTMLElement) ||
    !document.querySelector(gallery?.tagName)
  ) {
    throw new HTMLError('The target element is not defined', {
      origin: 'galleryService'
    })
  }

  gallery.addEventListener('click', _galleryHandleEvent)

  await _renderImages(gallery, {
    props: {
      className: 'group rounded-lg overflow-hidden cursor-zoom-in'
    },
    getOuterHTML: true
  })

  function _galleryHandleEvent ({ target }) {
    if (target.nodeName === 'IMG') {
      emitImageSelected({ src: target.src })
    }
  }
}

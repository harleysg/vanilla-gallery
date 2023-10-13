import { _renderImages } from './_renderImages'

export function galleryService ({ gallery, option: { emitImageSelected } }) {
  if (!gallery) return

  gallery.addEventListener('click', _galleryHandleEvent)

  _renderImages(gallery, {
    className: 'group rounded-lg overflow-hidden cursor-zoom-in'
  })

  function _galleryHandleEvent ({ target }) {
    if (target.nodeName === 'IMG') {
      emitImageSelected({ src: target.src })
    }
  }
}

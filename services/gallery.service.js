import { HTMLError } from '../helpers/errors'
import { HTMLValidator } from '../schema/html'
import { _renderImages } from './_renderImages'

const IParamsDefault = {
  gallery: undefined,
  option: {
    emitImageSelected: () => {}
  }
}

/**
 * Add event and render images
 * @param {IParamsDefault} { gallery, options }
 */
export async function galleryService ({ gallery, option } = IParamsDefault) {
  const isHTML = await HTMLValidator(gallery)

  if (isHTML.error) {
    throw new HTMLError(isHTML.error.format()._errors[0], {
      origin: 'galleryService'
    })
  }

  gallery.addEventListener('click', ({ target }) => {
    if (target instanceof globalThis.HTMLImageElement) {
      option.emitImageSelected({ src: target.src })
    }
  })

  await _renderImages(gallery, {
    props: {
      className: 'group rounded-lg overflow-hidden cursor-zoom-in'
    },
    getOuterHTML: true
  })
}

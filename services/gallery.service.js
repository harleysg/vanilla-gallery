import { HTMLError } from '../helpers/errors'
import { HTMLValidator } from '../schema/html'
import { _renderImages } from './_renderImages'

const IParamsDefault = {
  gallery: undefined,
  option: {
    emitter: () => ({ src: '' })
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

  gallery.addEventListener('click', (event) => {
    if (event.target instanceof globalThis.HTMLImageElement && option?.emitter) {
      option.emitter({ src: event.target.src })
    } else {
      event.preventDefault()
    }
  })

  await _renderImages(gallery, {
    props: {
      className: 'group rounded-lg overflow-hidden cursor-zoom-in'
    },
    getOuterHTML: true,
    origin: 'galleryService'
  })
}

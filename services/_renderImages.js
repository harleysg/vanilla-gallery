import { IMAGES } from '../db/images.js'
import { HTMLError } from '../helpers/errors.js'
import { getImages } from '../utils/index.js'
import html from './createHtml.js'

const defaultOptions = {
  props: {},
  getOuterHTML: false,
  error: { origin: '' }
}

export async function _renderImages (
  target, { props, getOuterHTML, error } = defaultOptions
) {
  if (
    !target || !document.querySelector(target?.tagName) ||
    !(target instanceof window.HTMLElement)
  ) {
    throw new HTMLError('The target element is not defined', {
      origin: `renderImages <- ${error?.origin ?? ''}`
    })
  }

  target.toggleAttribute('data-loading')
  const data = await getImages(IMAGES)
  let tmplImage = ''

  if (data.length === 0) return

  data.forEach((image, index) => {
    if (image.src) {
      const img = html('a', {
        innerHTML: `<img
          src="${image.src}"
          data-position="${index}"
          loading="lazy"
          class="object-cover h-full w-full brightness-90 group-hover:brightness-110 object-center aspect-[3/2]"
          />`,
        href: `#${index}`,
        ...props
      })

      img.dataset.position = index

      if (getOuterHTML) {
        tmplImage += img.outerHTML
      } else {
        target.appendChild(img)
      }
    }
  })

  getOuterHTML && (target.innerHTML = tmplImage)
  target.toggleAttribute('data-loading')
}

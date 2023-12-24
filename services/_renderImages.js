import { HTMLError } from '../helpers/errors.js'
import { html } from '../utils/dom/index.js'
import { HTMLValidator } from '../schema/html.js'
import { ImageController } from '../controller/index.js'

const defaultOptions = {
  props: {},
  getOuterHTML: false,
  error: { origin: '' }
}

export async function _renderImages (
  target, { props, getOuterHTML, error } = defaultOptions
) {
  const isHTML = await HTMLValidator(target)

  if (isHTML.error) {
    throw new HTMLError(isHTML.error.format()._errors[0], {
      origin: `renderImages <- ${error?.origin ?? ''}`
    })
  }

  const data = await ImageController.getAll()
  let tmplImage = ''
  target.toggleAttribute('data-loading')

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

import { IMAGES } from '../db/images.js'
import html from './createHtml.js'

export async function _renderImages (target, options = {}) {
  if (!target) return

  IMAGES.forEach((image, index) => {
    if (image.src) {
      const img = html('a', {
        innerHTML: `<img
          src="${image.src}"
          data-position="${index}"
          class="object-cover h-full w-full brightness-90 group-hover:brightness-110 "
        />`,
        href: `#${index}`,
        ...options
      })

      img.dataset.position = index

      target.appendChild(img)
    }
  })
}

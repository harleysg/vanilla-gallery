import { modalCarousel } from './services/modal-carousel.js'
import { galleryService } from './services/gallery.service.js'
import { HTMLValidator } from './schema/html.js'
import { HTMLError } from './helpers/errors.js'

export async function vanillaGallery ({ gallery, dialog }) {
  const isGallery = await HTMLValidator(gallery)
  const isDialog = await HTMLValidator(dialog, globalThis.HTMLDialogElement)

  if (isGallery.error) {
    throw new HTMLError('Gallery not valid', {
      callback: {}
    })
  }

  if (isDialog.error) {
    const error = await new HTMLError('Dialog is not defined', {
      origin: 'modalCarousel'
    })

    await galleryService({
      gallery
    })

    throw error
  }

  const modalCarouselRef = await modalCarousel({ dialog })

  await galleryService({
    gallery,
    option: {
      emitter: ({ src }) => {
        modalCarouselRef?.getImages({ src })
      }
    }
  })

  modalCarouselRef.useCarousel()
}

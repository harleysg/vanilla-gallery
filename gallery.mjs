import { modalCarousel } from './services/modal-carousel.js'
import { galleryService } from './services/gallery.service.js'

export async function vanillaGallery ({ gallery, dialog }) {
  const modalCarouselRef = await modalCarousel({ dialog }).catch(async error => {
    const val = await error
    return val?.callback
  })

  modalCarouselRef.initCarousel()

  await galleryService({
    gallery,
    option: {
      emitImageSelected: modalCarouselRef.getImagesFromGallery
    }
  })
}

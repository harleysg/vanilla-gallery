import { modalCarousel } from './services/modal-carousel.js'
import { galleryService } from './services/gallery.service.js'

export async function vanillaGallery ({ gallery, dialog }) {
  const modalCarouselRef = modalCarousel({ dialog })
  modalCarouselRef.initCarousel()

  galleryService({
    gallery,
    option: {
      emitImageSelected: modalCarouselRef.getImagesFromGallery
    }
  })
}

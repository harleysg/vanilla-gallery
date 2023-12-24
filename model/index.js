import { IMAGES } from '../db/images'
import { loadImage } from '../utils'

export class ImageModel {
  // -------------------------
  static async getAll () {
    // TODO: Memoization | save on localStorage to avoid duplicated calls | loads
    // TODO: Use a API to get all images
    const _Proimses = await Promise.allSettled(IMAGES.map(row => loadImage(row.src || '')))

    return _Proimses
      .filter(x => x.status === 'fulfilled')
      .map(x => x.value)
  }
}

import { ImageModel } from '../model'

export class ImageController {
  // -------------------------
  static async getAll () {
    const images = await ImageModel.getAll()

    return images
  }
}

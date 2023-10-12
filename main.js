import './globals.css'
import { vanillaGallery } from './gallery.mjs'

const gallery = document.getElementById('gallery')
const dialog = document.getElementById('dialog')

vanillaGallery({ gallery, dialog })

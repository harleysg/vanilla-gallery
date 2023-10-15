import { _renderImages } from './_renderImages.js'
import { BrowserHistory } from '../utils/index.js'
import { HTMLError } from '../helpers/errors.js'

export async function modalCarousel ({ dialog }) {
  if (
    dialog ||
    !(dialog instanceof window.HTMLElement) ||
    !document.querySelector(dialog?.tagName)
  ) {
    throw new HTMLError('Dialog is not defined', {
      origin: 'modalCarousel',
      callback: {
        dialogMiniCarrousel: () => {},
        getImagesFromGallery: () => {},
        initCarousel: () => {}
      }
    })
  }

  let prevImage = 0
  let wasClicked = false
  const transitionDuration = 300
  const $dialogNav = dialog.querySelector('footer nav')
  const $dialogImg = dialog.querySelector('figure img')
  const $dialogCarouselImages = dialog.querySelectorAll('nav a')

  dialog.addEventListener('close', _dialogHandleCloseEvent)
  dialog.addEventListener('click', _dialogHandleClickEvent)
  window.addEventListener('hashchange', _handlerModalCarousel)

  await _renderImages($dialogNav, {
    props: {
      className: 'group rounded-lg overflow-hidden cursor-zoom-in shrink-0 delay-75 transition-transform w-full px-1'
    },
    error: { origin: 'modalCarousel' }
  })

  function _dialogHandleCloseEvent () {
    const { hash } = BrowserHistory.getHashes()
    prevImage = hash
    wasClicked = false
    const URI = window.location.toString().substring(0, window.location.toString().indexOf('#'))
    window.history.replaceState({}, document.title, URI)
  }

  function _dialogHandleClickEvent ({ target }) {
    if (target.nodeName === 'BUTTON' && target?.dataset?.action === 'close') {
      dialog.close()
    }

    if ((target.nodeName === 'IMG' || target.nodeName === 'A') && target?.dataset?.position) {
      wasClicked = true
      dialogMiniCarrousel(Number(target.dataset.position))
    }
  }

  function _handlerModalCarousel () {
    const { value: _HASH, hash } = BrowserHistory.getHashes()

    if (!isNaN(hash) && _HASH > -1) {
      const target = $dialogNav?.[_HASH]

      if (target) {
        !wasClicked && dialogMiniCarrousel(_HASH)
        getImagesFromGallery({ src: target.src })
      }
    } else if (isNaN(hash) && dialog && dialog.open) {
      dialog.close()
    }
  }

  function dialogMiniCarrousel (position) {
    const carouselImages = [].slice.call($dialogCarouselImages)
    const index = Number(position)

    carouselImages.forEach($item => {
      const duration = `transition-duration: ${transitionDuration + ((Math.abs(prevImage - index) / 1.5) * 20)}ms;`
      const transform = `transform: translateX(${index === 0 ? '' : '-'}${index === 0 ? 0 : index * 100}%);`
      $item.setAttribute('style', `${transform} ${duration}`)
    })
  }

  function getImagesFromGallery ({ src }) {
    $dialogImg?.setAttribute('src', src)
    !dialog?.open && dialog.showModal()
  }

  function initCarousel () {
    _handlerModalCarousel()
  }

  return Promise.resolve({
    dialogMiniCarrousel,
    getImagesFromGallery,
    initCarousel
  })
}

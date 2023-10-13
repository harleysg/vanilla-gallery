import { _renderImages } from './_renderImages'

export function modalCarousel ({ dialog }) {
  if (!dialog) {
    return {
      dialogMiniCarrousel: () => {},
      getImagesFromGallery: () => {},
      initCarousel: () => {}
    }
  }

  let prevImage = 0
  let wasClicked = false

  dialog.addEventListener('click', _dialogHandleClickEvent)
  dialog.addEventListener('keydown', _dialogHandleKeydownEvent)
  window.addEventListener('hashchange', _handlerModalCarousel)

  _renderImages(dialog.querySelector('footer nav'), {
    className: 'group rounded-lg overflow-hidden cursor-zoom-in shrink-0 delay-75 transition-transform w-full px-1'
  })

  function _dialogHandleClickEvent ({ target }) {
    if (target.nodeName === 'BUTTON') {
      if (target.dataset.action === 'close') {
        dialog.close()
        const URI = window.location.toString().substring(0, window.location.toString().indexOf('#'))
        window.history.replaceState({}, document.title, URI)
      }
    }

    if ((target.nodeName === 'IMG' || target.nodeName === 'A') && target.dataset.position) {
      wasClicked = true
      dialogMiniCarrousel(Number(target.dataset.position))
    }
  }

  function _dialogHandleKeydownEvent ({ keyCode }) {
    if (keyCode === 27 && dialog && dialog.open) {
      const URI = window.location.toString().substring(0, window.location.toString().indexOf('#'))
      window.history.replaceState({}, document.title, URI)
    }
  }

  function dialogMiniCarrousel (position) {
    const all = [].slice.call(dialog.querySelectorAll('nav a'))
    const index = Number(position)

    all.forEach(item => {
      const duration = `transition-duration: ${
        300 + ((Math.abs(prevImage - index) / 1.5) * 20)
      }ms;`
      const transform = `transform: translateX(${index === 0 ? '' : '-'}${index === 0 ? 0 : index * 100}%);`
      item.setAttribute('style', `${transform} ${duration}`)
    })
  }

  function getImagesFromGallery ({ src }) {
    dialog?.querySelector('figure img').setAttribute('src', src)
    dialog?.showModal()
  }

  function _handlerModalCarousel () {
    const { hash } = window.location
    const _HASH = hash.split('#')[1] || '/'

    if (Number(_HASH) > -1 && dialog) {
      const target = dialog.querySelectorAll('footer img')?.[_HASH]

      if (target && dialog) {
        dialog.querySelector('figure img').setAttribute('src', target.src)
        prevImage = Number(_HASH)
        !dialog.open && dialog.showModal()
        !wasClicked && dialogMiniCarrousel(prevImage)
      }
    } else if (isNaN(Number(_HASH)) && dialog && dialog.open) {
      dialog.close()
    }
  }

  function initCarousel () {
    _handlerModalCarousel()
  }

  return {
    dialogMiniCarrousel,
    getImagesFromGallery,
    initCarousel
  }
}

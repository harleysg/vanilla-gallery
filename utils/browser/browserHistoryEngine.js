const ISetLocation = { path: '', data: {}, title: '' }

const BrowserHistory = {
  back: () => window.history.back(),

  forward: () => window.history.forward(),

  go: (n) => window.history.go(n),

  setLocation: ({ path, data, title } = ISetLocation) => {
    const { history, location, document } = window
    const { pathname, hash } = location

    if (pathname + hash !== path) {
      history.pushState(
        data,
        `${document.title} - ${title}`,
        path
      )
    }
  },

  updateLocation: ({ path, data, title } = ISetLocation) => {
    const { history, location, document } = window

    if (location.pathname !== path) {
      history.replaceState(
        data,
        `${document.title} - ${title}`,
        path
      )
    }
  },

  updateTitle: ({ title } = { title: '' }) => {
    window.document.title = title
  },

  getHashes: (pos = 1) => {
    const { hash } = window.location
    const _HASH = hash.split('#')[pos] || '/'

    return {
      value: Number(_HASH) || 0,
      hash: _HASH
    }
  }
}

export { BrowserHistory }

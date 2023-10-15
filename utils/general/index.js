import { loadImage } from '../dom'

function confirmTypeOf (value) {
  return {
    isArray: Array.isArray(value),
    isString: typeof value === 'string',
    isObject: typeof value === 'object',
    isObjectStringified: _isObjectStringified(value),
    isNull: Object.is(value, null),
    isUndefined: Object.is(value, undefined),
    isNotValid: !value || Object.is(value, null) || Object.is(value, undefined)
  }
}

function _isObjectStringified (params) {
  if (typeof params === 'string' && params.length > 0) {
    return !!params.charAt(0).match(/[{|/\\[/]/g) && !!params.charAt(params.length - 1).match(/[}|/\]/]/g)
  }
  return false
}

async function getImages (listOfImages = []) {
  // TODO: Save on localStorage to avoid duplicated calls | loads
  const _Proimses = await Promise.allSettled(listOfImages.map(row => loadImage(row.src || '')))

  return _Proimses
    .filter(x => x.status === 'fulfilled')
    .map(x => x.value)
}

export {
  confirmTypeOf,
  getImages
}

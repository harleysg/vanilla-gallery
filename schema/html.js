import { z } from 'zod'

export const HTMLValidator = ($element, comparison) => {
  const COMPARISON = comparison ?? (globalThis.HTMLElement || globalThis.Element)
  const ERROR_MSG = `${$element} isn't a valid HTML element`

  return z.instanceof(COMPARISON, { message: ERROR_MSG }).safeParseAsync($element)
}

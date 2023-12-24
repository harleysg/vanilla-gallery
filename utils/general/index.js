export function confirmTypeOf (value) {
  const validations = {
    isArray: Array.isArray(value),
    isString: typeof value === 'string',
    isObject: typeof value === 'object',
    isObjectStringified: _isObjectStringified(value),
    isNull: Object.is(value, null),
    isUndefined: Object.is(value, undefined),
    isNumber: typeof value === 'number',
    isBigInt: _isBigInt(value)
  }
  const result = Object.keys(validations).map(k => validations[k])

  return {
    ...validations,
    result
  }
}

function _isBigInt (value) {
  return !Object.is(value, null) &&
    !Object.is(value, undefined) &&
    typeof value !== 'object' &&
    typeof value !== 'string' &&
    typeof value !== 'number' &&
    BigInt(value) === value
}

function _isObjectStringified (value) {
  if (typeof value === 'string' && value.length > 0) {
    return !!value.charAt(0).match(/[{|/\\[/]/g) && !!value.charAt(value.length - 1).match(/[}|/\]/]/g)
  }

  return false
}

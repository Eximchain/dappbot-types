/**
 * Helper validation function; provide an object and
 * a list of string keys, returns true if all are
 * present.
 *
 * @param body
 * @param propertyNames
 */
export function bodyHas(body:any, propertyNames:string[]){
  if (!isObject(body)) return false;
  return propertyNames.every(name => body.hasOwnProperty(name))
}

/**
 * Helper validation function like `bodyHas`, except
 * it also enforces that all of the property values
 * are also strings.
 * @param body
 * @param propertyNames
 */
export function bodyHasStrings(body:any, propertyNames:string[]){
  if (!isObject(body)) return false;
  return propertyNames.every(prop => {
    return body.hasOwnProperty(prop) && isString(body[prop])
  })
}

/**
 * Type guard; returns `true` if `maybe` is a string,
 * `false` otherwise.
 * @param maybe
 */
export function isString(maybe:any): maybe is string {
  return typeof maybe === 'string';
}

/**
 * Unofficial type guard, returns true if
 * `typeof maybe === 'object'`, false otherwise.
 * Does not declare itself as enforcing type
 * `'object'` because then TS thinks the output
 * can't have any other properties.
 * @param maybe
 */
export function isObject(maybe:any) {
  return typeof maybe === 'object';
}
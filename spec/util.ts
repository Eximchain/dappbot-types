/**
 * Helper validation function; provide an object and
 * a list of string keys, returns true if all are
 * present & not null.
 * 
 * @param body 
 * @param propertyNames 
 */
export function bodyHas(body:any, propertyNames:string[]){
  return bodyHasValOn(body, propertyNames, (val:any) => val !== null)
}

/**
 * Helper validation function which checks whether
 * all `propertyNames` are present on `body` and
 * then checks that their values are strings.
 * 
 * @param body 
 * @param propertyNames 
 */
export function bodyHasStrings(body:any, propertyNames:string[]){
  return bodyHasValOn(body, propertyNames, isString);
}

/**
 * Very flexible validation function which accepts
 * an object to check, properties to inspect, and a
 * test function to see if the value is correct.
 * Only returns `true` if `isVal(body.prop)` returns
 * `true` for every `prop in propertyNames`.
 * @param body
 * @param propertyNames 
 * @param isVal 
 */
export function bodyHasValOn(body:any, propertyNames:string[], isVal:(maybe:any)=>boolean) {
  if (!isObject(body)) return false;
  return propertyNames.every(prop => {
    return body.hasOwnProperty(prop) && isVal(body[prop])
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
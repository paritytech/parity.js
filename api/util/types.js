const HEXDIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

export function isArray (test) {
  return Object.prototype.toString.call(test) === '[object Array]';
}

export function isError (test) {
  return Object.prototype.toString.call(test) === '[object Error]';
}

export function isFunction (test) {
  return Object.prototype.toString.call(test) === '[object Function]';
}

export function isHex (_test) {
  if (!isString(_test)) {
    return false;
  }

  if (_test.substr(0, 2) === '0x') {
    return isHex(_test.slice(2));
  }

  const test = _test.toLowerCase();
  let hex = true;

  for (let idx = 0; hex && idx < test.length; idx++) {
    hex = HEXDIGITS.includes(test[idx]);
  }

  return hex;
}

export function isObject (test) {
  return Object.prototype.toString.call(test) === '[object Object]';
}

export function isString (test) {
  return Object.prototype.toString.call(test) === '[object String]';
}

export function isInstanceOf (test, clazz) {
  return test instanceof clazz;
}

export class Dummy {
  constructor (value) {
    this.value = value;
  }

  toString () {
    return this.value;
  }

  toJSON () {
    return `##${this.value}##`;
  }

  static fixJSON (json) {
    return json.replace(/"##([^#]+)##"/g, '$1');
  }

  static isDummy (obj) {
    return obj instanceof Dummy;
  }

  static stringifyJSON (any) {
    return Dummy.fixJSON(JSON.stringify(any));
  }
}

// Enrich the API spec by additional markdown-formatted preamble
export function withPreamble (preamble, spec) {
  Object.defineProperty(spec, '_preamble', {
    value: preamble.trim(),
    enumerable: false
  });

  return spec;
}

// Enrich any example value with a comment to print in the docs
export function withComment (example, comment) {
  const constructor = example == null ? null : example.constructor;

  if (constructor === Object || constructor === Array) {
    Object.defineProperty(example, '_comment', {
      value: comment,
      enumerable: false
    });

    return example;
  }

  // Convert primitives
  return new PrimitiveWithComment(example, comment);
}

// Turn a decimal number into a hexadecimal string with comment to it's original value
export function fromDecimal (decimal) {
  return withComment(`0x${decimal.toString(16)}`, decimal.toString());
}

// Internal helper
class PrimitiveWithComment {
  constructor (primitive, comment) {
    this._value = primitive;
    this._comment = comment;
  }

  toJSON () {
    return this._value;
  }
}

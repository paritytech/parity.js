'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

var dictionary = require('./wordlist.json');

function isDefined(str) {
  return str !== 'undefined';
}

// Adapted from https://github.com/tonyg/js-scrypt
// js-scrypt is written by Tony Garnock-Jones tonygarnockjones@gmail.com and is licensed under the 2-clause BSD license:
function secureRandomBytes(count) {
  if (!isDefined(typeof Uint8Array === 'undefined' ? 'undefined' : _typeof(Uint8Array))) {
    return null;
  }

  var bs = new Uint8Array(count);
  var self = isDefined(typeof window === 'undefined' ? 'undefined' : _typeof(window)) ? window : isDefined(typeof global === 'undefined' ? 'undefined' : _typeof(global)) ? global : this;

  if (isDefined(_typeof(self.crypto))) {
    if (isDefined(_typeof(self.crypto.getRandomValues))) {
      self.crypto.getRandomValues(bs);
      return bs;
    }
  }

  if (isDefined(_typeof(self.msCrypto))) {
    if (isDefined(_typeof(self.msCrypto.getRandomValues))) {
      self.msCrypto.getRandomValues(bs);
      return bs;
    }
  }

  return null;
}

function randomBytes(length) {
  var random = secureRandomBytes(length);
  if (random) {
    return random;
  }

  // Fallback if secure randomness is not available
  var buf = isDefined(typeof Buffer === 'undefined' ? 'undefined' : _typeof(Buffer)) ? Buffer.alloc(length) : Array(length);

  for (var i = 0; i < length; i++) {
    buf[i] = Math.random() * 255;
  }

  return buf;
}

function randomNumber(max) {
  // Use 24 bits to avoid the integer becoming signed via bitshifts
  var rand = randomBytes(3);

  var integer = rand[0] << 16 | rand[1] << 8 | rand[2];

  // floor to integer value via bitor 0
  return integer / 0xFFFFFF * max | 0;
}

function randomWord() {
  // TODO mh: use better entropy
  var index = randomNumber(dictionary.length);

  return dictionary[index];
}

function randomPhrase(length) {
  var words = [];

  while (length--) {
    words.push(randomWord());
  }

  return words.join(' ');
}

module.exports = {
  randomBytes: randomBytes,
  randomNumber: randomNumber,
  randomWord: randomWord,
  randomPhrase: randomPhrase };
'use strict';var _chai = require('chai');
var _ = require('./');var _2 = _interopRequireDefault(_);
var _format = require('./format');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/paramType/format', function () {
  describe('fromParamType', function () {
    it('errors on invalid types', function () {
      (0, _chai.expect)(function () {return (0, _format.fromParamType)({ type: 'noMatch' });}).to.throw(/noMatch/);
    });

    describe('simple types', function () {
      it('converts address to address', function () {
        var pt = new _2.default('address');

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('address');
      });

      it('converts bool to bool', function () {
        var pt = new _2.default('bool');

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('bool');
      });

      it('converts bytes to bytes', function () {
        var pt = new _2.default('bytes');

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('bytes');
      });

      it('converts string to string', function () {
        var pt = new _2.default('string');

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('string');
      });
    });

    describe('length types', function () {
      it('converts int32 to int32', function () {
        var pt = new _2.default('int', null, 32);

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('int32');
      });

      it('converts uint64 to int64', function () {
        var pt = new _2.default('uint', null, 64);

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('uint64');
      });

      it('converts fixedBytes8 to bytes8', function () {
        var pt = new _2.default('fixedBytes', null, 8);

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('bytes8');
      });
    });

    describe('arrays', function () {
      it('converts string[2] to string[2]', function () {
        var pt = new _2.default('fixedArray', new _2.default('string'), 2);

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('string[2]');
      });

      it('converts bool[] to bool[]', function () {
        var pt = new _2.default('array', new _2.default('bool'));

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('bool[]');
      });

      it('converts bool[][2] to bool[][2]', function () {
        var pt = new _2.default('fixedArray', new _2.default('array', new _2.default('bool')), 2);

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('bool[][2]');
      });

      it('converts bool[2][] to bool[2][]', function () {
        var pt = new _2.default('array', new _2.default('fixedArray', new _2.default('bool'), 2));

        (0, _chai.expect)((0, _format.fromParamType)(pt)).to.equal('bool[2][]');
      });
    });
  });

  describe('toParamType', function () {
    it('errors on invalid types', function () {
      (0, _chai.expect)(function () {return (0, _format.toParamType)('noMatch');}).to.throw(/noMatch/);
    });

    describe('simple mapping', function () {
      it('converts address to address', function () {
        var pt = (0, _format.toParamType)('address');

        (0, _chai.expect)(pt.type).to.equal('address');
      });

      it('converts bool to bool', function () {
        var pt = (0, _format.toParamType)('bool');

        (0, _chai.expect)(pt.type).to.equal('bool');
      });

      it('converts bytes to bytes', function () {
        var pt = (0, _format.toParamType)('bytes');

        (0, _chai.expect)(pt.type).to.equal('bytes');
      });

      it('converts string to string', function () {
        var pt = (0, _format.toParamType)('string');

        (0, _chai.expect)(pt.type).to.equal('string');
      });
    });

    describe('number', function () {
      it('converts int to int256', function () {
        var pt = (0, _format.toParamType)('int');

        (0, _chai.expect)(pt.type).to.equal('int');
        (0, _chai.expect)(pt.length).to.equal(256);
      });

      it('converts uint to uint256', function () {
        var pt = (0, _format.toParamType)('uint');

        (0, _chai.expect)(pt.type).to.equal('uint');
        (0, _chai.expect)(pt.length).to.equal(256);
      });
    });

    describe('sized types', function () {
      it('converts int32 to int32', function () {
        var pt = (0, _format.toParamType)('int32');

        (0, _chai.expect)(pt.type).to.equal('int');
        (0, _chai.expect)(pt.length).to.equal(32);
      });

      it('converts uint16 to uint16', function () {
        var pt = (0, _format.toParamType)('uint32');

        (0, _chai.expect)(pt.type).to.equal('uint');
        (0, _chai.expect)(pt.length).to.equal(32);
      });

      it('converts bytes8 to fixedBytes8', function () {
        var pt = (0, _format.toParamType)('bytes8');

        (0, _chai.expect)(pt.type).to.equal('fixedBytes');
        (0, _chai.expect)(pt.length).to.equal(8);
      });
    });

    describe('arrays', function () {
      describe('fixed arrays', function () {
        it('creates fixed array', function () {
          var pt = (0, _format.toParamType)('bytes[8]');

          (0, _chai.expect)(pt.type).to.equal('fixedArray');
          (0, _chai.expect)(pt.subtype.type).to.equal('bytes');
          (0, _chai.expect)(pt.length).to.equal(8);
        });

        it('creates fixed arrays of fixed arrays', function () {
          var pt = (0, _format.toParamType)('bytes[45][3]');

          (0, _chai.expect)(pt.type).to.equal('fixedArray');
          (0, _chai.expect)(pt.length).to.equal(3);
          (0, _chai.expect)(pt.subtype.type).to.equal('fixedArray');
          (0, _chai.expect)(pt.subtype.length).to.equal(45);
          (0, _chai.expect)(pt.subtype.subtype.type).to.equal('bytes');
        });
      });

      describe('dynamic arrays', function () {
        it('creates a dynamic array', function () {
          var pt = (0, _format.toParamType)('bytes[]');

          (0, _chai.expect)(pt.type).to.equal('array');
          (0, _chai.expect)(pt.subtype.type).to.equal('bytes');
        });

        it('creates a dynamic array of dynamic arrays', function () {
          var pt = (0, _format.toParamType)('bool[][]');

          (0, _chai.expect)(pt.type).to.equal('array');
          (0, _chai.expect)(pt.subtype.type).to.equal('array');
          (0, _chai.expect)(pt.subtype.subtype.type).to.equal('bool');
        });
      });

      describe('mixed arrays', function () {
        it('creates a fixed dynamic array', function () {
          var pt = (0, _format.toParamType)('bool[][3]');

          (0, _chai.expect)(pt.type).to.equal('fixedArray');
          (0, _chai.expect)(pt.length).to.equal(3);
          (0, _chai.expect)(pt.subtype.type).to.equal('array');
          (0, _chai.expect)(pt.subtype.subtype.type).to.equal('bool');
        });

        it('creates a dynamic fixed array', function () {
          var pt = (0, _format.toParamType)('bool[3][]');

          (0, _chai.expect)(pt.type).to.equal('array');
          (0, _chai.expect)(pt.subtype.type).to.equal('fixedArray');
          (0, _chai.expect)(pt.subtype.length).to.equal(3);
          (0, _chai.expect)(pt.subtype.subtype.type).to.equal('bool');
        });
      });
    });
  });
});
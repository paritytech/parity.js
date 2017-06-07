'use strict';var _chai = require('chai');
var _transactions = require('./transactions');var _transactions2 = _interopRequireDefault(_transactions);
var _error = require('../transport/error');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var DUMMY_TX = 'dummy';

describe('api/local/transactions', function () {
  beforeEach(function () {
    _transactions2.default.reset();
  });

  it('can store transactions', function () {
    var id1 = _transactions2.default.add(DUMMY_TX);
    var id2 = _transactions2.default.add(DUMMY_TX);
    var requests = _transactions2.default.requestsToConfirm();

    (0, _chai.expect)(id1).to.be.equal('0x1');
    (0, _chai.expect)(id2).to.be.equal('0x2');
    (0, _chai.expect)(requests.length).to.be.equal(2);
    (0, _chai.expect)(requests[0].id).to.be.equal(id1);
    (0, _chai.expect)(requests[1].id).to.be.equal(id2);
    (0, _chai.expect)(requests[0].payload.sendTransaction).to.be.equal(DUMMY_TX);
    (0, _chai.expect)(requests[1].payload.sendTransaction).to.be.equal(DUMMY_TX);
  });

  it('can confirm transactions', function () {
    var id1 = _transactions2.default.add(DUMMY_TX);
    var id2 = _transactions2.default.add(DUMMY_TX);

    var hash1 = '0x1111111111111111111111111111111111111111';
    var hash2 = '0x2222222222222222222222222222222222222222';

    _transactions2.default.confirm(id1, hash1);
    _transactions2.default.confirm(id2, hash2);

    var requests = _transactions2.default.requestsToConfirm();

    (0, _chai.expect)(requests.length).to.be.equal(0);
    (0, _chai.expect)(_transactions2.default.hash(id1)).to.be.equal(hash1);
    (0, _chai.expect)(_transactions2.default.hash(id2)).to.be.equal(hash2);
  });

  it('can reject transactions', function () {
    var id = _transactions2.default.add(DUMMY_TX);

    _transactions2.default.reject(id);

    var requests = _transactions2.default.requestsToConfirm();

    (0, _chai.expect)(requests.length).to.be.equal(0);
    (0, _chai.expect)(function () {return _transactions2.default.hash(id);}).to.throw(_error.TransportError);
  });

  it('can lock and confirm transactions', function () {
    var id = _transactions2.default.add(DUMMY_TX);
    var hash = '0x1111111111111111111111111111111111111111';

    _transactions2.default.lock(id);

    var requests = _transactions2.default.requestsToConfirm();

    (0, _chai.expect)(requests.length).to.be.equal(0);
    (0, _chai.expect)(_transactions2.default.get(id)).to.be.null;
    (0, _chai.expect)(_transactions2.default.hash(id)).to.be.null;

    _transactions2.default.confirm(id, hash);

    (0, _chai.expect)(_transactions2.default.hash(id)).to.be.equal(hash);
  });
});
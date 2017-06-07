'use strict';var _chai = require('chai');
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);

var _personal = require('./personal');var _personal2 = _interopRequireDefault(_personal);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var TEST_DEFAULT = '0xfa64203C044691aA57251aF95f4b48d85eC00Dd5';
var TEST_INFO = _defineProperty({},
TEST_DEFAULT, {
  name: 'test' });


var TEST_LIST = [TEST_DEFAULT];

function stubApi(_accounts, info) {
  var _calls = {
    accountsInfo: [],
    allAccountsInfo: [],
    listAccounts: [],
    defaultAccount: [] };


  return {
    _calls: _calls,
    transport: {
      isConnected: true },

    parity: {
      accountsInfo: function accountsInfo() {
        var stub = _sinon2.default.stub().resolves(info || TEST_INFO)();

        _calls.accountsInfo.push(stub);
        return stub;
      },
      allAccountsInfo: function allAccountsInfo() {
        var stub = _sinon2.default.stub().resolves(info || TEST_INFO)();

        _calls.allAccountsInfo.push(stub);
        return stub;
      },
      defaultAccount: function defaultAccount() {
        var stub = _sinon2.default.stub().resolves(Object.keys(info || TEST_INFO)[0])();

        _calls.defaultAccount.push(stub);
        return stub;
      } },

    eth: {
      accounts: function accounts() {
        var stub = _sinon2.default.stub().resolves(_accounts || TEST_LIST)();

        _calls.listAccounts.push(stub);
        return stub;
      } } };


}

function stubLogging() {
  return {
    subscribe: _sinon2.default.stub() };

}

describe('api/subscriptions/personal', function () {
  var api = void 0;
  var cb = void 0;
  var logging = void 0;
  var personal = void 0;

  beforeEach(function () {
    api = stubApi();
    cb = _sinon2.default.stub();
    logging = stubLogging();
    personal = new _personal2.default(cb, api, logging);
  });

  describe('constructor', function () {
    it('starts the instance in a stopped state', function () {
      (0, _chai.expect)(personal.isStarted).to.be.false;
    });
  });

  describe('start', function () {
    describe('info available', function () {
      beforeEach(function () {
        return personal.start();
      });

      it('sets the started status', function () {
        (0, _chai.expect)(personal.isStarted).to.be.true;
      });

      it('calls parity_accountsInfo', function () {
        (0, _chai.expect)(api._calls.accountsInfo.length).to.be.ok;
      });

      it('calls parity_allAccountsInfo', function () {
        (0, _chai.expect)(api._calls.allAccountsInfo.length).to.be.ok;
      });

      it('calls eth_accounts', function () {
        (0, _chai.expect)(api._calls.listAccounts.length).to.be.ok;
      });

      it('updates subscribers', function () {
        (0, _chai.expect)(cb).to.have.been.calledWith('parity_defaultAccount', null, TEST_DEFAULT);
        (0, _chai.expect)(cb).to.have.been.calledWith('eth_accounts', null, TEST_LIST);
        (0, _chai.expect)(cb).to.have.been.calledWith('parity_accountsInfo', null, TEST_INFO);
        (0, _chai.expect)(cb).to.have.been.calledWith('parity_allAccountsInfo', null, TEST_INFO);
      });
    });

    describe('info not available', function () {
      beforeEach(function () {
        api = stubApi([], {});
        personal = new _personal2.default(cb, api, logging);
        return personal.start();
      });

      it('sets the started status', function () {
        (0, _chai.expect)(personal.isStarted).to.be.true;
      });

      it('calls parity_defaultAccount', function () {
        (0, _chai.expect)(api._calls.defaultAccount.length).to.be.ok;
      });

      it('calls personal_accountsInfo', function () {
        (0, _chai.expect)(api._calls.accountsInfo.length).to.be.ok;
      });

      it('calls personal_allAccountsInfo', function () {
        (0, _chai.expect)(api._calls.allAccountsInfo.length).to.be.ok;
      });

      it('calls personal_listAccounts', function () {
        (0, _chai.expect)(api._calls.listAccounts.length).to.be.ok;
      });
    });
  });
});
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =















function (rpc) {
  var _subscriptions = [];
  var _pollStatusIntervalId = null;
  var _subscriptionPromises = null;

  function getCoins() {
    return rpc.get('getcoins');
  }

  function getMarketInfo(pair) {
    return rpc.get('marketinfo/' + pair);
  }

  function getRpc() {
    return rpc;
  }

  function getStatus(depositAddress) {
    return rpc.get('txStat/' + depositAddress);
  }

  function shift(toAddress, returnAddress, pair) {
    return rpc.post('shift', {
      pair: pair,
      returnAddress: returnAddress,
      withdrawal: toAddress });

  }

  function subscribe(depositAddress, callback) {
    if (!depositAddress || !callback) {
      return;
    }

    var index = _subscriptions.length;

    _subscriptions.push({
      callback: callback,
      depositAddress: depositAddress,
      index: index });


    if (_pollStatusIntervalId === null) {
      _pollStatusIntervalId = setInterval(_pollStatus, 2000);
    }
  }

  function unsubscribe(depositAddress) {
    _subscriptions = _subscriptions.filter(function (sub) {return sub.depositAddress !== depositAddress;});

    if (_subscriptions.length === 0) {
      clearInterval(_pollStatusIntervalId);
      _pollStatusIntervalId = null;
    }

    return true;
  }

  function _getSubscriptionStatus(subscription) {
    if (!subscription) {
      return Promise.resolve();
    }

    return getStatus(subscription.depositAddress).
    then(function (result) {
      switch (result.status) {
        case 'no_deposits':
        case 'received':
          subscription.callback(null, result);
          return true;

        case 'complete':
          subscription.callback(null, result);
          unsubscribe(subscription.depositAddress);
          return true;

        case 'failed':
          subscription.callback({
            message: result.status.error,
            fatal: true });

          unsubscribe(subscription.depositAddress);
          return true;
        default:
          return true;}

    }).
    catch(function () {
      return true;
    });
  }

  function _pollStatus() {
    _subscriptionPromises = Promise.all(_subscriptions.map(_getSubscriptionStatus));
  }

  function _getSubscriptions() {
    return _subscriptions;
  }

  function _getSubscriptionPromises() {
    return _subscriptionPromises;
  }

  function _isPolling() {
    return _pollStatusIntervalId !== null;
  }

  return {
    _getSubscriptions: _getSubscriptions,
    _getSubscriptionPromises: _getSubscriptionPromises,
    _isPolling: _isPolling,
    getCoins: getCoins,
    getMarketInfo: getMarketInfo,
    getRpc: getRpc,
    getStatus: getStatus,
    shift: shift,
    subscribe: subscribe,
    unsubscribe: unsubscribe };

};module.exports = exports['default']; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var Address = {};

var Data = {};

var Hash = {};

var Integer = {};

var Quantity = {};

var BlockNumber = {
  print: '`Quantity` | `Tag`' };


var CallRequest = {
  print: '`Object`',

  details: {
    from: {
      type: Address,
      desc: '20 Bytes - The address the transaction is send from.',
      optional: true },

    to: {
      type: Address,
      desc: '(optional when creating new contract) 20 Bytes - The address the transaction is directed to.' },

    gas: {
      type: Quantity,
      desc: 'Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.',
      optional: true },

    gasPrice: {
      type: Quantity,
      desc: 'Integer of the gas price used for each paid gas.',
      optional: true },

    value: {
      type: Quantity,
      desc: 'Integer of the value sent with this transaction.',
      optional: true },

    data: {
      type: Data,
      desc: '4 byte hash of the method signature followed by encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI).',
      optional: true } } };




var TransactionRequest = {
  print: '`Object`',

  details: {
    from: {
      type: Address,
      desc: '20 Bytes - The address the transaction is send from.' },

    to: {
      type: Address,
      desc: '20 Bytes - The address the transaction is directed to.',
      optional: true },

    gas: {
      type: Quantity,
      desc: 'Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.',
      optional: true },

    gasPrice: {
      type: Quantity,
      desc: 'Integer of the gas price used for each paid gas.',
      optional: true },

    value: {
      type: Quantity,
      desc: 'Integer of the value sent with this transaction.',
      optional: true },

    data: {
      type: Data,
      desc: '4 byte hash of the method signature followed by encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI).',
      optional: true },

    nonce: {
      type: Quantity,
      desc: 'Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.',
      optional: true },

    condition: {
      type: Object,
      desc: 'Conditional submission of the transaction. Can be either an integer block number `{ block: 1 }` or UTC timestamp (in seconds) `{ time: 1491290692 }` or `null`.',
      optional: true } } };




var TransactionResponse = {
  print: '`Object`',

  details: {
    hash: {
      type: Hash,
      desc: '32 Bytes - hash of the transaction.' },

    nonce: {
      type: Quantity,
      desc: 'The number of transactions made by the sender prior to this one.' },

    blockHash: {
      type: Hash,
      desc: '32 Bytes - hash of the block where this transaction was in. `null` when its pending.' },

    blockNumber: {
      type: BlockNumber,
      desc: 'Block number where this transaction was in. `null` when its pending.' },

    transactionIndex: {
      type: Quantity,
      desc: 'Integer of the transactions index position in the block. `null` when its pending.' },

    from: {
      type: Address,
      desc: '20 Bytes - address of the sender.' },

    to: {
      type: Address,
      desc: '20 Bytes - address of the receiver. `null` when its a contract creation transaction.' },

    value: {
      type: Quantity,
      desc: 'Value transferred in Wei.' },

    gasPrice: {
      type: Quantity,
      desc: 'Gas price provided by the sender in Wei.' },

    gas: {
      type: Quantity,
      desc: 'Gas provided by the sender.' },

    input: {
      type: Data,
      desc: 'The data send along with the transaction.' },

    creates: {
      type: Address,
      optional: true,
      desc: 'Address of a created contract or `null`.' },

    raw: {
      type: Data,
      desc: 'Raw transaction data.' },

    publicKey: {
      type: Data,
      desc: 'Public key of the signer.' },

    networkId: {
      type: Quantity,
      desc: 'The network id of the transaction, if any.' },

    standardV: {
      type: Quantity,
      desc: 'The standardized V field of the signature (0 or 1).' },

    v: {
      type: Quantity,
      desc: 'The V field of the signature.' },

    r: {
      type: Quantity,
      desc: 'The R field of the signature.' },

    s: {
      type: Quantity,
      desc: 'The S field of the signature.' },

    condition: {
      type: Object,
      optional: true,
      desc: 'Conditional submission, Block number in `block` or timestamp in `time` or `null`.' } } };exports.




Address = Address;exports.Data = Data;exports.Hash = Hash;exports.Integer = Integer;exports.Quantity = Quantity;exports.BlockNumber = BlockNumber;exports.CallRequest = CallRequest;exports.TransactionRequest = TransactionRequest;exports.TransactionResponse = TransactionResponse;
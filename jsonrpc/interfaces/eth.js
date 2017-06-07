'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _types = require('../types');
var _helpers = require('../helpers');exports.default =

(0, _helpers.withPreamble)('\n\n## The default block parameter\n\nThe following methods have an optional extra `defaultBlock` parameter:\n\n- [eth_estimateGas](#eth_estimategas)\n- [eth_getBalance](#eth_getbalance)\n- [eth_getCode](#eth_getcode)\n- [eth_getTransactionCount](#eth_gettransactioncount)\n- [eth_getStorageAt](#eth_getstorageat)\n- [eth_call](#eth_call)\n\nWhen requests are made that act on the state of Ethereum, the last parameter determines the height of the block.\n\nThe following options are possible for the `defaultBlock` parameter:\n\n- `Quantity`/`Integer` - an integer block number;\n- `String "earliest"` - for the earliest/genesis block;\n- `String "latest"` - for the latest mined block;\n- `String "pending"` - for the pending state/transactions.\n\n',





















{
  accounts: {
    desc: 'Returns a list of addresses owned by client.',
    params: [],
    returns: {
      type: Array,
      desc: '20 Bytes - addresses owned by the client.',
      example: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1'] } },



  blockNumber: {
    desc: 'Returns the number of most recent block.',
    params: [],
    returns: {
      type: _types.Quantity,
      desc: 'integer of the current block number the client is on.',
      example: (0, _helpers.fromDecimal)(1207) } },



  call: {
    desc: 'Executes a new message call immediately without creating a transaction on the block chain.',
    params: [
    {
      type: _types.CallRequest,
      desc: 'The transaction call object.',
      format: 'inputCallFormatter',
      example: {
        from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
        to: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
        value: (0, _helpers.fromDecimal)(100000) } },


    {
      type: _types.BlockNumber,
      desc: 'Integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter).',
      format: 'inputDefaultBlockNumberFormatter',
      optional: true }],


    returns: {
      type: _types.Data,
      desc: 'the return value of executed contract.',
      example: '0x' } },



  coinbase: {
    desc: 'Returns the client coinbase address.',
    params: [],
    returns: {
      type: _types.Address,
      desc: 'The current coinbase address.',
      example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1' } },



  estimateGas: {
    desc: 'Makes a call or transaction, which won\'t be added to the blockchain and returns the used gas, which can be used for estimating the used gas.',
    params: [
    {
      type: _types.CallRequest,
      desc: 'Same as [eth_call](#eth_call) parameters, except that all properties are optional.',
      format: 'inputCallFormatter',
      example: new _helpers.Dummy('{ ... }') },

    {
      type: _types.BlockNumber,
      desc: 'Integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter).',
      format: 'inputDefaultBlockNumberFormatter',
      optional: true }],


    returns: {
      type: _types.Quantity,
      desc: 'The amount of gas used.',
      format: 'utils.toDecimal',
      example: (0, _helpers.fromDecimal)(21000) } },



  fetchQueuedTransactions: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  flush: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  gasPrice: {
    desc: 'Returns the current price per gas in wei.',
    params: [],
    returns: {
      type: _types.Quantity,
      desc: 'integer of the current gas price in wei.',
      example: (0, _helpers.fromDecimal)(10000000000000) } },



  getBalance: {
    desc: 'Returns the balance of the account of given address.',
    params: [
    {
      type: _types.Address,
      desc: '20 Bytes - address to check for balance.',
      format: 'inputAddressFormatter',
      example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1' },

    {
      type: _types.BlockNumber,
      desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter).',
      format: 'inputDefaultBlockNumberFormatter',
      optional: true }],


    returns: {
      type: _types.Quantity,
      desc: 'integer of the current balance in wei.',
      format: 'outputBigNumberFormatter',
      example: '0x0234c8a3397aab58' } },



  getBlockByHash: {
    desc: 'Returns information about a block by hash.',
    params: [
    {
      type: _types.Hash,
      desc: 'Hash of a block.',
      example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331' },

    {
      type: Boolean,
      desc: 'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.',
      example: true }],


    returns: {
      type: Object,
      desc: 'A block object, or `null` when no block was found.',
      details: {
        number: {
          type: _types.Quantity,
          desc: 'The block number. `null` when its pending block' },

        hash: {
          type: _types.Hash,
          desc: '32 Bytes - hash of the block. `null` when its pending block' },

        parentHash: {
          type: _types.Hash,
          desc: '32 Bytes - hash of the parent block' },

        nonce: {
          type: _types.Data,
          desc: '8 Bytes - hash of the generated proof-of-work. `null` when its pending block' },

        sha3Uncles: {
          type: _types.Data,
          desc: '32 Bytes - SHA3 of the uncles data in the block' },

        logsBloom: {
          type: _types.Data,
          desc: '256 Bytes - the bloom filter for the logs of the block. `null` when its pending block' },

        transactionsRoot: {
          type: _types.Data,
          desc: '32 Bytes - the root of the transaction trie of the block' },

        stateRoot: {
          type: _types.Data,
          desc: '32 Bytes - the root of the final state trie of the block' },

        receiptsRoot: {
          type: _types.Data, desc: '32 Bytes - the root of the receipts trie of the block' },

        miner: {
          type: _types.Address,
          desc: '20 Bytes - the address of the beneficiary to whom the mining rewards were given' },

        difficulty: {
          type: _types.Quantity,
          desc: 'integer of the difficulty for this block' },

        totalDifficulty: {
          type: _types.Quantity,
          desc: 'integer of the total difficulty of the chain until this block' },

        extraData: {
          type: _types.Data,
          desc: 'the \'extra data\' field of this block' },

        size: {
          type: _types.Quantity,
          desc: 'integer the size of this block in bytes' },

        gasLimit: {
          type: _types.Quantity,
          desc: 'the maximum gas allowed in this block' },

        gasUsed: {
          type: _types.Quantity,
          desc: 'the total used gas by all transactions in this block' },

        timestamp: {
          type: _types.Quantity,
          desc: 'the unix timestamp for when the block was collated' },

        transactions: {
          type: Array,
          desc: 'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter' },

        uncles: {
          type: Array,
          desc: 'Array of uncle hashes' } },


      example: {
        number: (0, _helpers.fromDecimal)(436),
        hash: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
        parentHash: '0x9646252be9520f6e71339a8df9c55e4d7619deeb018d2a3f2d21fc165dde5eb5',
        sealFields: ['0xe04d296d2460cfb8472af2c5fd05b5a214109c25688d3704aed5484f9a7792f2', '0x0000000000000042'],
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logsBloom: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
        transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        stateRoot: '0xd5855eb08b3387c0af375e9cdb6acfc05eb8f519e419b874b6ff2ffda7ed1dff',
        miner: '0x4e65fda2159562a496f9f3522f89122a3088497a',
        difficulty: (0, _helpers.fromDecimal)(163591),
        totalDifficulty: (0, _helpers.fromDecimal)(163591),
        extraData: '0x0000000000000000000000000000000000000000000000000000000000000000',
        size: (0, _helpers.fromDecimal)(163591),
        gasLimit: (0, _helpers.fromDecimal)(653145),
        minGasPrice: (0, _helpers.fromDecimal)(653145),
        gasUsed: (0, _helpers.fromDecimal)(653145),
        timestamp: (0, _helpers.fromDecimal)(1424182926),
        transactions: [new _helpers.Dummy('{ ... }, { ... }, ...')],
        uncles: ['0x1606e5...', '0xd5145a9...'] } } },




  getBlockByNumber: {
    desc: 'Returns information about a block by block number.',
    params: [
    {
      type: _types.BlockNumber,
      desc: 'integer of a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter).',
      example: (0, _helpers.fromDecimal)(436) },

    {
      type: Boolean,
      desc: 'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.',
      example: true }],


    returns: 'See [eth_getBlockByHash](#eth_getblockbyhash)' },


  getBlockTransactionCountByHash: {
    desc: 'Returns the number of transactions in a block from a block matching the given block hash.',
    params: [
    {
      type: _types.Hash,
      desc: '32 Bytes - hash of a block.',
      example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238' }],


    returns: {
      type: _types.Quantity,
      desc: 'integer of the number of transactions in this block.',
      example: (0, _helpers.fromDecimal)(11) } },



  getBlockTransactionCountByNumber: {
    desc: 'Returns the number of transactions in a block from a block matching the given block number.',
    params: [
    {
      type: _types.BlockNumber,
      desc: 'integer of a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter).',
      example: (0, _helpers.fromDecimal)(232) }],


    returns: {
      type: _types.Quantity,
      desc: 'integer of the number of transactions in this block.',
      example: (0, _helpers.fromDecimal)(10) } },



  getCode: {
    desc: 'Returns code at a given address.',
    params: [
    {
      type: _types.Address,
      desc: '20 Bytes - address.',
      format: 'inputAddressFormatter',
      example: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b' },

    {
      type: _types.BlockNumber,
      desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter).',
      format: 'inputDefaultBlockNumberFormatter',
      example: (0, _helpers.fromDecimal)(2) }],


    returns: {
      type: _types.Data,
      desc: 'the code from the given address.',
      example: '0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056' } },



  getFilterChanges: {
    desc: 'Polling method for a filter, which returns an array of logs which occurred since last poll.',
    params: [
    {
      type: _types.Quantity,
      desc: 'The filter id.',
      example: (0, _helpers.fromDecimal)(22) }],


    returns: {
      type: Array,
      desc: 'Array of log objects, or an empty array if nothing has changed since last poll.',
      example: [
      {
        logIndex: (0, _helpers.fromDecimal)(1),
        blockNumber: (0, _helpers.fromDecimal)(436),
        blockHash: '0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d',
        transactionHash: '0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf',
        transactionIndex: (0, _helpers.fromDecimal)(0),
        address: '0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d',
        data: '0x0000000000000000000000000000000000000000000000000000000000000000',
        topics: ['0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5'] },

      new _helpers.Dummy('...')] } },




  getFilterChangesEx: {
    nodoc: 'Not present in Rust code', // https://github.com/ethereum/wiki/wiki/Proposal:-Reversion-Notification
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  getFilterLogs: {
    desc: 'Returns an array of all logs matching filter with given id.',
    params: [
    {
      type: _types.Quantity,
      desc: 'The filter id.',
      example: (0, _helpers.fromDecimal)(22) }],


    returns: 'See [eth_getFilterChanges](#eth_getfilterchanges)' },


  getFilterLogsEx: {
    nodoc: 'Not present in Rust code', // https://github.com/ethereum/wiki/wiki/Proposal:-Reversion-Notification
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  getLogs: {
    desc: 'Returns an array of all logs matching a given filter object.',
    params: [
    {
      type: Object,
      desc: 'The filter object, see [eth_newFilter parameters](#eth_newfilter).',
      example: {
        topics: ['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b'] } }],



    returns: 'See [eth_getFilterChanges](#eth_getfilterchanges)' },


  getLogsEx: {
    nodoc: 'Not present in Rust code', // https://github.com/ethereum/wiki/wiki/Proposal:-Reversion-Notification
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  getStorageAt: {
    desc: 'Returns the value from a storage position at a given address.',
    params: [
    {
      type: _types.Address,
      desc: '20 Bytes - address of the storage.',
      example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1' },

    {
      type: _types.Quantity,
      desc: 'integer of the position in the storage.',
      format: 'utils.toHex',
      example: (0, _helpers.fromDecimal)(0) },

    {
      type: _types.BlockNumber,
      desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter).',
      format: 'inputDefaultBlockNumberFormatter',
      example: (0, _helpers.fromDecimal)(2),
      optional: true }],


    returns: {
      type: _types.Data,
      desc: 'the value at this storage position.',
      example: '0x0000000000000000000000000000000000000000000000000000000000000003' } },



  getTransactionByHash: {
    desc: 'Returns the information about a transaction requested by transaction hash.',
    params: [
    {
      type: _types.Hash,
      desc: '32 Bytes - hash of a transaction.',
      example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238' }],


    returns: {
      type: Object,
      desc: 'A transaction object, or `null` when no transaction was found:',
      format: 'outputTransactionFormatter',
      details: {
        hash: {
          type: _types.Hash,
          desc: '32 Bytes - hash of the transaction.' },

        nonce: {
          type: _types.Quantity,
          desc: 'the number of transactions made by the sender prior to this one.' },

        blockHash: {
          type: _types.Hash,
          desc: '32 Bytes - hash of the block where this transaction was in. `null` when its pending.' },

        blockNumber: {
          type: _types.BlockNumber,
          desc: 'block number where this transaction was in. `null` when its pending.' },

        transactionIndex: {
          type: _types.Quantity,
          desc: 'integer of the transactions index position in the block. `null` when its pending.' },

        from: {
          type: _types.Address,
          desc: '20 Bytes - address of the sender.' },

        to: {
          type: _types.Address,
          desc: '20 Bytes - address of the receiver. `null` when its a contract creation transaction.' },

        value: {
          type: _types.Quantity,
          desc: 'value transferred in Wei.' },

        gasPrice: {
          type: _types.Quantity,
          desc: 'gas price provided by the sender in Wei.' },

        gas: {
          type: _types.Quantity,
          desc: 'gas provided by the sender.' },

        input: {
          type: _types.Data,
          desc: 'the data send along with the transaction.' } },


      example: {
        hash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
        nonce: (0, _helpers.fromDecimal)(0),
        blockHash: '0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b',
        blockNumber: (0, _helpers.fromDecimal)(5599),
        transactionIndex: (0, _helpers.fromDecimal)(1),
        from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
        to: '0x853f43d8a49eeb85d32cf465507dd71d507100c1',
        value: (0, _helpers.fromDecimal)(520464),
        gas: (0, _helpers.fromDecimal)(520464),
        gasPrice: '0x09184e72a000',
        input: '0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360' } } },




  getTransactionByBlockHashAndIndex: {
    desc: 'Returns information about a transaction by block hash and transaction index position.',
    params: [
    {
      type: _types.Hash,
      desc: 'hash of a block.',
      example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331' },

    {
      type: _types.Quantity,
      desc: 'integer of the transaction index position.',
      example: (0, _helpers.fromDecimal)(0) }],


    returns: 'See [eth_getBlockByHash](#eth_gettransactionbyhash)' },


  getTransactionByBlockNumberAndIndex: {
    desc: 'Returns information about a transaction by block number and transaction index position.',
    params: [
    {
      type: _types.BlockNumber,
      desc: 'a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter).',
      example: (0, _helpers.fromDecimal)(668) },

    {
      type: _types.Quantity,
      desc: 'The transaction index position.',
      example: (0, _helpers.fromDecimal)(0) }],


    returns: 'See [eth_getBlockByHash](#eth_gettransactionbyhash)' },


  getTransactionCount: {
    desc: 'Returns the number of transactions *sent* from an address.',
    params: [
    {
      type: _types.Address,
      desc: '20 Bytes - address.',
      example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1' },

    {
      type: _types.BlockNumber,
      desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter).',
      format: 'inputDefaultBlockNumberFormatter',
      optional: true }],


    returns: {
      type: _types.Quantity,
      desc: 'integer of the number of transactions send from this address.',
      format: 'utils.toDecimal',
      example: (0, _helpers.fromDecimal)(1) } },



  getTransactionReceipt: {
    desc: 'Returns the receipt of a transaction by transaction hash.\n\n**Note** That the receipt is available even for pending transactions.',
    params: [
    {
      type: _types.Hash,
      desc: 'hash of a transaction.',
      example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238' }],


    returns: {
      type: Object,
      desc: 'A transaction receipt object, or `null` when no receipt was found:',
      format: 'outputTransactionReceiptFormatter',
      details: {
        transactionHash: {
          type: _types.Hash,
          desc: '32 Bytes - hash of the transaction.' },

        transactionIndex: {
          type: _types.Quantity,
          desc: 'integer of the transactions index position in the block.' },

        blockHash: {
          type: _types.Hash,
          desc: '32 Bytes - hash of the block where this transaction was in.' },

        blockNumber: {
          type: _types.BlockNumber,
          desc: 'block number where this transaction was in.' },

        cumulativeGasUsed: {
          type: _types.Quantity,
          desc: 'The total amount of gas used when this transaction was executed in the block.' },

        gasUsed: {
          type: _types.Quantity,
          desc: 'The amount of gas used by this specific transaction alone.' },

        contractAddress: {
          type: _types.Address,
          desc: '20 Bytes - The contract address created, if the transaction was a contract creation, otherwise `null`.' },

        logs: {
          type: Array,
          desc: 'Array of log objects, which this transaction generated.' } },


      example: {
        transactionHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
        transactionIndex: (0, _helpers.fromDecimal)(1),
        blockNumber: (0, _helpers.fromDecimal)(11),
        blockHash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
        cumulativeGasUsed: (0, _helpers.fromDecimal)(13244),
        gasUsed: (0, _helpers.fromDecimal)(1244),
        contractAddress: (0, _helpers.withComment)('0xb60e8dd61c5d32be8058bb8eb970870f07233155', 'or null, if none was created'),
        logs: (0, _helpers.withComment)([new _helpers.Dummy('{ ... }, { ... }, ...]')], 'logs as returned by eth_getFilterLogs, etc.') } } },




  getUncleByBlockHashAndIndex: {
    desc: 'Returns information about a uncle of a block by hash and uncle index position.\n\n**Note:** An uncle doesn\'t contain individual transactions.',
    params: [
    {
      type: _types.Hash,
      desc: 'Hash of a block.',
      example: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b' },

    {
      type: _types.Quantity,
      desc: 'The uncle\'s index position.',
      example: (0, _helpers.fromDecimal)(0) }],


    returns: 'See [eth_getBlockByHash](#eth_getblockbyhash)' },


  getUncleByBlockNumberAndIndex: {
    desc: 'Returns information about a uncle of a block by number and uncle index position.\n\n**Note:** An uncle doesn\'t contain individual transactions.',
    params: [
    {
      type: _types.BlockNumber,
      desc: 'a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter).',
      example: (0, _helpers.fromDecimal)(668) },

    {
      type: _types.Quantity,
      desc: 'The uncle\'s index position.',
      example: (0, _helpers.fromDecimal)(0) }],


    returns: 'See [eth_getBlockByHash](#eth_getblockbyhash)' },


  getUncleCountByBlockHash: {
    desc: 'Returns the number of uncles in a block from a block matching the given block hash.',
    params: [
    {
      type: _types.Hash,
      desc: '32 Bytes - hash of a block.',
      example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238' }],


    returns: {
      type: _types.Quantity,
      desc: 'integer of the number of uncles in this block.',
      example: (0, _helpers.fromDecimal)(0) } },



  getUncleCountByBlockNumber: {
    desc: 'Returns the number of uncles in a block from a block matching the given block number.',
    params: [
    {
      type: _types.BlockNumber,
      desc: 'integer of a block number, or the string \'latest\', \'earliest\' or \'pending\', see the [default block parameter](#the-default-block-parameter).',
      example: (0, _helpers.fromDecimal)(232) }],


    returns: {
      type: _types.Quantity,
      desc: 'integer of the number of uncles in this block.',
      example: (0, _helpers.fromDecimal)(1) } },



  getWork: {
    desc: 'Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").',
    params: [],
    returns: {
      type: Array,
      desc: 'Array with the following properties:\n  - `Data`, 32 Bytes - current block header pow-hash.\n  - `Data`, 32 Bytes - the seed hash used for the DAG.\n  - `Data`, 32 Bytes - the boundary condition ("target"), 2^256 / difficulty.\n  - `Quantity`, the current block number.',
      example: [
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      '0x5EED00000000000000000000000000005EED0000000000000000000000000000',
      '0xd1ff1c01710000000000000000000000d1ff1c01710000000000000000000000',
      (0, _helpers.fromDecimal)(1)] } },




  hashrate: {
    desc: 'Returns the number of hashes per second that the node is mining with.',
    params: [],
    returns: {
      type: _types.Quantity,
      desc: 'number of hashes per second.',
      example: (0, _helpers.fromDecimal)(906) } },



  inspectTransaction: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  mining: {
    desc: 'Returns `true` if client is actively mining new blocks.',
    params: [],
    returns: {
      type: Boolean,
      desc: '`true` of the client is mining, otherwise `false`.',
      example: true } },



  newBlockFilter: {
    desc: 'Creates a filter in the node, to notify when a new block arrives.\nTo check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).',
    params: [],
    returns: {
      type: _types.Quantity,
      desc: 'A filter id.',
      example: (0, _helpers.fromDecimal)(1) } },



  newFilter: {
    desc: 'Creates a filter object, based on filter options, to notify when the state changes (logs).\n           To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).\n\n           ##### A note on specifying topic filters:\n           Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:\n           * `[]` "anything"\n           * `[A]` "A in first position (and anything after)"\n           * `[null, B]` "anything in first position AND B in second position (and anything after)"\n           * `[A, B]` "A in first position AND B in second position (and anything after)"\n           * `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"'.








    replace(/^[^\S\n]+/gm, ''),
    params: [{
      type: Object,
      desc: 'The filter options:',
      details: {
        fromBlock: {
          type: _types.BlockNumber,
          desc: 'Integer block number, or `\'latest\'` for the last mined block or `\'pending\'`, `\'earliest\'` for not yet mined transactions.',
          optional: true,
          default: 'latest' },

        toBlock: {
          type: _types.BlockNumber,
          desc: 'Integer block number, or `\'latest\'` for the last mined block or `\'pending\'`, `\'earliest\'` for not yet mined transactions.',
          optional: true,
          default: 'latest' },

        address: {
          type: _types.Address,
          desc: '20 Bytes - Contract address or a list of addresses from which logs should originate.',
          optional: true },

        topics: {
          type: Array,
          desc: 'Array of 32 Bytes `Data` topics. Topics are order-dependent. It\'s possible to pass in `null` to match any topic, or a subarray of multiple topics of which one should be matching.',
          optional: true },

        limit: {
          type: _types.Quantity,
          desc: 'The maximum number of entries to retrieve (latest first).',
          optional: true } },


      example: {
        fromBlock: (0, _helpers.fromDecimal)(1),
        toBlock: (0, _helpers.fromDecimal)(2),
        address: '0x8888f1f195afa192cfee860698584c030f4c9db1',
        topics: (0, _helpers.withComment)([
        (0, _helpers.withComment)('0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b', 'This topic in first position'),
        (0, _helpers.withComment)(null, 'Any topic in second position'),
        (0, _helpers.withComment)(['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b', '0x000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc'], 'Either topic of the two in third position')],
        '... and anything after') } }],


    returns: {
      type: _types.Quantity,
      desc: 'The filter id.',
      example: (0, _helpers.fromDecimal)(1) } },



  newFilterEx: {
    nodoc: 'Not present in Rust code', // https://github.com/ethereum/wiki/wiki/Proposal:-Reversion-Notification
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  newPendingTransactionFilter: {
    desc: 'Creates a filter in the node, to notify when new pending transactions arrive.\n\nTo check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).',
    params: [],
    returns: {
      type: _types.Quantity,
      desc: 'A filter id.',
      example: (0, _helpers.fromDecimal)(1) } },



  notePassword: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  pendingTransactions: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  protocolVersion: {
    desc: 'Returns the current ethereum protocol version.',
    params: [],
    returns: {
      type: String,
      desc: 'The current ethereum protocol version.',
      example: (0, _helpers.fromDecimal)(99) } },



  register: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } },



  sendRawTransaction: {
    desc: 'Creates new message call transaction or a contract creation for signed transactions.\n\n**Note:** `eth_submitTransaction` is an alias of this method.',
    params: [
    {
      type: _types.Data,
      desc: 'The signed transaction data.',
      example: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675' }],


    returns: {
      type: _types.Hash,
      desc: '32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available\n\nUse [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.',
      example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331' } },



  sendTransaction: {
    desc: 'Creates new message call transaction or a contract creation, if the data field contains code.',
    params: [
    {
      type: _types.TransactionRequest,
      desc: 'The transaction object.',
      format: 'inputTransactionFormatter',
      example: {
        from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
        to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
        gas: (0, _helpers.fromDecimal)(30400),
        gasPrice: (0, _helpers.fromDecimal)(10000000000000),
        value: (0, _helpers.fromDecimal)(2441406250),
        data: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675' } }],



    returns: {
      type: _types.Hash,
      desc: '32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.\n\nUse [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.',
      example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331' } },



  sign: {
    desc: 'The sign method calculates an Ethereum specific signature with: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.',
    params: [
    {
      type: _types.Address,
      desc: '20 Bytes - address.',
      format: 'inputAddressFormatter',
      example: '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826' },

    {
      type: _types.Data,
      desc: 'Data which hash to sign.',
      example: (0, _helpers.withComment)('0x5363686f6f6c627573', 'Schoolbus') }],


    returns: {
      type: _types.Data,
      desc: 'Signed data.',
      example: '0xb1092cb5b23c2aa55e5b5787729c6be812509376de99a52bea2b41e5a5f8601c5641e74d01e4493c17bf1ef8b179c49362b2c721222128d58422a539310c6ecd1b' } },



  signTransaction: {
    desc: 'Signs transactions without dispatching it to the network. It can be later submitted using [eth_sendRawTransaction](#eth_sendrawtransaction).',
    params: [
    {
      type: _types.TransactionRequest,
      desc: 'Transaction object, see [eth_sendTransaction](#eth_sendTransaction).',
      format: 'inputCallFormatter',
      example: new _helpers.Dummy('{ ... }') }],


    returns: {
      type: Object,
      desc: 'Signed transaction and it\'s details:',
      details: {
        raw: {
          type: _types.Data,
          desc: 'The signed, RLP encoded transaction.' },

        tx: {
          type: Object,
          desc: 'Transaction object:',
          details: {
            hash: {
              type: _types.Hash,
              desc: '32 Bytes - hash of the transaction.' },

            nonce: {
              type: _types.Quantity,
              desc: 'the number of transactions made by the sender prior to this one.' },

            blockHash: {
              type: _types.Hash,
              desc: '32 Bytes - hash of the block where this transaction was in. `null` when its pending.' },

            blockNumber: {
              type: _types.BlockNumber,
              desc: 'block number where this transaction was in. `null` when its pending.' },

            transactionIndex: {
              type: _types.Quantity,
              desc: 'integer of the transactions index position in the block. `null` when its pending.' },

            from: {
              type: _types.Address,
              desc: '20 Bytes - address of the sender.' },

            to: {
              type: _types.Address,
              desc: '20 Bytes - address of the receiver. `null` when its a contract creation transaction.' },

            value: {
              type: _types.Quantity,
              desc: 'value transferred in Wei.' },

            gasPrice: {
              type: _types.Quantity,
              desc: 'gas price provided by the sender in Wei.' },

            gas: {
              type: _types.Quantity,
              desc: 'gas provided by the sender.' },

            input: {
              type: _types.Data,
              desc: 'the data send along with the transaction.' } } } },




      example: {
        raw: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
        tx: {
          hash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
          nonce: (0, _helpers.fromDecimal)(0),
          blockHash: '0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b',
          blockNumber: (0, _helpers.fromDecimal)(5599),
          transactionIndex: (0, _helpers.fromDecimal)(1),
          from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
          to: '0x853f43d8a49eeb85d32cf465507dd71d507100c1',
          value: (0, _helpers.fromDecimal)(520464),
          gas: (0, _helpers.fromDecimal)(520464),
          gasPrice: '0x09184e72a000',
          input: '0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360' } } } },





  submitWork: {
    desc: 'Used for submitting a proof-of-work solution.',
    params: [
    {
      type: _types.Data,
      desc: '8 Bytes - The nonce found (64 bits).',
      example: '0x0000000000000001' },

    {
      type: _types.Data,
      desc: '32 Bytes - The header\'s pow-hash (256 bits)',
      example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },

    {
      type: _types.Data,
      desc: '32 Bytes - The mix digest (256 bits).',
      example: '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000' }],


    returns: {
      type: Boolean,
      desc: '`true` if the provided solution is valid, otherwise `false`.',
      example: true } },



  submitHashrate: {
    desc: 'Used for submitting mining hashrate.',
    params: [
    {
      type: _types.Data,
      desc: 'a hexadecimal string representation (32 bytes) of the hash rate.',
      example: '0x0000000000000000000000000000000000000000000000000000000000500000' },

    {
      type: _types.Data,
      desc: 'A random hexadecimal(32 bytes) ID identifying the client.',
      example: '0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c' }],


    returns: {
      type: Boolean,
      desc: '`true` if submitting went through succesfully and `false` otherwise.',
      example: true } },



  syncing: {
    desc: 'Returns an object with data about the sync status or `false`.',
    params: [],
    returns: {
      type: Object,
      desc: 'An object with sync status data or `FALSE`, when not syncing.',
      format: 'outputSyncingFormatter',
      details: {
        startingBlock: {
          type: _types.Quantity,
          desc: 'The block at which the import started (will only be reset, after the sync reached this head)' },

        currentBlock: {
          type: _types.Quantity,
          desc: 'The current block, same as eth_blockNumber' },

        highestBlock: {
          type: _types.Quantity,
          desc: 'The estimated highest block' },

        blockGap: {
          type: Array,
          desc: 'Array of "first", "last", such that [first, last) are all missing from the chain' },

        warpChunksAmount: {
          type: _types.Quantity,
          desc: 'Total amount of snapshot chunks' },

        warpChunksProcessed: {
          type: _types.Quantity,
          desc: 'Total amount of snapshot chunks processed' } },


      example: (0, _helpers.withComment)({
        startingBlock: (0, _helpers.fromDecimal)(900),
        currentBlock: (0, _helpers.fromDecimal)(902),
        highestBlock: (0, _helpers.fromDecimal)(1108) },
      'Or `false` when not syncing') } },



  uninstallFilter: {
    desc: 'Uninstalls a filter with given id. Should always be called when watch is no longer needed.\nAdditonally Filters timeout when they aren\'t requested with [eth_getFilterChanges](#eth_getfilterchanges) for a period of time.',
    params: [
    {
      type: _types.Quantity,
      desc: 'The filter id.',
      example: (0, _helpers.fromDecimal)(11) }],


    returns: {
      type: Boolean,
      desc: '`true` if the filter was successfully uninstalled, otherwise `false`.',
      example: true } },



  unregister: {
    nodoc: 'Not present in Rust code',
    desc: '?',
    params: [
    '?'],

    returns: {
      type: Boolean,
      desc: 'whether the call was successful' } } });module.exports = exports['default'];
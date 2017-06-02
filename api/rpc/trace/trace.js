import { inBlockNumber, inData, inHex, inNumber16, inOptions, inTraceFilter, inTraceType } from '../../format/input';
import { outTraces, outTraceReplay } from '../../format/output';

export default class Trace {
  constructor (provider) {
    this._provider = provider;
  }

  block (blockNumber = 'latest') {
    return this._provider
      .send('trace_block', inBlockNumber(blockNumber))
      .then(outTraces);
  }

  call (options, blockNumber = 'latest', whatTrace = ['trace']) {
    return this._provider
      .send('trace_call', inOptions(options), inBlockNumber(blockNumber), inTraceType(whatTrace))
      .then(outTraceReplay);
  }

  filter (filterObj) {
    return this._provider
      .send('trace_filter', inTraceFilter(filterObj))
      .then(outTraces);
  }

  get (txHash, position) {
    return this._provider
      .send('trace_get', inHex(txHash), inNumber16(position))
      .then(outTraces);
  }

  rawTransaction (data, whatTrace = ['trace']) {
    return this._provider
      .send('trace_rawTransaction', inData(data), inTraceType(whatTrace))
      .then(outTraceReplay);
  }

  replayTransaction (txHash, whatTrace = ['trace']) {
    return this._provider
      .send('trace_replayTransaction', txHash, inTraceType(whatTrace))
      .then(outTraceReplay);
  }

  transaction (txHash) {
    return this._provider
      .send('trace_transaction', inHex(txHash))
      .then(outTraces);
  }
}

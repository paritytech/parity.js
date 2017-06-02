import { Quantity } from '../types';
import { fromDecimal } from '../helpers';

export default {
  listening: {
    desc: 'Returns `true` if client is actively listening for network connections.',
    params: [],
    returns: {
      type: Boolean,
      desc: '`true` when listening, otherwise `false`.',
      example: true
    }
  },

  peerCount: {
    desc: 'Returns number of peers currenly connected to the client.',
    params: [],
    returns: {
      type: Quantity,
      desc: 'Integer of the number of connected peers',
      format: 'utils.toDecimal',
      example: fromDecimal(2)
    }
  },

  version: {
    desc: 'Returns the current network protocol version.',
    params: [],
    returns: {
      type: String,
      desc: 'The current network protocol version',
      example: '8995'
    }
  }
};

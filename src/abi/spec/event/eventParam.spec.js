import EventParam from './eventParam';
import { expect } from 'chai';

describe('abi/spec/event/EventParam', () => {
  describe('constructor', () => {
    it('sets the properties', () => {
      const param = new EventParam('foo', 'uint', true);

      expect(param.name).to.equal('foo');
      expect(param.kind.type).to.equal('uint');
      expect(param.indexed).to.be.true;
    });

    it('uses defaults for indexed', () => {
      expect(new EventParam('foo', 'uint').indexed).to.be.false;
    });
  });

  describe('toEventParams', () => {
    it('maps an array of params', () => {
      const params = EventParam.toEventParams([{ name: 'foo', type: 'uint' }]);

      expect(params.length).to.equal(1);
      expect(params[0].indexed).to.be.false;
      expect(params[0].name).to.equal('foo');
      expect(params[0].kind.type).to.equal('uint');
    });
  });
});

import interfaces from './';
import * as customTypes from './types';

const allowedTypes = [Array, Boolean, Object, String].concat(Object.values(customTypes));

function verifyType (obj) {
  if (typeof obj !== 'string') {
    expect(obj).to.satisfy(() => allowedTypes.includes(obj.type));
  }
}

describe('jsonrpc/interfaces', () => {
  Object.keys(interfaces).forEach((group) => {
    describe(group, () => {
      Object.keys(interfaces[group]).forEach((name) => {
        const method = interfaces[group][name];

        describe(name, () => {
          it('has the correct interface', () => {
            expect(method.desc).to.be.a('string');
            expect(method.params).to.be.an('array');
            expect(method.returns).to.satisfy((returns) => {
              return typeof returns === 'string' || typeof returns === 'object';
            });

            method.params.forEach(verifyType);
            verifyType(method.returns);
          });
        });
      });
    });
  });
});

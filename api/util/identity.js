import blockies from 'blockies';

// jsdom doesn't have all the browser features, blockies fail
const TEST_ENV = process.env.NODE_ENV === 'test';

export function createIdentityImg (address, scale = 8) {
  return TEST_ENV
    ? 'test-createIdentityImg'
    : blockies({
      seed: (address || '').toLowerCase(),
      size: 8,
      scale
    }).toDataURL();
}

import nock from 'nock';

export const TEST_HTTP_URL = 'http://localhost:6688';

export function mockHttp (requests) {
  nock.cleanAll();
  let scope = nock(TEST_HTTP_URL);

  requests.forEach((request, index) => {
    scope = scope
      .post('/')
      .reply(request.code || 200, (uri, body) => {
        if (body.method !== request.method) {
          return {
            error: `Invalid method ${body.method}, expected ${request.method}`
          };
        }

        scope.body = scope.body || {};
        scope.body[request.method] = body;

        return request.reply;
      });
  });

  return scope;
}

const assert = require('assert');
const app = require('../../src/app');

describe('\'link\' service', () => {
  it('registered the service', () => {
    const service = app.service('link');

    assert.ok(service, 'Registered the service');
  });
});

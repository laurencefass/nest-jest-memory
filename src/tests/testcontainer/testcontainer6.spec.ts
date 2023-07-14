/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import { postgres } from './setup-db';
import { mockServer } from './setup-mockserver';
import { createMemoryLeak, garbageCollect, mb, trace } from '../leak-utils';

const v8 = require('v8');

console.log = () => {};

describe('Testcontainers', () => {
  const pg = postgres();
  const ms = mockServer();

  beforeAll(() => {
    console.time('afterAll');
    jest.setTimeout(60000);
    trace('beforeAll', () =>
      console.log(
        `total available: ${mb(
          v8.getHeapStatistics().total_available_size,
        )} Mb`,
      ),
    );
  });

  beforeEach(() => {
    console.time('afterEach');
    trace(`before: ${expect.getState().currentTestName}`);
  });

  afterEach(() => {
    console.timeEnd('afterEach');
    trace(`after: ${expect.getState().currentTestName}`);
  });

  afterAll(() => {
    trace('afterAll');
    pg.tearDownPostgres();
    ms.tearDownMockServer();
    console.timeEnd('afterAll');
    garbageCollect();
  });

  it('mockServer', async () => {
    console.log('mockServer');
    await ms.setupMockServer();
    createMemoryLeak();
    expect(1).toBe(1);
  }, 60000);

  it('postgres', async () => {
    console.log('postgres');
    await pg.setupTestPostgres();
    createMemoryLeak();
    expect(1).toBe(1);
  }, 60000);
});

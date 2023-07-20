/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import { postgres } from './setup-db';
import { mockServer } from './setup-mockserver';
import {
  createMemoryLeak,
  freeMemoryLeak,
  garbageCollect,
  mb,
  trace,
} from '../leak-utils';
import { mockServerClient } from 'mockserver-client';
import fetch from 'node-fetch';

const { Network } = require('testcontainers');
const v8 = require('v8');

console.log = console.timeEnd = () => {};

jest.setTimeout(60000);

describe('Testcontainers', () => {
  let network, pg, ms, msClient;

  beforeAll(async () => {
    network = await new Network().start();
    pg = postgres();
    ms = mockServer();

    console.time('total test duration');

    trace('beforeAll', () =>
      console.log(
        `total heap available: ${mb(
          v8.getHeapStatistics().total_available_size,
        )} Mb`,
      ),
    );
  });

  afterAll(async () => {
    console.log('stopping network');
    network?.stop();
    garbageCollect();
    console.timeEnd('total test duration');
  });

  beforeEach(() => {
    console.time('test duration');
    trace(`before: ${expect.getState().currentTestName}`);
  });

  afterEach(() => {
    console.timeEnd('test duration');
    trace(`after: ${expect.getState().currentTestName}`);
  });

  fit('mockServer', async () => {
    await ms.setupMockServer(network);
    await ms.tearDownMockServer();
  }, 60000);

  fit('postgres', async () => {
    await pg.setupTestPostgres(network);
    await pg.tearDownPostgres();
  }, 60000);

  it('check globals importing correctly', () => {
    console.log('global.helloWorld', global.helloWorld);
    expect(global.helloWorld).toBe('Hello world');
  });

  it('mockServer mock response', async () => {
    await ms.setupMockServer(network);
    msClient = mockServerClient(ms.host(), ms.port());
    await msClient.mockSimpleResponse('/somePath', { name: 'value' }, 203);
    const url = `http://${ms.host()}:${ms.port()}/somepath`;
    console.log('url', url);
    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    await ms.tearDownMockServer();
  }, 60000);

  it('createMemoryLeak', async () => {
    createMemoryLeak(10);
  });

  it('freeMemoryLeak', async () => {
    freeMemoryLeak();
  });
});

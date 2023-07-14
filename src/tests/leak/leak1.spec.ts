import {
  mb,
  leakedArray,
  createMemoryLeak,
  freeMemoryLeak,
  trace,
  garbageCollect,
} from '../leak-utils';

beforeAll(() => {
  trace('beforeAll');
});

afterAll(() => {
  trace('afterAll');
});

beforeEach(() => {
  trace(`before: ${expect.getState().currentTestName}`);
});

afterEach(() => {
  trace(`after: ${expect.getState().currentTestName}`);
});

const allocation = 10;
test('create leak 1', () => {
  createMemoryLeak(allocation);
  expect(leakedArray.length).toBe(allocation * 1024 * 1024);
});

test('create leak 2', () => {
  createMemoryLeak(allocation);
  expect(leakedArray.length).toBe(2 * allocation * 1024 * 1024);
  expect(process.memoryUsage().heapTotal).toBeGreaterThan(
    allocation * 1024 * 1024,
  );
});

test('free leak', () => {
  createMemoryLeak(allocation);
  expect(leakedArray.length).toBe(3 * allocation * 1024 * 1024);
  freeMemoryLeak();
  expect(process.memoryUsage().heapTotal).toBeGreaterThan(
    3 * allocation * 1024 * 1024,
  );
  expect(leakedArray.length).toBe(0);
});

test('free leak and garbage collect', () => {
  createMemoryLeak(allocation);
  expect(leakedArray.length).toBe(allocation * 1024 * 1024);
  freeMemoryLeak();
  garbageCollect();
  expect(process.memoryUsage().heapTotal).toBeLessThan(200 * 1024 * 1024);
  expect(leakedArray.length).toBe(0);
});

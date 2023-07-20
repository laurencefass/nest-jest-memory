import { StartedTestContainer } from 'testcontainers';

const globalMockserver = global.mockserver as StartedTestContainer;
test('check global setup', () => {
  expect(1).toBe(1);
  expect(global.mockservers.length).toBe(10);
  expect(globalMockserver).toBeDefined();
});

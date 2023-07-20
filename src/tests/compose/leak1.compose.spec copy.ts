import { dockerComposeDown, dockerComposeUp } from './docker-compose';

it('runDockerCompose', async () => {
  const { mockserver, postgres } = await dockerComposeUp();
  console.log(mockserver, postgres);
  await dockerComposeDown();
  expect(1).toBe(1);
}, 60000);

import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  Wait,
} from 'testcontainers';

let environment;

export async function dockerComposeDown() {
  await (environment as StartedDockerComposeEnvironment).down({
    timeout: 10000,
  });
}

export async function dockerComposeUp() {
  const composeFilePath = './src/tests/compose';
  const composeFiles = 'docker-compose.yml';

  environment = await new DockerComposeEnvironment(
    composeFilePath,
    composeFiles,
  )
    .withWaitStrategy('mockserver', Wait.forLogMessage(/started on port/))
    .withWaitStrategy(
      'postgres',
      Wait.forLogMessage(/ready to accept connections/),
    )
    .up();

  const mockserver = environment.getContainer('mockserver');
  const postgres = environment.getContainer('postgres');

  return {
    mockserver,
    postgres,
  };
}

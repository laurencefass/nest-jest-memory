import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
function mockServer() {
  const containerPort = 8076;
  let container: StartedTestContainer | undefined = undefined;
  async function setupMockServer() {
    container = await new GenericContainer('mockserver/mockserver')
      .withExposedPorts(containerPort)
      .withEnv('MOCKSERVER_SERVER_PORT', `${containerPort}`)
      .withEnv('MOCKSERVER_LIVENESS_HTTP_GET_PATH', '/status')
      .withWaitStrategy(Wait.forLogMessage(/started on port/))
      .start();
  }

  function tearDownMockServer() {
    if (!container) {
      console.log('Could not tear down mock server, container is undefined');
    }
    return container?.stop({
      timeout: 1000,
      removeVolumes: true,
    });
  }

  function port() {
    if (!container) {
      throw new Error('MockServer is not started');
    }
    return container.getMappedPort(containerPort);
  }
  function host() {
    if (!container) {
      throw new Error('MockServer is not started');
    }
    return container.getHost();
  }
  return { setupMockServer, tearDownMockServer, port, host };
}

export { mockServer };

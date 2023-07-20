import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';

function mockServer() {
  const containerPort = 8076;
  let container: StartedTestContainer | undefined = undefined;

  async function setupMockServer(network) {
    container = await new GenericContainer('mockserver/mockserver')
      .withNetwork(network)
      .withExposedPorts(containerPort)
      .withEnvironment({
        MOCKSERVER_SERVER_PORT: `${containerPort}`,
        MOCKSERVER_LIVENESS_HTTP_GET_PATH: '/status',
      })
      .withWaitStrategy(Wait.forLogMessage(/started on port/))
      .start();
  }

  async function tearDownMockServer() {
    if (!container) {
      console.log('Could not tear down mock server, container is undefined');
    }
    return await container?.stop({
      timeout: 10000,
      remove: true,
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

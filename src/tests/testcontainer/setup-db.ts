import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';
function postgres() {
  let container: StartedPostgreSqlContainer | undefined = undefined;

  async function setupTestPostgres(network) {
    container = await new PostgreSqlContainer('postgres:13.4')
      .withNetwork(network)
      .withUsername('postgres')
      .withPassword('postgres')
      .withDatabase('postgres')
      .start();
  }

  async function tearDownPostgres() {
    return container?.stop({
      timeout: 10000,
      remove: true,
      removeVolumes: true,
    });
  }

  function port() {
    return container?.getPort();
  }
  function host() {
    return container?.getHost();
  }
  return { setupTestPostgres, tearDownPostgres, port, host };
}

export { postgres };

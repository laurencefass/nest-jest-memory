import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';
function postgres() {
  let container: StartedPostgreSqlContainer | undefined = undefined;
  async function setupTestPostgres() {
    container = await new PostgreSqlContainer('postgres:13.4')
      .withUsername('postgres')
      .withPassword('postgres')
      .withDatabase('postgres')
      .start();
  }

  function tearDownPostgres() {
    return container?.stop({
      timeout: 1000,
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

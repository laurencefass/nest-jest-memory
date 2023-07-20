import { StartedTestContainer } from 'testcontainers';

module.exports = async function (globalConfig, projectConfig) {
  console.log('global jest teardown');

  console.log('stopping global container');
  (global.mockserver as StartedTestContainer)?.stop();

  (global?.mockservers as StartedTestContainer[])?.forEach((server) => {
    console.log('stopping server', server.getName());
    server.stop();
  });
};

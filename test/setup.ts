import { GenericContainer } from 'testcontainers';

global.helloWorld = 'Hello world';

module.exports = async function (globalConfig, projectConfig) {
  // console.log('starting global.container');
  // global.mockserver = await new GenericContainer(
  //   'mockserver/mockserver',
  // ).start();
  // global.mockservers = [];
  // for (let i = 0; i < 10; i++) {
  //   const container = await new GenericContainer(
  //     'mockserver/mockserver',
  //   ).start();
  //   global.mockservers.push(container);
  // }
};

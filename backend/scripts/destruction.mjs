#!/usr/bin/env node
import { chalk} from 'zx';
import { runScript } from './runScript.mjs';

const DIRECTORY = 'k8s'

const DEPLOYMENTS = [
  'mongo-express',
  'mongodb-deployment'
];
const CONFIG_MAPS = [
  'mongodb-configmap'
];
const SERVICES = [
  'mongodb-service',
  'mongo-express-service'
];
const SECRETS = [
  'mongodb-secret'
];

void (async function () {
  for (const deployment of DEPLOYMENTS) runKubectlDelete('deployment', deployment);
  for (const service of SERVICES) runKubectlDelete('service', service);
  for (const configMap of CONFIG_MAPS) runKubectlDelete('configmap', configMap);
  for (const secret of SECRETS) runKubectlDelete('secret', secret);
})();

/**
 * @param {string} filename
 * @returns {Promise<void>}
 */
function runKubectlDelete (entity, name ) {
  return runScript(`kubectl delete ${entity} ${name}`)
    .catch((e) => {
      console.log(chalk.red(e));
    });
}
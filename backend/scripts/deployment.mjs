#!/usr/bin/env node
import { argv, chalk} from 'zx';
import { runScript } from './runScript.mjs';

const DIRECTORY = 'k8s'

const FILES = [
  'mongo-secret.yaml',
  'mongo-configmap.yaml',
  'mongo.yaml',
  'mongo-express.yaml',
];

void (async function () {
  for (const file of FILES) 
    runKubectlApply(path.join(DIRECTORY, file));
})();

/**
 * @param {string} filename
 * @returns {Promise<void>}
 */
function runKubectlApply (filename) {

  if (!filename) throw new Error(chalk.red(`❌ File "${filename}" not found.`));

  if(!filename.includes('yaml')) throw new Error(chalk.red(`❌ File must have 'yaml' extension.`));

  return runScript(`kubectl apply -f ${filename}`)
    .catch((e) => {
      console.log(chalk.red(e));
    });
}
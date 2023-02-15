import { exec } from "child_process";
import { chalk } from 'zx';

/**
 *
 * @param {string} script
 * @returns {Promise<void>}
 */
export function runScript (script) {
  console.log(`> ${script}`);

  return new Promise((resolve, reject) => {
    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.error(`> exec error: ${error}`);
        reject();
      }
      if (stdout)
        console.log(chalk.cyan(`> STDOUT:` + stdout));
      if (stderr)
        console.error(chalk.red(`> STDERR:` + stderr));

      resolve();
    });
  });
}

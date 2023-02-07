import { yellowBright } from 'chalk';
import { config } from 'dotenv';

type NodeEnv =
  | 'production'
  | 'test'
  | 'qa'
  | 'development';

function assertNodeEnv (env: NodeJS.ProcessEnv): env is NodeJS.ProcessEnv & { NODE_ENV: NodeEnv; } {
  return ['qa', 'production', 'development', 'test'].includes(env.NODE_ENV);
}

/** Gets environment variables from the `.env` files */
export function getEnvVariables<T extends string> (pathToEnvFile?: string): Partial<Record<T, string>> & { NODE_ENV: NodeEnv; } {
  let NODE_ENV: NodeEnv;
  let varsOfSpecifiedEnvFile: Partial<Record<T, string>> = {}; 

  if (assertNodeEnv(process.env))
    NODE_ENV = process.env.NODE_ENV;
  else {
    console.warn(yellowBright`The "NODE_ENV" set as "development" as fallback.`);
    NODE_ENV = 'development';
  }

  if (pathToEnvFile)
    varsOfSpecifiedEnvFile = {
      ...config({ path: pathToEnvFile }).parsed,
    } as Record<T, string>;

  let vars: Partial<Record<T, string>> = {};

  if (NODE_ENV !== 'production') {
    vars = {
      ...config().parsed,
      ...config({ path: '.env.local' }).parsed,
      ...varsOfSpecifiedEnvFile,
    } as Record<T, string>;

    const isNotLocal = ['qa'].includes(NODE_ENV);
    if (isNotLocal)
      vars = { ...vars, ...config({ path: `.env.${NODE_ENV}` }).parsed };
  }

  return { ...process.env, ...vars, NODE_ENV };
}
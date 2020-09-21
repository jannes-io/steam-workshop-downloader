import sh from 'shelljs';
import { readFile } from './utils';

export const currDir = sh.pwd().stdout;
export const cacheDir = `${currDir}\\cache`
sh.mkdir('-p', cacheDir);

export const config: IConfig = JSON.parse(readFile(`${currDir}\\config.json`));
export const manifest: IManifest = JSON.parse(readFile(`${currDir}\\manifest`, false) || 'null') || {
  lastRun: 0,
};


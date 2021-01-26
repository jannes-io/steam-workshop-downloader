import sh from 'shelljs';
import path from 'path';
import { readFile } from './utils';

export const currDir = sh.pwd().stdout;
export const cacheDir = path.join(currDir, 'cache');
sh.mkdir('-p', cacheDir);

export const config: IConfig = JSON.parse(readFile(path.join(currDir, 'config.json')));
export const manifest: IManifest = JSON.parse(readFile(path.join(currDir, 'manifest'), false) || 'null') || {
  lastRun: 0,
  modList: [],
};


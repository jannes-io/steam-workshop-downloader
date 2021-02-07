import sh from 'shelljs';
import path from 'path';
import { config, cacheDir } from './config';

const [, , ...flags] = process.argv;
const SYMLINK = flags.includes('symlink');

const MOD_DIR = SYMLINK
  ? path.join(config.outDir, 'mods')
  : path.join(config.outDir, (new Date()).valueOf().toString());
const MOD_LIST = path.join(config.outDir, 'modlist');

const clearMods = () => {
  sh.rm('-rf', SYMLINK ? MOD_DIR : config.outDir);
  sh.mkdir('-p', MOD_DIR);
};

const getCacheModDir = (id: string) => path.join(cacheDir, 'steamapps', 'workshop', 'content', config.appid, id);

const copyMods = () => {
  Object.entries(config.workshopItems).forEach(([name, id]) => {
    const cacheModLocation = getCacheModDir(id);
    const modDir = path.join(MOD_DIR, name);

    if (SYMLINK) {
      sh.ln('-sf', cacheModLocation, modDir);
    } else {
      sh.cp('-r', cacheModLocation, modDir);
    }

    sh.ShellString(`${modDir};`).toEnd(MOD_LIST);
    sh.echo(`Installed mod: ${name}`);
  });
};

const moveIncludes = () => {
  Object.entries(config.includes).forEach(([parentMod, children]) => {
    const parentModId = config.workshopItems[parentMod];
    const parentModDir = getCacheModDir(parentModId);

    children.forEach((childLocation) => {
      const childPath = path.join(parentModDir, ...childLocation);
      const childName = childLocation.pop();

      if (SYMLINK) {
        sh.ln('-sf', childPath, path.join(MOD_DIR, childName));
      } else {
        sh.cp('-r', childPath, path.join(MOD_DIR, childName));
      }
      sh.echo(`Included mod: ${childName}`);
    })
  });
};

const generateModlist = () => {
  sh.touch(MOD_LIST);
  const modList = '-mod=' + sh.ls(MOD_DIR).map((name) => path.join(MOD_DIR, name)).join(';');
  sh.ShellString(modList).to(MOD_LIST);
};

const copy = () => {
  clearMods();
  copyMods();
  moveIncludes();
  generateModlist();
};

export default copy;

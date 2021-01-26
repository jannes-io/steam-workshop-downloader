import sh from 'shelljs';
import path from 'path';
import { config, cacheDir } from './config';

const now = (new Date()).valueOf();

const MOD_DIR = path.join(config.outDir, now.toString());
const MOD_LIST = path.join(config.outDir, 'modlist');

const [, , ...flags] = process.argv;
const NO_COPY = flags.includes('no-copy');

const clearMods = () => {
  sh.rm('-rf', config.outDir);
  sh.mkdir('-p', MOD_DIR);
};

const copyMods = () => {
  Object.entries(config.workshopItems).forEach(([name, id]) => {
    const modDir = path.join(MOD_DIR, name);
    sh.cp('-r', path.join(cacheDir, 'steamapps', 'workshop', 'content', config.appid, id), modDir);
    sh.ShellString(`${modDir};`).toEnd(MOD_LIST);
    sh.echo(`Installed mod: ${name}`);
  });
};

const moveIncludes = () => {
  Object.entries(config.includes).forEach(([parentMod, children]) => {
    children.forEach((childLocation) => {
      const childPath = path.join(MOD_DIR, parentMod, childLocation);
      sh.mv(childPath, MOD_DIR);
      sh.echo(`Included mod: ${childLocation}`);
    })
  });
};

const generateModlist = () => {
  sh.touch(MOD_LIST);
  let modList = '-mod=';

  if (NO_COPY) {
    const dir = path.join(cacheDir, 'steamapps', 'workshop', 'content', config.appid);
    modList += Object.values(config.workshopItems).map((workshopId) => path.join(dir, workshopId)).join(';');
    modList += ';' + Object.entries(config.includes).map(([modName, include]) => {
      const modId = config.workshopItems[modName];
      const includeDir = path.join(dir, modId);
      return include.map((includeEntry) => path.join(includeDir, includeEntry)).join(';');
    }).join(';');
  } else {
    modList += sh.ls(MOD_DIR).map((name) => path.join(MOD_DIR, name)).join(';');
  }
  sh.ShellString(modList).to(MOD_LIST);
};

const copy = () => {
  if (!NO_COPY) {
    clearMods();
    copyMods();
    moveIncludes();
  }
  generateModlist();
};

export default copy;

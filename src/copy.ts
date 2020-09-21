import sh from 'shelljs';
import { config, cacheDir } from './config';

const now = (new Date()).valueOf();

const MOD_DIR = `${config.outDir}\\${now}`
const MOD_LIST = `${config.outDir}\\modlist`;

const clearMods = () => {
  sh.rm('-rf', config.outDir);
  sh.mkdir('-p', MOD_DIR);
};

const copyMods = () => {
  Object.entries(config.workshopItems).forEach(([name, id]) => {
    const modDir = `${MOD_DIR}\\${name}`;
    sh.cp('-r', `${cacheDir}\\steamapps\\workshop\\content\\${config.appid}\\${id}`, modDir);
    sh.ShellString(`${modDir};`).toEnd(MOD_LIST);
    sh.echo(`Installed mod: ${name}`);
  });
};

const moveIncludes = () => {
  Object.entries(config.includes).forEach(([parentMod, children]) => {
    children.forEach((childLocation) => {
      sh.mv(`${MOD_DIR}\\${parentMod}\\${childLocation}`, `${MOD_DIR}`);
      sh.echo(`Included mod: ${childLocation}`);
    })
  });
};

const generateModlist = () => {
  sh.touch(MOD_LIST);

  const modList = '-mod=' + sh.ls(MOD_DIR).map((name) => `${MOD_DIR}\\${name};`).join('');
  sh.ShellString(modList).to(MOD_LIST);
};

const copy = () => {
  clearMods();
  copyMods();
  moveIncludes();
  generateModlist();
};

export default copy;

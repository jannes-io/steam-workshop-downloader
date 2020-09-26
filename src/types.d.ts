interface IWorkshopItems {
  [name: string]: string;
}

interface IIncludes {
  [name: string]: string[];
}

interface IConfig {
  username: string;
  password: string;
  steamCMD: string;
  outDir: string;
  appid: string;
  workshopItems: IWorkshopItems;
  includes: IIncludes;
}

interface IManifest {
  lastRun: number;
  modList: string[];
}

interface ISteamWorkshopItem {
  title: string;
  publishedfileid: string;
  time_updated: number;
}

interface ISteamWorkshopItemResponse {
  response: {
    publishedfiledetails: ISteamWorkshopItem[];
  }
}

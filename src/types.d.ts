type WorkshopItems = Record<string, string>;
type Includes = Record<keyof WorkshopItems, string[][]>;

interface IConfig {
  username: string;
  password: string;
  steamCMD: string;
  outDir: string;
  appid: string;
  workshopItems: WorkshopItems;
  includes: Includes;
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

# Arma 3 workshop mod downloader
This cross platform nodejs script is intended for Arma 3 server admins to simplify mod installations.

Say goodbye to manually writing your mod include list, goodbye to individual workshop download batch/sh files,
this script does it all. Run this bad boy on a schedule and always have your servers up to date!

## Prerequisites
Have [node >12](https://nodejs.org/en/) installed
and be somewhat familiar with [json](https://www.json.org/json-en.html), although these docs should be noob-proof.

## Usage
Copy or rename `example.config.json` to `config.json` and edit values to fit your needs.

Install the script dependencies by running `npm install`.

Then run `node index.js` to start downloading your selected workshop items.

## Configuration
We highly recommend running this script on an isolated steam account rather than a personal account.
You must also **either disable steam guard, or run and log in to steamcmd at least once** to cache the steam guard code.

Here you can find an example for cba & ace3
```json
{
  "username": "somefakename",
  "password": "somefakepassword",
  "steamCMD": "(C:)\\path\\to\\steamcmd(.exe)",
  "outDir": "(C:)\\path\\to\\mods",
  "appid": "107410",
  "workshopItems": {
    "@cba": "450814997",
    "@ace3": "463939057"
  },
  "includes": {
    "@ace3": [
      "optionals\\@ace_realisticdispersion",
      "optionals\\@ace_particles"
    ]
  }
}
```
|param|usage|
|---|---|
|username|Your steam username|
|password|Your steam password|
|steamCMD|Full path to steamcmd executable|
|outDir|Location to move mods to once downloaded, the modlist file will also be placed here|
|appid|Arma3 steam appid. This script could also be used for different games.|
|workshopItems|List of workshop ids with the desired output folder as key, and the id as value|
|includes|List of items that need to be moved from a mod's sub-directory to the mods root directory. See examples above.|

## Finding Steam AppIds or Workshop Ids
#### Steam AppIds
SteamDB provides an easy AppId searcher. For example for Arma 3 this would be https://steamdb.info/app/107410/.

#### Workshop item Ids
For workshop Ids, navigate to the steam workshop item you wish to include, then copy the number in the URL.

I.E.: ace3: steamcommunity.com/workshop/filedetails/?id=**463939057**

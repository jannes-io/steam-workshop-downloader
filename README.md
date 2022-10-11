# Steam Workshop Item Downloader
<p align="center">
    <img width="300" height="300" src="https://lh5.googleusercontent.com/u_m260bf8KfZbdlNwSwh_rXnE6QniyfroKI8jDawnXtoTxcI4Ctj8L1H22CNkPKxVfivZri7xswTFQKjSFLRpPrhfuFuc03K59xqix0fvJm26rC4xMQObAJMQxrCHf0kzSv3E4pF">
</p>

This cross platform nodejs script is intended for Arma 3 server admins to simplify mod installations. The script can also be used for other games.

Say goodbye to manually writing your mod include list, goodbye to individual workshop download batch/sh files,
this script does it all. Run this bad boy on a schedule and always have your servers up to date!

Originally crafted by [J.Drake](https://3rdinf.us/perscom/personnel/soldier/418-jannes-drake/) and the Corps Of Engineers in [Third Infantry Division](https://3rdinf.us).

## Features
- Automatically download Steam workshop items,
- Completely cross-platform compatible thanks to Node,
- All files are automatically lowercase for linux servers,
- Only download items that were updated since last run,
- Automatic Arma3Server command line generator,
- No bullshit with Arma3Server locking the mods, all mods save to timestamped directories,
- Includes a self-cleaner so it can be run safely on a schedule or cronjob.

## Usage
#### Prerequisites
Have [node >12](https://nodejs.org/en/) installed
and be somewhat familiar with [json](https://www.json.org/json-en.html), although these docs should be noob-proof.

#### Setup
Clone or download this repository.

Copy or rename `example.config.json` to `config.json` and edit values to fit your needs, see "Configuration" section for more info.

Open cmd, PowerShell or any terminal of your choice, navigate to where you downloaded this repository, and run the following commands:
```console
npm install
npm run build
```

#### Running
Run `npm run sync` inside of this folder to start downloading your selected workshop items.

Include the `symlink` option if you wish to create a symlink from the steamCMD folder to the target directory instead of copying (`npm run sync symlink`). This will improve performance immensely, and saves on storage space. The downside is that this will not create a timestamped directory, and therefor will overwrite the mod directory.

#### Using modlist for Arma 3 Server
Instead of having `-mod=@mod1;@mod2` as launch param, use `-par=<outDir from config.json>\modlist` 
for example: 
```
C:\Arma3\Servers\Server1\arma3server_64.exe -port=2302 -config=config\server.cfg -par=C:\Arma3\Workshop\modlist
```

## Configuration
We highly recommend running this script on an isolated steam account rather than a personal account if you plan on deploying this to a server. Your credentials will be visible to anyone that has access to this file.
You must also **either disable steam guard, or run and log in to steamcmd at least once** to cache the steam guard code. Steam also requires that you own a copy of the game to prevent pirating.

Here you can find an example for cba and ace.
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

## Troubleshooting
#### 'npm' is not recognized as internal or external command, operable program or batch file
When installing `node` it also adds both `node` and `npm` to your system's PATH variable. You must restart your shell to pick up on these changes.

- If you are using PowerShell, go to task manager, under processes find `explorer` and click `restart`.
- For all other terminals/cmd/shells restart or reload your shell.

#### Mods are not updated or still out of date
delete `/cache` and `/manifest` and re-run the script.

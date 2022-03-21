
export const batchPlay = require("photoshop").action.batchPlay;
export const fs = require("uxp").storage.localFileSystem;
export const uxp =  require('uxp');
export const action = require('photoshop').action;
export const app = require('photoshop').app;

export const saveCurrentDocAsPng_old = async () => {
    let entry = await fs.getFileForSaving("tile-rendition.png");
    document.save.png(entry, {dialogOptions: "dontDisplay"}, true);
}

/*require('photoshop').app.eventNotifier = (event, descriptor) => {
    console.log(event, JSON.stringify(descriptor, null, ' '));
 }
*/

export async function saveCurrentDocAsPng(fileName, layerOnly = false) {
    let saveFolder = await fs.getDataFolder();
    let saveFile = await saveFolder.createFile(fileName, {'overwrite':true});  
    const saveFileToken = await fs.createSessionToken(saveFile);
    try{
        return await batchPlay([
        {
            "_obj": "save",
            "as": {
                "_obj": "PNGFormat",
                "method": {
                    "_enum": "PNGMethod",
                    "_value": "quick"
                },
                "PNGInterlaceType": {
                    "_enum": "PNGInterlaceType",
                    "_value": "PNGInterlaceNone"
                },
                "PNGFilter": {
                    "_enum": "PNGFilter",
                    "_value": "PNGFilterAdaptive"
                },
                "compression": 6
            }, 
            "copy": true,
            "lowerCase": true,
            "embedProfiles": false,
            "in": {
                "_path": saveFileToken,
                "_kind": "local"
            },
            "saveStage": {
                "_enum": "saveStageType",
                "_value": "saveBegin"
            },
            "_isCommand": true,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
      ], { synchronousExecution: false });
    } catch(e){
        console.log(e);
    }
  }
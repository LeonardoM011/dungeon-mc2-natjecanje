import * as PIXI from 'pixi.js';
import { Texture } from '../objectManager/texture';

type Sheet = { path : string, texNum : number, texName : string };

export class SpriteSheetLoader {

    constructor() {
        this.loader = new PIXI.Loader();

        this.sheets = [];
    }

    public add(path : string, texNum : number, texName: string) : void {
        this.loader.add(path);
        this.sheets.push({ path: path, texNum: texNum, texName: texName });
    }

    public load(fn : Function) : void {
        this.loader.load(() => {
            let textures : Texture[][] = [];

            // Iterating through spritesheets
            this.sheets.forEach((sh : Sheet) => {
                // Getting whole sheet file
                let sheet = this.loader.resources[sh.path].spritesheet;
                
                // Disable optimization and setting scale mode
                sheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

                let tex : Texture[] = [];
                // Iterating through each texture in texsheet
                for (let i = 0; i < sh.texNum; i++) {
                    tex.push(new Texture(sheet.textures[`${sh.texName}${i}`]));
                }
            
                textures.push(tex);
            
            });

            fn(textures);
        });

    }
    
    protected loader : PIXI.Loader;
    protected sheets : Sheet[];
};
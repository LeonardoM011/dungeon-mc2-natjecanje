import { Tilemap } from '@pixi/tilemap';
import * as PIXI from 'pixi.js';
import { Mat2f } from '../math/mat';
import { Texture } from '../objectManager/texture';

type Sheet = { path : string, imageWidth : number, imageHeight : number, tileWidth : number, tileHeight : number };

// TODO REWORK ALL THIS TO USE ONLY 1 LOADER
export class SpriteSheetLoader {

    constructor() {
        this.loader = new PIXI.Loader();

        this.sheets = [];
    }

    public add(path : string, imageWidth : number, imageHeight : number, tileWidth : number, tileHeight : number) : void {
        this.loader.add(path);
        this.sheets.push({ path: path, imageWidth : imageWidth, imageHeight : imageHeight, tileWidth : tileWidth, tileHeight : tileHeight });
    }

    public load(fn : Function) : void {
        this.loader.load(() => {
            let textures : Texture[][] = [];

            // Iterate through all spritesheets
            this.sheets.forEach(sh => {
                let sheet = this.loader.resources[sh.path];
                sheet.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

                let row : Texture[] = [];
                for (let i = 0; i < sh.imageHeight / sh.tileHeight; i++) {
                    for (let j = 0; j < sh.imageWidth / sh.tileWidth; j++) {
                        row.push(new Texture(sheet.texture, new Mat2f([[j * sh.tileWidth, i * sh.tileHeight], [sh.tileWidth, sh.tileHeight]])));
                    }
                }
                textures.push(row);
            });
            

            fn(textures);
        });

    }

    protected loader : PIXI.Loader;
    protected sheets : Sheet[];
};
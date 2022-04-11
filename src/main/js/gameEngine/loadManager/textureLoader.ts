import { Tilemap } from '@pixi/tilemap';
import * as PIXI from 'pixi.js';
import { Mat2f } from '../math/mat';
import { Texture } from '../objectManager/texture';

type Sheet = { path : string, imageWidth? : number, imageHeight? : number, tileWidth? : number, tileHeight? : number };

// TODO REWORK ALL THIS TO USE ONLY 1 LOADER
export class TextureLoader {

    constructor() {
        this.loader = new PIXI.Loader();

        this.sheets = [];
    }

    public addTexture(path : string) : void {
        this.loader.add(path);
        this.sheets.push({ path: path });
    }

    public addSheet(path : string, imageWidth : number, imageHeight : number, tileWidth : number, tileHeight : number) {
        this.loader.add(path);
        this.sheets.push({ path: path, imageWidth : imageWidth, imageHeight : imageHeight, tileWidth : tileWidth, tileHeight : tileHeight });
    }

    public load(fn : Function) : void {
        this.loader.load(() => {
            let textures : Texture[][] = [];

            // Iterate through all spritesheets
            this.sheets.forEach(sh => {
                let image = this.loader.resources[sh.path].texture;
                image.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

                if (typeof sh.tileWidth !== 'undefined') {
                    textures.push(this.loadSheet(image, sh));
                } else {
                    // Put it on first place because its not a spritesheet and we only have 1 image
                    textures.push([new Texture(image)]);
                }
            });
            

            fn(textures);
        });
    }

    public after(fn : Function) : void {
        this.loader.onComplete.add(() => { fn(); });
    }

    private loadSheet(texture : PIXI.Texture, sheetInfo : Sheet) {
        let textures : Texture[] = [];

        let imageWidth = sheetInfo.imageWidth;
        let imageHeight = sheetInfo.imageHeight;
        let tileWidth = sheetInfo.tileWidth;
        let tileHeight = sheetInfo.tileHeight;

        for (let i = 0; i < imageHeight / tileHeight; i++) {
            for (let j = 0; j < imageWidth / tileWidth; j++) {
                textures.push(new Texture(texture, new Mat2f(j * tileWidth, i * tileHeight, tileWidth, tileHeight)));
            }
        }

        return textures;
    }

    private error() {

    }

    protected loader : PIXI.Loader;
    protected sheets : Sheet[];
};
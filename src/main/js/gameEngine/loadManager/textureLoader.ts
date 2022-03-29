import * as PIXI from 'pixi.js';
import { Texture } from '../objectManager/texture';

export class TextureLoader {

    constructor() {
        this.loader = new PIXI.Loader();

        this.texturePaths = [];
    }

    public add(path : string) : void {
        this.loader.add(path);
        this.texturePaths.push(path);
    }

    public load(fn : Function) : void {

        this.loader.load(() => {
            let textures : Texture[] = [];

            // Loading each added file seperately
            this.texturePaths.forEach(el => {
                // Push each texture to textures and callback
                textures.push(new Texture(this.loader.resources[el].texture));
            });

            fn(textures);
        });
        
    }

    protected loader : PIXI.Loader;
    protected texturePaths : string[];
}
import * as PIXI from 'pixi.js';

export class TextureLoader {

    constructor() {
        this.loader = new PIXI.Loader();

        this.texturePaths = [];
    }

    public add(path : string) {
        this.loader.add(path);
        this.texturePaths.push(path);
    }

    public load(fn : Function) {

        this.loader.load(() => {
            let textures : PIXI.Texture[] = [];

            // Loading each added file seperately
            this.texturePaths.forEach(el => {
                // Push each texture to textures and callback
                textures.push(this.loader.resources[el].texture);
            });

            fn(textures);
        });
        
    }

    protected loader : PIXI.Loader;
    protected texturePaths : string[];
}
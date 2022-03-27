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
        let textures : PIXI.Texture[] = [];

        this.loader.load(() => {
            this.texturePaths.forEach(el => {
                textures.push(this.loader.resources[el].texture);
            });

            // Callback with textures loaded
            fn(textures);
        });
    }

    protected loader : PIXI.Loader;
    protected texturePaths : string[];
}
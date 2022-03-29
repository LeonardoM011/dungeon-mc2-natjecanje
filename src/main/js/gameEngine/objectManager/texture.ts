import * as PIXI from 'pixi.js';

export class Texture {

    constructor(texture : PIXI.Texture) {
        this.pixiTexture = texture;
    }

    get texture() : PIXI.Texture {
        return this.pixiTexture;
    }

    private pixiTexture : PIXI.Texture;
};
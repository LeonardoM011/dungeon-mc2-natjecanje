import * as PIXI from 'pixi.js';
import { Mat2f } from '../math/mat';

export class Texture {

    constructor(texture : PIXI.Texture, rect? : Mat2f) {
        
        if (typeof rect !== 'undefined') {
            // Grozno izgleda, znam.
            // Set texture and crop only to the point that is specified
            this.pixiTexture = new PIXI.Texture(
                texture.baseTexture,
                new PIXI.Rectangle(
                    rect.value[0][0], 
                    rect.value[0][1], 
                    rect.value[1][0], 
                    rect.value[1][1]));
        } else {
            this.pixiTexture = texture;
        }
    }

    get texture() : PIXI.Texture {
        return this.pixiTexture;
    }

    private pixiTexture : PIXI.Texture;
};
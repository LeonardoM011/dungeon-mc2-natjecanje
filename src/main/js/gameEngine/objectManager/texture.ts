import * as PIXI from 'pixi.js';
import { Mat2f } from '../math/mat';

/** Abstraction class for PIXI.Texture */
export class Texture {

    /**
     * Load textureloader into texture
     * @param texture PIXI.Texture object got with textureloader
     * @param rect optional argument to crop a larger texture into smaller, should contain x and y pos and width and height
     */
    constructor(texture : PIXI.Texture, rect? : Mat2f) {
        
        if (typeof rect !== 'undefined') {
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

    /** get pixi.texture, don't use if you don't know what you're doing */
    get texture() : PIXI.Texture {
        return this.pixiTexture;
    }

    private pixiTexture : PIXI.Texture;
};
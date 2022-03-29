import * as PIXI from 'pixi.js';
import { Texture } from './texture';
import { Vector2f } from '../math/Vector';

export class Sprite {

    constructor(texture : Texture, pos : Vector2f) {
        this.pixiSprite = new PIXI.Sprite(texture.texture);
        this.pixiSprite.x = pos.x;
        this.pixiSprite.y = pos.y;
    }

    public move(value : Vector2f, delta? : number) : void {
        // Check if deltatime is given
        if (typeof delta !== 'undefined') {
            this.pixiSprite.x += value.x * delta;
            this.pixiSprite.y += value.y * delta;
            return;
        }
        // If delta is not given
        this.pixiSprite.x += value.x;
        this.pixiSprite.y += value.y;
    }

    set setPos(value : Vector2f) {
        this.pixiSprite.x = value.x;
        this.pixiSprite.y = value.y;
    }

    get pos() : Vector2f {
        return new Vector2f(this.pixiSprite.x, this.pixiSprite.y);
    }

    get sprite() : PIXI.Sprite {
        return this.pixiSprite;
    }

    private pixiSprite : PIXI.Sprite; 
};
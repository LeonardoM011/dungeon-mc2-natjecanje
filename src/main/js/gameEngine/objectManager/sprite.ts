import * as PIXI from 'pixi.js';
import { Texture } from './texture';
import { Vector2f } from '../math/vector';

/** Abstraction class for PIXI.Sprite */
export class Sprite {
    // 
    /**
     * Initialize with Texture and position of Vector2f on the stage
     * @param texture single texture object
     * @param pos coords to place created sprite
     */
    constructor(texture : Texture, pos : Vector2f) {
        this.pixiSprite = new PIXI.Sprite(texture.texture);
        this.pixiSprite.x = pos.x;
        this.pixiSprite.y = pos.y;

        this.pixiSprite.pivot.x = 0.5 * this.pixiSprite.width;
        this.pixiSprite.pivot.y = 0.5 * this.pixiSprite.height;
    }

    /** 
     * Move sprite by specified pixels
     * @param value move by how many pixels
     * @param delta argument is optional, moves it independent from FPS. Get it from gameLoop
    */
    public move(value : Vector2f) : void {
        this.pixiSprite.x += value.x;
        this.pixiSprite.y += value.y;
    }

    /**
     * Set sprite position,
     * @param value vector position, 0,0 is top left
     */
    public setPos(value : Vector2f) : void {
        this.pixiSprite.x = value.x;
        this.pixiSprite.y = value.y;
    }

    public doesCollideWith(sprite : Sprite) : boolean {
            // RIGHT SIDE
        if (((this.pos.x + this.width / 2 > sprite.pos.x - sprite.width / 2 && this.pos.x + this.width / 2 < sprite.pos.x + sprite.width / 2) ||
            // LEFT SIDE
            (this.pos.x - this.width / 2 < sprite.pos.x + sprite.width / 2 && this.pos.x - this.width / 2 > sprite.pos.x - sprite.width / 2)) &&
            // UP SIDE
            ((this.pos.y + this.height / 2 > sprite.pos.y - sprite.height / 2 && this.pos.y + this.height / 2 < sprite.pos.y + sprite.height / 2) ||
            // DOWN SIDE
            (this.pos.y - this.height / 2 < sprite.pos.y + sprite.height / 2 && this.pos.y - this.height / 2 > sprite.pos.y - sprite.height / 2)))
            
            return true;

        return false;
    }

    /**
     * Set position X of a sprite
     * @param value number to set positon X, 0 is LEFT
     */
    public setPosX(value : number) : void {
        this.pixiSprite.x = value;
    }

    public setScale(value : Vector2f) : void {
        this.pixiSprite.scale.x = value.x;
        this.pixiSprite.scale.y = value.y;
    }

    /**
     * Set position Y of a sprite
     * @param value number to set positon Y, 0 is TOP
     */
    public setPosY(value : number) : void {
        this.pixiSprite.y = value;
    }

    /** Returns current position, 0,0 is top left */
    get pos() : Vector2f {
        return new Vector2f(this.pixiSprite.x, this.pixiSprite.y);
    }

    get width() : number {
        return this.pixiSprite.width;
    }

    get height() : number {
        return this.pixiSprite.height;
    }

    /** Get pixi.sprite, don't use if you don't know what you are doing */
    get sprite() : PIXI.Sprite {
        return this.pixiSprite;
    }

    protected pixiSprite : PIXI.Sprite; 
};
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

    /** Get pixi.sprite, don't use if you don't know what you are doing */
    get sprite() : PIXI.Sprite {
        return this.pixiSprite;
    }

    protected pixiSprite : PIXI.Sprite; 
};
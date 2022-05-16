import * as PIXI from 'pixi.js';
import { Vector2f } from '../math/vector';
import { Sprite } from './sprite';
import { Texture } from './texture';

export class AnimatedSprite {

    constructor(textures : Texture[], pos : Vector2f, animationSpeed : number, playOnce? : boolean, destroyOnFinish? : boolean) {

        let pixiTextures : PIXI.Texture[] = [];
        textures.forEach(e => {
            pixiTextures.push(e.texture);
        });
        this.pixiSprite = new PIXI.AnimatedSprite(pixiTextures);

        this.pixiSprite.x = pos.x;
        this.pixiSprite.y = pos.y;

        this.pixiSprite.pivot.x = 0.5 * this.width;
        this.pixiSprite.pivot.y = 0.5 * this.height;

        this.pixiSprite.animationSpeed = animationSpeed;

        this.isFinished = false;

        if (typeof playOnce !== 'undefined') {
            this.pixiSprite.loop = !playOnce;

            // AFTER ANIMATION FINISHES
            this.pixiSprite.onComplete = () => {
                this.isFinished = true;
                /*if (typeof destroyOnFinish !== 'undefined' && destroyOnFinish) {
                    this.pixiSprite.destroy();
                }*/
            };
        }

        
    }

    
     /*constructor(texture : Texture, pos : Vector2f) {
        this.pixiSprite = new PIXI.Sprite(texture.texture);
        this.pixiSprite.x = pos.x;
        this.pixiSprite.y = pos.y;

        this.pixiSprite.pivot.x = 0.5 * this.pixiSprite.width;
        this.pixiSprite.pivot.y = 0.5 * this.pixiSprite.height;
    }*/

    /** 
     * Move sprite by specified pixels
     * @param value move by how many pixels
     * @param delta argument is optional, moves it independent from FPS. Get it from gameLoop
    */
    public move(value : Vector2f) : void {
        this.pixiSprite.x += value.x;
        this.pixiSprite.y += value.y;
    }

    public setTextures(textures : Texture[]) {
        let pixiTextures : PIXI.Texture[] = [];
        textures.forEach(e => {
            pixiTextures.push(e.texture);
        });

        this.pixiSprite.textures = pixiTextures;
    }

    /**
     * Set sprite position,
     * @param value vector position, 0,0 is top left
     */
    public setPos(value : Vector2f) : void {
        this.pixiSprite.x = value.x;
        this.pixiSprite.y = value.y;
    }

    public play() : void {
        this.pixiSprite.play();
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
    get animatedSprite() : PIXI.AnimatedSprite {
        return this.pixiSprite;
    }

    get animFinished() : boolean {
        return this.isFinished;
    }

    protected pixiSprite : PIXI.AnimatedSprite;
    protected isFinished : boolean;
}
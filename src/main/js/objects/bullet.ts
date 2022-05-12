import { Vector2f } from "../gameEngine/math/vector";
import { AnimatedSprite } from "../gameEngine/objectManager/animatedSprite";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import * as PIXI from 'pixi.js';

export class Bullet extends PIXI.Container {

    constructor(texture : Texture[], pos : Vector2f, animSpeed : number, velocityVec : Vector2f) {
        super();

        this.animSprite = new AnimatedSprite(texture, new Vector2f(0), animSpeed, true);
        this.addChild(this.animSprite.animatedSprite);

        this.position.x = pos.x;
        this.position.y = pos.y;

        this.velocity = velocityVec;

        this.setCollison(new Vector2f(0, 0), 6, 6);

    }

    public setCollison(pos : Vector2f, width : number, height : number) : void {
        this.collision = new CollisionBox(new Vector2f(pos.x - width / 2, pos.y - height / 2), width, height);
        this.addChild(this.collision.graphics);
    }

    public updatePos(delta : number) {
        this.move(new Vector2f(this.velocity.x * delta, this.velocity.y * delta));
    }

    public move(vec : Vector2f) {
        this.x += vec.x;
        this.y += vec.y;
    }

    public play() : void {
        this.animSprite.play();
    }

    public didAnimFinish() : boolean {
        return this.animSprite.animFinished;
    }

    get colBox() : CollisionBox { return this.collision; }

    private animSprite : AnimatedSprite;
    private collision : CollisionBox;
    private velocity : Vector2f;
};
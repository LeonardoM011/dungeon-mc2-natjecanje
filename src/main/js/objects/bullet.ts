import { Vector2f } from "../gameEngine/math/vector";
import { AnimatedSprite } from "../gameEngine/objectManager/animatedSprite";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";

export class Bullet extends AnimatedSprite {

    constructor(texture : Texture[], pos : Vector2f, animSpeed : number, velocityVec : Vector2f) {
        super(texture, pos, animSpeed, true);

        this.velocity = velocityVec;
    }

    public updatePos(delta : number) {
        this.move(new Vector2f(this.velocity.x * delta, this.velocity.y * delta));
    }

    private velocity : Vector2f;
};
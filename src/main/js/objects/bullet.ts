import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";

export class Bullet extends Sprite {

    constructor(texture : Texture, pos : Vector2f, velocityVec : Vector2f) {
        super(texture, pos);

        this.velocity = velocityVec;
    }

    public update(delta : number) {
        this.move(new Vector2f(this.velocity.x * delta, this.velocity.y * delta));
    }

    private velocity : Vector2f;
};
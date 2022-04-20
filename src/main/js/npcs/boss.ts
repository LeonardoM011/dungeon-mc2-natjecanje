import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";

export abstract class Boss extends Sprite {
    protected constructor(texture : Texture, origin : Vector2f) {
        super(texture, origin);
    }

    public abstract damage(hp : number) : void;

    protected abstract health : number;
};
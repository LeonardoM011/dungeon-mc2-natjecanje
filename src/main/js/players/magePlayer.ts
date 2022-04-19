import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";


export class MagePlayer extends Sprite {

    constructor(texture : Texture, origin : Vector2f) {
        super(texture, origin);
    }
};
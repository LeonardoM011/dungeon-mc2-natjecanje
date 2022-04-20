import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";

export abstract class Player extends Sprite {

    protected constructor(texture : Texture, origin : Vector2f) {
        super(texture, origin);
    }

    public abstract attack(boss : Boss) : void;

    protected abstract health : number;
    protected abstract attackPower : number;
};
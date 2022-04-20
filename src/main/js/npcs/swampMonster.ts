import { Vector2f } from "../gameEngine/math/vector";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "./boss";

export class SwampMonster extends Boss {
    
    constructor(texture : Texture, origin : Vector2f) {
        super(texture, origin);

        this.health = 100;
    }

    public override damage(hp : number) : void {
        this.health -= hp;
    }

    get hp() {
        return this.health;
    }

    set hp(health : number) {
        this.health = health;
    }

    protected override health: number;
};
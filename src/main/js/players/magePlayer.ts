import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";
import { Player } from "./player";


export class MagePlayer extends Player {

    constructor(texture : Texture, origin : Vector2f) {
        super(texture, origin);

        this.health = 100;
        this.attackPower = 20;
    }

    public override attack(boss : Boss) : void {
        boss.damage(this.attackPower);
    }

    protected override health : number;
    protected override attackPower: number;
};
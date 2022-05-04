import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";
import { Player } from "./player";


export class MagePlayer extends Player {

    constructor(texture : Texture, origin : Vector2f, totalHealth : number, attackPower : number) {
        super(texture, origin, totalHealth, attackPower);
    }

    public override update(delta : number) : void {

    }

    public override move(direction : Vector2f) : void {
        this.sprite.setPos(this.sprite.pos)
    }

    public override attack() : void {
        
    }

    /*public override tenkaj() : number {
        return 1;
    }*/

    protected override health : number;
    protected override attackPower: number;
};
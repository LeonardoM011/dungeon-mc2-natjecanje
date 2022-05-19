import { Vector2f } from "../gameEngine/math/vector";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Texture } from "../gameEngine/objectManager/texture";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Boss } from "../npcs/boss";
import { Bullet } from "../objects/bullet";
import { ManaBar } from "../objects/manaBar";
import { Player } from "./player";

export class TankPlayer extends Player {
    constructor(idleTextures : Texture[],
                runTextures : Texture[],
                origin : Vector2f) {
            
        super(idleTextures, runTextures, origin, 0.1, 200, 24, 10, 0.025);
        this.setCollison(new Vector2f(0, 8), 12, 16);
    }

    public update(delta : number, boss : Boss, colliders : CollisionBox[]) : void {
        this.superUpdate(delta);

    }

    public override attack(renderer : Renderer, boss : Boss) : void {

    }

    private projTex : Texture[];
    private projectiles : Bullet[];
};
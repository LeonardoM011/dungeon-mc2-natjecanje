import { Vector2f } from "../gameEngine/math/vector";
import { AnimatedSprite } from "../gameEngine/objectManager/animatedSprite";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";
import { Bullet } from "../objects/bullet";
import { Player } from "./player";


export class MagePlayer extends Player {

    constructor(texture : Texture, origin : Vector2f, totalHealth : number, attackPower : number, projectileTexture : Texture[]) {
        super(texture, origin, totalHealth, attackPower);
        this.projTex = projectileTexture;
    }

    public override update(delta : number) : void {

    }

    public override move(direction : Vector2f) : void {
        this.sprite.setPos(this.sprite.pos.addVec(direction));
    }

    public override attack(boss : Boss) : AnimatedSprite {
        let mX = this.sprite.pos.x;
        let mY = this.sprite.pos.y;
        let sX = boss.pos.x;
        let sY = boss.pos.y;
        let velVector = new Vector2f(sX - mX, sY - mY);
        velVector = velVector.normalize();
        velVector = velVector.multiplyVal(2);
        //mage.attack(swampMonster);
        let bullet = new Bullet(this.projTex, this.sprite.pos, 0.3, velVector);
        
        this.projectiles.push(bullet);
        return bullet;
    }

    /*public override tenkaj() : number {
        return 1;
    }*/

    private projTex : Texture[];
    private projectiles : Bullet[];
    protected override health : number;
    protected override attackPower: number;
};
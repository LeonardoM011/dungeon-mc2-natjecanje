import { Vector2f } from "../gameEngine/math/vector";
import { AnimatedSprite } from "../gameEngine/objectManager/animatedSprite";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Boss } from "../npcs/boss";
import { SwampMonster } from "../npcs/swampMonster";
import { Bullet } from "../objects/bullet";
import { Player } from "./player";


export class MagePlayer extends Player {

    constructor(texture : Texture, origin : Vector2f, totalHealth : number, attackPower : number, projectileTexture : Texture[]) {
        super(texture, origin, totalHealth, attackPower);
        this.projTex = projectileTexture;
        this.projectiles = [];
    }

    public override update(delta : number, boss : Boss) : void {
        for (let i = 0; i < this.projectiles.length; i++) {
            let bullet = this.projectiles[i];
            if (bullet.colBox.doesCollideWith(boss.colBox)) {
                bullet.play();

                if (bullet.didAnimFinish()) {
                    //delete this.projectiles[i];
                    this.projectiles[i].destroy();
                    this.projectiles.splice(i, 1);
                }
            } else {
                bullet.updatePos(delta);
            }
        }
    }

    public override move(direction : Vector2f) : void {
        console.log(this.collision.graphics.getBounds().x);

        this.position.x += direction.x;
        this.position.y += direction.y;

    }

    public override attack(renderer : Renderer, boss : Boss) : void {
        let mX = this.position.x;
        let mY = this.position.y;
        let sX = boss.pos.x;
        let sY = boss.pos.y;
        let velVector = new Vector2f(sX - mX, sY - mY);
        velVector = velVector.normalize();
        velVector = velVector.multiplyVal(2);
        let bullet = new Bullet(this.projTex, new Vector2f(this.position.x, this.position.y), 0.3, velVector);
        renderer.renderContainer(bullet, "projectile");
        this.projectiles.push(bullet);
    }

    /*public override tenkaj() : number {
        return 1;
    }*/

    private projTex : Texture[];
    private projectiles : Bullet[];
    protected override health : number;
    protected override attackPower: number;
};
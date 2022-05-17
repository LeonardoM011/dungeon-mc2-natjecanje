import { Vector2f } from "../gameEngine/math/vector";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Texture } from "../gameEngine/objectManager/texture";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Boss } from "../npcs/boss";
import { Bullet } from "../objects/bullet";
import { HealthBar } from "../objects/healthBar";
import { ManaBar } from "../objects/manaBar";
import { Player } from "./player";


export class MagePlayer extends Player {

    constructor(idleTextures : Texture[],
                runTextures : Texture[],
                origin : Vector2f,
                projectileTexture : Texture[]) {
                
        super(idleTextures, runTextures, origin, 0.1, 100, 20, 0.025);
        this.setCollison(new Vector2f(0, 8), 12, 16);

        this.projTex = projectileTexture;
        this.projectiles = [];
        
        this.mana = 100;
        this.maxMana = 100; 
        this.manaBar = new ManaBar(new Vector2f(0, 28), 24, 4);
        this.addChild(this.manaBar);

        this.attackCost = 20;
    }

    public update(delta : number, boss : Boss, colliders : CollisionBox[]) : void {
        this.superUpdate(delta);

        for (let i = 0; i < this.projectiles.length; i++) {
            let bullet = this.projectiles[i];
            if (bullet.colBox.doesCollideWith(boss.colBox) || colliders.forEach(e => e.doesCollideWith(bullet.colBox))) {
                bullet.play();

                if (bullet.didAnimFinish()) {
                    this.projectiles[i].destroy();
                    this.projectiles.splice(i, 1);
                    boss.damage(this.attackPower);
                }
            } else {
                bullet.updatePos(delta);
            }
        }
    }

    public override attack(renderer : Renderer, boss : Boss) : void {
        if (this.mana <= this.attackCost - 1)
            return;

        let mX = this.position.x;
        let mY = this.position.y;
        let sX = boss.pos.x;
        let sY = boss.pos.y;
        let velVector = new Vector2f(sX - mX, sY - mY);
        velVector = velVector.normalize();
        velVector = velVector.multiplyVal(2);
        let bullet = new Bullet(this.projTex, new Vector2f(this.position.x, this.position.y), 0.3, velVector);
        renderer.render(bullet, "projectile");
        this.projectiles.push(bullet);

        this.mana -= this.attackCost;
        this.manaBar.setManaPercent(this.mana / this.maxMana);
    }

    private projTex : Texture[];
    private projectiles : Bullet[];
    private mana : number;
    private maxMana : number; 
    private manaBar : ManaBar;
    private attackCost : number;
};
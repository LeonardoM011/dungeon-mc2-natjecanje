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
                origin : Vector2f,
                projectileTexture : Texture[],
                runTextures : Texture[]) {
                
        super(idleTextures, origin, 0.1);
        this.projTex = projectileTexture;
        this.projectiles = [];

        this.idleTexture = idleTextures;
        this.runTexture = runTextures;
        
        this.health = 100;
        this.maxHealth = 100;
        this.mana = 100;
        this.maxMana = 100; 
        this.attackPower = 20;
        this.moveSpeed = 0.025;

        // Health bar
        this.hpBar = new HealthBar(new Vector2f(0, 22), 24, 4);
        this.addChild(this.hpBar);

        this.manaBar = new ManaBar(new Vector2f(0, 28), 24, 4);
        this.addChild(this.manaBar);

        this.moveDirection = new Vector2f(0);
        this.moveOriginalPos = new Vector2f(0);

        this.isMoving = false;
    }

    public override update(delta : number, boss : Boss, colliders : CollisionBox[]) : void {
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

        if (this.isMoving) {
            this.position.x += this.moveDirection.x * this.moveSpeed * delta;
            this.position.y += this.moveDirection.y * this.moveSpeed * delta;
            this.moveBack();
        }
        
        
    }

    public override move(direction : Vector2f, colliders : CollisionBox[]) : void {
        this.moveDirection = direction;
        this.moveOriginalPos = new Vector2f(this.position.x, this.position.y)
        this.sprite.setTextures(this.runTexture);
        this.sprite.play();
        this.isMoving = true;
    }

    public override attack(renderer : Renderer, boss : Boss) : void {
        if (this.mana <= 9)
            return;

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

        this.mana -= 10;
        this.manaBar.setManaPercent(this.mana / this.maxMana);
    }

    public override damage(hp : number) : void {
        this.health -= hp;
        this.hpBar.setHpPercent(this.health / this.maxHealth);

        if (this.health <= 0)
            alert("Izgubili ste!");
    }
    

    private moveBack() {
        if (!this.isMoving)
            return

        if (this.moveDirection.x > 0 && this.moveOriginalPos.x + 16 < this.position.x) {
            this.position.x += this.moveOriginalPos.x + 16 - this.position.x;
        }
        else if (this.moveDirection.x < 0 && this.moveOriginalPos.x - 16 > this.position.x) {
            this.position.x += this.moveOriginalPos.x - 16 - this.position.x;
        }
        else if (this.moveDirection.y > 0 && this.moveOriginalPos.y + 16 < this.position.y) {
            this.position.y += this.moveOriginalPos.y + 16 - this.position.y;
        }
        else if (this.moveDirection.y < 0 && this.moveOriginalPos.y - 16 > this.position.y) {
            this.position.y += this.moveOriginalPos.y - 16 - this.position.y;
        } else {
            return
        }

        this.isMoving = false
        this.moveDirection = new Vector2f(0);
        this.sprite.setTextures(this.idleTexture);
        this.sprite.play();
        
    }

    private projTex : Texture[];
    private projectiles : Bullet[];
    private idleTexture : Texture[];
    private runTexture : Texture[];
    protected override health : number;
    protected override maxHealth : number;
    protected override mana : number;
    protected override maxMana : number; 
    protected override attackPower: number;
    protected override hpBar: HealthBar;
    protected override manaBar : ManaBar;
    protected override moveSpeed: number;
    protected override moveDirection: Vector2f;
    protected override moveOriginalPos : Vector2f;
    protected isMoving : boolean;
};
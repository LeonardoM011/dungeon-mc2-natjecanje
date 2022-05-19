import { Vector2f } from "../gameEngine/math/vector";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Texture } from "../gameEngine/objectManager/texture";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Bullet } from "../objects/bullet";
import { HealthBar } from "../objects/healthBar";
import { Player } from "../players/player";
import { Boss } from "./boss";

export class OgreBoss extends Boss {
    
    constructor(textureIdle : Texture[], origin : Vector2f, textureRun : Texture[], ogreAttackTexture : Texture[]) {
        super(textureIdle, origin);

        this.health = 100;
        this.maxHealth = 100;
        
        this.hpBar = new HealthBar(new Vector2f(0, 22), 30, 4);
        this.addChild(this.hpBar);

        this.isMoving = false;
        this.moveDirection = new Vector2f(0);
        this.moveSpeed = 0.025;

        this.idleTexture = textureIdle;
        this.runTexture = textureRun;

        this.projectileTexture = ogreAttackTexture;

        this.attackPower = 30;

        this.projectiles = [];
    }

    public override update(delta : number, players : Player[], colliders : CollisionBox[]) : void {
        for (let i = 0; i < this.projectiles.length; i++) {
            let bullet = this.projectiles[i];
            if (bullet.colBox.doesCollideWith(players[0].colBox)) {
                bullet.play();

                if (bullet.didAnimFinish()) {
                    this.projectiles[i].destroy();
                    this.projectiles.splice(i, 1);
                    players[0].damage(this.attackPower);
                }
            } else if (bullet.colBox.doesCollideWith(players[1].colBox)) {
                bullet.play();

                if (bullet.didAnimFinish()) {
                    this.projectiles[i].destroy();
                    this.projectiles.splice(i, 1);
                    players[1].damage(this.attackPower);
                }
            } else if (bullet.colBox.doesCollideWith(players[2].colBox)) {
                bullet.play();

                if (bullet.didAnimFinish()) {
                    this.projectiles[i].destroy();
                    this.projectiles.splice(i, 1);
                    players[2].damage(this.attackPower);
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

    public override move(direction : Vector2f) : void {
        this.moveDirection = direction;
        this.moveOriginalPos = new Vector2f(this.position.x, this.position.y)
        this.sprite.setTextures(this.runTexture);
        this.sprite.play();
        this.isMoving = true;
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

    public override attack(renderer : Renderer, player : Player) : void {
        let mX = this.position.x;
        let mY = this.position.y;
        let sX = player.pos.x;
        let sY = player.pos.y;
        let velVector = new Vector2f(sX - mX, sY - mY);
        velVector = velVector.normalize();
        velVector = velVector.multiplyVal(2);
        let bullet = new Bullet(this.projectileTexture, new Vector2f(this.position.x, this.position.y), 0.3, velVector);
        renderer.render(bullet, "projectile");
        this.projectiles.push(bullet);
    }

    public override damage(hp : number) : void {
        this.health -= hp;
        this.hpBar.setHpPercent(this.health / this.maxHealth);

        if (this.health <= 0)
            alert("Boss ubijen!");
    }

    get hp() {
        return this.health;
    }

    set hp(health : number) {
        this.health = health;
    }

    protected override hpBar : HealthBar;
    protected override health: number;
    protected override maxHealth : number;
    protected isMoving : boolean;
    protected moveDirection : Vector2f;
    protected idleTexture : Texture[];
    protected runTexture : Texture[];
    protected moveOriginalPos : Vector2f;
    protected moveSpeed : number;
    protected projectiles : Bullet[];
    protected projectileTexture : Texture[];
    protected attackPower : number;
};
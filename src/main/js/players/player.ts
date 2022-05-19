import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";
import * as PIXI from 'pixi.js';
import { Renderer } from "../gameEngine/windowManager/renderer";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { HealthBar } from "../objects/healthBar";
import { AnimatedSprite } from "../gameEngine/objectManager/animatedSprite";
import { ManaBar } from "../objects/manaBar";

export abstract class Player extends PIXI.Container {

    protected constructor(idleTexture : Texture[],
                          runTexture : Texture[],
                          origin : Vector2f,
                          animSpeed : number,
                          maxHealth : number,
                          healthBarSize : number,
                          attackPower : number,
                          moveSpeed : number) {
        super();

        this.sprite = new AnimatedSprite(idleTexture, new Vector2f(0), animSpeed, false, false);
        this.sprite.play();
        this.addChild(this.sprite.animatedSprite);

        this.position.x = origin.x;
        this.position.y = origin.y;

        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.hpBar = new HealthBar(new Vector2f(0, 22), healthBarSize, 4);
        this.addChild(this.hpBar);

        this.attackPower = attackPower;
        this.moveSpeed = moveSpeed;

        this.moveDirection = new Vector2f(0);
        this.moveOriginalPos = new Vector2f(0);

        this.idleTexture = idleTexture;
        this.runTexture = runTexture;

        this.isMoving = false;
    }

    public superUpdate(delta : number) : void {
        if (this.isMoving) {
            this.position.x += this.moveDirection.x * this.moveSpeed * delta;
            this.position.y += this.moveDirection.y * this.moveSpeed * delta;
            this.moveBack();
        }
    }

    public move(direction : Vector2f, colliders : CollisionBox[]) : void {
        this.moveDirection = direction;
        this.moveOriginalPos = new Vector2f(this.position.x, this.position.y)
        this.sprite.setTextures(this.runTexture);
        this.sprite.play();
        this.isMoving = true;
    }

    public abstract attack(renderer : Renderer, boss : Boss) : void;

    public heal(ammount : number) : void {
        if (ammount + this.health >= this.maxHealth)
            return;
        
        this.health += ammount;
        this.hpBar.setHpPercent(this.health / this.maxHealth);
    }

    public damage(hp : number) : void {
        this.health -= hp;
        this.hpBar.setHpPercent(this.health / this.maxHealth);

        if (this.health <= 0)
            alert("Izgubili ste!");
    }

    get colBox() : CollisionBox { return this.collision; }

    get pos() : Vector2f { return new Vector2f(this.position.x, this.position.y); }

    set setPos(pos : Vector2f) { 
        this.position.x = pos.x; 
        this.position.y = pos.y; 
    }

    set setHealth(hp : number) {
        this.health = hp;
        this.hpBar.setHpPercent(this.health / this.maxHealth);
    }

    public throwHeal(renderer : Renderer, player : Player) : number {
        return -1
    }

    protected setCollison(pos : Vector2f, width : number, height : number) : void {
        this.collision = new CollisionBox(new Vector2f(pos.x - width / 2, pos.y - height / 2), width, height);
        this.addChild(this.collision.graphics);
    }

    protected moveBack() {
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

    protected collision : CollisionBox;
    protected sprite : AnimatedSprite;
    protected health : number;
    protected maxHealth : number;
    protected hpBar : HealthBar;
    protected attackPower : number;
    protected moveSpeed : number;
    protected moveDirection : Vector2f;
    protected moveOriginalPos : Vector2f;
    protected isMoving : boolean;
    protected idleTexture : Texture[];
    protected runTexture : Texture[];
};
import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import * as PIXI from 'pixi.js';
import { Renderer } from "../gameEngine/windowManager/renderer";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { AnimatedSprite } from "../gameEngine/objectManager/animatedSprite";
import { Player } from "../players/player";
import { HealthBar } from "../objects/healthBar";

export abstract class Boss extends PIXI.Container {
    protected constructor(textureIdle : Texture[], origin : Vector2f) {
        super();

        this.hpBar = new HealthBar(new Vector2f(0, 22), 30, 4);
        this.addChild(this.hpBar);

        this.sprite = new AnimatedSprite(textureIdle, new Vector2f(0), 0.1, false, false);
        this.sprite.play();
        this.addChild(this.sprite.animatedSprite);

        this.position.x = origin.x;
        this.position.y = origin.y;
    }

    public setCollison(pos : Vector2f, width : number, height : number) : void {
        this.collision = new CollisionBox(new Vector2f(pos.x - width / 2, pos.y - height / 2), width, height);
        this.addChild(this.collision.graphics);
    }

    public abstract update(delta : number, player : Player[], colliders : CollisionBox[]) : void;

    public abstract move(direction : Vector2f) : void;

    public abstract attack(renderer : Renderer, player : Player) : void;

    public abstract damage(hp : number) : void;

    get colBox() : CollisionBox { return this.collision; }

    get pos() : Vector2f { return new Vector2f(this.position.x, this.position.y); }

    set setPos(vec : Vector2f) { 
        this.position.x = vec.x; 
        this.position.y = vec.y; 
    }

    set setHealth(hp : number) {
        this.health = hp;
        this.hpBar.setHpPercent(this.health / this.maxHealth);
    }

    protected collision : CollisionBox;
    protected sprite : AnimatedSprite;
    protected abstract health : number;
    protected abstract maxHealth : number;
    protected hpBar : HealthBar;
};
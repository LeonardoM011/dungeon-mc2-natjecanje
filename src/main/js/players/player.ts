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

    protected constructor(textures : Texture[], origin : Vector2f, animSpeed : number) {
        super();

        this.sprite = new AnimatedSprite(textures, new Vector2f(0), animSpeed, false, false);
        this.sprite.play();
        this.addChild(this.sprite.animatedSprite);

        this.position.x = origin.x;
        this.position.y = origin.y;
    }

    public setCollison(pos : Vector2f, width : number, height : number) : void {
        this.collision = new CollisionBox(new Vector2f(pos.x - width / 2, pos.y - height / 2), width, height);
        this.addChild(this.collision.graphics);
    }

    public abstract update(delta : number, boss : Boss, colliders : CollisionBox[]) : void;

    public abstract move(direction : Vector2f, colliders : CollisionBox[]) : void;

    public abstract attack(renderer : Renderer, boss : Boss) : void;

    public abstract damage(hp : number) : void;

    get colBox() : CollisionBox { return this.collision; }

    get pos() : Vector2f { return new Vector2f(this.position.x, this.position.y); }

    protected collision : CollisionBox;
    protected sprite : AnimatedSprite;
    protected abstract health : number;
    protected abstract maxHealth : number;
    protected abstract mana : number;
    protected abstract maxMana : number; 
    protected abstract attackPower : number;
    protected abstract manaBar : ManaBar;
    protected abstract hpBar : HealthBar;
    protected abstract moveSpeed : number;
    protected abstract moveDirection : Vector2f;
    protected abstract moveOriginalPos : Vector2f;
};
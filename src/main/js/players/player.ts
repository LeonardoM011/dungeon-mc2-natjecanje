import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";
import * as PIXI from 'pixi.js';
import { Renderer } from "../gameEngine/windowManager/renderer";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";

export abstract class Player extends PIXI.Container {

    protected constructor(texture : Texture, origin : Vector2f, totalHealth : number, attackPower : number) {
        super();

        this.sprite = new Sprite(texture, new Vector2f(0));
        this.addChild(this.sprite.sprite);

        this.position.x = origin.x;
        this.position.y = origin.y;

        this.health = totalHealth;
        this.attackPower = attackPower;
    }

    public setCollison(pos : Vector2f, width : number, height : number) : void {
        this.collision = new CollisionBox(new Vector2f(pos.x - width / 2, pos.y - height / 2), width, height);
        this.addChild(this.collision.graphics);
    }

    public abstract update(delta : number, boss : Boss) : void;

    public abstract move(direction : Vector2f) : void;

    public abstract attack(renderer : Renderer, boss : Boss) : void;

    get colBox() : CollisionBox { return this.collision; }

    protected collision : CollisionBox;
    protected sprite : Sprite;
    protected health : number;
    protected attackPower : number;
};
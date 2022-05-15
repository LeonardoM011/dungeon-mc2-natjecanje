import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import * as PIXI from 'pixi.js';
import { Renderer } from "../gameEngine/windowManager/renderer";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";

export abstract class Boss extends PIXI.Container {
    protected constructor(texture : Texture, origin : Vector2f) {
        super();

        this.sprite = new Sprite(texture, new Vector2f(0));
        this.addChild(this.sprite.sprite);

        this.position.x = origin.x;
        this.position.y = origin.y;
    }

    public setCollison(pos : Vector2f, width : number, height : number) : void {
        this.collision = new CollisionBox(new Vector2f(pos.x - width / 2, pos.y - height / 2), width, height);
        this.addChild(this.collision.graphics);
    }

    public abstract update(delta : number, boss : Boss) : void;

    public abstract move(direction : Vector2f) : void;

    public abstract attack(renderer : Renderer, boss : Boss) : void;

    public abstract damage(hp : number) : void;

    get colBox() : CollisionBox { return this.collision; }

    get pos() : Vector2f { return new Vector2f(this.position.x, this.position.y); }

    protected collision : CollisionBox;
    protected sprite : Sprite;
    protected abstract health : number;
    protected abstract maxHealth : number;
    protected abstract hpBar : PIXI.Container
};
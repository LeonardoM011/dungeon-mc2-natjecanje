import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Texture } from "../gameEngine/objectManager/texture";
import { Boss } from "../npcs/boss";
import * as PIXI from 'pixi.js';

export abstract class Player extends PIXI.Container {

    protected constructor(texture : Texture, origin : Vector2f, totalHealth : number, attackPower : number) {
        super();
        
        this.sprite = new Sprite(texture, origin);
        this.addChild(this.sprite.sprite);

        this.health = totalHealth;
        this.attackPower = attackPower;
    }

    public abstract update(delta : number) : void;

    public abstract move(direction : Vector2f) : void;

    public abstract attack(boss : Boss) : void;

    protected sprite : Sprite;
    protected health : number;
    protected attackPower : number;
};
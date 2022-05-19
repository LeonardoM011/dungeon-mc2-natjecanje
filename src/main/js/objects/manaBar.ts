import * as PIXI from 'pixi.js'
import { Vector2f } from '../gameEngine/math/vector';

export class ManaBar extends PIXI.Container {

    constructor(pos : Vector2f, width : number, height: number) {
        super();

        this.manaPercent = 1;
        this.graphics = new PIXI.Graphics();

        this.manaPos = pos;
        this.manaWidth = width;
        this.manaHeight = height;
        
        this.addChild(this.graphics);
        this.draw();
        
    }

    public setManaPercent(percentage : number) : void { 
        this.manaPercent = percentage;
        this.graphics.clear();
        this.draw();
    }

    private draw() {
        this.graphics.lineStyle(0.6, 0x000000, 0.6);
        this.graphics.beginFill(0xFFFFFF, 0.5);
        // Background
        this.graphics.drawRect(this.manaPos.x - this.manaWidth / 2, this.manaPos.y - this.manaHeight / 2, this.manaWidth, this.manaHeight);
        this.graphics.endFill();
        this.graphics.beginFill(0x3B84CC);
        // Health bar
        this.graphics.drawRect(this.manaPos.x - this.manaWidth / 2, this.manaPos.y - this.manaHeight / 2, this.manaWidth * this.manaPercent, this.manaHeight);
        this.graphics.endFill();
    }

    private manaPos : Vector2f;
    private manaWidth : number;
    private manaHeight : number;
    private manaPercent : number;
    private graphics : PIXI.Graphics;

}
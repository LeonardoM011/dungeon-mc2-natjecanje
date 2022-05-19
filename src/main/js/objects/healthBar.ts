import * as PIXI from 'pixi.js'
import { Vector2f } from '../gameEngine/math/vector';

export class HealthBar extends PIXI.Container {

    constructor(pos : Vector2f, width : number, height: number) {
        super();

        this.hpPercent = 1;
        this.graphics = new PIXI.Graphics();

        this.hpPos = pos;
        this.hpWidth = width;
        this.hpHeight = height;
        
        this.addChild(this.graphics);
        this.draw();
        
    }

    public setHpPercent(percentage : number) : void { 
        this.hpPercent = percentage;
        this.graphics.clear();
        this.draw();
    }

    private draw() {
        this.graphics.lineStyle(0.6, 0x000000, 0.6);
        this.graphics.beginFill(0xFFFFFF, 0.5);
        // Background
        this.graphics.drawRect(this.hpPos.x - this.hpWidth / 2, this.hpPos.y - this.hpHeight / 2, this.hpWidth, this.hpHeight);
        this.graphics.endFill();
        this.graphics.beginFill(0xAA4F08);
        // Health bar
        this.graphics.drawRect(this.hpPos.x - this.hpWidth / 2, this.hpPos.y - this.hpHeight / 2, this.hpWidth * this.hpPercent, this.hpHeight);
        this.graphics.endFill();
    }

    private hpPos : Vector2f;
    private hpWidth : number;
    private hpHeight : number;
    private hpPercent : number;
    private graphics : PIXI.Graphics;

}
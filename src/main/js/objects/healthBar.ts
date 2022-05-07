import * as PIXI from 'pixi.js'
import { Vector2f } from '../gameEngine/math/vector';

export class HealthBar extends PIXI.Container {

    constructor(pos : Vector2f, width : number, height: number) {
        super();

        this.graphics = new PIXI.Graphics();

        this.graphics.lineStyle(1, 0xFFFFFF, 1);
        //this.graphics.beginFill(0xAA4F08);
        this.graphics.drawRect(pos.x - width / 2, pos.y - height / 2, width, height);
        //this.graphics.endFill();

        this.addChild(this.graphics);
    }

    private graphics : PIXI.Graphics;

}
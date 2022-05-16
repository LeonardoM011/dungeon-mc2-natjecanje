import { Vector2f } from "../math/vector";
import { AnimatedSprite } from "./animatedSprite";
import { Sprite } from "./sprite";
import * as PIXI from "pixi.js";


export class CollisionBox {

    constructor(pos : Vector2f, width : number, height : number) {
        this.pos = pos;
        this.width = width;
        this.height = height;

        this.box = new PIXI.Graphics();
        if (CollisionBox.showBox) {
            this.box.lineStyle(1, 0xFF0000, 1);
        }
        this.box.drawRect(pos.x, pos.y, width, height);
    }

    public doesCollideWith(collisionBox : CollisionBox) : boolean {
        let posX = this.graphics.getBounds().x;
        let posY = this.graphics.getBounds().y;
        let width = this.graphics.getBounds().width;
        let height = this.graphics.getBounds().height;

        let objPosX = collisionBox.box.getBounds().x;
        let objPosY = collisionBox.box.getBounds().y;
        let objWidth = collisionBox.box.getBounds().width;
        let objHeight = collisionBox.box.getBounds().height;

        if (((posX + width > objPosX && posX + width < objPosX + objWidth) ||
            // LEFT SIDE
            (posX < objPosX + objWidth && posX > objPosX)) &&
            // UP SIDE
            ((posY + height > objPosY && posY + height < objPosY + objHeight) ||
            // DOWN SIDE
            (posY < objPosY + objHeight && posY > objPosY)))
            return true;

        return false;
    }

    public static showBounds(show : boolean) : void {
        CollisionBox.showBox = show;
    }

    get graphics() { return this.box; }

    private static showBox : boolean = false;
    private box : PIXI.Graphics;
    private pos : Vector2f;
    private width : number;
    private height : number;
}

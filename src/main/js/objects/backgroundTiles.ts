import { Tilemap } from "../gameEngine/objectManager/tilemap";
import * as PIXI from "pixi.js";
import { Texture } from "../gameEngine/objectManager/texture";
import { Vector2f } from "../gameEngine/math/vector";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Renderer } from '../gameEngine/windowManager/renderer';

export class BackgroundTiles extends PIXI.Container {

    constructor(tilemapPath : string, tileset : Texture[], origin : Vector2f) {
        super();

        this.tilemap = new Tilemap(tilemapPath, tileset, new Vector2f(0));
        this.addChild(this.tilemap.container);

        this.position.x = origin.x;
        this.position.y = origin.y;

        this.colliderBox = [];
    }

    public addCollider(pos : Vector2f, width : number, height : number) {
        let collider = new CollisionBox(pos, width, height);
        this.colliderBox.push(collider);
        this.addChild(collider.graphics);
    }

    get colliders() : CollisionBox[] { return this.colliderBox; }

    private tilemap : Tilemap;
    private colliderBox : CollisionBox[];
}
import { Vector2f } from "../math/vector";
import { Sprite } from "./sprite";
import { Texture } from "./texture";
import { TileMapInfo, TiledParser } from "../utils/tiledParser";
import * as PIXI from 'pixi.js';

/** Tilemap object which stores sprites into container */
export class Tilemap {
    
    /**
     * Create new tilemap from Tiled xml file
     * @param tilemapPath path to tilemap .tmx file made by Tiled software
     * @param tileset array of textures made by creating spritesheet using spritesheetloader
     * @param origin coords to place created tilemap
     */
    constructor(tilemapPath : string, tileset : Texture[], origin : Vector2f) {
        this.spritesContainer = new PIXI.Container;

        let mapInfo = TiledParser(tilemapPath);
        // Create empty 2d array with height and width
        this.allSprites = [...Array(mapInfo.height)].map(e => Array(mapInfo.width));

        for (let i = 0; i < mapInfo.height; i++) {
            for (let j = 0; j < mapInfo.width; j++) {
                // Tiled sets 0 to be empty tile and first tile on 1
                let tileId = (mapInfo.data[i][j]) - 1;
                // Ignore empty tile
                if (tileId == -1) {
                    continue;
                }

                // Create new sprite and add it to container
                this.allSprites[i][j] = new Sprite(tileset[tileId], new Vector2f(0, 0));
                this.allSprites[i][j].setPosX(mapInfo.tileWidth * j);
                this.allSprites[i][j].setPosY(mapInfo.tileHeight * i);
                this.spritesContainer.addChild(this.allSprites[i][j].sprite);
            }
        }
        this.spritesContainer.x = origin.x;
        this.spritesContainer.y = origin.y;
        this.spritesContainer.pivot.x = 0.5 * this.spritesContainer.width;
        this.spritesContainer.pivot.y = 0.5 * this.spritesContainer.height;
        
        this.currentPos = new Vector2f(origin.x, origin.y);
    }

    /**
     * Set scale to value
     * @param value scale to what size multiplier, 1 is default
     */
    public setScale(value : Vector2f) : void {
        /**/
        this.spritesContainer.scale.x = value.x;
        this.spritesContainer.scale.y = value.y;
    }

    public setRotation(value : number) : void {
        this.spritesContainer.rotation = value;
    }

    /**
     * Set position to value
     * @param value position to set container, 0,0 is top left
     */
    public setPos(value : Vector2f) : void {
        this.spritesContainer.x = value.x
        this.spritesContainer.y = value.y
    }

    /*set anchorX(value : number) {
        this.spritesContainer.pivot.x = value * this.xmlData.width / this.spritesContainer.scale.x;
    }

    set anchorY(value : number) {
        this.spritesContainer.pivot.y = value * this.xmlData.height / this.spritesContainer.scale.y;
    }

    public anchor(value : Vector2f) : void {
        this.spritesContainer.pivot.x = value.x * this.xmlData.width / this.spritesContainer.scale.x;
        this.spritesContainer.pivot.y = value.y * this.xmlData.height / this.spritesContainer.scale.y;
    }*/

    /** Get sprite 2D array */
    get sprites() : Sprite[][] {
        return this.allSprites;
    }

    /** Get container, don't use if you don't know what you're doing */
    get container() : PIXI.Container {
        return this.spritesContainer;
    }


    //private xmlData : TileMapInfo;
    private allSprites : Sprite[][];
    private spritesContainer : PIXI.Container;
    private currentPos : Vector2f;
    //private mapFile : string;
}
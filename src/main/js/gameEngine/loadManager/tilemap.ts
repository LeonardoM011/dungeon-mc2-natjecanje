import { Vector2f } from "../math/vector";
import { Sprite } from "../objectManager/sprite";
import { Texture } from "../objectManager/texture";
import { TileMapInfo, TiledParser } from "../utils/tiledParser";
import * as PIXI from 'pixi.js';

export class Tilemap {
    
    constructor(tilemapPath : string, tileset : Texture[], origin : Vector2f) {
        this.spritesContainer = new PIXI.Container;

        let mapInfo = TiledParser(tilemapPath);
        // Create empty 2d array with height and width
        this.allSprites = [...Array(mapInfo.height)].map(e => Array(mapInfo.width));

        for (let i = 0; i < mapInfo.height; i++) {
            for (let j = 0; j < mapInfo.width; j++) {
                // 0 is not a tile
                let tileId = (mapInfo.data[i][j]) - 1;
                if (tileId == -1) {
                    continue;
                }

                this.allSprites[i][j] = new Sprite(tileset[tileId], new Vector2f(0, 0));
                this.allSprites[i][j].setPosX(mapInfo.tileWidth * j);
                this.allSprites[i][j].setPosY(mapInfo.tileHeight * i);
                this.spritesContainer.addChild(this.allSprites[i][j].sprite);
            }
        }

        this.spritesContainer.pivot.x = 0.5 * mapInfo.width * mapInfo.tileWidth;
        this.spritesContainer.pivot.y = 0.5 * mapInfo.height * mapInfo.tileHeight;
        this.spritesContainer.x = origin.x;
        this.spritesContainer.y = origin.y;
    }

    public scale(value : Vector2f) : void {
        this.spritesContainer.scale.x = value.x;
        this.spritesContainer.scale.y = value.y;
    }

    public pos(value : Vector2f) {
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

    get sprites() : Sprite[][] {
        return this.allSprites;
    }

    get container() : PIXI.Container {
        return this.spritesContainer;
    }


    //private xmlData : TileMapInfo;
    private allSprites : Sprite[][];
    private spritesContainer : PIXI.Container;
    //private mapFile : string;
}
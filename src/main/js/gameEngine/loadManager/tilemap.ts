import { Vector2f } from "../math/vector";
import { Sprite } from "../objectManager/sprite";
import { Texture } from "../objectManager/texture";
import { TileMapInfo, TiledParser } from "../utils/tiledParser";

export class Tilemap {
    
    constructor(tilemapPath : string, tileset : Texture[], origin : Vector2f) {
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
                console.log(tileId);

                this.allSprites[i][j] = new Sprite(tileset[tileId], origin);
                this.allSprites[i][j].setPosX(origin.x + (mapInfo.tileWidth * j));
                this.allSprites[i][j].setPosY(origin.y + (mapInfo.tileHeight * i));
            }
        }
    }

    get sprites() : Sprite[][] {
        return this.allSprites;
    }


    private xmlData : TileMapInfo;
    private allSprites : Sprite[][];
    private mapFile : string;
}
// Parser made to interpret ©Tiled map exports
import { XMLParser } from "./xmlParser";

export type TileMapInfo = {
    orientation? : string,
    width? : number,
    height? : number,
    tileWidth? : number,
    tileHeight? : number,
    tileSetSource? : string,
    data? : number[][]
};

/**
 * Import tilemap from program Tiled
 * @param path path to tmx file
 * @returns object of type TiledMapInfo
 */
export function TiledParser(path : string) : TileMapInfo {
    let tileMapInfo : TileMapInfo = {};
    let xmlMap = new XMLParser(path);

    // Getting arguments from tag info
    tileMapInfo.orientation = xmlMap.tagArgument("map", "orientation");
    let width = Number(xmlMap.tagArgument("map", "width"));
    tileMapInfo.width = width;
    let height = Number(xmlMap.tagArgument("map", "height"));
    tileMapInfo.height = height;
    tileMapInfo.tileWidth = Number(xmlMap.tagArgument("map", "tilewidth"));
    tileMapInfo.tileHeight = Number(xmlMap.tagArgument("map", "tileheight"));

    tileMapInfo.tileSetSource = xmlMap.tagArgument("tileset", "source");

    // Turning data string into 2d array
    let xmlData = xmlMap.tagContents("data");
    // filter(Boolean) just ignores empty string/null value
    let splitXmlData = xmlData.split('\n').filter(Boolean);
    // Create empty 2d array
    let data : number[][] = [...Array(height)].map(e => Array(width));
    for (let i = 0; i < height; i++) {
        // filter(Boolean) just ignores empty string/null value
        let tmp = splitXmlData[i].split(',').filter(Boolean);
        for (let j = 0; j < width; j++) {
            data[i][j] = Number(tmp[j]);
        }
    }
    tileMapInfo.data = data;

    return tileMapInfo;
}
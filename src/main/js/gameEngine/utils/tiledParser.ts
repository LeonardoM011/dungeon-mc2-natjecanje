// Parser made to interpret ©Tiled map exports
import { XMLParser } from "./xmlParser";

export type TileMapInfo = {
    orientation? : string,
    width? : number,
    height? : number,
    tileWidth? : number,
    tileHeight? : number,
    tileSetSource? : string,
    data? : number[][][]
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

    tileMapInfo.data = [];

    // Turning data string into 2d array
    let xmlData = xmlMap.allTagContents("data");
    for (let i = 0; i < xmlData.length; i++) {
        // filter(Boolean) just ignores empty string/null value
        let splitXmlData = xmlData[i].split('\n').filter(Boolean);
        let dataRow = processData(splitXmlData, tileMapInfo);
        tileMapInfo.data.push(dataRow);
    }

    return tileMapInfo;
}

function processData(str : string[], mapInfo : TileMapInfo) : number[][] {
    let width = mapInfo.width;
    let height = mapInfo.height;

    // Create empty 2d array
    let data : number[][] = [...Array(height)].map(e => Array(width));
    for (let i = 0; i < height; i++) {
        // filter(Boolean) just ignores empty string/null value
        let tmp = str[i].split(',').filter(Boolean);
        for (let j = 0; j < width; j++) {
            data[i][j] = Number(tmp[j]);
        }
    }
    return data;
}
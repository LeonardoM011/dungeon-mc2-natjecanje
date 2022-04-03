// Imports
import { Renderer } from './gameEngine/windowManager/renderer';
import { TextureLoader } from './gameEngine/loadManager/textureLoader';
import { SpriteSheetLoader } from './gameEngine/loadManager/spriteSheetLoader';
import { Sprite } from './gameEngine/objectManager/sprite';
import { Texture } from './gameEngine/objectManager/texture';
import { Vector2f } from './gameEngine/math/vector';
import { XMLParser } from './gameEngine/utils/xmlParser';
import { TileMapInfo, TiledParser } from './gameEngine/utils/tiledParser';
import { Tilemap } from './gameEngine/loadManager/tilemap';

let renderer = new Renderer();

let grass : Sprite[] = [];

let spriteSheetLoader = new SpriteSheetLoader();

// TEST
//let xml : TileMapInfo = TiledParser("tilemaps/mapa.tmx");
//console.log(xml.data);
//---------
spriteSheetLoader.add("img/Tilesets/TiledGrass.json", 71, "Grass-");
spriteSheetLoader.load((texture : Texture[][]) => {
  let textures = texture[0];

  let tilemap = new Tilemap("tilemaps/mapa.tmx", textures, new Vector2f(0, 0));

  renderer.renderTilemap(tilemap);

  renderer.gameLoop(mainGameLoop);
});

function mainGameLoop(delta : number) : void {
  
}

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
import { Input } from './gameEngine/inputManager/input';

import * as PIXI from 'pixi.js';

let renderer = new Renderer();

let input = new Input(renderer);

let grass : Sprite[] = [];

let spriteSheetLoader = new SpriteSheetLoader();

// TEST
//let xml : TileMapInfo = TiledParser("tilemaps/mapa.tmx");
//console.log(xml.data);
//---------
spriteSheetLoader.add("img/test/0x72_16x16DungeonTileset.v4.png", 256, 256, 16, 16);
spriteSheetLoader.load((texture : Texture[][]) => {
  let textures = texture[0];
  let tilemap = new Tilemap("img/test/mapa1.tmx", textures, new Vector2f(renderer.width / 2, renderer.height / 2));
  tilemap.scale(new Vector2f(2.6, 2.6));
  //tilemap.pos(new Vector2f(-renderer.width / 2, -renderer.height / 2));
  /*// TEST
  let testSprite = new Sprite(textures[1], new Vector2f(0, 0));
  renderer.renderSprite(testSprite);
  // ------*/

  renderer.renderTilemap(tilemap);


  renderer.gameLoop(mainGameLoop);
});

function mainGameLoop(delta : number) : void {
  //renderer.mouse();
  //console.log();
  console.log(input.getKeyDown('e'));

  interactiveMap(delta);
}

let lastPos : Vector2f;
/**
 * Move across map with right click
 * @param delta deltaTime from mainGameLoop
 */
function interactiveMap(delta : number) : void {
  /*if (input.getMouseButton(renderer) == 0) {
    console.log("HE");
  }*/
  //input.getMouseButton();
}

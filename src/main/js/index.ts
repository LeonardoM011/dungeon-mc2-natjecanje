// Imports
import { Renderer } from './gameEngine/windowManager/renderer';
import { TextureLoader } from './gameEngine/loadManager/textureLoader';
import { Sprite } from './gameEngine/objectManager/sprite';
import { Texture } from './gameEngine/objectManager/texture';
import { Vector2f } from './gameEngine/math/vector';
import { XMLParser } from './gameEngine/utils/xmlParser';
import { TileMapInfo, TiledParser } from './gameEngine/utils/tiledParser';
import { Tilemap } from './gameEngine/objectManager/tilemap';
import { Input } from './gameEngine/inputManager/input';

import * as PIXI from 'pixi.js';

let renderer = new Renderer(0x422800);

let input = new Input(renderer);

let grass : Sprite[] = [];

let textureLoader = new TextureLoader();

// TEST
//let xml : TileMapInfo = TiledParser("tilemaps/mapa.tmx");
//console.log(xml.data);
//---------
let tilemap : Tilemap;

textureLoader.addSheet("img/test/0x72_16x16DungeonTileset.v4.png", 256, 256, 16, 16);
textureLoader.addTexture("img/test/mage.png");
textureLoader.load((texture : Texture[][]) => {
  let sheet = texture[0];
  tilemap = new Tilemap("img/test/mapa1.tmx", sheet, new Vector2f(renderer.width / 2, renderer.height / 2));
  tilemap.setScale(new Vector2f(2.7, 2.7));
  renderer.renderTilemap(tilemap);

  let mageTexture = texture[1][0];
  let mage = new Sprite(mageTexture, new Vector2f(renderer.width / 2, renderer.height / 2));
  renderer.renderSprite(mage);


});

textureLoader.after(() => {
  renderer.gameLoop(mainGameLoop);
});

function mainGameLoop(delta : number) : void {
  //renderer.mouse();
  //console.log();

  interactiveMap(delta);
}

let lastPos = new Vector2f(0, 0);
/**
 * Move across map with right click
 * @param delta deltaTime from mainGameLoop
 */
function interactiveMap(delta : number) : void {
  // Hold right to move map
  let currentPos = input.getMousePos();
  if (input.getButtonDown(2)) {
    let deltaPos = new Vector2f((currentPos.x - lastPos.x) * delta, (currentPos.y - lastPos.y) * delta);
    renderer.moveStage(deltaPos);
  }
  lastPos = currentPos;
  // ----------------------
  // Scroll to zoom in/out
  if (input.getWheelDirection()) {
    renderer.scaleStage(new Vector2f(-input.getWheelDirection() / 125, -input.getWheelDirection() / 125));
  }
  //console.log(input.getWheelDirection());
  // ---------------------

}

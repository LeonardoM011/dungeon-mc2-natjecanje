// Imports
import { Renderer } from './gameEngine/windowManager/renderer';
import { TextureLoader } from './gameEngine/loadManager/textureLoader';
import { Sprite } from './gameEngine/objectManager/sprite';
import { Texture } from './gameEngine/objectManager/texture';
import { Vector2f } from './gameEngine/math/vector';
import { Tilemap } from './gameEngine/objectManager/tilemap';
import { Input } from './gameEngine/inputManager/input';
import { sleep } from './gameEngine/utils/utils';
import * as Acorn from 'acorn';
import * as PIXI from 'pixi.js';
import { CodeBox } from './gameEngine/windowManager/codeBox';

let renderer = new Renderer(0x422800, 0, 300);
let codeBox = new CodeBox();

let input = new Input(renderer);

let grass : Sprite[] = [];

let textureLoader = new TextureLoader();

// TEST
//let xml : TileMapInfo = TiledParser("tilemaps/mapa.tmx");
//console.log(xml.data);
//---------
let tilemap : Tilemap;
let mage : Sprite;

textureLoader.addSheet("img/test/0x72_16x16DungeonTileset.v4.png", 256, 256, 16, 16);
textureLoader.addTexture("img/test/mage.png");
textureLoader.load((texture : Texture[][]) => {
  let sheet = texture[0];
  tilemap = new Tilemap("img/test/mapa1.tmx", sheet, new Vector2f(renderer.width / 2, renderer.height / 2));
  tilemap.setScale(new Vector2f(2.7, 2.7));
  renderer.renderTilemap(tilemap);

  let mageTexture = texture[1][0];
  mage = new Sprite(mageTexture, new Vector2f(renderer.width / 2, renderer.height / 2));
  mage.setScale(new Vector2f(2.7, 2.7));
  renderer.renderSprite(mage);


});

textureLoader.after(() => {
  // COMPILER
  codeBox.addCompileCallback(async () => {
    //let str = codeBox.getContents().split("\n");
    let str = codeBox.getContents();

    let parser = new Acorn.Parser({ecmaVersion: 2020}, str);
    console.log(parser.parse());

    //mage.setPos(new Vector2f(renderer.width / 2, renderer.height / 2));

    /*for (let i = 0; i < str.length; i++) {
      await sleep(500);
      if (str[i] === "LEFT") {
        mage.move(new Vector2f(-100, 0));
      } else if (str[i] === "RIGHT") {
        mage.move(new Vector2f(100, 0));
      } else if (str[i] === "UP") {
        mage.move(new Vector2f(0, -100));
      } else if (str[i] === "DOWN") {
        mage.move(new Vector2f(0, 100));
      }
    }*/
    /*var geval = eval;
    for (let i = 0; i < str.length; i++) {
      await sleep(500);
      let f = Function("return " + str[i]);
      console.log(f());
    }*/
  })

  renderer.gameLoop(mainGameLoop);
});

function mainGameLoop(delta : number) : void {

  // TEST
  
  // ----


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
  // ---------------------
}

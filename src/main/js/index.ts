// Imports
import { Renderer } from './gameEngine/windowManager/renderer';
import { TextureLoader } from './gameEngine/loadManager/textureLoader';
import { Sprite } from './gameEngine/objectManager/sprite';
import { Texture } from './gameEngine/objectManager/texture';
import { Vector2f } from './gameEngine/math/vector';
import { Tilemap } from './gameEngine/objectManager/tilemap';
import { Input } from './gameEngine/inputManager/input';
import { sleep } from './gameEngine/utils/utils';
import { CodeBox } from './gameEngine/windowManager/codeBox';
import { MagePlayer } from './players/magePlayer';
import { Commands } from './languageSystem/commands';
import { SwampMonster } from './npcs/swampMonster';

let renderer = new Renderer(0x422800, 0, 300);
let codeBox = new CodeBox();

let input = new Input(renderer);

let textureLoader = new TextureLoader();

// TEST
//let xml : TileMapInfo = TiledParser("tilemaps/mapa.tmx");
//console.log(xml.data);
//---------
let tilemap : Tilemap;
let mage : MagePlayer;
let swampMonster : SwampMonster;

textureLoader.addSheet("img/test/0x72_16x16DungeonTileset.v4.png", 256, 256, 16, 16);
textureLoader.addTexture("img/test/mage.png");
textureLoader.addTexture("img/test/swampMonster.png");
textureLoader.load((texture : Texture[][]) => {
  let sheet = texture[0];
  tilemap = new Tilemap("img/test/mapa1.tmx", sheet, new Vector2f(renderer.width / 2, renderer.height / 2));
  tilemap.setScale(new Vector2f(2.7, 2.7));
  renderer.renderTilemap(tilemap);

  let mageTexture = texture[1][0];
  mage = new MagePlayer(mageTexture, new Vector2f(renderer.width / 2, renderer.height / 2));
  mage.setScale(new Vector2f(2.7, 2.7));
  renderer.renderSprite(mage);

  let swampMonsterTexture = texture[2][0];
  swampMonster = new SwampMonster(swampMonsterTexture,  new Vector2f(renderer.width / 2, renderer.height / 2 - 200));
  swampMonster.setScale(new Vector2f(2.7, 2.7));
  renderer.renderSprite(swampMonster);
});

textureLoader.after(() => {
  

  // COMPILER
  codeBox.addCompileCallback(async () => {
    let str = codeBox.getContents().split("\n");

    // TODO: RESET SCENE
    //mage.setPos(new Vector2f(renderer.width / 2, renderer.height / 2));
    await sleep(500);
    for (let i = 0; i < str.length; i++) {
      

      let row = str[i].toLocaleUpperCase();

      if (Commands[row]) {
        Commands[row](mage, swampMonster);
        codeBox.markLine(i);
      } else {
        // ERROR IN LINE
        console.log("NE POSTOJI");
        codeBox.markErrorLine(i);
        await sleep(2000);
        codeBox.unmarkLine(i);
        break;
        // ------------
      }
      await sleep(500);
      codeBox.unmarkLine(i);
    }
  })

  renderer.gameLoop(mainGameLoop);
});

function mainGameLoop(delta : number) : void {

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

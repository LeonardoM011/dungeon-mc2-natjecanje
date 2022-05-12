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
import { SwampMonster } from './npcs/swampMonster';
import * as PIXI from 'pixi.js'
import { Commands } from './languageSystem/commands';
import { Bullet } from './objects/bullet';
import { AnimatedSprite } from './gameEngine/objectManager/animatedSprite';
import { HealthBar } from './objects/healthBar';
import { Player } from './players/player';
import { CollisionBox } from './gameEngine/objectManager/collisionBox';

let renderer = new Renderer(0x476930, 0, 300);
let codeBox = new CodeBox();

// Debugging purpose
CollisionBox.showBounds(true);
// ------------------

let input = new Input(renderer);

let textureLoader = new TextureLoader();

let centerX = renderer.width / 2;
let centerY = renderer.height / 2;

let tilemap : Tilemap;
let mage : MagePlayer;
let swampMonster : SwampMonster;
let mageProjExplTex : Texture[] = [];

let mageProjExpl : AnimatedSprite;

textureLoader.addSheet("src/tilesets/overworld_tileset_grass.png", 16, 16);
textureLoader.addSheet("src/animatedSprites/mage_attack_explosion.png", 16, 16);
textureLoader.addTexture("src/sprites/mage.png");
textureLoader.addTexture("src/sprites/swampMonster.png");

textureLoader.load((texture : Texture[][]) => {
  let sheet = texture[0];
  tilemap = new Tilemap("src/tilemaps/map_grass.tmx", sheet, new Vector2f(centerX, centerY));
  renderer.renderTilemap(tilemap, "tilemap");

  for (let i = 0; i < 8; i++) {
    mageProjExplTex.push(texture[1][i]);
  }

  let mageTexture = texture[2][0];
  mage = new MagePlayer(mageTexture, new Vector2f(centerX, centerY + 8), 100, 20, mageProjExplTex);
  mage.setCollison(new Vector2f(0, 0), 12, 16);
  renderer.renderContainer(mage, 'character');

  let swampMonsterTexture = texture[3][0];
  swampMonster = new SwampMonster(swampMonsterTexture,  new Vector2f(centerX, centerY - 100));
  swampMonster.setCollison(new Vector2f(0, 0), 18, 22);
  renderer.renderContainer(swampMonster, 'character');

  // Start zoomed in
  renderer.scaleStage(new Vector2f(1.2, 1.2));
});
 
textureLoader.after(() => {
  // INTERPRETER
  codeBox.addCompileCallback(async () => { interpretCommands(); });

  renderer.gameLoop(mainGameLoop);
});


//let healthBar = new HealthBar(new Vector2f(centerX, centerY), 500, 500);
//renderer.renderContainer(healthBar);


function mainGameLoop(delta : number) : void {
  mage.update(delta, swampMonster);

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
    renderer.scaleStage(new Vector2f(-input.getWheelDirection() / Math.abs(input.getWheelDirection() / 0.01)));
  }
  // ---------------------
}

/*let commands : { [key: string]: Function } = {
  'LIJEVO': () => { mage.move(new Vector2f(-50, 0)); },
  'DESNO': () => { mage.move(new Vector2f(50, 0)); },
  'GORE': () => { mage.move(new Vector2f(0, -50)); },
  'DOLJE': () => { mage.move(new Vector2f(0, 50)); },
  // TODO: REWORK WITH ARGUMENTS
  'NAPADNI CUDOVISTE': () => {
    /*let mX = mage.pos.x;
    let mY = mage.pos.y;
    let sX = swampMonster.pos.x;
    let sY = swampMonster.pos.y;
    let velVector = new Vector2f(sX - mX, sY - mY);
    velVector = velVector.normalize();
    velVector = velVector.multiplyVal(2);
    //mage.attack(swampMonster);
    let bullet = new Bullet(mageProjExplTex, mage.pos, 0.3, velVector);
    bullet.setScale(new Vector2f(2.7, 2.7));
    renderer.renderAnimSprite(bullet, "front");
    mageProjectile.push(bullet);*/
  /*},
  '': () => { },
};*/


async function interpretCommands() {
  //if(!interpreter.running) return;
  //interpreter.interpret(codeBox.getContents());
  let str = codeBox.getContents().split("\n");
  let currentLine
  // TODO: RESET SCENE
  //mage.setPos(new Vector2f(renderer.width / 2, renderer.height / 2));
  await sleep(500);
  for (let i = 0; i < str.length; i++) {
      
    //let row = str[i].split(/\s+/).join(' ').toLocaleUpperCase();
    let row = str[i].replace(/\s+/g,' ').trim().toLocaleUpperCase();

    let commandLine = row.split(' ');
    let commandLineArgs = row.split(' ');
    commandLineArgs.shift();

    if (Commands[commandLine[0]]) {
      let status = Commands[commandLine[0]]({
        renderer: renderer,
        player: mage,
        monster: swampMonster,
        args: commandLineArgs
      });

      if (status != 0) {
        errorLine(i);
        break;
      }

      codeBox.markLine(i);
    } else {
      errorLine(i);
      break;
    }
    await sleep(500);
    codeBox.unmarkLine(i);
  }
}

async function errorLine(lineNum : number) {
  console.log("NE POSTOJI");
  codeBox.markErrorLine(lineNum);
  await sleep(2000);
  codeBox.unmarkLine(lineNum);
}
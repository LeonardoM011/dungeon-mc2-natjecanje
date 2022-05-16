// Imports
import { Renderer } from './gameEngine/windowManager/renderer';
import { TextureLoader } from './gameEngine/loadManager/textureLoader';
import { Sprite } from './gameEngine/objectManager/sprite';
import { Texture } from './gameEngine/objectManager/texture';
import { Vector2f } from './gameEngine/math/vector';
import { Tilemap } from './gameEngine/objectManager/tilemap';
import { Input } from './gameEngine/inputManager/input';
import { getRandomInt, sleep } from './gameEngine/utils/utils';
import { CodeBox } from './gameEngine/windowManager/codeBox';
import { MagePlayer } from './players/magePlayer';
import { OgreBoss } from './npcs/OgreBoss';
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
CollisionBox.showBounds(false);
// ------------------

let input = new Input(renderer);

let textureLoader = new TextureLoader();

let centerX = renderer.width / 2;
let centerY = renderer.height / 2;

let tilemap : Tilemap;
let mage : MagePlayer;
let ogreBoss : OgreBoss;
let mageProjExplTex : Texture[] = [];

let mageProjExpl : AnimatedSprite;

let colliders : CollisionBox[] = [];

textureLoader.addSheet("src/tilesets/overworld_tileset_grass.png", 16, 16);
textureLoader.addSheet("src/animatedSprites/mage_attack_explosion.png", 16, 16);
textureLoader.addSheet("src/sprites/mage.png", 16, 32);
textureLoader.addSheet("src/animatedSprites/stone.png", 16, 16);
textureLoader.addSheet("src/sprites/ogre.png", 32, 32);

textureLoader.load((texture : Texture[][]) => {
  let sheet = texture[0];
  tilemap = new Tilemap("src/tilemaps/map_grass.tmx", sheet, new Vector2f(centerX, centerY));
  colliders.push(new CollisionBox(new Vector2f(520, 66), 16, 272));
  colliders.push(new CollisionBox(new Vector2f(984, 66), 16, 272));
  colliders.push(new CollisionBox(new Vector2f(520, 66), 480, 16));
  colliders.push(new CollisionBox(new Vector2f(520, 322), 480, 16));
  renderer.renderTilemap(tilemap, "tilemap");

  for (let i = 0; i < 8; i++) {
    mageProjExplTex.push(texture[1][i]);
  }

  let mageTextureIdle = texture[2].slice(0, 5);
  let mageTextureRun = texture[2].slice(6, 9);
  mage = new MagePlayer(mageTextureIdle, new Vector2f(centerX, centerY + 12), mageProjExplTex, mageTextureRun);
  mage.setCollison(new Vector2f(0, 8), 12, 16);
  renderer.renderContainer(mage, 'character');

  let ogreAttackTexture = texture[3].slice(0, 8);

  let ogreTextureIdle = texture[4].slice(0, 4);
  let ogreTextureRun = texture[4].slice(5, 8);
  ogreBoss = new OgreBoss(ogreTextureIdle,  new Vector2f(centerX, centerY - 100), ogreTextureRun, ogreAttackTexture);
  ogreBoss.setCollison(new Vector2f(0, 0), 18, 22);
  renderer.renderContainer(ogreBoss, 'character');



  // Render colliders
  colliders.forEach(e => {
    renderer.renderContainer(e.graphics);
  });

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
  mage.update(delta, ogreBoss, colliders);
  ogreBoss.update(delta, mage, colliders);

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
  await sleep(1000);
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
        monster: ogreBoss,
        colliders: colliders,
        args: commandLineArgs
      });

      bossMove();

      if (status != 0) {
        errorLine(i);
        break;
      }

      codeBox.markLine(i);
    } else {
      errorLine(i);
      break;
    }
    await sleep(1000);
    codeBox.unmarkLine(i);
  }
}

async function errorLine(lineNum : number) {
  console.log("NE POSTOJI");
  codeBox.markErrorLine(lineNum);
  await sleep(2000);
  codeBox.unmarkLine(lineNum);
}

function bossMove() : void {
  switch(getRandomInt(8)) {
    case 0:
      ogreBoss.move(new Vector2f(16, 0));
      break;
    case 1:
      ogreBoss.move(new Vector2f(-16, 0));
      break;
    case 2:
      ogreBoss.move(new Vector2f(0, 16));
      break;
    case 3:
      ogreBoss.move(new Vector2f(0, 16));
      break;
    case 4:
    case 5:
    case 6:
      ogreBoss.attack(renderer, mage);
      break;
    case 7:
    default:
      break;
  }
}
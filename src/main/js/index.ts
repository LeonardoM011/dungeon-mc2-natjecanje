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
import { BackgroundTiles } from './objects/backgroundTiles';
import { HealerPlayer } from './players/healerPlayer';
import { TankPlayer } from './players/tankPlayer';

let renderer = new Renderer(0x476930, 0, 300);
let consoleMage = new CodeBox("consoleMage");
let consoleHealer = new CodeBox("consoleHealer");
let consoleTank = new CodeBox("consoleTank");

// Debugging purpose
CollisionBox.showBounds(false);
// ------------------

let input = new Input(renderer);

let textureLoader = new TextureLoader();

let centerX = renderer.width / 2;
let centerY = renderer.height / 2;

let tilemap : BackgroundTiles;
let mage : MagePlayer;
let healer : HealerPlayer;
let tank : TankPlayer;
let ogreBoss : OgreBoss;
let mageProjExplTex : Texture[] = [];

let mageProjExpl : AnimatedSprite;

let colliders : CollisionBox[] = [];

textureLoader.addSheet("src/tilesets/overworld_tileset_grass.png", 16, 16);
textureLoader.addSheet("src/animatedSprites/mage_attack_explosion.png", 16, 16);
textureLoader.addSheet("src/sprites/mage.png", 16, 32);
textureLoader.addSheet("src/animatedSprites/stone.png", 16, 16);
textureLoader.addSheet("src/sprites/ogre.png", 32, 32);
textureLoader.addSheet("src/animatedSprites/healer_heal.png", 16, 16);
textureLoader.addSheet("src/sprites/healer.png", 16, 32);
textureLoader.addSheet("src/sprites/tank.png", 16, 32);

textureLoader.load((texture : Texture[][]) => {
  let sheet = texture[0];
  tilemap = new BackgroundTiles("src/tilemaps/map_grass.tmx", sheet, new Vector2f(centerX, centerY));
  tilemap.addCollider(new Vector2f(-248, -144), 16, 272);
  tilemap.addCollider(new Vector2f(216, -144), 16, 272);
  tilemap.addCollider(new Vector2f(-248, 112), 480, 16);
  tilemap.addCollider(new Vector2f(-248, -144), 480, 16);
  renderer.render(tilemap, "tilemap");

  for (let i = 0; i < 8; i++) {
    mageProjExplTex.push(texture[1][i]);
  }

  let mageTextureIdle = texture[2].slice(0, 5);
  let mageTextureRun = texture[2].slice(6, 9);
  mage = new MagePlayer(mageTextureIdle, mageTextureRun, new Vector2f(centerX - 48, centerY + 60), mageProjExplTex);
  renderer.render(mage, 'character');

  let ogreAttackTexture = texture[3].slice(0, 8);

  let ogreTextureIdle = texture[4].slice(0, 4);
  let ogreTextureRun = texture[4].slice(5, 8);
  ogreBoss = new OgreBoss(ogreTextureIdle,  new Vector2f(centerX, centerY - 100), ogreTextureRun, ogreAttackTexture);
  ogreBoss.setCollison(new Vector2f(0, 0), 18, 22);
  renderer.render(ogreBoss, 'character');

  let healerProjectile : Texture[] = [];
  for (let i = 0; i < 8; i++) {
    healerProjectile.push(texture[5][i]);
  }

  let healerTextureIdle = texture[6].slice(0, 5);
  let healerTextureRun = texture[6].slice(6, 9);
  healer = new HealerPlayer(healerTextureIdle, healerTextureRun, new Vector2f(centerX, centerY + 60), healerProjectile);
  renderer.render(healer, 'character');

  let tankTextureIdle = texture[7].slice(0, 5);
  let tankTextureRun = texture[7].slice(6, 9);
  tank = new TankPlayer(tankTextureIdle, tankTextureRun, new Vector2f(centerX + 48, centerY + 60));
  renderer.render(tank, 'character');

  // Render colliders
  colliders.forEach(e => {
    renderer.render(e.graphics);
  });

  // Start zoomed in
  renderer.scaleStage(new Vector2f(1.2, 1.2));
});
 
textureLoader.after(() => {
  // INTERPRETER
  consoleMage.addCompileCallback(async () => { interpretCommands(); });

  renderer.gameLoop(mainGameLoop);
});


//let healthBar = new HealthBar(new Vector2f(centerX, centerY), 500, 500);
//renderer.renderContainer(healthBar);


function mainGameLoop(delta : number) : void {
  mage.update(delta, ogreBoss, colliders);
  healer.update(delta, ogreBoss, [tank, mage], colliders);
  tank.update(delta, ogreBoss, colliders);
  ogreBoss.update(delta, [mage, healer, tank], colliders);

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

async function interpretCommands() {
  //if(!interpreter.running) return;
  //interpreter.interpret(codeBox.getContents());
  let mageContents = consoleMage.getContents().split("\n");
  let healerContents = consoleHealer.getContents().split("\n");
  let tankContents = consoleTank.getContents().split("\n");
  let currentLine
  // TODO: RESET SCENE
  //mage.setPos(new Vector2f(renderer.width / 2, renderer.height / 2));
  
  await sleep(1000);
  
  for (let i = 0; i < Math.max(mageContents.length, healerContents.length, tankContents.length); i++) {
    
    if (i < mageContents.length) {
      let row = mageContents[i].replace(/\s+/g,' ').trim().toLocaleUpperCase();
      let commandLine = row.split(' ');
      let commandLineArgs = row.split(' ');
      commandLineArgs.shift();

      if (Commands[commandLine[0]]) {
        let status = Commands[commandLine[0]]({
          renderer: renderer,
          player: mage,
          monster: ogreBoss,
          colliders: tilemap.colliders,
          args: commandLineArgs
        });

        if (status != 0) {
          errorLine(i, consoleMage);
          break;
        }
      } else {
        errorLine(i, consoleMage);
        break;
      }
      consoleMage.markLine(i);

    }

    if (i < healerContents.length) {
      let row = healerContents[i].replace(/\s+/g,' ').trim().toLocaleUpperCase();
      let commandLine = row.split(' ');
      let commandLineArgs = row.split(' ');
      commandLineArgs.shift();

      if (Commands[commandLine[0]]) {
        let status = Commands[commandLine[0]]({
          renderer: renderer,
          player: healer,
          players: [mage, tank],
          monster: ogreBoss,
          colliders: tilemap.colliders,
          args: commandLineArgs
        });
      
        

        if (status != 0) {
          errorLine(i, consoleHealer);
          break;
        }
      } else {
        errorLine(i, consoleHealer);
        break;
      }
      consoleHealer.markLine(i);
    }

    if (i < tankContents.length) {
      let row = tankContents[i].replace(/\s+/g,' ').trim().toLocaleUpperCase();
      let commandLine = row.split(' ');
      let commandLineArgs = row.split(' ');
      commandLineArgs.shift();

      if (Commands[commandLine[0]]) {
        let status = Commands[commandLine[0]]({
          renderer: renderer,
          player: tank,
          monster: ogreBoss,
          colliders: tilemap.colliders,
          args: commandLineArgs
        });
      
        

        if (status != 0) {
          errorLine(i, consoleTank);
          break;
        }
      } else {
        errorLine(i, consoleTank);
        break;
      }
      consoleTank.markLine(i);

    }
    

    bossMove();
    mage.replanishMana(10);
    healer.replanishMana(10);
    await sleep(1000);
    consoleMage.unmarkLine(i);
    consoleHealer.unmarkLine(i);
    consoleTank.unmarkLine(i);
  }
  await sleep(3000);
  resetLevel();
}

async function errorLine(lineNum : number, consoleClass : CodeBox) {
  console.log("NE POSTOJI");
  consoleClass.markErrorLine(lineNum);
  await sleep(2000);
  consoleClass.unmarkLine(lineNum);
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
      let list = [
        { key: healer, val: ogreBoss.pos.distanceToVec(healer.pos) },
        { key: tank, val: ogreBoss.pos.distanceToVec(tank.pos) },
        { key: mage, val: ogreBoss.pos.distanceToVec(mage.pos) }
      ];
      let closestPlayer = list.sort((a, b) => { return a.val - b.val; })[0];
      
      ogreBoss.attack(renderer, closestPlayer.key);
      break;
    case 7:
    default:
      break;
  }
}

function resetLevel() : void {
  mage.setPos = new Vector2f(centerX - 48, centerY + 60);
  mage.setHealth = 100;
  mage.setMana = 100;

  healer.setPos = new Vector2f(centerX, centerY + 60);
  healer.setHealth = 50;
  healer.setMana = 100;

  tank.setPos = new Vector2f(centerX + 48, centerY + 60);
  tank.setHealth = 200;

  ogreBoss.setPos = new Vector2f(centerX, centerY - 100);
  ogreBoss.setHealth = 200;
}
// Imports
import * as PIXI from 'pixi.js';
import { Renderer } from './gameEngine/renderer';


let renderer = new Renderer();

const loader = new PIXI.Loader();

let grass : PIXI.Sprite[] = [];

loader.add("img/Tilesets/TiledGrass.json")
loader.load(() => {
  let sheet = loader.resources["img/Tilesets/TiledGrass.json"].spritesheet;
  sheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  grass.push(new PIXI.Sprite(sheet.textures["Grass-0"]));
  grass[0].x = 300;
  grass[0].y = 300;
  grass[0].scale.x = 20;
  grass[0].scale.y = 20;
  
  renderer.AddToStage(grass[0]);
});

renderer.GameLoop(mainGameLoop);

function mainGameLoop() {
  
}
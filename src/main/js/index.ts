// Imports
import * as PIXI from 'pixi.js';
import { Renderer } from './gameEngine/renderer';
import { TextureLoader } from './gameEngine/textureLoader';
import { SpriteSheetLoader } from './gameEngine/spriteSheetLoader';


let renderer = new Renderer();

let grass : PIXI.Sprite[] = [];

let spriteSheetLoader = new SpriteSheetLoader();

let chestTexture : PIXI.Texture;
let chestSprite : PIXI.Sprite;

spriteSheetLoader.add("img/Tilesets/TiledGrass.json", 3, "Grass-");
spriteSheetLoader.load((texture : PIXI.Texture[][]) => {
  chestTexture = texture[0][1];
  console.log(texture.length);
  chestSprite = new PIXI.Sprite(chestTexture);
  chestSprite.x = 300;
  chestSprite.y = 300;
  renderer.addToStage(chestSprite);

  renderer.gameLoop(mainGameLoop);
});

/*const loader = new PIXI.Loader();
loader.add("img/Tilesets/TiledGrass.json")
loader.load(() => {
  let sheet = loader.resources["img/Tilesets/TiledGrass.json"].spritesheet;
  sheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  grass.push(new PIXI.Sprite(sheet.textures["Grass-0"]));
  grass[0].x = 300;
  grass[0].y = 300;
  grass[0].scale.x = 20;
  grass[0].scale.y = 20;
  
  renderer.addToStage(grass[0]);

  renderer.gameLoop(mainGameLoop);
});*/

function mainGameLoop() : void {
  //grass[0].x += 1;
}

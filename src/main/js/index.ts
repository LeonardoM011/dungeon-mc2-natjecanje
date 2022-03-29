// Imports
import { Renderer } from './gameEngine/windowManager/renderer';
import { TextureLoader } from './gameEngine/loadManager/textureLoader';
import { SpriteSheetLoader } from './gameEngine/loadManager/spriteSheetLoader';
import { Sprite } from './gameEngine/objectManager/sprite';
import { Texture } from './gameEngine/objectManager/texture';
import { Vector2f } from './gameEngine/math/Vector';

let renderer = new Renderer();

let grass : Sprite[] = [];

let spriteSheetLoader = new SpriteSheetLoader();

let chestTexture : Texture;
let chestSprite : Sprite;

spriteSheetLoader.add("img/Tilesets/TiledGrass.json", 71, "Grass-");
spriteSheetLoader.load((texture : Texture[][]) => {
  chestTexture = texture[0][1];
  chestSprite = new Sprite(chestTexture, new Vector2f(300, 300));
  renderer.renderSprite(chestSprite);

  renderer.gameLoop(mainGameLoop);
});

function mainGameLoop(delta : number) : void {
  chestSprite.move(new Vector2f(1, 0), delta);
  console.log(delta);
}

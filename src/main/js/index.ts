// Imports
import * as PIXI from 'pixi.js';


// Constants


let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const canvas = <HTMLCanvasElement> document.getElementById("mycanvas");

const renderer = new PIXI.Renderer({
    view: canvas, 
    width: windowWidth, 
    height: windowHeight, 
    backgroundColor: 0x1099bb, 
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
});

window.addEventListener("resize", resizeEvent);

function resizeEvent() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  renderer.resize(windowWidth, windowHeight);
}

const stage = new PIXI.Container();
const loader = new PIXI.Loader();
const ticker = new PIXI.Ticker();


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
  stage.addChild(grass[0]);
});




ticker.add(mainGameLoop);
ticker.start();

function mainGameLoop() {


  renderer.render(stage);
}
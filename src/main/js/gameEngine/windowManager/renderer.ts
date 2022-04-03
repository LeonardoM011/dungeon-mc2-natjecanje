import * as PIXI from 'pixi.js';
import { Tilemap } from '../loadManager/tilemap';
import { Sprite } from '../objectManager/sprite';

export class Renderer {
    
    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("mycanvas");
        
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        this.pixiRenderer = new PIXI.Renderer({
            view: this.canvas, 
            width: this.windowWidth - this.windowOffsetX, 
            height: this.windowHeight - this.windowOffsetY, 
            backgroundColor: 0x1099bb, 
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        window.addEventListener("resize", this.resizeEvent.bind(this));

        this.ticker = new PIXI.Ticker;
        this.stage = new PIXI.Container;
    }

    public renderSprite(sprite : Sprite) : void {
        this.stage.addChild(sprite.sprite);
    }

    public renderTilemap(tilemap : Tilemap) : void {
        let sprites = tilemap.sprites;
        sprites.forEach(arr => {
            arr.forEach(e => {
                if (e != undefined) {
                    this.stage.addChild(e.sprite);
                }
            });
        });
    }

    public gameLoop(fn : any /* Has to be of type any */) : void {
        this.ticker.add((delta) => { fn(delta); });
        this.ticker.add(this.afterGameLoop.bind(this));
        this.ticker.start();
    }

    // Run after MainGameLoop
    private afterGameLoop() : void {

        this.pixiRenderer.render(this.stage);
    }

    // Run when resizing window
    private resizeEvent() : void {
        this.windowWidth = window.innerWidth - this.windowOffsetX;
        this.windowHeight = window.innerHeight - this.windowOffsetY;
        this.pixiRenderer.resize(this.windowWidth - this.windowOffsetX, this.windowHeight - this.windowOffsetY);
    }

    private windowOffsetX = 0;
    private windowOffsetY = 0;
    private windowWidth : number;
    private windowHeight : number;
    private ticker : PIXI.Ticker;
    private stage : PIXI.Container;
    private pixiRenderer : PIXI.Renderer;
    private canvas : HTMLCanvasElement;
}
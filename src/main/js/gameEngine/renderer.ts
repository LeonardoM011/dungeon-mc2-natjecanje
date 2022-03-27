import * as PIXI from 'pixi.js';

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

    public addToStage(sprite : PIXI.Sprite) {
        this.stage.addChild(sprite);
    }

    public gameLoop(fn : any /* Has to be of type any */) {
        this.ticker.add(fn);
        this.ticker.add(this.afterGameLoop.bind(this));
        this.ticker.start();
    }

    // Run after MainGameLoop
    private afterGameLoop() {

        this.pixiRenderer.render(this.stage);
    }

    // Run when resizing window
    private resizeEvent() {
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
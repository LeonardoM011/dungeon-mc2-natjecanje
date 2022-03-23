import * as PIXI from 'pixi.js';

export class Renderer {
    public constructor() {
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

        window.addEventListener("resize", this.ResizeEvent.bind(this));

        this.ticker = new PIXI.Ticker;
        this.stage = new PIXI.Container;
    }

    public AddToStage(sprite : PIXI.Sprite) {
        this.stage.addChild(sprite);
    }

    public GameLoop(fn : Function) {
        this.gameLoopFn = fn;
        this.ticker.add(this.MainGameLoop.bind(this));
        this.ticker.start();
    }

    private MainGameLoop() {
        this.gameLoopFn();

        this.pixiRenderer.render(this.stage);
    }

    private ResizeEvent() {
        this.windowWidth = window.innerWidth - this.windowOffsetX;
        this.windowHeight = window.innerHeight - this.windowOffsetY;
        this.pixiRenderer.resize(this.windowWidth - this.windowOffsetX, this.windowHeight - this.windowOffsetY);
    }

    private windowOffsetX : number = 0;
    private windowOffsetY : number = 0;
    private windowWidth : number;
    private windowHeight : number;
    private gameLoopFn : Function;
    private ticker : PIXI.Ticker;
    private stage : PIXI.Container;
    private pixiRenderer : PIXI.Renderer;
    private canvas : HTMLCanvasElement;
}
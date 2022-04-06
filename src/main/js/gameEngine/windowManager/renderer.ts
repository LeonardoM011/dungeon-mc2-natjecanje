import * as PIXI from 'pixi.js';
import { Input } from '../inputManager/input';
import { Tilemap } from '../loadManager/tilemap';
import { Sprite } from '../objectManager/sprite';

export class Renderer {
    
    /** Initialize renderer, must call on top of the script */
    constructor() {
        // Grab canvas element
        this.htmlCanvas = <HTMLCanvasElement> document.getElementById("mycanvas");
        
        // Resize renderer to be fullscreen
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        
        this.pixiRenderer = new PIXI.Renderer({
            view: this.htmlCanvas, 
            width: this.windowWidth - this.windowOffsetX, 
            height: this.windowHeight - this.windowOffsetY, 
            backgroundColor: 0x1099bb, 
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        window.addEventListener("resize", this.resizeEvent.bind(this));
        this.disableContextMenu();

        // ---- INIT ----
        this.ticker = new PIXI.Ticker;
        this.stage = new PIXI.Container;
        // --------------
    }

    /**
     * Render sprite object
     * @param sprite sprite which you want to render
     */
    public renderSprite(sprite : Sprite) : void {
        this.stage.addChild(sprite.sprite);
    }

    /**
     * Render tilemap object
     * @param tilemap tilemap which you want to render
     */
    public renderTilemap(tilemap : Tilemap) : void {
        /*let sprites = tilemap.sprites;
        sprites.forEach(arr => {
            arr.forEach(e => {
                if (e != undefined) {
                    this.stage.addChild(e.sprite);
                }
            });
        });*/
        this.stage.addChild(tilemap.container);
    }

    /**
     * Set your MainGameLoop, needs to have an argument of delta : number
     * @param fn Callback function of your Main Game Loop
     */
    public gameLoop(fn : Function) : void {
        this.ticker.add((delta) => { fn(delta); });
        this.ticker.add(this.afterGameLoop.bind(this));
        this.ticker.start();
    }

    /** This function is run after mainGameLoop, used for renderer things user doesn't want to see */
    private afterGameLoop() : void {

        this.pixiRenderer.render(this.stage);
    }

    /** Returns window width in pixels */
    get width() : number {
        return this.windowWidth;
    }

    /** Returns window height in pixels */
    get height() : number {
        return this.windowHeight;
    }

    /** Return PIXI.Renderer */
    get renderer() : PIXI.Renderer {
        return this.pixiRenderer;
    }

    /** Return canvas HTMLCanvasElement */
    get canvas() : HTMLCanvasElement {
        return this.htmlCanvas;
    }

    /** Callback for resizeWindow event */
    private resizeEvent() : void {
        this.windowWidth = window.innerWidth - this.windowOffsetX;
        this.windowHeight = window.innerHeight - this.windowOffsetY;
        this.pixiRenderer.resize(this.windowWidth - this.windowOffsetX, this.windowHeight - this.windowOffsetY);
    }

    /** Disables right click context and middle click */
    private disableContextMenu() : void {
        this.htmlCanvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    private windowOffsetX = 0;
    private windowOffsetY = 0;
    private windowWidth : number;
    private windowHeight : number;
    private ticker : PIXI.Ticker;
    private stage : PIXI.Container;
    private pixiRenderer : PIXI.Renderer;
    private htmlCanvas : HTMLCanvasElement;
}
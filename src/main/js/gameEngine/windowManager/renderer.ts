import * as PIXI from 'pixi.js';
import { Input } from '../inputManager/input';
import { Tilemap } from '../objectManager/tilemap';
import { Vector2f } from '../math/vector';
import { Sprite } from '../objectManager/sprite';

export class Renderer {
    
    /** Initialize renderer, must call on top of the script */
    /**
     * 
     * @param backgroundColor hexadecimal number that represents color
     */
    constructor(backgroundColor? : number, offsetWidth? : number, offsetHeight? : number) {
        // Grab canvas element
        this.htmlCanvas = <HTMLCanvasElement> document.getElementById("mycanvas");
        
        this.windowOffsetX = offsetWidth;
        this.windowOffsetY = offsetHeight;
        // Resize renderer to be fullscreen
        this.windowWidth = window.innerWidth - this.windowOffsetX;
        this.windowHeight = window.innerHeight - this.windowOffsetY;
        
        // If backgroundColor is unspecified select magenta color
        let backColor = (typeof backgroundColor !== 'undefined' ? backgroundColor : 0xFF00FF);

        this.pixiRenderer = new PIXI.Renderer({
            view: this.htmlCanvas, 
            width: this.windowWidth, 
            height: this.windowHeight, 
            backgroundColor: backColor, 
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            antialias: false,
        });
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.ROUND_PIXELS = false;
        PIXI.settings.RENDER_OPTIONS.antialias = false;

        window.addEventListener("resize", this.resizeEvent.bind(this));
        this.disableContextMenu();

        // ---- INIT ----
        this.ticker = new PIXI.Ticker;
        this.stage = new PIXI.Container;
        // --------------
        this.stage.pivot.x = this.windowWidth / 2;
        this.stage.pivot.y = this.windowHeight / 2;
        this.stage.x = this.windowWidth / 2;
        this.stage.y = this.windowHeight / 2;

        // layers
        this.layers = {
            'background': new PIXI.Container(),
            'tilemap': new PIXI.Container(),
            'default': new PIXI.Container(),
            'character' : new PIXI.Container(),
            'projectile' : new PIXI.Container(),
            'front': new PIXI.Container(),
        };

        // Push every layer to stage
        Object.values(this.layers).forEach(val => {
            this.stage.addChild(val);
        });
    }

    /**
     * Render sprite object
     * @param sprite sprite which you want to render
     */
    public renderSprite(sprite : Sprite, layer? : string) : void {
        if (typeof layer !== 'undefined') {
            this.layers[layer].addChild(sprite.sprite);
        } else {
            this.layers.default.addChild(sprite.sprite);
        }
    }

    /**
     * Render tilemap object
     * @param tilemap tilemap which you want to render
     */
    public renderTilemap(tilemap : Tilemap, layer? : string) : void {
        if (typeof layer !== 'undefined') {
            this.layers[layer].addChild(tilemap.container);
        } else {
            this.layers.default.addChild(tilemap.container);
        }
    }

    public renderContainer(container : PIXI.Container, layer? : string) : void {
        if (typeof layer !== 'undefined') {
            this.layers[layer].addChild(container);
        } else {
            this.layers.default.addChild(container);
        }
    }

    public setStagePos(value : Vector2f) : void {
        this.stage.x = value.x;
        this.stage.y = value.y;
    }

    public moveStage(value : Vector2f) : void {
        this.stage.x += value.x;
        this.stage.y += value.y;
    }

    public scaleStage(value : Vector2f) : void {
        /*this.stage.pivot.x = 0.5 * this.stage.width;
        this.stage.pivot.y = 0.5 * this.stage.height;*/
        let newScale = new Vector2f(this.stage.scale.x + value.x, this.stage.scale.y + value.y)
        this.stage.scale.set(newScale.x, newScale.y);
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

    get deltaTime() : number {
        return this.ticker.deltaTime;
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
        this.pixiRenderer.resize(this.windowWidth, this.windowHeight);
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
    private layers : { [key: string]: PIXI.Container };
    private pixiRenderer : PIXI.Renderer;
    private htmlCanvas : HTMLCanvasElement;
}
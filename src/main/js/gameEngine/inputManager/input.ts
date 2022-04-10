import * as PIXI from 'pixi.js';
import { Vector2f } from '../math/vector';
import { Renderer } from '../windowManager/renderer';

/**
 * Class for getting input through keyboard or mouse
 */
export class Input {
    /**
     * Init input class
     * @param renderer current active renderer
     */
    constructor(renderer : Renderer) {

        // INIT MAPS
        this.keys = new Map<string, boolean>();
        this.buttons = new Map<number, boolean>();

        // Init inputmanager for use in getting mouse positions
        this.inputManager = new PIXI.InteractionManager(renderer.renderer);

        // EVENT LISTENERS
        renderer.canvas.addEventListener('keydown', this.onKeyDown.bind(this));
        renderer.canvas.addEventListener('keyup', this.onKeyUp.bind(this));
        renderer.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        renderer.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        renderer.canvas.addEventListener('wheel', this.onMouseWheel.bind(this), );

        this.wheelDirection = 0;
        this.scrollTimer = null;
    }

    /**
     * Get mouse position on canvas
     * @returns position in canvas 0,0 is top left
     */
    public getMousePos() : Vector2f {
        //this.inputManager.update;
        let pos = this.inputManager.mouse.global;
        return new Vector2f(Math.floor(pos.x), Math.floor(pos.y));
    }

    /**
     * Get delta of mouseposition, call in a maingameloop
     * @returns delta of currentmousepos - previousmousepos
     */
    /*public getDeltaMousePos() : Vector2f {
        
        if (!this.isLastPosInit) {
            this.lastPos = currentPos;
            this.isLastPosInit = true;
            return new Vector2f(0, 0);
        }
        
        
        return deltaPos;
    }*/

    

    /**
     * Get keyboard key down
     * @param key string for a key that is being checked
     * @returns returns boolean based on if a key is pressed or not.  
     */
    public getKeyDown(key : string) : boolean {
        return (this.keys.has(key) ? this.keys.get(key) : false);
    }
    
    /**
     * Get mouse button down
     * @param button number for a button that is being checked  
     * -1 = no button, 0 = left click, 1 = middle click, 2 = right click
     * @returns returns boolean based on if a button is pressed or not.  
     */
    public getButtonDown(button : number) : boolean {
        return (this.buttons.has(button) ? this.buttons.get(button) : false);
    }

    public getWheelDirection() : number {
        let wd = this.wheelDirection;
        return wd;
    }

    // ---- CALLBACKS ----
    private onKeyDown(e : KeyboardEvent) : void {
        this.keys.set(e.key, true);
    }

    private onKeyUp(e : KeyboardEvent) : void {
        this.keys.set(e.key, false);
    }

    private onMouseDown(e : MouseEvent) : void {
        this.buttons.set(e.button, true);
    }

    private onMouseUp(e : MouseEvent) : void {
        this.buttons.set(e.button, false);
    }

    private onMouseWheel(e : WheelEvent) {
        // Normalize wheel value
        let wheel = e.deltaY / Math.abs(e.deltaY);
        this.wheelDirection = wheel;

        if(this.scrollTimer !== null) {
            clearTimeout(this.scrollTimer);        
        }
        this.scrollTimer = window.setTimeout(() => {
            this.wheelDirection = 0;
        }, 150);
    }
    // -------------------

    private inputManager : PIXI.InteractionManager;
    private keys : Map<string, boolean>;
    private buttons : Map<number, boolean>;
    private wheelDirection : number;
    private scrollTimer : number;
};
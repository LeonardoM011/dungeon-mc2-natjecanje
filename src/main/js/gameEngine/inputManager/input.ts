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
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        renderer.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        renderer.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
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

    /*public getDeltaMousePos() : Vector2f {


        return new Vector2f(Math.floor(pos.x), Math.floor(pos.y));
    }*/

    /**
     * Get keyboard key down
     * @param key string for a key that is being checked
     * @returns returns string based on a key pressed.  
     */
    public getKeyDown(key : string) : boolean {
        return (this.keys.has(key) ? this.keys.get(key) : false);
    }
    
    /**
     * Get mouse button down
     * @param button number for a button that is being checked
     * @returns returns number based on a button pressed.  
     * -1 = no button, 0 = left click, 1 = middle click, 2 = right click
     */
    public getButtonDown(button : number) : boolean {
        return (this.buttons.has(button) ? this.buttons.get(button) : false);
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
    // -------------------

    private inputManager : PIXI.InteractionManager;
    private keys : Map<string, boolean>;
    private buttons : Map<number, boolean>;
};
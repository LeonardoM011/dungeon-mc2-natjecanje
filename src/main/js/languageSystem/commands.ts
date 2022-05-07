import { Vector2f } from "../gameEngine/math/vector";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { SwampMonster } from "../npcs/swampMonster";
import { Player } from "../players/player";

/*function shootBullet() {
    let mX = mage.pos.x;
    let mY = mage.pos.y;
    let sX = swampMonster.pos.x;
    let sY = swampMonster.pos.y;
    let velVector = new Vector2f(sX - mX, sY - mY);
    velVector = velVector.normalize();
    velVector = velVector.multiplyVal(2);
    //mage.attack(swampMonster);
    let bullet = new Bullet(mageProjExplTex, mage.pos, 0.3, velVector);
    bullet.setScale(new Vector2f(2.7, 2.7));
    renderer.renderAnimSprite(bullet, "front");
    mageProjectile.push(bullet);
}*/

export type objects = {
    num1 : number,
    num2 : number

}

//let  = objects.renderer;



export let Commands : { [key: string]: Function } = {

    'LIJEVO': (...args : any[]) : number => {
        let renderer : Renderer = args[0];
        let player : Player = args[1];
        player.move(new Vector2f(-50, 0)); 
        return 0;
    },
    'DESNO': (...args : any[]) : number => { 
        let renderer : Renderer = args[0];
        let player : Player = args[1];
        player.move(new Vector2f(50, 0)); 
        return 0;
    },
    'GORE': (...args : any[]) : number => { 
        let renderer : Renderer = args[0];
        let player : Player = args[1];
        player.move(new Vector2f(0, -50)); 
        return 0;
    },
    'DOLJE': (...args : any[]) : number => { 
        let renderer : Renderer = args[0];
        let player : Player = args[1];
        player.move(new Vector2f(0, 50)); 
        return 0;
    },
    // TODO: REWORK WITH ARGUMENTS
    'NAPADNI': (...args : any[]) : number => {
        let renderer : Renderer = args[0];
        let player : Player = args[1];
        let swampCoords : Vector2f = args[2];
        let monster : string = args[3];
        // If monster isn't specified return error
        if (monster !== "CUDOVISTE" && monster !== "ČUDOVISTE") {
            return -1;
        }



        return 0;
    },
    '': (...args : any[]) : number => { return 0; },
};
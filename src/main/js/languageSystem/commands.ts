import { Vector2f } from "../gameEngine/math/vector";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Boss } from "../npcs/boss";
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


export type commandArgs = {
    renderer : Renderer,
    player : Player,
    monster : Boss,
    args? : string[]
};

export let Commands : { [key: string]: Function } = {

    'LIJEVO': (args : commandArgs) : number => {
        args.player.move(new Vector2f(-16, 0)); 
        return 0;
    },
    'DESNO': (args : commandArgs) : number => { 
        args.player.move(new Vector2f(16, 0)); 
        return 0;
    },
    'GORE': (args : commandArgs) : number => { 
        args.player.move(new Vector2f(0, -16)); 
        return 0;
    },
    'DOLJE': (args : commandArgs) : number => { 
        args.player.move(new Vector2f(0, 16)); 
        return 0;
    },
    // TODO: REWORK WITH ARGUMENTS
    'NAPADNI': (args : commandArgs) : number => {
        // If monster isn't specified return error
        if (!(args.args[0] === "CUDOVISTE" || args.args[0] === "ČUDOVIŠTE"))
            return -1;

        args.player.attack(args.renderer, args.monster);
        return 0;
    },
    '': (args : commandArgs) : number => { return 0; },
};
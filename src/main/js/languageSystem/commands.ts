import { Vector2f } from "../gameEngine/math/vector";
import { CollisionBox } from "../gameEngine/objectManager/collisionBox";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Boss } from "../npcs/boss";
import { HealerPlayer } from "../players/healerPlayer";
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
    players : Player[],
    monster : Boss,
    colliders : CollisionBox[],
    args? : string[]
};

export let Commands : { [key: string]: Function } = {

    'LIJEVO': (args : commandArgs) : number => {
        args.player.move(new Vector2f(-16, 0), args.colliders); 
        return 0;
    },
    'DESNO': (args : commandArgs) : number => { 
        args.player.move(new Vector2f(16, 0), args.colliders); 
        return 0;
    },
    'GORE': (args : commandArgs) : number => { 
        args.player.move(new Vector2f(0, -16), args.colliders); 
        return 0;
    },
    'DOLJE': (args : commandArgs) : number => { 
        args.player.move(new Vector2f(0, 16), args.colliders); 
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
    'IZLIJECI': (args : commandArgs) : number => {
        if (!(args.args[0] === "MAGE" || args.args[0] === "MAGEA" || args.args[0] === "TANK" || args.args[0] === "TANKA"))
            return -1;
        
        if (!(args.player instanceof HealerPlayer))
            return -1;

        if (args.args[0] === "MAGE" || args.args[0] === "MAGEA")
            args.player.throwHeal(args.renderer, args.players[0]);

        else if (args.args[0] === "TANK" || args.args[0] === "TANKA")
            args.player.throwHeal(args.renderer, args.players[1]);
        
        return 0;
    },
    'IZLIJEČI': (args : commandArgs) : number => {
        if (!(args.args[0] === "MAGE" || args.args[0] === "MAGEA" || args.args[0] === "TANK" || args.args[0] === "TANKA"))
            return -1;
        
        if (typeof (args.player) != typeof(HealerPlayer))
            return -1;

        if (args.args[0] === "MAGE" || args.args[0] === "MAGEA")
            args.player.throwHeal(args.renderer, args.players[0]);

        else if (args.args[0] === "TANK" || args.args[0] === "TANKA")
            args.player.throwHeal(args.renderer, args.players[1]);
        
        return 0;
    },
    '': (args : commandArgs) : number => { return 0; },
};
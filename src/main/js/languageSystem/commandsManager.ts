import { Vector2f } from "../gameEngine/math/vector";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { SwampMonster } from "../npcs/swampMonster";
import { Player } from "../players/player";


export class CommandsManager {

    constructor(swampMonster : SwampMonster, renderer : Renderer) {
        this.swampMonster = swampMonster;
    }

    public commands : { [key: string]: Function } =
    {
        'LIJEVO': (player : Player) => { player.move(new Vector2f(-50, 0)); },
        'DESNO': (player : Player) => { player.move(new Vector2f(50, 0)); },
        'GORE': (player : Player) => { player.move(new Vector2f(0, -50)); },
        'DOLJE': (player : Player) => { player.move(new Vector2f(0, 50)); },
        // TODO: REWORK WITH ARGUMENTS
        'NAPADNI CUDOVISTE': (player : Player) => { 
            //this.player.attack(this.swampMonster); 
        
        },


        
        '': (player : Player) => {},
    };

    private swampMonster : SwampMonster;
};
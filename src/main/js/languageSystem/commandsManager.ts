import { Vector2f } from "../gameEngine/math/vector";
import { SwampMonster } from "../npcs/swampMonster";
import { Player } from "../players/player";


export class CommandsManager {

    constructor(player : Player, swampMonster : SwampMonster) {
        this.player = player;
        this.swampMonster = swampMonster;
    }

    public commands : { [key: string]: Function } =
    {
        'LIJEVO': () => { this.player.move(new Vector2f(-50, 0)); },
        'DESNO': () => { this.player.move(new Vector2f(50, 0)); },
        'GORE': () => { this.player.move(new Vector2f(0, -50)); },
        'DOLJE': () => { this.player.move(new Vector2f(0, 50)); },
        // TODO: REWORK WITH ARGUMENTS
        'NAPADNI CUDOVISTE': () => { this.player.attack(this.swampMonster); },


        
        '': () => {},
    };

    private player : Player;
    private swampMonster : SwampMonster;
};
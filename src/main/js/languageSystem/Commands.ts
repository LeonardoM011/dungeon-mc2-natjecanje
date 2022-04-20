import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";
import { Boss } from "../npcs/boss";
import { Player } from "../players/player";

export let Commands : { [key: string]: Function } =
{
    'LIJEVO': (player : Player, boss? : Boss) => { player.move(new Vector2f(-50, 0)); },
    'DESNO': (player : Player, boss? : Boss) => { player.move(new Vector2f(50, 0)); },
    'GORE': (player : Player, boss? : Boss) => { player.move(new Vector2f(0, -50)); },
    'DOLJE': (player : Player, boss? : Boss) => { player.move(new Vector2f(0, 50)); },
    // TODO: REWORK WITH ARGUMENTS
    'NAPADNI CUDOVISTE': (player : Player, boss : Boss) => { player.attack(boss); },
};
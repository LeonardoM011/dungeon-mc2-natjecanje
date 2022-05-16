import { Vector2f } from "../gameEngine/math/vector";
import { Renderer } from "../gameEngine/windowManager/renderer";
import { Boss } from "../npcs/boss";
import { OgreBoss } from "../npcs/OgreBoss";
import { Player } from "../players/player";

export type BossArgs = {
    renderer : Renderer,
    player : Player,
    monster : Boss,
    args? : string[]
};

export let BossMoves = [
    (args : BossArgs) : void => {
        
    },
    (args : BossArgs) : void => {

    },
    (args : BossArgs) : void => {

    },
];

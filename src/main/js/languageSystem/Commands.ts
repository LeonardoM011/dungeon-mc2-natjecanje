import { Vector2f } from "../gameEngine/math/vector";
import { Sprite } from "../gameEngine/objectManager/sprite";

export let Commands : { [key: string]: Function } =
{
    'LIJEVO': (sprite : Sprite) => { sprite.move(new Vector2f(-50, 0)); },
    'DESNO': (sprite : Sprite) => { sprite.move(new Vector2f(50, 0)); },
    'GORE': (sprite : Sprite) => { sprite.move(new Vector2f(0, 50)); },
    'DOLJE': (sprite : Sprite) => { sprite.move(new Vector2f(0, -50)); },
};
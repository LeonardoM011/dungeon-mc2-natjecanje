import { Pair } from "../utils/types";

export class Vector2f {
    constructor(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    get x() : number {
        return this._x;
    }

    set x(value : number) {
        this._x = value;
    }

    get y() : number {
        return this._y;
    }

    set y(value : number) {
        this._x = value;
    }

    set xy(value : Pair) {
        this._x = value.first;
        this._y = value.second;
    }

    private _x : number;
    private _y : number;
}
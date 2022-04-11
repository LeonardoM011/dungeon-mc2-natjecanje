/** Vector2f class for holding a pair of numbers */
export class Vector2f {
    /** Initializes with 2 numbers */
    constructor(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    public reverse() : Vector2f {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    }

    /** Get first value of vector */
    get x() : number {
        return this._x;
    }

    /** Set first value of vector */
    set x(value : number) {
        this._x = value;
    }

    /** Get second value of vector */
    get y() : number {
        return this._y;
    }

    /** Set second value of vector */
    set y(value : number) {
        this._x = value;
    }

    private _x : number;
    private _y : number;
}
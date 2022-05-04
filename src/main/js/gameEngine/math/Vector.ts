/** Vector2f class for holding a pair of numbers */
export class Vector2f {
    /** Initializes with 2 numbers */
    constructor(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    public multiplyVal(val : number) : Vector2f {
        return new Vector2f(this._x * val, this._y * val);
    }

    public multiplyVec(vec : Vector2f) : Vector2f {
        return new Vector2f(this._x * vec.x, this._y * vec.y);
    }

    public addVal(val : number) : Vector2f {
        return new Vector2f(this._x + val, this._y + val);
    }

    public addVec(vec : Vector2f) : Vector2f {
        return new Vector2f(this._x + vec.x, this._y + vec.y);
    }

    /*public multiplyVec(vec : Vector2f) : Vector2f {
        this._x *= val;
        this._y *= val;
        return new Vector2f(this._x * val, this._y * val);
    }*/

    /*public divideVal(val : number) : Vector2f {
        return new Vector2f()
    }*/

    public length() : number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    public normalize() : Vector2f {
        return new Vector2f(this._x / this.length(), this._y / this.length());
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
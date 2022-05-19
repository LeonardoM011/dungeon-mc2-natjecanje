/** Vector2f class for holding a pair of numbers */
export class Vector2f {
    /** Initializes with 2 numbers, if x and y are the same only give 1 argument */
    constructor(x : number, y? : number) {
        if (typeof y !== 'undefined') {
            // If 2 arguments are given set x and y normally
            this._x = x;
            this._y = y;
        } else {
            // If only 1 argument is given assume x and y are equal
            this._x = x;
            this._y = x;
        }
    }

    public multiplyVal(val : number) : Vector2f {
        return new Vector2f(this._x * val, this._y * val);
    }

    public multiplyVec(vec : Vector2f) : Vector2f {
        return new Vector2f(this._x * vec.x, this._y * vec.y);
    }

    public divideVal(val : number) : Vector2f {
        return new Vector2f(this._x / val, this._y / val);
    }

    public divideVec(vec : Vector2f) : Vector2f {
        return new Vector2f(this._x / vec.x, this._y / vec.y);
    }

    public addVal(val : number) : Vector2f {
        return new Vector2f(this._x + val, this._y + val);
    }

    public addVec(vec : Vector2f) : Vector2f {
        return new Vector2f(this._x + vec.x, this._y + vec.y);
    }

    public subtractVal(val : number) : Vector2f {
        return new Vector2f(this._x - val, this._y - val);
    }

    public subtractVec(vec : Vector2f) : Vector2f {
        return new Vector2f(this._x - vec.x, this._y - vec.y);
    }

    public length() : number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    public negative() : Vector2f {
        return new Vector2f(-this._x, -this._y);
    }

    public normalize() : Vector2f {
        return new Vector2f(this._x / this.length(), this._y / this.length());
    }

    public distanceToVec(vec : Vector2f) : number {
        return Math.sqrt(Math.pow(this._x - vec.x, 2) + Math.pow(this._y - vec.y, 2));
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
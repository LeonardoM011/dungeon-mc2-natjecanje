/** Matrix2x2 class */
export class Mat2f {
    /** 
     * Initializes with 2D array
     * @param value has to be 2D 2x2 array
    */ 
    constructor(value : number[][]) {
        this.matrix = value;
    }

    /** Returns 2D Array */
    get value() : number[][] {
        return this.matrix;
    }

    private matrix : number[][];
}
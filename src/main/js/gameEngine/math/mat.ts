/** Matrix2x2 class */
export class Mat2f {
    /** 
     * Initializes with 2D array
     * @param value has to be 2D 2x2 array
    */ 
    constructor(value11 : number, value12 : number, value21 : number, value22 : number) {
        this.matrix = [[value11, value12], [value21, value22]];
    }

    /** Returns 2D Array */
    get value() : number[][] {
        return this.matrix;
    }

    private matrix : number[][];
}
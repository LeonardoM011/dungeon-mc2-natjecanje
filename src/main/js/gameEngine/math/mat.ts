export class Mat2f {
    constructor(value : number[][]) {
        this.matrix = value;
    }

    get value() : number[][] {
        return this.matrix;
    }

    private matrix : number[][];
}
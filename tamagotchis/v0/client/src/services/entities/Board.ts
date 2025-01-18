export class Board {
    private size : number;
    private board : number[][];

    constructor(size: number) {
        this.size = size;
        this.board = new Array<Array<number>>(size);
        this.board.fill(new Array(size).fill(0));
        console.log(this.board);
    }

    public getBoard() {
        return this.board;
    }
}
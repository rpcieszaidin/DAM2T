export type ElementsMap = {
    x: number,
    y: number
} 

export class Board {
    private size : number;
    private board : number[][];

    constructor(size: number, elements : ElementsMap[]) {
        this.size = size;
        this.board = new Array<Array<number>>(size);
        this.board.fill(new Array(size).fill(0));
        elements.forEach((item)=> this.board[item.y][item.x] = 5);
    }

    public getBoard() {
        return this.board;
    }
}
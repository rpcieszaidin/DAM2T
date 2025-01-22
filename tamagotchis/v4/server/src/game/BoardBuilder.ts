import { Board } from "./entities/Board";

export class BoardService {
    private static instance: BoardService;
    private constructor() {
    };

    static getInstance(): BoardService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new BoardService();
        return this.instance;
    }

    public getNewBoard(size: number, probability : number = 0.5) {
        const board : Board = {
            size,
            elements: []
        }
        for ( let i = 0; i < size; i+=2 )
            for ( let j=0; j< size; j+=2 ) 
                if (Math.random() > probability) board.elements.push({ 'x': j, 'y': j})
        
        return board;
    }
}

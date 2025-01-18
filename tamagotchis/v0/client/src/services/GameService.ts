import { Board } from "./entities/Board";

export class GameService {
    private board: Board;

    private static instance: GameService;
    private constructor() {
        this.board = new Board(20);
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public init() {
        
    }

}
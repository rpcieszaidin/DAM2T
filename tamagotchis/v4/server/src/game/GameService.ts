import { Socket } from "socket.io";
import { Player } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameStates } from "./entities/Game";
import { ServerService } from "../server/ServerService";
import { outMessages } from "../server/Messages";
import { BoardService } from "./BoardBuilder";
import { BoardSize, Point } from "./entities/Board";

export class GameService {
    private games: Game[];

    private static instance: GameService;
    private constructor() {
        this.games = [];
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public addPlayer(player: Player): boolean {
        const room: Room = RoomService.getInstance().addPlayer(player);
        ServerService.getInstance().addPlayerToRoom(room.name.toString(),player.id);
        const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        const popRandomElement = <Point>(array: Point[] | undefined): Point | undefined  => {
            if (array === undefined) return undefined;
            if (array.length === 0) return undefined;
            const randomIndex = Math.floor(Math.random() * array.length);
            return array.splice(randomIndex, 1)[0];
        }

        if (room.players.length == 1) {
            const game: Game = {
                id: "game" + genRanHex(128),
                state: GameStates.WAITING,
                room: room,
                board: BoardService.getInstance().getNewBoard(BoardSize),
                playersPosition: [
                    { x : 0, y: 0},
                    { x : 0, y: BoardSize-1},
                    { x : BoardSize-1, y: 0},
                    { x : BoardSize-1, y: BoardSize-1},                ]
            }
            room.game = game;
            this.games.push(game);
        }

        const initPoint : Point | undefined =  popRandomElement(room.game?.playersPosition);
        if (initPoint !== undefined) {
            player.x = initPoint.x;
            player.y = initPoint.y;
            ServerService.getInstance().sendMessage(room.name.toString(),outMessages.newPlayer, {
                x: player.x,
                y: player.y,
                name: `player${room.players.length}`
            } )
        }
        
        if (room.occupied) {
            if (room.game)  {
                room.game.state = GameStates.PLAYING;
                if (ServerService.getInstance().isActive()) {
                    ServerService.getInstance().sendMessage(room.name.toString(),outMessages.board, room.game?.board );
                    ServerService.getInstance().sendMessage(room.name.toString(),outMessages.startGame, "");
                }
            }
            return true;
        }

        return false;
    }
}

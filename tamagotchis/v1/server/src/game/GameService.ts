import { Socket } from "socket.io";
import { Player } from "../player/entities/Player";
import { Room } from "../room/entities/Room";
import { RoomService } from "../room/RoomService";
import { Game, GameStates } from "./entities/Game";
import { ServerService } from "../server/ServerService";
import { outMessages } from "../server/Messages";
import { BoardService } from "./BoardBuilder";

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
        ServerService.getInstance().sendMessage(room.name.toString(),outMessages.newPlayer,"" )
        const genRanHex = (size: Number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        if (room.players.length == 1) {
            const game: Game = {
                id: "game" + genRanHex(128),
                state: GameStates.WAITING,
                room: room,
                board: BoardService.getInstance().getNewBoard(30)
            }
            room.game = game;
            this.games.push(game);
        }

        if (room.occupied) {
            if (room.game)  {
                room.game.state = GameStates.PLAYING;
                if (ServerService.getInstance().isActive()) {
                    //ServerService.getInstance();
                }
            }
            return true;
        }

        return false;
    }
}

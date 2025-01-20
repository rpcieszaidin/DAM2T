import { create } from "zustand";
import { Directions, Player, States, TamagotchiSprite } from "../../entities/Player";
import { Animated, Easing } from "react-native";
import { Board } from "../../services/entities/Board";
import { GameStates } from "../../entities/GameStates";

export interface GameState {
    states: GameStates;
    tamagotchis: Player[];
    board : Board | null;
    setGameStates: ( gameState : GameStates) => void;
    setBoard: (board: Board | null) => void;
    init: () => void;
    move: (name: String, direction: Directions) => boolean;
    addPlayer: (player: Player) => void;
    addControlPlayer: (name: String | null, controlPlayer: TamagotchiSprite) => void;
    newPlayer: (name: String, x : number, y: number) => void;
}

export const GameStore = create<GameState>((set, get) => ({
    states : {
        connected : false,
        players: false,
        board: false,
        start: false,
    },
    setGameStates: (gameState: GameStates) => set((state) => ({ states : gameState })),
    tamagotchis: [],
    board: null,
    setBoard: (board: Board | null) => set((state) => ({ board : board })),
    init: () => {},
    addPlayer: (player: Player) => set((state) => ({ tamagotchis: [...state.tamagotchis, player] })),
    addControlPlayer: (name: String | null, controlPlayer: TamagotchiSprite) => {
        const { tamagotchis, states } = get();
        const player = tamagotchis.find((item) => item.name === name);
        if (player !== undefined) {
            player.component = controlPlayer;
            player.component.position.setValue({ x : 0, y:0})
            player.state = States.Idle;
            if (tamagotchis.length == 1) {
                states.players = true;
                GameStore.getState().setGameStates(states);
            }
            if (name != null)
                GameStore.getState().move(name, Directions.Iddle);
        }
    },
    move: (name: String, direction: Directions) => {
        const { tamagotchis, board } = get();
        const player = tamagotchis.find((item) => item.name === name);
        if (player?.component?.sprite.current != null) {
            if (player.state != States.Moving) {
                player.state = States.Moving;
                player.component.sprite.current.play({
                    type: direction,
                    fps: 8,
                    loop: true
                });
                switch (direction) {
                    case Directions.Left:
                        if (player.posX - 1 < 0) {
                            player.state = States.Idle;
                        } else {
                            const obj = board?.board[player.posY][player.posX-1].ref;
                            if (obj != undefined) {
                                obj.measure((x, y, width, height, pageX, pageY) => {
                                    if (player.component)
                                        Animated.timing(player.component.position.x, {
                                            toValue: pageX,
                                            easing: Easing.ease,
                                            duration: 600,
                                            useNativeDriver: true,
                                        }).start(() => {
                                            player.state = States.Idle;
                                            player.posX--;
                                        });
                                });
                            }
                        }
                        break;
                    case Directions.Right:
                        if (board != null && player.posX + 1 == board.size) {
                            player.state = States.Idle;
                        } else {
                            const obj = board?.board[player.posY][player.posX+1].ref;
                            if (obj != undefined) {
                                obj.measure((x, y, width, height, pageX, pageY) => {
                                    if (player.component)
                                        Animated.timing(player.component.position.x, {
                                            toValue: pageX,
                                            easing: Easing.ease,
                                            duration: 600,
                                            useNativeDriver: true,
                                        }).start(() => {
                                            player.state = States.Idle;
                                            player.posX++;
                                        });
                                });
                            }
                        }
                        break;
                    case Directions.Down:
                        if (board != null && player.posY + 1 == board.size) {
                            player.state = States.Idle;
                            
                        } else {
                            const obj = board?.board[player.posY+1][player.posX].ref;
                            if (obj != undefined) {
                                obj.measure((x, y, width, height, pageX, pageY) => {
                                    if (player.component)
                                        Animated.timing(player.component.position.y, {
                                            toValue: pageY,
                                            easing: Easing.ease,
                                            duration: 600,
                                            useNativeDriver: true,
                                        }).start(() => {
                                            player.state = States.Idle;
                                            player.posY++;
                                        });
                                });
                            }
                        }
                        break;
                        
                    case Directions.Up:
                        if (player.posY - 1 < 0) {
                            player.state = States.Idle;
                        } else {
                            const obj = board?.board[player.posY-1][player.posX].ref;
                            if (obj != undefined) {
                                obj.measure((x, y, width, height, pageX, pageY) => {
                                    if (player.component)
                                        Animated.timing(player.component.position.y, {
                                            toValue: pageY,
                                            easing: Easing.ease,
                                            duration: 600,
                                            useNativeDriver: true,
                                        }).start(() => {
                                            player.state = States.Idle;
                                            player.posY--;
                                        });
                                });
                            }
                        }
                        break;
                    case Directions.Iddle:
                        player.state = States.Idle;
                        break;
                }
            }
            
        }
        return true;
    },
    newPlayer: (name: String, x : number, y: number) => {
        const player: Player = {
            name: name,
            active: true,
            state: States.No_Connected,
            direction: Directions.Up,
            posX: x,
            posY: y,
            component: null
        };
        GameStore.getState().addPlayer(player);
        player.active = true;
    }
}));
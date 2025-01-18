import { create } from "zustand";
import { Directions, Player, States, TamagotchiSprite } from "../../entities/Player";
import Tamagotchi from "../../components/Tamagotchi";
import { Socket } from "socket.io-client";
import { Animated, Easing } from "react-native";
import { GameService } from "../../services/GameService";

export interface GameState {
    tamagotchis: Player[];
    init: () => void;
    move: (name: String, direction: Directions) => boolean;
    addPlayer: (player: Player) => void;
    addControlPlayer: (name: String | null, controlPlayer: TamagotchiSprite) => void;
    newPlayer: (link: Socket | null, name: String) => void;
}

export const GameStore = create<GameState>((set, get) => ({
    tamagotchis: [],
    init: () => {
        const names = ['player1', 'player2', 'player3', 'player4'];
        names.forEach((item) => {
            GameStore.getState().newPlayer(null, item);
        })
    },
    addPlayer: (player: Player) => set((state) => ({ tamagotchis: [...state.tamagotchis, player] })),
    addControlPlayer: (name: String | null, controlPlayer: TamagotchiSprite) => {
        const { tamagotchis } = get();
        const player = tamagotchis.find((item) => item.name === name);
        if (player !== undefined) {
            player.component = controlPlayer;
            player.state = States.Idle;
            if (name != null)
                GameStore.getState().move(name, Directions.Iddle);
        }
    },
    move: (name: String, direction: Directions) => {
        const { tamagotchis } = get();
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
                        Animated.timing(player.component.position.x, {
                            toValue: player.posX -= 45,
                            easing: Easing.ease,
                            duration: 600,
                            useNativeDriver: true,
                        }).start(() => {
                            player.state = States.Idle;
                        });
                        break;
                    case Directions.Right:
                        Animated.timing(player.component.position.x, {
                            toValue: player.posX += 45,
                            easing: Easing.ease,
                            duration: 600,
                            useNativeDriver: true,
                        }).start(() => {
                            player.state = States.Idle;
                        });
                        break;
                    case Directions.Down:
                        Animated.timing(player.component.position.y, {
                            toValue: player.posY += 47,
                            easing: Easing.ease,
                            duration: 600,
                            useNativeDriver: true,
                        }).start(() => {
                            player.state = States.Idle;
                        });
                        break;
                    case Directions.Up:
                        Animated.timing(player.component.position.y, {
                            toValue: player.posY -= 47,
                            easing: Easing.ease,
                            duration: 600,
                            useNativeDriver: true,
                        }).start(() => {
                            player.state = States.Idle;
                        });
                        break;
                    case Directions.Iddle:
                        player.state = States.Idle;
                        break;
                }
            }
        }
        return true;
    },
    newPlayer: (link: Socket | null, name: String) => {
        const player: Player = {
            name: name,
            active: true,
            state: States.No_Connected,
            direction: Directions.Up,
            posX: 0,
            posY: 0,
            link: null,
            component: null
        };
        GameStore.getState().addPlayer(player);
        player.active = true;
    }
}));
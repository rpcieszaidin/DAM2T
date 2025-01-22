import { View } from "react-native";
import { BoardComponentRef } from "../../components/BoardComponent";

export type TileBoard = {
    id: string
    x: number,
    y: number,
    value: number,
    ref: View | null
}

export interface Board {
    size: number;
    board: Array<Array<TileBoard>>;
    refControl: React.MutableRefObject<null>;
} 

import { Player } from "../../player/entities/Player";

export type point = {
    x: number,
    y: number
}

export interface Board {
    size: number,
    elements: point[]
}
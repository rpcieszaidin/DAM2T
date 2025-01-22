export const BoardSize : number = 35;

export type Point = {
    x: number,
    y: number
}

export interface Board {
    size: number,
    elements: Point[]
}
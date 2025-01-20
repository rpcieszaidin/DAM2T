export const BoardSize : number = 5;

export type Point = {
    x: number,
    y: number
}

export interface Board {
    size: number,
    elements: Point[]
}
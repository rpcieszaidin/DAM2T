export const BoardSize : number = 30;

export type Point = {
    x: number,
    y: number
}

export interface Board {
    size: number,
    elements: Point[]
}
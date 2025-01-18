export type Message = {
    type : String,
    content: String
}

export type BoardSet = {
    size: number,
    elements: []
}

export type NewPlayerSet = {
    name : String,
    x: number,
    y: number
}

export type operations = "NEW_PLAYER" | "BOARD_SET";
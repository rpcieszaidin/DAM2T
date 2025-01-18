import { GameStore } from "../screens/store/store";
import React, { useState } from 'react'
import { Board } from "./entities/Board";
import { BoardSet, Message, NewPlayerSet, operations } from "./entities/Message";

export class GameService {
    private board: Board | null;
    private numPlayers : number;
    private actions : Record<operations, any>= {
        "NEW_PLAYER" : this.action_newPlayer,
        "BOARD_SET" : this.action_boardSet
    }
    
    private static instance: GameService;
    private constructor() {
        this.board = null;
        this.numPlayers = 0;
    };

    static getInstance(): GameService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameService();
        return this.instance;
    }

    public init() {
        this.numPlayers = 0;
        this.board = null;
    }

    public do(data: Message) {
        this.actions[data.type as operations](data.content);
    }

    private action_newPlayer(data : NewPlayerSet ) {
        const newPlayer = GameStore.getState().newPlayer;
        this.numPlayers++;
        newPlayer(data.name, data.x, data.y);
    }

    private action_boardSet(data : BoardSet) {
        this.board = new Board(data.size,data.elements);
    }

}
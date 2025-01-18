import { MutableRefObject } from "react";
import { Animated } from "react-native";
import { SpritesMethods } from "react-native-sprites";
import { Socket } from "socket.io-client";

export enum Directions {
    Up = "up", 
    Down = "down",
    Left = "left",
    Right = "right",
    Iddle = "iddle"
}

export enum States {
    No_Connected, Idle, Moving, Hidden, Dead
}

export interface TamagotchiSprite {
    position : Animated.ValueXY;
    sprite : MutableRefObject<SpritesMethods | null>
}

export interface Player {
    name : String,
    active: boolean,
    state : States,
    direction : Directions,
    posX : number,
    posY : number,
    link : Socket | null,
    component: TamagotchiSprite | null

}
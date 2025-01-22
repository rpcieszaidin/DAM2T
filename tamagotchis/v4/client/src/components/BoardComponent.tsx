import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Board } from '../services/entities/Board';
import { GameStore } from '../screens/store/store';
import Tile from './Tile';
import { GameService } from '../services/GameService';
import { Directions } from '../entities/Player';
import Tamagotchi from './Tamagotchi';

export interface BoardComponentRef {
    focus: () => void;
}

const BoardComponent = forwardRef<BoardComponentRef>((props, ref) => {
    const boardTiles: Board | null = GameStore((state) => state.board);
    const players = GameStore((state) => state.tamagotchis);
    const move = GameStore((state) => state.move);

    const movePlayer = (name: String, direction: Directions) => {
        move(name, direction);
    }

    const scrollViewHorizontal = useRef<BoardComponentRef | null>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            //scrollViewHorizontal.current. NO ME SALE BIEN
            console.log("hola");
        }
    }));

    useEffect(() => {
        const changeBoard = GameStore.getState().setBoard;
        if (boardTiles != undefined && boardTiles != null) {
            //boardTiles.refControl = scrollViewHorizontal;   // NO ME SALE BIEN
            changeBoard(boardTiles);
            GameService.getInstance().do({ type: "BOARD_BUILD", content: "" })
        }
    }, [boardTiles])

    return (
        <ScrollView ref={scrollViewHorizontal} horizontal={true} style={styles.scroll2View} contentContainerStyle={styles.scroll2Content}>
            <ScrollView contentContainerStyle={styles.scroll2verticalContent}>
                {
                    players.map((item) => (
                        <Tamagotchi key={item.name.toString()} active={item.active} name={item.name} />
                    ))
                }
                {boardTiles?.board.map((item, indexRow) => (
                    <View key={`rowBoard-${indexRow}`} style={styles.gridContainer}>
                        {item.map((itemColumn, indexColumn) => (
                            <Tile key={`TileComp-${indexColumn}-${indexRow}`} ref={(ref) => {
                                if (boardTiles != null) {
                                    boardTiles.board[indexRow][indexColumn].ref = ref;
                                }
                            }} colIndex={indexColumn} rowIndex={indexRow} value={0} />
                        ))}
                    </View>
                ))}
            </ScrollView >
        </ScrollView>
    )
});

const styles = StyleSheet.create({
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    scroll2View: {
        flex: 0,
        position: "absolute",
        zIndex: 1,
        top: 100,
        left: 0,
    },

    scroll2Content: {
        flexDirection: "row"
    },
    scroll2verticalContent: {
        flexDirection: "column"
    }
})

export default BoardComponent
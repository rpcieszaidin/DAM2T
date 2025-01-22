import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Board } from '../services/entities/Board';
import { GameStore } from '../screens/store/store';
import Tile from './Tile';
import { GameService } from '../services/GameService';


const BoardComponent = () => {
    const boardTiles: Board | null = GameStore((state) => state.board);
    const data = boardTiles.board;
    const numColumns = boardTiles.size; 

    useEffect(() => {
        const changeBoard = GameStore.getState().setBoard;
        changeBoard(boardTiles);
        GameService.getInstance().do({ type : "BOARD_BUILD" , content: ""})
    }, [boardTiles])

    return (

        <View style={[styles.gridContainer, { width: `${numColumns * 100}px` }]}>
        {data.map((item, index) => (
           <Tile ref={(ref) => {
            if (boardTiles != null) {
                boardTiles.board[item.y][item.x].ref = ref;
            }
            }} colIndex={item.x} rowIndex={item.y} value={item.value} /> 
        ))}
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 100,
        left: 0,
        zIndex: 1
    },

    grid: {
        padding: 10,
    }
})

export default BoardComponent
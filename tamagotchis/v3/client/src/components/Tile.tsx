import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useEffect } from 'react'

interface TileProps {
    colIndex: number;
    rowIndex: number;
    value: number;
}

const Tile = forwardRef<View, TileProps>(({ colIndex, rowIndex, value } : TileProps, ref) => {
    useEffect(() => {
    }, [])
    
    return (
        <View ref={ref} key={`cell-${rowIndex}-${colIndex}`} style={styles.cell}>
            <Text style={styles.text}>{value}</Text>
        </View>
    )
});

const styles = StyleSheet.create({
    cell: {
        width: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    }
})

export default Tile;
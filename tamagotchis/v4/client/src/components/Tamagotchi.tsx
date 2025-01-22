import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Sprites, type SpritesMethods } from 'react-native-sprites';
import { Socket } from 'socket.io-client';
import { GameStore } from '../screens/store/store';


export interface TamagotchiProps {
    name: String;
    active: boolean;
}

const Tamagotchi = ({ name, active } : TamagotchiProps) => {
    const [positionAnim, setPositionAnim] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const spriteRef = useRef<SpritesMethods | null>(null);
    const addControlPlayer = GameStore((state) => state.addControlPlayer);
    
    useEffect(() => {
        if (active) {
            addControlPlayer(name, {position: positionAnim,sprite: spriteRef});
        }
    }, [active])
    
    return (
        <Animated.View                 
            style={[styles.overlay,{
                transform: [
                    { translateX: positionAnim.x },
                    { translateY: positionAnim.y }
                  ]
            }]}
        >
            <Sprites
                ref={spriteRef}
                source={require('../assets/tamagot1.jpg')}
                columns={12}
                rows={8}
                animations={{
                    down: { row: 0, startFrame: 9, endFrame: 11 },
                    left: { row: 1, startFrame: 9, endFrame: 11 },
                    right: { row: 2, startFrame: 9, endFrame: 11 },
                    up: { row: 3, startFrame: 9, endFrame: 11 },
                    iddle: { row: 0, startFrame: 9, endFrame: 10}
                }}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10
      }
})

export default Tamagotchi

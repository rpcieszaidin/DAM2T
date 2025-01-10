import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Sprites, type SpritesMethods } from 'react-native-sprites';


const Tamagotchi = () => {
    const [positionAnim, setPositionAnim] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    const spriteRef = useRef<Array<SpritesMethods | null>>([]);
    useEffect(() => {
        if (spriteRef.current[0] != null)
            spriteRef.current[0].play({
                type: 'down',
                fps: 8,
                loop: true
            });

        Animated.timing(positionAnim.y, {
            toValue: 600,
            easing: Easing.ease,
            duration: 4600,
            useNativeDriver: true,
        }).start();

    }, [])

    return (
        <Animated.View                 
            style={{
                transform: [{ translateY: positionAnim.y }]
            }}
        >
            <Sprites
                ref={(ref) => spriteRef.current.push(ref)}
                source={require('../assets/tamagot1.jpg')}
                columns={12}
                rows={8}
                animations={{
                    down: { row: 0, startFrame: 9, endFrame: 11 },
                    left: { row: 1, startFrame: 10, endFrame: 12 },
                    right: { row: 2, startFrame: 10, endFrame: 12 },
                    up: { row: 3, startFrame: 10, endFrame: 12 },
                }}
            />
        </Animated.View>
    )
}

export default Tamagotchi
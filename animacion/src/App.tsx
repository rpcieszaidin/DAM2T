import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Tamagotchi from './components/Tamagotchi';

const App = () => {
    return (
        <View>
            <Text>App</Text>
            <Tamagotchi/>
        </View>
    )
}

export default App

const styles = StyleSheet.create({})


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RNText = ({ children, style }) => {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}

export default RNText

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'black',
        marginVertical: 5,
    }
})
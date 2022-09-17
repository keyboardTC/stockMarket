import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = props => {
    return (
        <View style={[styles.mainContainer, props.style]}>
            <Text style={[styles.titleText, props.textStyle]}>{props.text}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 10,
        marginHorizontal: 20
    }
})
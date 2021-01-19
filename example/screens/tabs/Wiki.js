import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {NavScreen} from 'Src/'
const SCREENTITLE = '百科'

export default class extends NavScreen {
    static schemaTypes = {
        name: 'setting'
    }
    static propTypes = {}
    focus = () => {}
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box} />
                <Text>{SCREENTITLE}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'cyan',
        borderWidth: 1,
        borderColor: 'red',
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

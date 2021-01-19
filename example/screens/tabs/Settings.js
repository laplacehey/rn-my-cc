import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {NavScreen} from 'Src/'

const SCREENTITLE = '设置'

export default class extends NavScreen {
    static schemaTypes = {
        name: 'setting'
    }
    static propTypes = {}
    initState() {
        return {
            count: 0
        }
    }
    focus = () => {
        this.setState({count: this.state.count + 1})
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box} />
                <Text>{SCREENTITLE + this.state.count}</Text>
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

import React from 'react'
import {NavScreen} from 'Src/'
import {View, Text, StyleSheet} from 'react-native'

const SCREENTITLE = '搜索1'

export default class extends NavScreen {
    static propTypes = {}
    initState(props) {
        return {name: '小红'}
    }

    componentDidMount() {
        super.componentDidMount()
    }
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
        backgroundColor: 'blue',
        padding: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#eea',
        borderWidth: 1,
        borderColor: 'gold',
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

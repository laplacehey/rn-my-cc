import React from 'react'
import {NavScreen} from 'Src/'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {searchProps} from '../../types/index'

const SCREENTITLE = '搜索'

export default class extends NavScreen {
    static propTypes = searchProps
    static schemaTypes = {
        name: 'string'
    }
    initState(props) {
        return {name: '小红'}
    }

    componentDidMount() {
        super.componentDidMount()
        this.preventingBack = true
        setTimeout(() => {
            console.log('计时结束')
            this.preventingBack = false
        }, 2000)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        setTimeout(() => {
            console.log('定时结束')
            this.setState({name: '乐乐'})
        }, 2000)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box} />
                <Text>{SCREENTITLE}</Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.navigate('S1')
                    }}>
                    <Text>去搜索1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        this.navigate('S2')
                    }}>
                    <Text>去搜索2</Text>
                </TouchableOpacity>
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
        backgroundColor: '#eea',
        borderWidth: 1,
        borderColor: 'gold',
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    btn: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#af000000'
    }
})

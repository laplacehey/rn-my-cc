import React from 'react'
import {NavScreen} from 'Src/'
import {View, Text, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

const SCREENTITLE = '搜索2'

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
                <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                        this.navigate('Home')
                    }}
                />
                <Text>{SCREENTITLE}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
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

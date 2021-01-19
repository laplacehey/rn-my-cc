import React from 'react'
import {NavScreen} from 'Src/'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {searchProps} from '../../types/index'
import {connect} from 'react-redux'
import {loadHomeAsync, deviceNameAction} from '../../redux/HomeReduce'
import FSTextInput from 'Src/FSTextInput'

const SCREENTITLE = '首页'

class Home extends NavScreen {
    static propTypes = {}
    initState() {
        return {
            count: 0
        }
    }
    initRefreshWhens() {
        return [
            {
                from: 'S2',
                call: this.refreshFromS2
            },
            {
                from: 'Search',
                call: this.refreshFromSearch
            },
            {
                from: 'Settings',
                call: this.refreshSettings
            }
        ]
    }
    refreshSettings = () => {
        console.log('refreshSettings')
    }
    refreshFromSearch = () => {
        console.log('refreshFromSearch')
    }
    refreshFromS2 = () => {
        console.log('refreshFromS2')
    }
    focus = () => {
        this.setState({count: this.state.count + 1})
    }

    componentDidMount() {
        super.componentDidMount()
        this.props.loadHome()
    }

    renderInput = () => {
        const {deviceName} = this.props
        let maxLen = 10
        let placeholder = `输入设备名称,最大长度为${maxLen}`
        return (
            <FSTextInput
                style={{width: 300}}
                placeholder={placeholder}
                value={deviceName}
                maxLength={maxLen}
                onOK={(text) => {
                    this.props.updateDeviceName(text)
                }}
            />
        )
    }

    render() {
        const {count} = this.state
        return (
            <View style={styles.container}>
                {this.renderInput()}
                <Text>{this.props.deviceName}</Text>
                <TouchableOpacity
                    onPress={() => {
                        // requestLocality()
                        this.navigate('Search')
                    }}>
                    <View style={styles.box} />
                </TouchableOpacity>

                <Text>{SCREENTITLE + count}</Text>
                <Text>{this.props.content}</Text>
                {this.previousRouteName && <Text style={styles.from}>我从{this.previousRouteName}来</Text>}
            </View>
        )
    }
}

const mapProps = (store, props) => {
    const {
        home: {content, deviceName}
    } = store
    return {
        ...props,
        content,
        deviceName
    }
}

const mapDispatchs = (dispatch, props) => {
    return {
        loadHome: () => {
            dispatch(loadHomeAsync())
        },
        updateDeviceName: (name) => {
            dispatch(deviceNameAction(name))
        }
    }
}

const HomeScreen = connect(mapProps, mapDispatchs)(Home)

export default HomeScreen

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
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'gold',
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    from: {
        color: 'red',
        marginTop: 30
    }
})

console.log('2222')

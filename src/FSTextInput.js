import React, {Component} from 'react'
import {Platform, TextInput, Text, View} from 'react-native'
const WRAPERSTYLE = {borderWidth: 1, borderStyle: 'solid', borderRadius: 4, borderColor: 'rgba(225, 225, 225, 0.44)', backgroundColor: 'rgba(245, 245, 245, 1)', paddingTop: 14, paddingRight: 16, paddingBottom: 14, paddingLeft: 16}

const ISIOS = Platform.OS === 'ios'
const MAXLENGTH = 5
class FSInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            iosText: props.value || '',
            warningText: ''
        }
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        let {value = ''} = nextprops
        this.setState({iosText: value})
    }

    checkWarningforIos = (isConfirm) => {
        const {maxLength = MAXLENGTH, check, min = 1} = this.props
        let value = this.state.iosText
        const filterValue = value.replace(/\s/g, '')
        let warningText = null
        if (filterValue.length > maxLength) {
            warningText = `名称最长为${maxLength}`
        }

        if (filterValue === 0) {
            warningText = '名称不能为空'
        }

        if (min && filterValue.length < min) {
            warningText = `名称最短为${min}`
        }
        if (check && check.source.filter((x) => x.name === filterValue && x.id !== check.id).length > 0) {
            warningText = '名称重复'
        }

        if (warningText) {
            let {iosText} = this.state
            if (isConfirm) {
                iosText = ''
            }
            return this.setState({iosText, warningText})
        }

        if (isConfirm) {
            this.props.onOK(filterValue)
        } else {
            return this.setState({warningText: ''})
        }
    }

    render() {
        const inputStyle = {}

        const warnStyle = {
            fontSize: 8,
            color: 'red',
            position: 'absolute',
            top: -4,
            left: 8,
            paddingHorizontal: 8,
            backgroundColor: 'rgba(225, 225, 225, 0.44)'
        }

        let {warningText} = this.state
        if (!warningText) {
            warnStyle.width = 0
            warnStyle.paddingHorizontal = 0
        }

        const {placeholder = '', style: pstyle = {}} = this.props

        if (ISIOS) {
            return (
                <View style={[WRAPERSTYLE, pstyle]}>
                    <TextInput
                        placeholder={placeholder || ''}
                        style={inputStyle}
                        value={this.state.iosText}
                        returnKeyType="done"
                        onChangeText={(value) => {
                            this.setState({iosText: value}, () => {
                                this.checkWarningforIos()
                            })
                        }}
                        onBlur={() => {
                            console.log('hah')
                            this.checkWarningforIos(true)
                        }}
                    />
                    <Text style={warnStyle}>{this.state.warningText}</Text>
                </View>
            )
        }

        return <TextInput {...this.props} />
    }
}

export default FSInput

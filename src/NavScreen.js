import React from 'react'
import {Alert} from 'react-native'
import {navigate, getPreviousRouteName, getScreenId} from './RootNavigation'
import H from './Helper.js'

function non() {}

export default class NavScreen extends React.Component {
    static hello = {}
    _screenId = getScreenId()
    _mounted = false
    _preventingBack = false
    _beforeRemove = null
    _previousRouteName = null

    set preventingBack(f = false) {
        this._preventingBack = f
    }
    get preventingBack() {
        return this._preventingBack
    }

    get previousRouteName() {
        return this._previousRouteName
    }

    constructor(props) {
        super(props)
        this.state = this.initState(props)
        this.checkComponentDidMount()
    }

    initState(props) {
        return {}
    }

    initRefreshWhens() {
        //数据格式
        /**
         * [{
         *  from:"RouterName",
         *  call:()=>{}
         * }]
         *
         * **/
        return []
    }

    setState = (params = {}, c = non) => {
        if (!this._mounted) {
            if (H.isDebug) {
                H.error(`禁止在页面${this.props.route.name}销毁后调用setState`)
            }
            return
        }
        super.setState({...this.state, ...params}, c)
    }

    navigate = (name, params) => {
        navigate(name, params)
    }

    componentDidMount() {
        this._mounted = true
        let {navigation = {}} = this.props

        this._stateRemove = navigation.addListener('state', () => {
            //console.log(this._screenId, 'state')
        })

        this._transitionStart = navigation.addListener('transitionStart', () => {
            //console.log(this._screenId, 'transitionStart')
        })
        this._focusRemove = navigation.addListener('focus', (e) => {
            //console.log(this._screenId, 'focuse', getPreviousRouteName(true))
            this._previousRouteName = getPreviousRouteName(true)
            this.refreshCallbackWhen()
            this.focus()
        })
        this._transitionEnd = navigation.addListener('transitionEnd', () => {
            //console.log(this._screenId, 'transitionEnd')
        })

        this._blurRemove = navigation.addListener('blur', () => {
            //console.log(this._screenId, 'blur')
            this.willBlur()
        })
        this._beforeRemove = navigation.addListener('beforeRemove', this.beforeRemove)
    }

    componentWillUnmount() {
        this._mounted = false
        this._beforeRemove()
        this._transitionStart()
        this._blurRemove()
        this._focusRemove()
        this._stateRemove()
        this._transitionEnd()
    }

    focus = () => {}

    willBlur = () => {}

    beforeRemove = (e) => {
        console.log(this._screenId, 'beforeRemove')
        if (!this.preventingBack) {
            // If we don't have unsaved changes, then we don't need to do anything
            this.checkComponentWillUnmount()
            return
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault()

        // Prompt the user before leaving the screen
        Alert.alert(null, '是否取消修改？', [
            {text: '不取消', style: 'cancel', onPress: () => {}},
            {
                text: '取消',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => this.navDispatch(e.data.action)
            }
        ])
    }

    refreshCallbackWhen = () => {
        let preName = this.previousRouteName
        let whens = this.initRefreshWhens()
        whens.forEach(({from, call}) => {
            if (from && from === preName) {
                call && call()
            }
        })
    }

    navDispatch = (action) => {
        const {navigation = {}} = this.props
        const {type} = action
        navigation.dispatch(action)
        if (type === 'POP') {
            this.checkComponentWillUnmount()
        }
    }

    checkComponentDidMount = () => {
        if (!H.isDebug) {
            return
        }
        //检测原理，构造函数被调用，在延迟时间内若_mounted没有被设置为ture则检测到失败。
        const clearTimer = () => {
            if (this._checkDidMountTimer) {
                clearTimeout(this._checkDidMountTimer)
                this._checkDidMountTimer = null
            }
        }
        clearTimer()
        this._checkDidMountTimer = setTimeout(() => {
            if (!this._mounted) {
                H.error(`当前页面${this.props.route.name}基类的ComponentDidMount没有被调用`)
            }
        }, 1000)
    }

    checkComponentWillUnmount = () => {
        if (!H.isDebug) {
            return
        }
        //检测原理
        //关于befroeRemove事件解释
        //1）beforeRemove (version 5.7+ only) -
        //  This event is emitted when the user is a leaving the screen,
        //  there's a chance to prevent the user from leaving.
        //  中文:当用户将要离开屏幕时触发，这个离开有两种理解：一个是A navigateTo B（将要离开A）；一种是B backTo A（将要离开B）；
        //  5.8.10测试中发现事件在第二种情况触发，在第一种并不会触发。
        //2）When going back from B to A, componentWillUnmount of B is called
        //  当从B返回A时，B componentWillUnmount将会触发。
        //3）综合1和2来观察。当B返回时，B的beforeRemove将会发出，稍后componentWillUnmount将会触发。
        //  因此可以综合这两点在开发时检测基类componentWillUnmount是否被调用

        const clearTimer = () => {
            if (this._checkUnmountTimer) {
                clearTimeout(this._checkUnmountTimer)
                this._checkUnmountTimer = null
            }
        }
        clearTimer()
        this._checkUnmountTimer = setTimeout(() => {
            if (this._mounted) {
                H.error(`页面${this.props.route.name}基类的componentWillUnmount没有被调用`)
            }
        }, 1000)
    }
}

export const checkNavScreen = (Com, {name, title}) => {
    if (!H.isDebug) {
        return
    }

    if (Com.WrappedComponent) {
        Com = Com.WrappedComponent
    }

    let BaseMsg = `页面：${title} ${name}`

    if (Object.getPrototypeOf(Com) !== NavScreen) {
        throw new Error(`${BaseMsg}不是继承于NavScreen`)
    }

    if (!Com.propTypes) {
        throw new Error(`${BaseMsg}没有提供propTypes属性`)
    }

    //如果要自己实现类型校验可以考虑使用下面的思路
    // const SCHEMATYPESMAP = {}
    // let schemaTypes = Com.schemaTypes
    // SCHEMATYPESMAP[name] = schemaTypes
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     let name = getCurrentRouteName()
    //     let schema = SCHEMATYPESMAP[name]
    //     console.log('xxx', name, schema)
    //     return prevState
    // }
}

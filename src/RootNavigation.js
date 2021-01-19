// RootNavigation.js

import * as React from 'react'

let SCREENID = 0
export const getScreenId = () => {
    return SCREENID++
}

export const isReadyRef = React.createRef()

export const navigationRef = React.createRef()

let _routeNameRef = {}

export function getPreviousRouteName(beforeStateChanged = false) {
    //在focus监听回调里beforeStateChanged为true
    //focus在状态改变之前发出。此时前一个真实的路由是current
    //若在state事件之后，则真实的路由是previous
    return beforeStateChanged ? _routeNameRef.current : _routeNameRef.previous
}
export function setPreviousRouteName() {
    _routeNameRef = {
        current: getCurrentRouteName(),
        previous: _routeNameRef.current
    }
}

export const getCurrentRouteName = () => {
    return navigationRef?.current?.getCurrentRoute()?.name
}

export const updatePreviousRouteName = () => {}

export function getNavigation() {
    return isReadyRef.current && navigationRef.current ? navigationRef.current : null
}

export function navigate(name, params) {
    if (isReadyRef.current && navigationRef.current) {
        // Perform navigation if the app has mounted
        navigationRef.current.navigate(name, params)
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}

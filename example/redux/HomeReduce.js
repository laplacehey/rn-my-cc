import {act} from 'react-test-renderer'

const TEST_HOME_FETCHING = '正在请求'
const TEST_HOME_LOADED = '已加载'
const TEST_HOME_DeivceName_action = 'TEST_HOME_DeivceName_action'

function fetchAction() {
    return {
        type: TEST_HOME_FETCHING
    }
}

function loadedAction() {
    return {
        type: TEST_HOME_LOADED
    }
}

export const loadHomeAsync = (hid) => {
    return (dispatch) => {
        dispatch(fetchAction())
        setTimeout(() => {
            dispatch(loadedAction())
        }, 500)
    }
}

export const deviceNameAction = (deviceName) => {
    return {
        type: TEST_HOME_DeivceName_action,
        deviceName
    }
}

const initState = {
    content: '',
    deviceName: '加湿器2'
}

export default function reduce(state, action) {
    const {type} = action
    switch (type) {
        case TEST_HOME_FETCHING:
        case TEST_HOME_LOADED:
            return {
                ...state,
                content: type
            }
        case TEST_HOME_DeivceName_action:
            return {
                ...state,
                ...action
            }
        default:
            return state || initState
    }
}

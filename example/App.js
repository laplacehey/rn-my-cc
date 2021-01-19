import React from 'react'
import SCREENS from './screens'
import {useWrapper} from 'Src/'
import STORE from './redux/Store'
import {Provider} from 'react-redux'
// console.log('SCREENS', SCREENS)

export default () => <Provider store={STORE}>{useWrapper(SCREENS)}</Provider>

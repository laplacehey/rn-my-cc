import {number, string, array, object, func, bool, oneOf, instanceOf, shape} from 'prop-types'

export const searchProps = {
    keyWord: string.isRequired,
    type: oneOf(['News', 'Photos']).isRequired,
    options: shape({
        title: string
    }).isRequired
}

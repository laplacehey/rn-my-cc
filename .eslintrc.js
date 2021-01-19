module.exports = {
    root: true,
    extends: '@react-native-community',
    globals: {
        SCREENWIDTH: true,
        SCREENHEIGHT: true
    },
    rules: {
        'react-native/no-inline-styles': 0,
        'comma-dangle': [2, 'never'],
        semi: [2, 'never']
    }
}

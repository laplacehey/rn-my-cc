const PATH = require('path')

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    Utils: PATH.join(__dirname, './src/utils/'),
                    UI: PATH.join(__dirname, './src/common/ui/'),
                    Common: PATH.join(__dirname, './src/common/'),
                    Src: PATH.join(__dirname, './src/')
                }
            }
        ]
    ]
}

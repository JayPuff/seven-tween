const path = require('path')

module.exports = (env, argv) => ({
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: (argv.minimize) ? 'seven-tween.min.js' : 'seven-tween.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    module: {
        rules: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    optimization: {
        minimize: (argv.minimize) ? true : false
    }
})
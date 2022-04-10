const path = require('path');

module.exports = {
    
    entry: {
        'src/main/resources/static/js/index': './src/main/js/index.ts',
        'target/classes/static/js/index': './src/main/js/index.ts'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
        fallback: { "fs": false },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './'),
    },
};
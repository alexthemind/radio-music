const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env,arg) => {

    const mode = arg.mode;
    const isProduction = mode === 'production' ? true : false; 

    const rulesForStyles = {
        test: /\.css$/,
        use: ['style-loader','css-loader']
    };
    const rulesForJavascript = {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-react',
                        {
                            runtime: 'automatic'
                        }
                    ]
                ]
            }
        }
    };

    const rules = [
        rulesForJavascript,
        rulesForStyles
    ];

    return {
        entry: path.join(__dirname,'src','public','index.js'),
        output: {
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            path: path.resolve(__dirname,'build'),
        },
        devServer: {
            port: 8080,
            open: false,
            compress: false,
            historyApiFallback: true
        },
        module: {
            rules: rules
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.join(__dirname,'src','public','index.html') })
        ]
    }
}
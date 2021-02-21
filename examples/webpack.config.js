const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

console.log(fs.readdirSync('examples'))
module.export = {
    mode: 'development',
    /**
     * examples下面会有多个目录，每个目录有自己的入口文件app.ts
     * entries收集了多目录入口文件，并且每个入口引入了一个用于热更新的文件
     */
    entry: fs.readdirSync(__dirname).reduce((entries, dir)=>{
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.ts')
        if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }
        return entries
    }, {}),
    putput:{
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        publicPath: '/__build__/'
    },
    modules:{
        rules:[
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'telint-loader'
                    }
                ]
            },
            {
                test:/\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
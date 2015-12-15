var webpack = require("webpack");
module.exports = {
    entry: "./app/js/main.js",
    output: {
        "path": "./build",
        "filename": "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            d3: 'd3'
        })
    ]
};

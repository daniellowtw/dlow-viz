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
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.html$/, loader: "raw-loader"} // Live reload for html files!
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            d3: 'd3'
        })
    ],
    // Uncomment these to provide it at runtime
    //externals: {
    //    d3: 'd3',
    //},
};

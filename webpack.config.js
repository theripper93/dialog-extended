const path = require("path");

module.exports = {
    entry: "./scripts/main.js",
    output: {
        filename: "./index.js",
        path: path.resolve(__dirname),
    },
    mode: "production",
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};

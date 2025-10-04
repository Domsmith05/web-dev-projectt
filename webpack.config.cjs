const path = require('path');

module.exports = {
    entry: './public/main.js', // Adjust this to your main JS file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Regex to match .css files
                use: ['style-loader', 'css-loader'], // Loaders to handle CSS
            },
           {
        test: /\.(png|jpe?g|gif)$/i,
      },
        ],
    },
    resolve: {
        extensions: ['.js'], // Allows you to omit .js in imports
    },
    mode: 'development', // Change to 'production' for production builds
};
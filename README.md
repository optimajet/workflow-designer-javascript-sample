#  WorkflowEngine Designer for JavaScript Sample

## Introduction

WorkflowEngine Designer is a library developed to facilitate the use of this component. It provides a convenient way to interact and create the Workflow Designer on your web page. This section explains you how to add the Workflow Designer to your web application in a convenient format  - Get Started -  that thoroughly interprets the procedure, step by step.

## Prerequisites

To run the example below, you should create the WorkflowEngine backend capable of handling requests from the Workflow Designer, the NodeJS runtime, and  the NPM package manager to download the required packages.

## Get Started

The first step is to create a working directory where the project will be developed:

```shell
mkdir workflow-designer-sample
cd workflow-designer-sample
npm init
```

Then, the `npm` is initialized. You can select all the default values, these parameters do not play any special role.

After initialization, the `package.json` file will appear in the working directory. Its content is approximately as follows:

```json
{
  "name": "workflow-designer-sample",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

The next step is to install the necessary npm packages; in our case, it will be the only one package:

```shell
npm install @optimajet/workflow-designer
```

Then, the `node_modules` folder, containing all the packages necessary for work, will appear in your working directory.

> Please, do not change the contents of the `node_modules` folder to avoid unexpected errors on starting the application.

Now, we add the `src` folder and create two files in it, namely: `index.html` responsible for the appearance of the created page, and `index.js` containing the JavaScript code. In the result, you should obtain the following file hierarchy in the working directory:

```
├── node_modules
│   └── ...
├── src
│   ├── index.html
│   └── index.js
├── package.json
```

Then, we create a "skeleton" of the web page. For this, open `index.html` and paste the following markup code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Designer sample</title>
</head>
<body>
    <h1>Designer Sample</h1>
    <div id="root"></div>
</body>
</html>
```

This page contains a title, and a `div` element with `id = "root"`, which will become the container to display the Workflow Designer.

Now, we start writing the JavaScript code. For this, open the `index.js` file and paste the following code:

```javascript
import WorkflowDesigner from '@optimajet/workflow-designer'
//import '@optimajet/workflow-designer/localization/workflowdesigner.localization_ru'

const data = {
    schemecode: "<YOUR_SCHEME_CODE_VALUE>",
    processid: undefined
};

var wfdesigner = new WorkflowDesigner({
    apiurl: '<YOUR_API_URL_VALUE>',
    renderTo: 'root',
    graphwidth: window.innerWidth,
    graphheight: window.innerHeight,
});

if (wfdesigner.exists(data)) {
    wfdesigner.load(data);
} else {
    wfdesigner.create();
}
```

This code snippet is everything you need to initially display the Workflow Designer on your web page. Let's analyze it in more detail:

```javascript
import WorkflowDesigner from '@optimajet/workflow-designer'
//import '@optimajet/workflow-designer/localization/workflowdesigner.localization_ru'
```

This section is responsible for importing the `WorkflowDesigner` constructor. By uncommenting line 2, you can localize the workflow designer. By default, the workflow designer has the English localization.

```javascript
const data = {
    schemecode: "<YOUR_SCHEME_CODE_VALUE>",
    processid: undefined
};

var wfdesigner = new WorkflowDesigner({
    apiurl: '<YOUR_API_URL_VALUE>',
    renderTo: 'root',
    graphwidth: window.innerWidth,
    graphheight: window.innerHeight,
});
```

In this section:

- `schemecode` - is the code for the Workflow diagram to be displayed in the Workflow Designer.
- `processid` - is the identifier of the WorkflowEngine process.
  
- the `WorkflowDesigner` constructor takes an object with the designer settings and creates a new instance of the WorkflowDesigner class. The example specifies all the necessary parameters of the designer, namely: the HTTP address of the WorkflowAPI for interacting with the back-end of the application (`apiurl`), the available width (`graphwidth`) and height (`graphheight`) for displaying the WorkflowDesigner window, and the element ID, inside which the entire WorkflowDesigner interface is rendered (`renderTo`). For a more detailed list of the parameters, see the **Designer** section of the documentation page about the WorkflowEngine.


If you want to display the Workflow scheme in the Workflow Designer interface, set the required value to the `schemecode` variable, and assign the `undefined` value to the `processid`. In case you want to display the Workflow process, set the `undefined` value to the `schemecode`, and the required value to the `processid` variable of the WorkflowEngine process identifier.

```javascript
if (wfdesigner.exists(data)) {
    wfdesigner.load(data);
} else {
    wfdesigner.create();
}
```

This section checks whether the above data exist and available for loading and displaying in the WorkflowDesigner. If the specified data exist, then they are loaded and rendered. Otherwise, a new empty Workflow diagram will be created.

## Building and Running the Example

We use the webpack package to build our example.

```shell
npm i -D webpack webpack-cli
```

Next, add the packages necessary for the correct webpack setup

```shell
npm i -D @babel/preset-env @babel/core babel-loader css-loader html-webpack-plugin mini-css-extract-plugin uglifyjs-webpack-plugin
```

The next step is to create the `webpack.config.js` file in the project root.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // for generate an HTML5 file
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // to extract CSS into separate files
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // to minify your JavaScript
const webpack = require('webpack');

module.exports = () => ({
    entry: {
      wfesample: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].min.js',
        libraryTarget: "umd",
    },
    mode:'production',
 
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  },
              },
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    ]
});
```

To run the build, you should edit the `package.json` file. Add the `"build": "webpack"` property to the `scripts` object.

To start the build of the application, run the following command in the project root:

```shell
npm run build
```

After the build is completed, the following three files will appear in the `dist` folder: `index.html`, `wfesample.css`, and `wfesample.min.js`

To run this example, simply open the `index.html` file in a browser or use Visual Studio Code after installing the Live Server extension and enabling it in your working directory.

At the end of the procedure, the following will be displayed on your screen:

![Workflow Engine Designer Sample for JavaScript](./screens/good-result.png)

## IE11 Support

To support successful performance of the designer in IE11, we should slightly modify the webpack configuration in `webpack.config.js`, but first we should add another package to transpile and modify our JavaScript.

```shell
npm i -D @babel/plugin-proposal-decorators
```

Now, add the `target: ['web', 'es5']` property in the webpack config, and change the `babel-loader` rule in`module.rules` to the following:

```js
//...
rules: [
    //...
    {
        test: /\.(js|jsx)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                configFile: path.resolve(__dirname, 'babel.config.js'),
                compact: false,
                cacheDirectory: true,
                sourceMaps: false,
            },
        },
    },
],
//...
```

The only thing left to do is to create the `babel.config.js` file in the project root. The file should contain the following babel configuration:

```js
module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                corejs:"3",
                useBuiltIns: 'entry',
                targets: {
                    browsers: [
                        "edge >= 16",
                        "safari >= 9",
                        "firefox >= 57",
                        "ie >= 11",
                        "ios >= 9",
                        "chrome >= 49"
                    ]
                }
            }
        ]
    ];
    const plugins= [
        ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-transform-spread"]
    ];
    return {
        presets,
        plugins
    }
}
```

The configuration is completed successfully, so you can enjoy using the WorkflowDesigner in IE11.

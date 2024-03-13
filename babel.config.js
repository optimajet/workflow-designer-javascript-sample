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
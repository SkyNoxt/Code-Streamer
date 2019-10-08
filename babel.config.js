
"use strict";

module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                "targets": {
                    "node": true
                }
            }
        ], "@babel/react"
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
}

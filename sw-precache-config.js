/* eslint-env node */

module.exports = {
  staticFileGlobs: [
    "/index.html",
    "/manifest.json",
    "/node_modules/@webcomponents/webcomponentsjs/*",
    "/node_modules/web-animations-js/web-animations-next-lite.min.js",
    "/node_modules/gw2-coin-input/images/*",
    "/node_modules/gw2-coin-output/images/*",
    "/src/data/*",
    "/src/images/**/*"
  ],
  navigateFallback: "index.html"
};

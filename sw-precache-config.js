/* eslint-env node */

module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/*',
    '/bower_components/gw2-coin-input/images/*',
    '/bower_components/gw2-coin-output/images/*',
    '/src/data/collections.json',
    '/src/data/directory.json',
    '/src/data/metas.json',
  ],
  navigateFallback: 'index.html',
};

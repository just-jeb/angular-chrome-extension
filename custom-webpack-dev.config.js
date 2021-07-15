
//import {Configuration, EntryObject} from 'webpack';
const ExtensionReloader = require('webpack-ext-reloader');
//const config = require('./custom-webpack.config');
const path = require('path');

module.exports = (config) => {
  config.plugins = [new ExtensionReloader({
    reloadPage: true, // Force the reload of the page also
    entries: { // The entries used for the content/background scripts or extension pages
      background: 'background'
    }
  }), ...config.plugins];
  config.mode = 'development';
  config.entry = {...config.entry, background: 'src/background.ts' };
  return config;
}

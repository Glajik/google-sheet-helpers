#!/bin/bash
NODE_ENV=production
# Remove old files in dist folder
find dist/ -name '*.js' -type f -delete

# Use Babel to output compiled sources to dist folder
# npx babel src -d dist

# Copy sources files to dist folder
cp -r -u src/* dist/

# Remove lines with 'module.exports', 'export default'
# Replace word 'export ' to ''
# Add '//' to 'import' word
find dist/ -type f -exec sed -i '/module\.exports.*/d; s:import :// import :; /export default */d; s:export ::g' {} \;

# Some modules compiling with webpack
# See webpack.config.js
npx webpack
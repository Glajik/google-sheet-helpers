#!/bin/bash
NODE_ENV=production
# Remove old files in dist folder
find dist/ -name '*.js' -type f -delete

# Use Babel to output compiled sources to dist folder
# npx babel src -d dist

# Copy sources files to dist folder
cp -r -u src/* dist/

# Some modules compiling with webpack
# See webpack.config.js
npx webpack

# Remove all import, export and require statements from compiled files
find dist/ -type f -exec sed -i '/module\.exports.*/d; /import.*/d; /export default */d; s/export //g' {} \;
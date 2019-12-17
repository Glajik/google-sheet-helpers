#!/bin/bash
find dist/ -name '*.js' -type f -delete
cp -r -u src/* dist/
find dist/ -type f -exec sed -i '/module\.exports.*/d;/import.*/d;s/export //g' {} \;
# npx webpack
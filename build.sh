#!/bin/bash
rm -r -f dist/*.js
cp -r -u src/* dist/
find dist/ -type f -exec sed -i '/module\.exports.*/d;/import.*/d;s/export //g' {} \;
# npx webpack
#!/usr/bin/env sh

DEST="./www"

npm run build-sass
npm run build-rollup
rm -rf ${DEST}

mkdir -p "${DEST}/assets"
for item in "./assets/" "./work" "./about" "./contact" "./index.html" "site.webmanifest" "site.jpg" android* apple* fav*; do
	cp -r "${item}" ${DEST}
done

echo "Build Complete"

#!/usr/bin/env sh

DEST="./www"

sass sass/main.scss assets/css/main.css
rollup -c
rm -rf ${DEST}

mkdir -p "${DEST}/assets"
for item in "./assets/" "./work" "./about" "./contact" "./index.html"; do
	cp -r "${item}" ${DEST}
done

echo "Build Complete"

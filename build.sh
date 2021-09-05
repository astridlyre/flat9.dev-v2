#!/usr/bin/env sh

DEST="./www"

npm run build-sass
npm run build-rollup
rm -rf ${DEST}

mkdir -p "${DEST}/assets"
for page in "contact" "work" "about"; do
	mkdir "${DEST}/${page}"
done

HEAD="includes/head.html"
FOOT="includes/footer.html"

for file in "index.html" "work/index.html" "about/index.html" "contact/index.html"; do
	cat "${HEAD}" "${file}" "${FOOT}" >"${DEST}/${file}"
done

for item in "./assets/" "site.webmanifest" "site.jpg" android* apple* fav*; do
	cp -r "${item}" ${DEST}
done

echo "Build Complete"

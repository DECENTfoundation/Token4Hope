#！/bin/bash

DIST="$PWD/dist"
rm -rf $DIST dist && mkdir $DIST $DIST/public/ $DIST/public/images/
cp -rf assets/images/favicon/ $DIST/public/images/favicon

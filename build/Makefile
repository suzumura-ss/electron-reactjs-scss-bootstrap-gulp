WORK=./icon.iconset
SRC=../images/app.png

all: icon.icns icon.ico

icon.icns: ${SRC}
	rm -rf ${WORK}
	mkdir -p ${WORK}
	convert $< -resize 16x16 ${WORK}/icon_16x16.png
	convert $< -resize 32x32 ${WORK}/icon_16x16@2x.png
	convert $< -resize 32x32 ${WORK}/icon_32x32.png
	convert $< -resize 64x64 ${WORK}/icon_32x32@2x.png
	convert $< -resize 128x128 ${WORK}/icon_128x128.png
	convert $< -resize 256x256 ${WORK}/icon_128x128@2x.png
	convert $< -resize 256x256 ${WORK}/icon_256x256.png
	convert $< -resize 512x512 ${WORK}/icon_256x256@2x.png
	convert $< -resize 512x512 ${WORK}/icon_512x512.png
	cp $< ${WORK}/icon_512x512@2x.png
	iconutil -c icns ${WORK}
	rm -rf ${WORK}

icon.ico: ${SRC}
	convert $< -resize 256x256 $@

.PHONY: all clean
clean:
	rm -rf icon.icns icon.ico ${WORK}

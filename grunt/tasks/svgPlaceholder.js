// Generate placeholder images

'use strict';

function generateImg(width, height, fgColor, bgColor, text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  	<rect width="100%" height="100%" fill="${bgColor}" />
  	<text x="${width/2}" y="${height/2}" text-anchor="middle" alignment-baseline="central" fill="${fgColor}" font-family="sans-serif" font-size="22px" font-weight="bold">${text}</text>
	</svg>`;
}

function getSafeName(name) {
	return name.replace(':', 'x');
}

module.exports = function(grunt) {

	var globalSettings = grunt.file.readJSON('./settings.json');

	globalSettings.images.sizes.forEach(function(img) {
  
		const safeName = getSafeName(img.name),
			imgContent = generateImg(img.width, img.height, globalSettings.images.fgColor, globalSettings.images.bgColor, img.displayName),
			imgPath = `src/${globalSettings.imgPath}placeholder/${safeName}.svg`;

		grunt.file.write(imgPath, imgContent);

		grunt.log.writeln('Generated ' + imgPath);

  });

};
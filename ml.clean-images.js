// CLI tool that walks a directory of images to find currupted files

var fs = require('fs');
var walk = require('walk');
var jimp = require('jimp');
var input = process.argv[2];

var walker  = walk.walk(input, { followLinks: false });
var count = 0;

walker.on('file', function(root, stat, next) {
  jimp.read(root + '/' + stat.name, (err, image) => {
    if (err || image._originalMime.search('image/gif') != -1) {
      fs.unlinkSync(root + '/' + stat.name);
      console.log('Deleting ' + stat.name)
    }
    console.log(count);
    count++;
    next();
  });
});

const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('/Users/nguyencolece/Downloads/the-academic-curator/fp4ds-assign2-ene (4).pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error(err);
});

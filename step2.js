const fs = require('fs');
const axios = require('axios');
const path = process.argv[2];

function isURL(str) {
    // Regular expression to match a URL
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(str);
}
  
function isTextFile(str) {
  // Regular expression to match common text file extensions
  const textFileRegex = /\.(txt|md|html|css|js)$/i;
  return textFileRegex.test(str);
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(path) {
    try {
        res = await axios.get(path);
        console.log(res.data);
    }
    catch (err) {
        console.log(`Error: Request failed with status code ${err.response.status}`);
    }
}

if (isURL(path)){
    webCat(path)
}
else if (isTextFile(path)) {
    cat(path);
}

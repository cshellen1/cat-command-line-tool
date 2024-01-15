const fs = require('fs');
const axios = require('axios');


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

function handleOutput(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8',function (err){
            if (err) {
                console.log("ERROR:", err);
                process.exit(1);
            }
        })
    }
    else {
        console.log(data)
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err);
            process.exit(1);
        }
        else {
            handleOutput(data, out);
        }
    })
} 

async function webCat(url, out) {
    try {
        res = await axios.get(url);
        handleOutput(res.data, out);
    }
    catch (err) {
        console.log(`Error: Request failed with status code ${err.response.status}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === "--out") {
    out = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2]
}

if (isURL(path)) {
    webCat(path, out);
}
else if (isTextFile(path)){
    cat(path, out); 
}
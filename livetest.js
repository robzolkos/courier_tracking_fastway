const fetcher = require("./index");

// USAGE: node livetest.js apikey connote
// eg node livetest.js 12345 FW0001001001

const fastway_api_key = process.argv[2];
const connote = process.argv[3];

fetcher(fastway_api_key, connote, (err, r) => {
  if (err) {
    console.log(err);
  } else {
    console.log(r);
  }
});

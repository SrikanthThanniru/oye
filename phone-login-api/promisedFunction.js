const request = require("request");
const util = require("util");

// Promisify the getGoogleHomePage function
const getGoogleHomePagePromisified = util.promisify(getGoogleHomePage);

function getGoogleHomePage(finalCallBack) {
  request("http://www.google.com", function (error, response, body) {
    console.error("error:", error);
    finalCallBack(error);
    console.log("statusCode:", response && response.statusCode);
    console.log("body:", body);
    finalCallBack(null, body);
  });
}

// Call the promisified function like a promise
getGoogleHomePagePromisified()
  .then((result) => {
    console.log("RESULT==>", result);
  })
  .catch((error) => {
    console.error("ERROR==>", error);
  });

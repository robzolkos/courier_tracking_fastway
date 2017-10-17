const request = require("request");
const courier_finder = require("courier_finder");

const normalize = require("./helpers/normalize");

function fetcher(api_key, connote, cb) {
  const check_validity = courier_finder(connote);

  if (check_validity.courier != "Fastway") {
    if (connote == undefined) {
      connote = "Not provided";
    }
    return cb({
      connote: connote,
      statusCode: 500,
      message: { error: "Invalid Fastway connote" }
    });
  }

  const url =
    "https://api.fastway.org/v3/tracktrace/detail.jsonraw?sortbytype=true&api_key=" +
    api_key +
    "&labelno=" +
    connote;

  request.get(
    {
      url: url
    },
    (error, response, body) => {
      try {
        response_body = JSON.parse(body);
      } catch (e) {
        return cb({
          connote: connote,
          statusCode: 500,
          message: "Error in reponse from Fastway"
        });
      }

      if (
        response_body.error &&
        response_body.error.indexOf("does not have any scans") != -1
      ) {
        return cb({
          connote: connote,
          statusCode: 404,
          message: "No scans found"
        });
      }

      if (response_body.error) {
        return cb({
          connote: connote,
          statusCode: 500,
          message: response_body.error
        });
      }

      if (response.statusCode === 200) {
        return cb(null, normalize(response_body));
      }

      return cb({
        connote: connote,
        statusCode: response.statusCode,
        message: response_body
      });
    }
  );
}

module.exports = fetcher;

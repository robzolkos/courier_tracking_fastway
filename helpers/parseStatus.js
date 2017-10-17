const deliveredCodes = require("./deliveredCodes");

function parseStatus(status) {
  let statusText = status.StatusDescription;
  let statusType = status.Type;
  let statusCode = status.Status;
  let delivered = false;

  if (statusType === "D") {
    if (deliveredCodes.indexOf(statusCode.toUpperCase().trim()) != -1) {
      delivered = true;
    }
  }

  return {
    status: statusText,
    delivered: delivered
  };
}

module.exports = parseStatus;

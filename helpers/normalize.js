const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");

const parseStatus = require("./parseStatus");
const formatDate = require("./formatDate");
const courier_finder = require("courier_finder");

function get_connote(res) {
  try {
    const connote = res.LabelNumber;
    return connote;
  } catch (e) {
    return "Unknown";
  }
}

function parseAction(action) {
  if (action === "Your parcel was picked up.") {
    return "Picked Up";
  }

  if (action.match(/Your parcel is currently in transit between/) != null) {
    return "Transfer to new depot";
  }

  if (action.match(/Your parcel\(s\) have arrived in .+ depot./) != null) {
    return "Arrive at destination depot in transit";
  }

  if (action.match(/Attempted to deliver parcel/) != null) {
    return "Failed delivery attempt";
  }

  if (action.match(/Onboard - your parcel is ready for delivery./) != null) {
    return "On-board for delivery";
  }

  if (action.match(/Signature Obtained/) != null) {
    return "Goods delivered";
  }

  if (
    action.match(/Your parcel has been passed onto a local delivery agent/) !=
    null
  ) {
    return "Passed to local delivery agent";
  }

  if (action.match(/\d+ item has been delivered. Signed for by:/) != null) {
    const signed_for_by = action.match(/Signed for by:(.*)/);
    if (signed_for_by.length > 0) {
      return "Goods delivered: " + signed_for_by[0];
    }
    return "Goods delivered";
  }

  return action;
}

function _compareDate(a, b) {
  let comparison = 0;

  if (a.value > b.value) {
    comparison = -1;
  } else if (a.value < b.value) {
    comparison = 1;
  }

  return comparison;
}

function transform(res) {
  let trackingInfo = [];
  let pickedupAt = null;
  let pickedUp = false;
  let image_url = null;
  let signature = null;
  if (res.Signature.length > 0) {
    signature = res.Signature;
  }

  res.Scans.forEach(coupon => {
    let isoDate = formatDate(coupon.Date);

    let h = {
      date: isoDate.date,
      time: isoDate.time,
      value: isoDate.value,
      action: parseAction(coupon.StatusDescription.trim()),
      location: coupon.Name
    };

    if (coupon.Type.indexOf("P") != -1) {
      pickedupAt = { date: isoDate.date, time: isoDate.time };
      pickedUp = true;
    }

    trackingInfo.push(h);
    trackingInfo.sort(_compareDate);
  });

  let st = parseStatus(res.Scans[res.Scans.length - 1]);
  trackingInfo = uniqWith(trackingInfo, isEqual);

  let delivered = st.delivered;
  let deliveredAt = null;
  if (delivered) {
    ob = trackingInfo[0];
    deliveredAt = { date: ob.date, time: ob.time };
  }

  trackingInfo.forEach(function(v) {
    delete v.value;
  });

  let r = {
    connote: get_connote(res),
    statusCode: 200,
    courier: "Fastway",
    status: st.status,
    pickedUp: pickedUp,
    pickedupAt: pickedupAt,
    delivered: delivered,
    deliveredAt: deliveredAt,
    signature: signature,
    trackingLink: courier_finder(get_connote(res)).tracking_link,
    activity: trackingInfo
  };

  return r;
}

module.exports = transform;

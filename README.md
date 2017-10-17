##  courier_tracking_fastway

Gets tracking information for a Fastway connote and return normalized json response.

[![Build Status](https://travis-ci.org/robzolkos/courier_tracking_fastway.svg?branch=master)](https://travis-ci.org/robzolkos/courier_tracking_fastway)

#### Usage

```javascript
const fastway_tracker = require('courier_tracking_fastway');

fastway_tracker("API_KEY", "CONNOTE", (err, r) => {
  if (err) {
    console.log(err);
  } else {
    console.log(r);
  }
});

```

A valid result will return a response like

```javascript
{
    connote: 'VA00112800000',
    statusCode: 200,
    courier: 'Fastway',
    status: 'Your parcel has been passed onto a local delivery agent who\'ll complete your delivery.',
    pickedUp: true,
    pickedupAt: {
        date: 'Sep 21, 2017',
        time: '4:00pm'
    },
    delivered: false,
    deliveredAt: null,
    signature: null,
    trackingLink: 'https://www.fastway.com.au/tools/track/?l=VA0011280000',
    activity: [{
            date: 'Sep 22, 2017',
            time: '1:15pm',
            action: 'Passed to local delivery agent',
            location: 'Australia'
        },
        {
            date: 'Sep 22, 2017',
            time: '1:15pm',
            action: 'Passed to local delivery agent',
            location: 'Australia'
        },
        {
            date: 'Sep 22, 2017',
            time: '1:13pm',
            action: 'Passed to local delivery agent',
            location: 'Australia'
        },
        {
            date: 'Sep 21, 2017',
            time: '4:00pm',
            action: 'Picked Up',
            location: 'Australia'
        }
    ]
}
```

An error result will look like:

```javascript
{
  connote: "BLAHBLAH",
  statusCode: 500,
  message: { error: "Invalid Fastway connote" }
}
```

#### Command Line testing

There is a command line script `livetest.js` that can be run to get responses in the terminal.

Usage for this is: `node livetest.js apikey connote`


#### Installation

```
npm install courier_tracking_fastway

or

yarn add courier_tracking_fastway
```

#### Licence

MIT

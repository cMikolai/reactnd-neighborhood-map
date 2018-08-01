//Using the client ID and secret obtained previously, lets make our first API call!. The examples below show you how to find a coffee shop near a given location.

const request = require('request');

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF',
    client_secret: 'VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE',
    ll: '40.7243,-74.0018',
    query: '',
    v: '20180323',
    limit: 1
  }
}, function(err, res, body) {
  if (err) {
    console.error(err);
  } else {
    //console.log(body);
  }
});

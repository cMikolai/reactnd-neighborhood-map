export const getFoursquare = (LocationsNearby) => {
	fetch('https://api.foursquare.com/v2/venues/search?near=London&query=food&v=20180323&limit=10&intent=browse&radius=500&client_id=AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF&client_secret=VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE')
	.then(res => res.json())
	.then(items => {
			this.setState({ items: items.response.venues });
		});
}



/*   client_id: 'AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF',
   client_secret: 'VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE',
   ll: '40.7243,-74.0018',
   query: '',
   v: '20180323',
   limit: 1

	 export const FetchData = (AddLocationsToArray) => {
	   fetch('https://api.foursquare.com/v2/venues/explore?ll=52.362884,4.863844&query=food&v=20180323&limit=10&intent=browse&radius=500&client_id=ZG1TWXPHE4V2ZEN0JK1GOGOA3NKLN2JQGPNJSN14AVYICL1X&client_secret=GGYHPT4BTUIBCWUZISGPS5JFAXUZHBYKTMVWK2AZAWPTAHCX')
	     .then(res => res.json())
	     .then(data => data.response.groups[0].items)
	     .then((locations) => AddLocationsToArray(locations))
	 }
 */

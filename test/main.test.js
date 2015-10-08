'use strict';

const signedFetch = require('../main');

signedFetch(`https://next-elastic.ft.com/v2_api_v2/item/_search`, {
		method: "POST",
		timeout: 9000,
		body: JSON.stringify({
				fields: ["_lastUpdatedDateTime"],
				size: 0
			}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(function(response) {
		if (response.status !== 200) {
			throw new Error("Response should be 200");
		}
		return response.json();
	})
	.then(function(data) {
		if (data.timed_out !== false) {
			throw new Error("Response should have come back with timed out property ‘false’");
		}
		console.log("All good!");
	})
	.catch(function(err) {
		console.log(err);
		process.exit(1);
	});

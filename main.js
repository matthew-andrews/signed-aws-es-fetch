'use strict';

const aws4 = require('aws4');
const fetch = global.fetch || require('node-fetch');
const urlParse = require('url').parse;
const resolveCname = require('denodeify')(require('dns').resolveCname);

module.exports = function(url, opts) {
	let urlObject = urlParse(url);
	if (/\.es\.amazonaws\.com$/.test(urlObject.host)) {
		return fetch(url, opts);
	} else {
		return resolveCname(urlObject.host)
			.then(function(host) {
				return signedFetch(url.replace(urlObject.host, host[0]), opts);
			});
	}
};

function signedFetch(url, opts) {
	const urlObject = urlParse(url);
	const signable = {
		method: opts.method,
		host: urlObject.host,
		path: urlObject.path,
		body: opts.body,
		headers: opts.headers
	};
	aws4.sign(signable, {
		accessKeyId: process.env.ES_AWS_ACCESS_KEY,
		secretAccessKey: process.env.ES_AWS_SECRET_ACCESS_KEY
	});
	opts.headers = signable.headers;
	return fetch(`${urlObject.protocol}//${opts.headers.Host}${signable.path}`, opts);
}

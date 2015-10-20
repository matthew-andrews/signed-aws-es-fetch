# signed-aws-es-fetch

## Install

```
npm install signed-aws-es-fetch
```

## Usage

For credentials either:-

- Specify them in the following format as the third argument to signedFetch:-

```js
signedFetch(url, opts, { accessKeyId: ???, secretAccessKey: ??? });
```

- Or, set `ES_AWS_ACCESS_KEY` and `ES_AWS_SECRET_ACCESS_KEY` environment variables, or
- Set `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY` environment variables.

```js
const signedFetch = require('signed-aws-es-fetch');

signedFetch(`https://${HOSTNAME_OF_ELASTIC_CLUSTER}/${INDEX}/_search`, {
		method: 'POST',
		body: JSON.stringify(…)
	})
	.then(function(response) {
		return response.json();
	});
```

To disable DNS resolution for domains outside of es.amazonaws.com you can use the `AWS_SIGNED_FETCH_DISABLE_DNS_RESOLUTION` environment variable.

# Node.js Hetzner DNS API Client

[![Hetzner DNS API Version](https://shields.io/badge/v1-%23D50C2D?label=Hetnzner%20DNS%20API&logo=hetzner&labelColor=%2324292E)](https://dns.hetzner.com/api-docs/)
[![Version](https://img.shields.io/npm/v/hetzner-dns-client.svg)](https://npmjs.org/package/hetzner-dns-client)
[![Downloads](https://img.shields.io/npm/dm/hetzner-dns-client.svg)](https://npmjs.org/package/hetzner-dns-client)

Hetzner DNS API client for Node.js

## Installation
```bash
npm i hetzner-dns-client
```

## Usage
You can use this client library with your Node.js project.

### JavaScript Example
```js
import {HetznerDnsClient, DnsRecord} from 'hetzner-dns-client';

// create client instance
const client = new HetznerDnsClient("YOUR_API_TOKEN");
// get zone by ID
const zone = await client.zones.get("ZONE_ID");
// create apex/root zone record of type "A" to 127.0.0.1
const record = await zone.createRecord("@", DnsRecord.Type.A, "127.0.0.1");
```

### TypeScript Example

```ts
import {HetznerDnsClient, DnsRecord, Zone} from 'hetzner-dns-client';

// create client instance
const client: HetznerDnsClient = new HetznerDnsClient("YOUR_API_TOKEN");
// get zone by ID
const zone: Zone = await client.zones.get("ZONE_ID");
// create apex/root zone record of type "A" to 127.0.0.1
const record: DnsRecord = await zone.createRecord("@", DnsRecord.Type.A, "127.0.0.1");
```

### Handling Errors
Methods that may throw an error are marked with `throws` in the documentation and specify what error types may be thrown. You can catch these errors with a `try/catch` block.

For example:

```js
try {
    const zone = await client.zones.get("ID that does not exist");
}
catch (err) {
    if (err instanceof ApiError)
        console.error(err); // the Hetzner API returned an error, e.g. "Zone not found"
    else if (err instanceof ClientParseError)
        console.error(err); // the client could not understand or parse the response from the Hetzner API
    else
        console.error(err); // some other error occurred
}
```

## API Documentation
The official Hetzner DNS API documentation can be found on [https://dns.hetzner.com/api-docs/](https://dns.hetzner.com/api-docs/).

> **Note**: The Hetzner DNS API documentation appears to be incomplete and contains a few errors. The documentation of this client library is a separate documentation and some functionality may be described differently.
> 
> If you find any errors in the documentation, or think that further clarification is needed, please open an issue or pull request.

The client library documentation is available in DOCS.md in this repository.

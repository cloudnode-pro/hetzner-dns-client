# Documentation
<details open>
	<summary>Table of Contents</summary>

- [Class: `HetznerDnsClient`](#class-hetznerdnsclient)
  - [`new HetznerDnsClient(token, [baseUrl])`](#new-hetznerdnsclienttoken-baseurl)
  - [`hetznerDnsClient.zones`](#hetznerdnsclientzones)
    - [`hetznerDnsClient.zones.getAll([options])`](#hetznerdnsclientzonesgetalloptions)
    - [`hetznerDnsClient.zones.create(name, [ttl])`](#hetznerdnsclientzonescreatename-ttl)
    - [`hetznerDnsClient.zones.get(id)`](#hetznerdnsclientzonesgetid)
    - [`hetznerDnsClient.zones.update(id, name, [ttl])`](#hetznerdnsclientzonesupdateid-name-ttl)
    - [`hetznerDnsClient.zones.delete(id)`](#hetznerdnsclientzonesdeleteid)
    - [`hetznerDnsClient.zones.importZone(id, file)`](#hetznerdnsclientzonesimportzoneid-file)
    - [`hetznerDnsClient.zones.exportZone(id)`](#hetznerdnsclientzonesexportzoneid)
    - [`hetznerDnsClient.zones.validateZone(file)`](#hetznerdnsclientzonesvalidatezonefile)
  - [`hetznerDnsClient.records`](#hetznerdnsclientrecords)
    - [`hetznerDnsClient.records.getAll([zoneId])`](#hetznerdnsclientrecordsgetallzoneid)
    - [`hetznerDnsClient.records.create(zoneId, name, type, value, [ttl])`](#hetznerdnsclientrecordscreatezoneid-name-type-value-ttl)
    - [`hetznerDnsClient.records.get(id)`](#hetznerdnsclientrecordsgetid)
    - [`hetznerDnsClient.records.update(id, zoneId, name, type, value, [ttl])`](#hetznerdnsclientrecordsupdateid-zoneid-type-name-value-ttl)
    - [`hetznerDnsClient.records.delete(id)`](#hetznerdnsclientrecordsdeleteid)
    - [`hetznerDnsClient.records.bulkCreate(records)`](#hetznerdnsclientrecordsbulkcreaterecords)
    - [`hetznerDnsClient.records.bulkUpdate(records)`](#hetznerdnsclientrecordsbulkupdaterecords)
  - [`hetznerDnsClient.primaryServers`](#hetznerdnsclientprimaryservers)
    - [`hetznerDnsClient.primaryServers.getAll([zoneId])`](#hetznerdnsclientprimaryserversgetallzoneid)
    - [`hetznerDnsClient.primaryServers.create(zoneId, address, port)`](#hetznerdnsclientprimaryserverscreatezoneid-address-port)
    - [`hetznerDnsClient.primaryServers.get(id)`](#hetznerdnsclientprimaryserversgetid)
    - [`hetznerDnsClient.primaryServers.update(id, zoneId, address, port)`](#hetznerdnsclientprimaryserversupdateid-zoneid-address-port)
    - [`hetznerDnsClient.primaryServers.delete(id)`](#hetznerdnsclientprimaryserversdeleteid)
- [Class: `Zone`](#class-zone)
  - [`zone.id`](#zoneid)
  - [`zone.name`](#zonename)
  - [`zone.created`](#zonecreated)
  - [`zone.modified`](#zonemodified)
  - [`zone.ttl`](#zonettl)
  - [`zone.secondary`](#zonesecondary)
  - [`zone.recordsCount`](#zonerecordscount)
  - [`zone.setTtl(ttl)`](#zonesetttlttl)
  - [`zone.importZone(file)`](#zoneimportzonefile)
  - [`zone.exportZone()`](#zoneexportzone)
  - [`zone.delete()`](#zonedelete)
  - [`zone.getRecords()`](#zonegetrecords)
  - [`zone.getPrimaryServers()`](#zonegetprimaryservers)
  - [`zone.createRecord(name, type, value, [ttl])`](#zonecreaterecordname-type-value-ttl)
  - [`zone.createPrimaryServer(address, port)`](#zonecreateprimaryserveraddress-port)
- [Class: `DnsRecord`](#class-dnsrecord)
  - [Enum: `DnsRecord.Type`](#enum-dnsrecordtype)
  - [Static method: `DnsRecord.getTypeFromString(type)`](#static-method-dnsrecordgettypefromstringtype)
  - [`dnsRecord.id`](#dnsrecordid)
  - [`dnsRecord.name`](#dnsrecordname)
  - [`dnsRecord.type`](#dnsrecordtype)
  - [`dnsRecord.value`](#dnsrecordvalue)
  - [`dnsRecord.ttl`](#dnsrecordttl)
  - [`dnsRecord.created`](#dnsrecordcreated)
  - [`dnsRecord.modified`](#dnsrecordmodified)
  - [`dnsRecord.zoneId`](#dnsrecordzoneid)
  - [`dnsRecord.getZone()`](#dnsrecordgetzone)
  - [`dnsRecord.update(options)`](#dnsrecordupdateoptions)
  - [`dnsRecord.delete()`](#dnsrecorddelete)
- [Class: `PrimaryServer`](#class-primaryserver)
  - [`primaryServer.id`](#primaryserverid)
  - [`primaryServer.address`](#primaryserveraddress)
  - [`primaryServer.port`](#primaryserverport)
  - [`primaryServer.zoneId`](#primaryserverzoneid)
  - [`primaryServer.created`](#primaryservercreated)
  - [`primaryServer.modified`](#primaryservermodified)
  - [`primaryServer.getZone()`](#primaryservergetzone)
  - [`primaryServer.update(options)`](#primaryserverupdateoptions)
  - [`primaryServer.delete()`](#primaryserverdelete)
- [Class: `ApiResponse<T extends ErrorModel>`](#class-apiresponset-extends-errormodel)
  - [`apiResponse.response`](#apiresponseresponse)
  - [`apiResponse.raw`](#apiresponseraw)
  - [`apiResponse.options`](#apiresponseoptions)
  - [`apiResponse.client`](#apiresponseclient)
  - [`apiResponse.body`](#apiresponsebody)
  - [`apiResponse.json`](#apiresponsejson)
- [Class: `Zones`](#class-zones)
  - [`zones.zones`](#zoneszones)
  - [`zones.count`](#zonescount)
  - [`zones.isLastPage`](#zonesislastpage)
  - [`zones.isComplete`](#zonesiscomplete)
  - [`zones.fetchNextPage()`](#zonesfetchnextpage)
  - [`zones.fetchAllPages()`](#zonesfetchallpages)
- [Class: ClientObject<T>](#class-clientobjectt)
  - [`clientObject.client`](#clientobjectclient)
  - [`clientObject._data`](#clientobject_data)
- [Class: `BulkCreateRecordsPretty`](#class-bulkcreaterecordspretty)
  - [`bulkCreateRecordsPretty.invalidRecords`](#bulkcreaterecordsprettyinvalidrecords)
  - [`bulkCreateRecordsPretty.records`](#bulkcreaterecordsprettyrecords)
  - [`bulkCreateRecordsPretty.validRecords`](#bulkcreaterecordsprettyvalidrecords)
- [Class: `BulkUpdateRecordsPretty`](#class-bulkupdaterecordspretty)
  - [`bulkUpdateRecordsPretty.failedRecords`](#bulkupdaterecordsprettyfailedrecords)
  - [`bulkUpdateRecordsPretty.records`](#bulkupdaterecordsprettyrecords)
- [Class: `ApiError`](#class-apierror)
  - [Class property: `ApiError.messages`](#class-property-apierrormessages)
  - [Class property: `ApiError.specialMessages`](#class-property-apierrorspecialmessages)
  - [`apiError.name`](#apierrorname)
  - [`apiError.code`](#apierrorcode)
  - [`apiError.apiResponse`](#apierrorapiresponse)
- [Class: `ClientParseError`](#class-clientparseerror)
  - [`clientParseError.name`](#clientparseerrorname)
  - [`clientParseError.message`](#clientparseerrormessage)
- [Interface: `ErrorModel`](#interface-errormodel)
- [Interface: `ZoneModel`](#interface-zonemodel)
- [Interface: `BulkCreateRecords`](#interface-bulkcreaterecords)
- [Interface: `BulkUpdateRecords`](#interface-bulkupdaterecords)
- [Interface: `BaseRecordModel`](#interface-baserecordmodel)
- [Interface: `RecordModel`](#interface-recordmodel)
- [Interface: `PrimaryServerModel`](#interface-primaryservermodel)
- [Interface: `PaginatedZones`](#interface-paginatedzones)
- [Interface: `PaginatedData`](#interface-paginateddata)
</details>

<a name="class-hetznerdnsclient"></a>

## Class: `HetznerDnsClient`
Hetzner DNS API client for Node.js

<a name="new-hetznerdnsclienttoken-baseurl"></a>

### `new HetznerDnsClient(token, [baseUrl])`
Create a new Hetzner DNS API client

- `token` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Hetzner DNS API token/key
- `baseUrl` <code>[**URL**](https://developer.mozilla.org/docs/Web/API/URL) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Base URL for the API (default: `https://dns.hetzner.com/api/v1`)

<a name="hetznerdnsclientzones"></a>

### `hetznerDnsClient.zones`
A secondary zone can be created, by adding a primary server before adding any records.

<a name="hetznerdnsclientzonesgetalloptions"></a>

#### `hetznerDnsClient.zones.getAll([options])`
Get all Zones

- `options` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)</code> Search options
  - `options.name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Full name of a zone. Will return an array with one or no results. Example: `example.com`
  - `options.page` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> A page parameter specifies the page to fetch. The number of the first page is 1. Must be >= 1.
  - `options.perPage` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Number of zones to be shown per page. Returns 100 by default. Maximum 100.
  - `options.searchName` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Partial name of a zone. Will return an array with zones that contain the searched string. Example: `example`
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zones**](#class-zones)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientzonescreatename-ttl"></a>

#### `hetznerDnsClient.zones.create(name, [ttl])`
Create Zone

- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[zone.name](#zonename)</code>
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> See <code>[zone.ttl](#zonettl)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientzonesgetid"></a>

#### `hetznerDnsClient.zones.get(id)`
Get Zone

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to get
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientzonesupdateid-name-ttl"></a>

#### `hetznerDnsClient.zones.update(id, name, [ttl])`
Update Zone

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to update
- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> The current name of the zone. Changing zone name is not possible.
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> New TTL for the zone (see <code>[zone.ttl](#zonettl)</code>)
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientzonesdeleteid"></a>

#### `hetznerDnsClient.zones.delete(id)`
Delete Zone

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to delete
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="hetznerdnsclientzonesimportzoneid-file"></a>

#### `hetznerDnsClient.zones.importZone(id, file)`
Import Zone file plain

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to import to
- `file` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**Uint8Array**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [**Buffer**](https://nodejs.org/api/buffer.html) | readonly [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)[]</code> Zone file contents to import
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientzonesexportzoneid"></a>

#### `hetznerDnsClient.zones.exportZone(id)`
Export Zone file

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to export
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="hetznerdnsclientzonesvalidatezonefile"></a>

#### `hetznerDnsClient.zones.validateZone(file)`
Validate Zone file plain

> **Warning**: As of Jan 19, 2023, this endpoint appears to always return an empty array for valid records.

- `file` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**Uint8Array**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [**Buffer**](https://nodejs.org/api/buffer.html) | readonly [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)[]</code> Zone file contents to validate
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**ZoneValidationPretty**](#class-zonevalidationpretty)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientrecords"></a>

### `hetznerDnsClient.records`

<a name="hetznerdnsclientrecordsgetallzoneid"></a>

#### `hetznerDnsClient.records.getAll(zoneId)`
Get All Records

- `zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to get records of
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)[]></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientrecordscreatezoneid-name-type-value-ttl"></a>

#### `hetznerDnsClient.records.create(zoneId, name, type, value, [ttl])`
Create Record

- `zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to create record in
- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.name](#dnsrecordname)</code>
- `type` <code>[**DnsRecord.Type**](#enum-dnsrecordtype)</code> See <code>[dnsRecord.type](#dnsrecordtype)</code>
- `value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.value](#dnsrecordvalue)</code>
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> See <code>[dnsRecord.ttl](#dnsrecordttl)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseeerror)</code>

<a name="hetznerdnsclientrecordsgetid"></a>

#### `hetznerDnsClient.records.get(id)`
Get Record

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of record to get
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientrecordsupdateid-zoneid-type-name-value-ttl"></a>

#### `hetznerDnsClient.records.update(id, zoneId, type, name, value, [ttl])`
Update Record

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of record to update
- `zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone the record is associated with. **Note**: Changing the zone of a record is not possible.
- `type` <code>[**DnsRecord.Type**](#enum-dnsrecordtype)</code> See <code>[dnsRecord.type](#dnsrecordtype)</code>. **Note**: Changing the type of a record is not possible.
- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.name](#dnsrecordname)</code>
- `value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.value](#dnsrecordvalue)</code>
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> See <code>[dnsRecord.ttl](#dnsrecordttl)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientrecordsdeleteid"></a>

#### `hetznerDnsClient.records.delete(id)`
Delete Record

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of record to delete
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="hetznerdnsclientrecordsbulkcreaterecords"></a>

#### `hetznerDnsClient.records.bulkCreate(records)`
Bulk Create Records

- `records` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)[]</code> Array of records to create
  - `records[].name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.name](#dnsrecordname)</code>
  - `records[].ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> See <code>[dnsRecord.ttl](#dnsrecordttl)</code>
  - `records[].type` <code>[**DnsRecord.Type**](#enum-dnsrecordtype)</code> See <code>[dnsRecord.type](#dnsrecordtype)</code>
  - `records[].value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.value](#dnsrecordvalue)</code>
  - `records[].zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to create the record in
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**BulkCreateRecordsPretty**](#class-bulkcreaterecordspretty)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientrecordsbulkupdaterecords"></a>

#### `hetznerDnsClient.records.bulkUpdate(records)`
Bulk Update Records

- `records` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)[]</code> Array of records to update
  - `records[].id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of record to update
  - `records[].name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.name](#dnsrecordname)</code>
  - `records[].ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> See <code>[dnsRecord.ttl](#dnsrecordttl)</code>
  - `records[].type` <code>[**DnsRecord.Type**](#enum-dnsrecordtype)</code> See <code>[dnsRecord.type](#dnsrecordtype)</code>. **Note**: Changing the type of a record is not possible.
  - `records[].value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.value](#dnsrecordvalue)</code>
  - `records[].zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone the record is associated with. **Note**: Changing the zone of a record is not possible.
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**BulkUpdateRecordsPretty**](#class-bulkupdaterecordspretty)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseeerror)</code>

<a name="hetznerdnsclientprimaryservers"></a>

### `hetznerDnsClient.primaryServers`
Primary servers can only be added to a zone, if no records were added to it, yet. By adding a primary server to a newly created zone, it automatically becomes a secondary zone.

<a name="hetznerdnsclientprimaryserversgetallzoneid"></a>

#### `hetznerDnsClient.primaryServers.getAll([zoneId])`
Get All Primary Servers

- `zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> ID of zone to get primary servers for
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)[]></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientprimaryserverscreatezoneid-address-port"></a>

#### `hetznerDnsClient.primaryServers.create(zoneId, address, port)`
Create Primary Server

- `zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone to create the primary server in
- `address` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[primaryServer.address](#primaryserveraddress)</code>
- `port` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> See <code>[primaryServer.port](#primaryserverport)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientprimaryserversgetid"></a>

#### `hetznerDnsClient.primaryServers.get(id)`
Get Primary Server

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of primary server to get
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="hetznerdnsclientprimaryserversupdateid-zoneid-address-port"></a>

#### `hetznerDnsClient.primaryServers.update(id, zoneId, address, port)`
Update Primary Server

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of primary server to update
- `zoneId` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone the primary server is associated with. **Note**: Changing the zone of a primary server is not possible.
- `address` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[primaryServer.address](#primaryserveraddress)</code>
- `port` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> See <code>[primaryServer.port](#primaryserverport)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseeerror)</code>

<a name="hetznerdnsclientprimaryserversdeleteid"></a>

#### `hetznerDnsClient.primaryServers.delete(id)`
Delete Primary Server

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of primary server to delete
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="class-zone"></a>

## Class: `Zone`
Hetzner DNS Zone

- Extends: <code>[**ClientObject**](#class-clientobjectt)&lt;[**ZoneModel**](#interface-zonemodel)></code>

<a name="zoneid"></a>

### `zone.id`
Zone ID

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="zonename"></a>

### `zone.name`
Zone name (i.e. domain name)

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="zonecreated"></a>

### `zone.created`
Zone creation time

- Type: <code>[**Date**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)</code>
- Read only

<a name="zonemodified"></a>

### `zone.modified`
Zone modification time

- Type: <code>[**Date**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)</code>
- Read only

<a name="zonettl"></a>

### `zone.ttl`
Zone default TTL (time to live) in seconds

- Type: <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code>
- Read only

<a name="zonesecondary"></a>

### `zone.secondary`
Whether this is a secondary zone Secondary zones have primary servers (see <code>[zone.getPrimaryServers()](#zonegetprimaryservers)</code>) instead of records (see <code>[zone.getRecords()](#zonegetrecords)</code>)

- Type: <code>[**boolean**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)</code>
- Read only

<a name="zonerecordscount"></a>

### `zone.recordsCount`
The number of records in this zone

- Type: <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code>
- Read only

<a name="zonegsetttlttl"></a>

### `zone.setTtl(ttl)`
Change zone default TTL (time to live)

- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> New zone default TTL
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code> The updated zone object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new zone object returned by this method.
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="zoneimportzone"></a>

### `zone.importZone(file)`
Import records from a zone file

- `file` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**Uint8Array**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [**Buffer**](https://nodejs.org/api/buffer.html) | readonly [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)[]</code> Zone file contents
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code> The updated zone object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new zone object returned by this method.
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="zoneexportzone"></a>

### `zone.exportZone()`
Export zone file

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)></code> Zone file contents
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="zonedelete"></a>

### `zone.delete()`
Delete this zone

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="zonegetrecords"></a>

### `zone.getRecords()`
Get all records in this zone

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)[]></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="zonegetprimaryservers"></a>

### `zone.getPrimaryServers()`
Get all primary servers for this zone

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)[]></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="zonecreaterecordname-type-value-ttl"></a>

### `zone.createRecord(name, type, value, [ttl])`
Create a new record in this zone

- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.name](#dnsrecordname)</code>
- `type` <code>[**DnsRecord.Type**](#enum-dnsrecordtype)</code> See <code>[dnsRecord.type](#dnsrecordtype)</code>
- `value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[dnsRecord.value](#dnsrecordvalue)</code>
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> See <code>[dnsRecord.ttl](#dnsrecordttl)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)></code> The created record object
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="zonecreateprimaryserveraddress-port"></a>

### `zone.createPrimaryServer(address, port)`
Create a primary server for this zone

- `address` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> See <code>[primaryServer.address](#primaryserveraddress)</code>
- `port` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> See <code>[primaryServer.port](#primaryserverport)</code>
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)></code> The created primary server object
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="class-dnsrecord"></a>

## Class: `DnsRecord`
Hetzner DNS Record

- Extends: <code>[**ClientObject**](#class-clientobject)&lt;[**RecordModel**](#interface-recordmodel)></code>

<a name="enum-dnsrecordtype"></a>

### Enum: `DnsRecord.Type`
Type of record

- `A` A records are the most commonly used type of record. They simply point your hostname to an IPv4 address.
- `AAAA` AAAA (quad-A) records are similar to A records, but they point your hostname to an IPv6 address instead of an IPv4 address.
- `PTR` PTR records are used to map an IP address to a hostname. They are commonly used for reverse DNS lookups.
- `NS` NS records determine which name servers are authoritative to the domain (or subdomain). They are typically used together with A records. Several NS records may be associated with a single zone at once.
- `MX` MX records handle the exchange of e-mails, and are used specifically for mail servers.
  > **Attention**: In the “Value” field, remember to put a dot . at the end of the hostname reference if you need one.
- `CNAME` CNAME records point your hostname to another domain. IP addresses are not accepted, as these will be handled by the records of the target domain. CNAME records cannot be added to a zone if there are any other existing records with the same name, regardless of type.
  > **Attention**: In the “Value” field, remember to put a dot . at the end of the hostname reference if you need one.
- `RP` Information about the responsible person(s) for the domain. Usually an email address with the @ replaced by a .
- `TXT` TXT records are plain text records that contain general information about your domain. A TXT record may often follow a certain specification (e.g. DKIM, DMARC) depending on its purpose.
- `SOA` Specifies authoritative information about a DNS zone, including the primary name server, the email of the domain administrator, the domain serial number, and several timers relating to refreshing the zone.
  > **Note**: Creating SOA records is not supported by the API.
- `HINFO` Record intended to provide information about host CPU type and operating system. It was intended to allow protocols to optimize processing when communicating with similar peers.
- `SRV` SRV records are used to specify server locations and their specified services.
- `DANE`
  > **Note**: Creating DANE records is not supported by the API.
- `TLSA` A record for DANE. RFC 6698 defines “The TLSA DNS resource record is used to associate a TLS server certificate or public key with the domain name where the record is found, thus forming a 'TLSA certificate association'“.
- `DS` The record used to identify the DNSSEC signing key of a delegated zone.
- `CAA` CAA Records allow you to specify which Certification Authorities can issue a certificate for your zone.

<a name="static-method-dnsrecordgettypefromstringtype"></a>

### Static method: `DnsRecord.getTypeFromString(type)`
Get the record type from string

- `type` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Record type string
- Returns: <code>[**DnsRecord.Type**](#enum-dnsrecordtype) | [**null**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/null)</code> Record type enum value or null if not found

<a name="dnsrecordid"></a>

### `dnsRecord.id`
Record ID

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="dnsrecordname"></a>

### `dnsRecord.name`
Record name

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="dnsrecordtype"></a>

### `dnsRecord.type`
Record type

- Type: <code>[**DnsRecord.Type**](#enum-dnsrecordtype)</code>
- Read only

<a name="dnsrecordvalue"></a>

### `dnsRecord.value`
Record value

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="dnsrecordttl"></a>

### `dnsRecord.ttl`
Record TTL (time to live) in seconds

Null if not set (i.e. depends on the zone default)

- Type: <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**null**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/null)</code>
- Read only

<a name="dnsrecordcreated"></a>

### `dnsRecord.created`
Time record was created

- Type: <code>[**Date**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)</code>
- Read only

<a name="dnsrecordmodified"></a>

### `dnsRecord.modified`
Time record was last updated

- Type: <code>[**Date**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)</code>
- Read only

<a name="dnsrecordzoneid"></a>

### `dnsRecord.zoneId`
Zone ID this record is associated with

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="dnsrecordgetzone"></a>

### `dnsRecord.getZone()`
Get the zone object this record belongs to

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code> Promise that resolves to the zone object
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="dnsrecordupdateoptions"></a>

### `dnsRecord.update(options)`
Update the record

- `options` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)</code> Update options
  - `options.name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Record name
  - `options.value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Record value
  - `options.ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Record TTL (time to live) in seconds
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**DnsRecord**](#class-dnsrecord)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="dnsrecorddelete"></a>

### `dnsRecord.delete()`
Delete the record

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="class-primaryserver"></a>

## Class: `PrimaryServer`
Primary server

- Extends: <code>[**ClientObject**](#class-clientobject)&lt;[**PrimaryServerModel](#interface-primaryservermodel)></code>

<a name="primaryserverid"></a>

### `primaryServer.id`
ID of the primary server

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="primaryserveraddress"></a>

### `primaryServer.address`
IPv4 or IPv6 address of the primary server

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="primaryserverport"></a>

### `primaryServer.port`
Port number of the primary server (from 1 to 65535)

- Type: <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code>
- Read only

<a name="primaryserverzoneid"></a>

### `primaryServer.zoneId`
ID of zone this primary server is associated with

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="primaryservercreated"></a>

### `primaryServer.created`
Time primary server was created

- Type: <code>[**Date**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)</code>
- Read only

<a name="primaryservermodified"></a>

### `primaryServer.modified`
Time primary server was last updated

- Type: <code>[**Date**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)</code>
- Read only

<a name="primaryservergetzone"></a>

### `primaryServer.getZone()`
Get zone this primary server is associated with

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zone**](#class-zone)></code> Promise that resolves to the zone object
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="primaryserverupdateoptions"></a>

### `primaryServer.update(options)`
Update primary server

- `options` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)</code> Update options
  - `options.address` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> New server address (see <code>[primaryServer.address](#primaryserveraddress)</code>)
  - `options.port` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> New server port (see <code>[primaryServer.port](#primaryserverport)</code>)
- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**PrimaryServer**](#class-primaryserver)></code> The updated primary server object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new primary server object returned by this method.
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseeerror)</code>

<a name="primaryserverdelete"></a>

### `primaryServer.delete()`
Delete this primary server

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>

<a name="class-apiresponset-extends-errormodel"></a>

## Class: `ApiResponse<T extends ErrorModel>`
API response object

- Template: `T` <code>[**ErrorModel**](#interface-errormodel)</code> Response data model

<a name="apiresponseresponse"></a>

### `apiResponse.response`
Fetch response

- Type: <code>[**Response**](https://github.com/node-fetch/node-fetch/blob/71e376b0ca899a30bbda4d45f97ea87502956a62/README.md#class-response)</code>
- Read only

<a name="apiresponseraw"></a>

### `apiResponse.raw`
Raw response body

- Type: <code>[**ArrayBuffer**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)</code>
- Read only

<a name="apiresponseoptions"></a>

### `apiResponse.options`
Request options

- Type: <code>[**RequestInit**](https://github.com/node-fetch/node-fetch/blob/71e376b0ca899a30bbda4d45f97ea87502956a62/README.md#options)</code>
- Read only

<a name="apiresponseclient"></a>

### `apiResponse.client`
API client instance used to make the request

- Type: <code>[**HetznerDnsClient**](#class-hetznerdnsclient)</code>
- Read only

<a name="apiresponsebody"></a>

### `apiResponse.body`
Get response body as string

- Type: <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
- Read only

<a name="apiresponsejson"></a>

### `apiResponse.json`
Get parsed response body (if JSON). null if not JSON or parsing fails.

- Type: <code>**T** | [**null**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/null)</code>
- Read only

<a name="class-zones"></a>

## Class: `Zones`
A collection of zones

- Extends: <code>[**ClientObject**](#class-clientobjectt)&lt;[**PaginatedZones**](#interface-paginatedzones)></code>

<a name="zoneszones"></a>

### `zones.zones`
Get zones in this collection

- Type: <code>[**Zone**](#class-zone)[]</code>
- Read only

<a name="zonescount"></a>

### `zones.count`
Get number of zones in this collection

- Type: <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code>
- Read only

<a name="zonesislastpage"></a>

### `zones.isLastPage`
Check if this is the last page

- Type: <code>[**boolean**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)</code>
- Read only

<a name="zonesiscomplete"></a>

### `zones.isComplete`
Whether this collection contains all possible zones from the time of fetching.

- Type: <code>[**boolean**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)</code>
- Read only

<a name="zonesfetchnextpage"></a>

### `zones.fetchNextPage()`
Fetch next page of zones and attach them to this collection

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**Zones**](#class-zones) | [**null**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/null)></code> The newly fetched page or null if there are no more pages
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="zonesfetchallpages"></a>

### `zones.fetchAllPages()`
Fetch all pages after the current page and attach them to this collection.

> **Note**: This method will make multiple API calls and may take a while, depending on the number of zones.

- Returns: <code>[**Promise**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[**void**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)></code>
- Throws: <code>[**ApiError**](#class-apierror)</code>, <code>[**ClientParseError**](#class-clientparseerror)</code>

<a name="class-clientobjectt"></a>

## Class: `ClientObject<T>`
Client object

- Template: <code>T</code> Raw data model

<a name="clientobjecttclient"></a>

### `clientObject.client`
API client instance

- Type: <code>[**HetznerDnsClient**](#class-hetznerdnsclient)</code>
- Read only

<a name="clientobjecttdata"></a>

### `clientObject._data`
Raw data

- Type: <code>T</code>
- Read only

<a name="class-bulkcreaterecordspretty"></a>

## Class: `BulkCreateRecordsPretty`
Response from bulk creating records

- Extends: <code>[**ClientObject**](#class-clientobjectt)&lt;[**BulkCreateRecords**](#interface-bulkcreaterecords)></code>

<a name="bulkcreaterecordsprettyinvalidrecords"></a>

### `bulkCreateRecordsPretty.invalidRecords`
Invalid records

- Type: <code>[**BaseRecordModel**](#interface-baserecordmodel)[]</code>
- Read only

<a name="bulkcreaterecordsprettyrecords"></a>

### `bulkCreateRecordsPretty.records`
Records that were created

- Type: <code>[**DnsRecord**](#class-dnsrecord)[]</code>
- Read only

<a name="bulkcreaterecordsprettyvalidrecords"></a>

### `bulkCreateRecordsPretty.validRecords`
Valid records

- Type: <code>[**BaseRecordModel**](#interface-baserecordmodel)[]</code>
- Read only

<a name="class-bulkuptdaterecordspretty"></a>

## Class: `BulkUpdateRecordsPretty`
Response from bulk updating records

- Extends: <code>[**ClientObject**](#class-clientobjectt)&lt;[**BulkUpdateRecords**](#interface-bulkupdaterecords)></code>

<a name="bulkuptdaterecordsprettyfailedrecords"></a>

### `bulkUptdateRecordsPretty.failedRecords`
Failed records

- Type: <code>[**BaseRecordModel**](#interface-baserecordmodel)[]</code>
- Read only

<a name="bulkuptdaterecordsprettyrecords"></a>

### `bulkUptdateRecordsPretty.records`
Records that were updated

- Type: <code>[**DnsRecord**](#class-dnsrecord)[]</code>
- Read only

<a name="class-apierror"></a>

## Class: `ApiError`
Hetzner API error

- Extends: <code>[**Error**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)</code>

<a name="class-property-apierrormessages"></a>

### Class property: `ApiError.messages`

Standard messages returned by the API i.e. messages returned with a standard error JSON response

- Type: <code>[**Record**](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)&lt;[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)></code>
- Read only

<a name="class-property-apierrorspecialmessages"></a>

### Class property: `ApiError.specialMessages`
Non-standard error messages

Sometimes the Hetzner API returns non-JSON responses, or e.g. it issues a redirect to the login page when credentials are invalid

- Type: <code>[**Record**](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)&lt;[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), {code: [**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number), message: [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)}></code>

<a name="apierrorname"></a>

### `apiError.name`
Name of the error

- Type: <code>**"ApiError"**</code>
- Read only
- Override

<a name="apierrorcode"></a>

### `apiError.code`
Error code

- Type: <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code>
- Read only

<a name="apierrorapiresponse"></a>

### `apiError.apiResponse`
Full API response

- Type: <code>[**ApiResponse**](#class-apiresponset-extends-errormodel)&lt;[**any**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)></code>
- Read only

<a name="class-clientparseerror"></a>

## Class: `ClientParseError`
API client failed to understand and parse the API response

- Extends: <code>[**Error**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)</code>

<a name="clientparseerrorname"></a>

### `clientParseError.name`
Name of the error

- Type: <code>**"ClientParseError"**</code>
- Read only

<a name="clientparseerrormessage"></a>

### `clientParseError.message`

- Type: <code>**"API client failed to understand and parse the API response"**</code>
- Read only

<a name="interface-errormodel"></a>

## Interface: `ErrorModel`
Error model of API responses

- `error` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) | [**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code>
  - `message` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Error message
  - `code` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> Error code
- `message` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Error message

<a name="interface-zonemodel"></a>

## Interface: `ZoneModel`
Hetzner DNS zone model

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Unique identifier of the zone
- `created` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Zone creation timestamp in ISO 8601 format
- `modified` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Timestamp of the last change of the zone in ISO 8601 format
- `legacy_dns_host` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Legacy DNS host name of the zone
- `legacy_ns` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)[]</code> Legacy name server names of the zone
- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Name of the zone
- `ns` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)[]</code> Name server names of the zone
- `owner` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Zone owner
- `paused` <code>[**boolean**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)</code> Whether the zone is paused
- `permission` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Permission of the zone
- `project` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Project of the zone
- `registrar` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Zone registrar
- `status` <code>**verified**</code> Status of the zone
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> Default TTL (time to live) in seconds for records in this DNS zone
- `verified` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Zone verification timestamp in ISO 8601 format or empty string
- `records_count` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> Number of records in the zone
- `txt_verification` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)</code> TXT record verification
  - `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Name of the TXT record
  - `token` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Verification token (value of the TXT record)
- `is_secondary_dns` <code>[**boolean**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)</code> Whether this is a secondary zone

<a name="interface-bulkcreaterecords"></a>

## Interface: `BulkCreateRecords`
Bulk create records API response model

- Extends: <code>[**ErrorModel**](#interface-errormodel)</code>
- `invalid_records` <code>[**BaseRecordModel**](#interface-baserecordmodel)[]</code>
- `records` <code>[**RecordModel**](#interface-recordmodel)[]</code>
- `valid_records` <code>[**BaseRecordModel**](#interface-baserecordmodel)[]</code>

<a name="interface-bulkupdaterecords"></a>

## Interface: `BulkUpdateRecords`
Bulk update records response model

- Extends: <code>[**ErrorModel**](#interface-errormodel)</code>
- `failed_records` <code>[**BaseRecordModel**](#interface-baserecordmodel)[]</code>
- `records` <code>[**RecordModel**](#interface-recordmodel)[]</code>

<a name="interface-baserecordmodel"></a>

## Interface: `BaseRecordModel`
Base record model

- `name` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Name of record
- `ttl` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | [**undefined**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined)</code> Time to live in seconds
- `type` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Type of record (string corresponding to enum value from <code>[DnsRecord.Type](#enum-dnsrecordtype)</code>)
- `value` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Value of record
- `zone_id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone this record is associated with

<a name="interface-recordmodel"></a>

## Interface: `RecordModel`
Record model

- Extends: <code>[**BaseRecordModel**](#interface-baserecordmodel)</code>
- `created` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Time record was created (ISO 8601)
- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of record
- `modified` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Time record was last updated (ISO 8601)

<a name="interface-primaryservermodel"></a>

## Interface: `PrimaryServerModel`
Primary server model

- `id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Primary server ID
- `address` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> IPv4 or IPv6 address of the primary server
- `port` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> Port number of the primary server (from 1 to 65535)
- `zone_id` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> ID of zone this primary server is associated with
- `created_at` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Time primary server was created (ISO 8601)
- `updated_at` <code>[**string**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)</code> Time primary server was last updated (ISO 8601)

<a name="interface-paginatedzones"></a>

## Interface: `PaginatedZones`
API response with paginated zones

- Extends: <code>[**PaginatedData**](#interface-paginateddata)</code>
- `zones` <code>[**ZoneModel**](#interface-zonemodel)[]</code> List of zones

<a name="interface-paginateddata"></a>

## Interface: `PaginatedData`
Paginated API response

- Extends: <code>[**ErrorModel**](#interface-errormodel)</code>
- `meta` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)</code> Response metadata
  - `pagination` <code>[**Object**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)</code> Pagination information
    - `page` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> The current page number (starting at 1)
    - `per_page` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> The number of items shown per page
    - `last_page` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> The number of the last page
    - `total_entries` <code>[**number**](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> The total number of items

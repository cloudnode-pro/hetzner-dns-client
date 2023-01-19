import ClientObject from "./ClientObject.js";
import BulkCreateRecords from "./models/BulkCreateRecords";
import DnsRecord from "./DnsRecord.js";

/**
 * Response from bulk creating records
 * @class
 * @extends {ClientObject<BulkCreateRecords>}
 */
export default class BulkCreateRecordsPretty extends ClientObject<BulkCreateRecords> {
    /**
     * Invalid records
     * @type {BaseRecordModel[]}
     * @readonly
     */
    public readonly invalidRecords = this._data.invalid_records;

    /**
     * Records that were created
     * @type {Record[]}
     * @readonly
     */
    public readonly records = this._data.records.map(record => new DnsRecord(this.client, record));

    /**
     * Valid records
     * @type {BaseRecordModel[]}
     * @readonly
     */
    public readonly validRecords = this._data.valid_records;
}

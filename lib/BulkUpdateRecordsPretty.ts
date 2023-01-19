import ClientObject from "./ClientObject.js";
import DnsRecord from "./DnsRecord.js";
import BulkUpdateRecords from "./models/BulkUpdateRecords";

/**
 * Response from bulk creating records
 * @class
 * @extends {ClientObject<BulkCreateRecords>}
 */
export default class BulkUpdateRecordsPretty extends ClientObject<BulkUpdateRecords> {
    /**
     * Failed records
     * @type {BaseRecordModel[]}
     * @readonly
     */
    public readonly failedRecords = this._data.failed_records;

    /**
     * Records that were updated
     * @type {Record[]}
     * @readonly
     */
    public readonly records = this._data.records.map(record => new DnsRecord(this.client, record));
}

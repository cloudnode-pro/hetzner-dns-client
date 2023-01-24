import ZoneValidation from "./models/ZoneValidation";
import ClientObject from "./ClientObject.js";
import DnsRecord from "./DnsRecord.js";

/**
 * Hetzner DNS Zone Validation
 * @class
 * @extends {ClientObject<ZoneValidation>}
 */
export default class ZoneValidationPretty extends ClientObject<ZoneValidation> {
    /**
     * Number of parsed records
     * @type {number}
     * @readonly
     */
    public readonly parsedRecords = this._data.parsed_records;

    /**
     * Valid records
     * @type {DnsRecord[]}
     */
    public readonly validRecords = this._data.valid_records.map((record) => new DnsRecord(this.client, record));
}

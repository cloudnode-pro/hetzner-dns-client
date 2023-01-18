import ZoneValidation from "./models/ZoneValidation";
import ClientObject from "./ClientObject.js";
import HetznerDnsClient from "./HetznerDnsClient.js";
import Record from "./Record.js";

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
     * @type {Record[]}
     */
    public readonly validRecords = this._data.valid_records.map((record) => new Record(this.client, record));

    /**
     * Create a new zone validation object
     * @param {HetznerDnsClient} client - API client instance
     * @param {ZoneValidation} data - Raw zone validation data
     */
    public constructor(client: HetznerDnsClient, data: ZoneValidation) {
        super(client, data);
    }
}

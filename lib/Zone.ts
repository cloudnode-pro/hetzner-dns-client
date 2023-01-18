import ClientObject from "./ClientObject.js";
import HetznerDnsClient from "./HetznerDnsClient.js";
import ZoneModel from "./models/ZoneModel.js";

/**
 * Hetzner DNS Zone
 * @class
 * @extends {ClientObject}
 */
export default class Zone extends ClientObject<ZoneModel> {
    /**
     * Create a new zone object
     * @param {HetznerDnsClient} client - API client instance
     * @param {ZoneModel} data - Raw zone data
     */
    public constructor(client: HetznerDnsClient, data: ZoneModel) {
        super(client, data);
    }

    /**
     * Zone ID
     * @type {string}
     * @readonly
     */
    public readonly id = this._data.zone.id;

    /**
     * Zone name
     * @type {string}
     * @readonly
     */

    public readonly name = this._data.zone.name;

    /**
     * Zone creation time
     * @type {Date}
     * @readonly
     */
    public readonly created = new Date(this._data.zone.created);

    /**
     * Zone modification time
     * @type {Date}
     * @readonly
     */
    public readonly modified = new Date(this._data.zone.modified);

    /**
     * Zone default TTL (time to live) in seconds
     * @type {number}
     * @readonly
     */
    public readonly ttl = this._data.zone.ttl;

    /**
     * The number of records in this zone
     * @type {number}
     * @readonly
     */
    public readonly recordsCount = this._data.zone.records_count;
}

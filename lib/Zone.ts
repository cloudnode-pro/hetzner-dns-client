import ClientObject from "./ClientObject.js";
import HetznerDnsClient from "./HetznerDnsClient.js";
import ZoneModelWrapped from "./models/ZoneModelWrapped.js";

/**
 * Hetzner DNS Zone
 * @class
 * @extends {ClientObject}
 */
export default class Zone extends ClientObject<ZoneModelWrapped> {

    /**
     * Zone ID
     * @type {string}
     * @readonly
     */
    public readonly id = this._data.zone.id;

    /**
     * Zone name (i.e. domain name)
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
    /**
     * Create a new zone object
     * @param {HetznerDnsClient} client - API client instance
     * @param {ZoneModel} data - Raw zone data
     */
    public constructor(client: HetznerDnsClient, data: ZoneModelWrapped) {
        super(client, data);
    }

    /**
     * Change zone default TTL (time to live)
     * @param {number} ttl - New zone default TTL
     * @returns {Promise<Zone>} - The updated zone object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new zone object returned by this method.
     * @throws {ApiError}
     */
    public async setTtl(ttl: number): Promise<Zone> {
        return await this.client.zones.update(this.id, this.name, ttl);
    }

    /**
     * Delete this zone
     * @returns {Promise<void>}
     * @throws {ApiError}
     */
    public async delete(): Promise<void> {
        await this.client.zones.delete(this.id);
    }
}

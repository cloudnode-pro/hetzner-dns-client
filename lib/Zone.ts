import ClientObject from "./ClientObject.js";
import HetznerDnsClient from "./HetznerDnsClient.js";
import ZoneModel from "./models/ZoneModel";

/**
 * Hetzner DNS Zone
 * @class
 * @extends {ClientObject<ZoneModel>}
 */
export default class Zone extends ClientObject<ZoneModel> {

    /**
     * Zone ID
     * @type {string}
     * @readonly
     */
    public readonly id = this._data.id;

    /**
     * Zone name (i.e. domain name)
     * @type {string}
     * @readonly
     */

    public readonly name = this._data.name;

    /**
     * Zone creation time
     * @type {Date}
     * @readonly
     */
    public readonly created = new Date(this._data.created);

    /**
     * Zone modification time
     * @type {Date}
     * @readonly
     */
    public readonly modified = new Date(this._data.modified);

    /**
     * Zone default TTL (time to live) in seconds
     * @type {number}
     * @readonly
     */
    public readonly ttl = this._data.ttl;

    /**
     * The number of records in this zone
     * @type {number}
     * @readonly
     */
    public readonly recordsCount = this._data.records_count;
    /**
     * Create a new zone object
     * @param {HetznerDnsClient} client - API client instance
     * @param {ZoneModel} data - Raw zone data
     */
    public constructor(client: HetznerDnsClient, data: ZoneModel) {
        super(client, data);
    }

    /**
     * Change zone default TTL (time to live)
     * @param {number} ttl - New zone default TTL
     * @returns {Promise<Zone>} - The updated zone object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new zone object returned by this method.
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async setTtl(ttl: number): Promise<Zone> {
        return await this.client.zones.update(this.id, this.name, ttl);
    }

    /**
     * Import records from a zone file
     * @param {string | Uint8Array | Buffer | readonly number[]} file - Zone file contents
     * @returns {Promise<Zone>} - The updated zone object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new zone object returned by this method.
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async importZone(file: string | Uint8Array | Buffer | readonly number[]): Promise<Zone> {
        return await this.client.zones.importZone(this.id, file);
    }

    /**
     * Export zone file
     * @returns {Promise<string>} - Zone file contents
     * @throws {ApiError}
     */
    public async exportZone(): Promise<string> {
        return await this.client.zones.exportZone(this.id);
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

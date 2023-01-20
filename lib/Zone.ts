import ClientObject from "./ClientObject.js";
import ZoneModel from "./models/ZoneModel";
import DnsRecord from "./DnsRecord.js";
import PrimaryServer from "./PrimaryServer.js";

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
     * Whether this is a secondary zone
     * Secondary zones have primary servers (see {@link Zone#getPrimaryServers}) instead of records (see {@link Zone#getRecords})
     * @type {boolean}
     * @readonly
     */
    public get secondary(): boolean {
        return this._data.is_secondary_dns;
    }

    /**
     * The number of records in this zone
     * @type {number}
     * @readonly
     */
    public readonly recordsCount = this._data.records_count;

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

    /**
     * Get all records in this zone
     * @returns {Promise<DnsRecord[]>}
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async getRecords(): Promise<DnsRecord[]> {
        return await this.client.records.getAll(this.id);
    }

    /**
     * Get all primary servers for this zone
     * @returns {Promise<PrimaryServer[]>}
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async getPrimaryServers(): Promise<PrimaryServer[]> {
        return await this.client.primaryServers.getAll(this.id);
    }

    /**
     * Create a new record in this zone
     * @param {string} name - See {@link DnsRecord#name}
     * @param {DnsRecord.Type} type - See {@link DnsRecord#type}
     * @param {string} value - See {@link DnsRecord#value}
     * @param {number} [ttl] - See {@link DnsRecord#ttl}
     * @returns {Promise<DnsRecord>} - The created record object
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async createRecord(name: string, type: DnsRecord.Type, value: string, ttl?: number): Promise<DnsRecord> {
        return await this.client.records.create(this.id, name, type, value, ttl);
    }

    /**
     * Create a new primary server for this zone
     * @param {string} address - See {@link PrimaryServer#address}
     * @param {number} port - See {@link PrimaryServer#port}
     * @returns {Promise<PrimaryServer>} - The created primary server object
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async createPrimaryServer(address: string, port: number): Promise<PrimaryServer> {
        return await this.client.primaryServers.create(this.id, address, port);
    }
}

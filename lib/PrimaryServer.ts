import ClientObject from "./ClientObject.js";
import PrimaryServerModel from "./models/PrimaryServerModel";
import Zone from "./Zone.js";

/**
 * Primary server
 * @class
 * @extends {ClientObject<PrimaryServerModel>}
 */
export default class PrimaryServer extends ClientObject<PrimaryServerModel> {
    /**
     * ID of the primary server
     * @type {string}
     * @readonly
     */
    public readonly id = this._data.id;

    /**
     * IPv4 or IPv6 address of the primary server
     * @type {string}
     * @readonly
     */
    public readonly address = this._data.address;

    /**
     * Port number of the primary server (from 1 to 65535)
     * @type {number}
     * @readonly
     */
    public readonly port = this._data.port;

    /**
     * ID of zone this primary server is associated with
     * @type {string}
     * @readonly
     */
    public readonly zoneId = this._data.zone_id;

    /**
     * Time primary server was created
     * @type {Date}
     * @readonly
     */
    public readonly created = new Date(this._data.created_at);

    /**
     * Time primary server was last updated
     * @type {Date}
     * @readonly
     */
    public readonly modified = new Date(this._data.updated_at);

    /**
     * Get zone this primary server is associated with
     * @returns {Promise<Zone>}
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async getZone(): Promise<Zone> {
        return await this.client.zones.get(this.zoneId);
    }

    /**
     * Update primary server
     * @param {Object} options - Options
     * @param {string} [options.address] - New server address (see {@link PrimaryServer#address})
     * @param {number} [options.port] - New server port (see {@link PrimaryServer#port})
     * @returns {Promise<PrimaryServer>} - The updated primary server object. **Note**: Avoid using the old object after updating it to avoid inconsistencies. You should use the new primary server object returned by this method.
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async update(options: { address?: string, port?: number }): Promise<PrimaryServer> {
        return await this.client.primaryServers.update(this.id, this.zoneId, options.address ?? this.address, options.port ?? this.port);
    }

    /**
     * Delete this primary server
     * @returns {Promise<void>}
     * @throws {ApiError}
     */
    public async delete(): Promise<void> {
        await this.client.primaryServers.delete(this.id);
    }
}

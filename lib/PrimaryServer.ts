import ClientObject from "./ClientObject.js";
import PrimaryServerModel from "./models/PrimaryServerModel";

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
    public readonly created = new Date(this._data.created);

    /**
     * Time primary server was last updated
     * @type {Date}
     * @readonly
     */
    public readonly modified = new Date(this._data.modified);
}

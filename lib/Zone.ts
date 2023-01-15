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
    public get id(): string {
        return this._data.zone.id;
    }

    /**
     * Zone name
     * @type {string}
     * @readonly
     */
    public get name(): string {
        return this._data.zone.name;
    }

    /**
     * Zone creation time
     * @type {Date}
     * @readonly
     */
    public get created(): Date {
        return new Date(this._data.zone.created);
    }

    /**
     * Zone modification time
     * @type {Date}
     * @readonly
     */
    public get modified(): Date {
        return new Date(this._data.zone.modified);
    }

    /**
     * Zone default TTL (time to live) in seconds
     * @type {number}
     * @readonly
     */
    public get ttl(): number {
        return this._data.zone.ttl;
    }

    /**
     * The number of records in this zone
     * @type {number}
     * @readonly
     */
    public get recordsCount(): number {
        return this._data.zone.records_count;
    }
}

import ClientObject from "./ClientObject.js";
import RecordModel from "./models/RecordModel";
import HetznerDnsClient from "./HetznerDnsClient.js";
import Zone from "./Zone";

/**
 * Hetzner DNS Record
 * @class
 * @extends {ClientObject<RecordModel>}
 */
class DnsRecord extends ClientObject<RecordModel> {
    /**
     * Record ID
     * @type {string}
     * @readonly
     */
    public readonly id = this._data.id;

    /**
     * Record name
     * @type {string}
     * @readonly
     */
    public readonly name = this._data.name;

    /**
     * Record type
     * @type {Record.Type}
     * @readonly
     */
    public readonly type = DnsRecord.getTypeFromString(this._data.type);

    /**
     * Record value
     * @type {string}
     * @readonly
     */
    public readonly value = this._data.value;

    /**
     * Record TTL (time to live) in seconds
     *
     * Null if not set (i.e. depends on zone default)
     * @type {number | null}
     * @readonly
     */
    public readonly ttl = this._data.ttl ?? null;

    /**
     * Time record was created
     * @type {Date}
     * @readonly
     */
    public readonly created = new Date(this._data.created);

    /**
     * Time record was last updated
     * @type {Date}
     * @readonly
     */
    public readonly modified = new Date(this._data.modified);

    /**
     * Zone ID this record is associated with
     * @type {string}
     * @readonly
     */
    public readonly zoneId = this._data.zone_id;

    /**
     * Create a new record object
     * @param {HetznerDnsClient} client - API client instance
     * @param {RecordModel} data - Raw record data
     */
    public constructor(client: HetznerDnsClient, data: RecordModel) {
        super(client, data);
    }

    /**
     * Get the zone object this record belongs to
     * @returns {Promise<Zone>}
     * @throws {ApiError}
     * @throws {ClientParseError}
     */
    public async getZone(): Promise<Zone> {
        return await this.client.zones.get(this.zoneId);
    }

    /**
     * Get the record type from string
     * @param {string} type - Record type string
     * @returns {Type | null} - Record type enum value or null if not found
     * @static
     */
    public static getTypeFromString(type: string): DnsRecord.Type | null {
        if (type in DnsRecord.Type) return DnsRecord.Type[type as keyof typeof DnsRecord.Type];
        return null;
    }
}

namespace DnsRecord {
    /**
     * Type of record
     * @enum {string}
     */
    export enum Type {
        A = "A",
        AAAA = "AAAA",
        PTR = "PTR",
        NS = "NS",
        MX = "MX",
        CNAME = "CNAME",
        RP = "RP",
        TXT = "TXT",
        SOA = "SOA",
        HINFO = "HINFO",
        SRV = "SRV",
        DANE = "DANE",
        TLSA = "TLSA",
        DS = "DS",
        CA = "CA"
    }
}

export default DnsRecord;
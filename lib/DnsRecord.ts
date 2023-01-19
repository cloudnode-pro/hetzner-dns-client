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
    public readonly type = DnsRecord.getTypeFromString(this._data.type)!;

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
        /**
         * A records are the most commonly used type of record. They simply point your hostname to an IPv4 address.
         */
        A = "A",
        /**
         * AAAA (quad-A) records are similar to A records, but they point your hostname to an IPv6 address instead of an IPv4 address.
         */
        AAAA = "AAAA",
        /**
         * PTR records are used to map an IP address to a hostname. They are commonly used for reverse DNS lookups.
         *
         * **Note**: Creating PTR records is not supported by the API.
         */
        PTR = "PTR",
        /**
         * NS records determine which name servers are authoritative to the domain (or subdomain). They are typically used together with A records. Several NS records may be associated with a single zone at once.
         */
        NS = "NS",
        /**
         * MX records handle the exchange of e-mails, and are used specifically for mail servers.
         *
         * **Attention**: In the "Value" field, remember to put a dot . at the end of the hostname reference if you need one.
         */
        MX = "MX",
        /**
         * CNAME records point your hostname to another domain. IP addresses are not accepted, as these will be handled by the records of the target domain. CNAME records cannot be added to a zone if there are any other existing records with the same name, regardless of type.
         *
         * **Attention**: In the "Value" field, remember to put a dot . at the end of the hostname reference if you need one.
         */
        CNAME = "CNAME",
        /**
         * Information about the responsible person(s) for the domain. Usually an email address with the @ replaced by a .
         */
        RP = "RP",
        /**
         * TXT records are plain text records that contain general information about your domain. A TXT record may often follow a certain specification (e.g. DKIM, DMARC) depending on its purpose.
         */
        TXT = "TXT",
        /**
         * Specifies authoritative information about a DNS zone, including the primary name server, the email of the domain administrator, the domain serial number, and several timers relating to refreshing the zone.
         *
         * **Note**: Creating SOA records is not supported by the API.
         */
        SOA = "SOA",
        /**
         * Record intended to provide information about host CPU type and operating system. It was intended to allow protocols to optimize processing when communicating with similar peers.
         */
        HINFO = "HINFO",
        /**
         * SRV records are used to specify server locations and their specified services.
         */
        SRV = "SRV",
        /**
         * **Note**: Creating DANE records is not supported by the API.
         */
        DANE = "DANE",
        /**
         * A record for DANE. RFC 6698 defines "The TLSA DNS resource record is used to associate a TLS server certificate or public key with the domain name where the record is found, thus forming a 'TLSA certificate association'".
         */
        TLSA = "TLSA",
        /**
         * The record used to identify the DNSSEC signing key of a delegated zone.
         */
        DS = "DS",
        /**
         * CAA Records allow you to specify which Certification Authorities can issue a certificate for your zone.
         */
        CAA = "CAA"
    }
}

export default DnsRecord;
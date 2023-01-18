/**
 * Hetzner DNS zone model
 * @interface
 */
export default interface ZoneModel {
    /**
     * Unique identifier of the zone
     * @type {string}
     */
    id: string;

    /**
     * Zone creation timestamp in ISO 8601 format
     * @type {string}
     */
    created: string;

    /**
     * Timestamp of the last change of the zone in ISO 8601 format
     * @type {string}
     */
    modified: string;

    /**
     * Legacy DNS host name of the zone
     * @type {string}
     */
    legacy_dns_host: string;

    /**
     * Legacy name server names of the zone
     * @type {string[]}
     */
    legacy_ns: string[];

    /**
     * Name of the zone
     * @type {string}
     */
    name: string;

    /**
     * Name server names of the zone
     * @type {string[]}
     */
    ns: string[];

    /**
     * Zone owner
     * @type {string}
     */
    owner: string;

    /**
     * Whether the zone is paused
     * @type {boolean}
     */
    paused: boolean;

    /**
     * Permission of the zone
     * @type {string}
     */
    permission: string;

    /**
     * Project of the zone
     * @type {string}
     */
    project: string;

    /**
     * Zone registrar
     * @type {string}
     */
    registrar: string;

    /**
     * Status of the zone
     * @type {"verified"}
     */
    status: "verified";

    /**
     * Default TTL (time to live) in seconds for records in this DNS zone
     * @type {number}
     */
    ttl: number;

    /**
     * Zone verification timestamp in ISO 8601 format or empty string
     * @type {string}
     */
    verified: string;

    /**
     * Number of records in the zone
     * @type {number}
     */
    records_count: number;

    /**
     * TXT record verification
     * @type {{name: string, token: string}}
     */
    txt_verification: {
        /**
         * Name of the TXT record
         * @type {string}
         */
        name: string;

        /**
         * Verification token (value of the TXT record)
         * @type {string}
         */
        token: string;
    }
}

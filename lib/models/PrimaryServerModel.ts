/**
 * Primary server model
 * @interface
 */
export default interface PrimaryServerModel {
    /**
     * Primary server ID
     * @type {string}
     */
    id: string;

    /**
     * IPv4 or IPv6 address of the primary server
     * @type {string}
     */
    address: string;

    /**
     * Port number of the primary server (from 1 to 65535)
     * @type {number}
     */
    port: number;

    /**
     * ID of zone this primary server is associated with
     * @type {string}
     */
    zone_id: string;

    /**
     * Time primary server was created (ISO 8601)
     * @type {string}
     */
    created: string;

    /**
     * Time primary server was last updated (ISO 8601)
     * @type {string}
     */
    modified: string;
}

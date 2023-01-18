/**
 * Record model
 * @interface
 */
export default interface RecordModel {
    /**
     * Time record was created (ISO 8601)
     * @type {string}
     */
    created: string;

    /**
     * ID of record
     * @type {string}
     */
    id: string;

    /**
     * Time record was last updated (ISO 8601)
     * @type {string}
     */
    modified: string;

    /**
     * Name of record
     * @type {string}
     */
    name: string;

    /**
     * TTL of record
     * @type {number}
     */
    ttl: number;

    /**
     * Type of record (string corresponding to enum value from {@link RecordModel.Type})
     * @type {string}
     */
    type: string;

    /**
     * Value of record
     * @type {string}
     */
    value: string;

    /**
     * ID of zone this record is associated with
     * @type {string}
     */
    zone_id: string;
}

/**
 * Base record model
 * @interface
 */
export default interface BaseRecordModel {
    /**
     * Name of record
     * @type {string}
     */
    name: string;

    /**
     * TTL of record
     * @type {number}
     */
    ttl?: number;

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

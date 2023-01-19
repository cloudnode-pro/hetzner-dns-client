import BaseRecordModel from "./BaseRecordModel";

/**
 * Record model
 * @interface
 * @extends {BaseRecordModel}
 */
export default interface RecordModel extends BaseRecordModel {
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
}

import ErrorModel from "./ErrorModel";
import RecordModel from "./RecordModel";

/**
 * Zone file validation response
 * @interface
 * @extends {ErrorModel}
 */
export default interface ZoneValidation extends ErrorModel {
    /**
     * Number of parsed records
     * @type {number}
     */
    parsed_records: number;

    /**
     * Valid records
     * @type {RecordModel[]}
     */
    valid_records: RecordModel[];
}

import ErrorModel from "./ErrorModel.js";
import RecordModel from "./RecordModel.js";
import BaseRecordModel from "./BaseRecordModel";

/**
 * Bulk create records API response model
 * @interface
 * @extends {ErrorModel}
 */
export default interface BulkCreateRecords extends ErrorModel {
    invalid_records: BaseRecordModel[];
    records: RecordModel[];
    valid_records: BaseRecordModel[];
}

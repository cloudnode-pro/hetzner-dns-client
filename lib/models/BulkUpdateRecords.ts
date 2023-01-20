import ErrorModel from "./ErrorModel.js";
import RecordModel from "./RecordModel.js";
import BaseRecordModel from "./BaseRecordModel";

/**
 * Bulk update records response model
 * @interface
 * @extends {ErrorModel}
 */
export default interface BulkUpdateRecords extends ErrorModel {
    failed_records: BaseRecordModel[];
    records: RecordModel[];
}

import ErrorModel from "./ErrorModel.js";
import RecordModel from "./RecordModel.js";
import BaseRecordModel from "./BaseRecordModel";

/**
 * Hetzner DNS zone model
 * @interface
 * @extends {ErrorModel}
 */
export default interface BulkUpdateRecords extends ErrorModel {
    failed_records: BaseRecordModel[];
    records: RecordModel[];
}

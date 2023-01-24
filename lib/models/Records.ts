import ErrorModel from "./ErrorModel.js";
import RecordModel from "./RecordModel.js";

/**
 * Hetzner DNS zone model
 * @interface
 * @extends {ErrorModel}
 */
export default interface Records extends ErrorModel {
    records: RecordModel[];
}

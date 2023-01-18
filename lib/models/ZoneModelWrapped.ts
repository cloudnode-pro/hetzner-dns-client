import ErrorModel from "./ErrorModel.js";
import ZoneModel from "./ZoneModel.js";

/**
 * Hetzner DNS zone model
 * @interface
 * @extends {ErrorModel}
 */
export default interface ZoneModelWrapped extends ErrorModel{
    zone: ZoneModel;
}

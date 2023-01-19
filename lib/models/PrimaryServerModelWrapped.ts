import PrimaryServerModel from "./PrimaryServerModel";
import ErrorModel from "./ErrorModel";

/**
 * List of all primary servers
 * @interface
 * @extends {ErrorModel}
 */
export default interface PrimaryServerModelWrapped extends ErrorModel {
    primary_server: PrimaryServerModel;
}

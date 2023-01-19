import PrimaryServerModel from "./PrimaryServerModel";
import ErrorModel from "./ErrorModel";

/**
 * List of all primary servers
 * @interface
 * @extends {ErrorModel}
 */
export default interface PrimaryServers extends ErrorModel {
    primary_servers: PrimaryServerModel[];
}

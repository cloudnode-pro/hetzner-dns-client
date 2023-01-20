/**
 * API client failed to understand and parse the API response
 * @class
 * @extends {Error}
 */
export default class ClientParseError extends Error {
    /**
     * Name of the error
     * @type {string}
     * @readonly
     * @override
     */
    public override readonly name = "ClientParseError";

    /**
     * Error message
     * @type {string}
     * @readonly
     * @override
     */
    public override readonly message = "API client failed to understand and parse the API response";

    /**
     * Create a new client parse error
     * @internal
     */
    public constructor() {
        super();
    }
}
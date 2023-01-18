import ApiResponse from "../ApiResponse";

/**
 * Hetzner API error
 * @class
 * @extends {Error}
 */
export default class ApiError extends Error {
    /**
     * Name of the error
     * @type {string}
     * @readonly
     * @override
     */
    public override readonly name = "ApiError";

    /**
     * Error code
     * @type {number}
     * @readonly
     */
    public readonly code: number;

    /**
     * Full API response
     * @type {ApiResponse<any>}
     * @readonly
     * @private
     */
    readonly #apiResponse: ApiResponse<any>;

    /**
     * Create a new API error
     * @param {string} message - Error message
     * @param {number} code - Error code
     * @param {ApiResponse} apiResponse - Full API response
     */
    public constructor(message: string, code: number, apiResponse: ApiResponse<any>) {
        super(message);
        this.code = code;
        this.#apiResponse = apiResponse;
    }

    /**
     * Full API response
     * @type {ApiResponse<any>}
     * @readonly
     */
    public get apiResponse(): ApiResponse<any> {
        return this.#apiResponse;
    }

    /**
     * Standard messages returned by the API
     * i.e. messages returned with a standard error JSON response
     */
    public static readonly messages: Record<string, string> = {
        "zone not found": "Zone not found",
    };

    /**
     * Non-standard error messages
     * Sometimes the Hetzner API returns non-JSON responses, or e.g. it issues a redirect to the login page when credentials are invalid
     * @type {Record<string, {code: number, message: string}>}
     */
    public static readonly specialMessages: Record<string, {code: number, message: string}> = {
        "No API key found in request": {
            code: 401,
            message: "An API key was not provided"
        },
        "Invalid authentication credentials": {
            code: 401,
            message: "The provided API key is invalid"
        },
        "404 page not found": {
            code: 404,
            message: "The API endpoint was not found"
        },
    }
}

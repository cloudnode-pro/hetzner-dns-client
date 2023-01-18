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
        "zone already exists": "A zone with the specified (domain) name already exists",
        "422 Unprocessable Entity: ": "The specified (domain) name or TTL is invalid or a zone with that name already exists",
        "422 : invalid zone name": "The specified zone (domain) name is invalid",
        "422 : invalid TLD": "The specified top-level domain (TLD) is invalid",
        "422 Unprocessable Entity: invalid label must not start with a dash": "Zone (domain) name must not start with a dash",
        "422 Unprocessable Entity: invalid invalid character for domain name": "Zone (domain) name contains invalid character(s)",
        "422 : empty zone name": "Zone (domain) name must not be empty",
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
        "json not valid": {
            code: 400,
            message: "Invalid parameters were provided"
        }
    }
}

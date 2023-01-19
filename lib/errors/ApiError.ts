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
        "422 Unprocessable Entity: invalid CNAME not allowed for zone apex @": "CNAME records are not allowed for the zone apex (@)",
        "422 Unprocessable Entity: invalid: CNAME not allowed for zone apex @; ": "CNAME records are not allowed for the zone apex (@)",
        "422 Unprocessable Entity: invalid ASCII character  ": "Invalid character provided",
        "422 Unprocessable Entity: invalid ASCII character:  ; ": "Invalid character provided",
        "422 Unprocessable Entity: invalid out of zone data .": "Out of zone data provided",
        "422 Unprocessable Entity: invalid: out of zone data .; ": "Out of zone data provided",
        "invalid A record": "Invalid A record name or value provided",
        "invalid AAAA record": "Invalid AAAA record name or value provided",
        "invalid PTR record": "Invalid PTR record name or value provided",
        "invalid NS record": "Invalid NS record name or value provided",
        "invalid MX record": "Invalid MX record name or value provided",
        "invalid CNAME record": "Invalid CNAME record name or value provided",
        "invalid RP record": "Invalid RP record name or value provided",
        "invalid TXT record": "Invalid TXT record name or value provided",
        "invalid SOA record": "Invalid SOA record name or value provided",
        "invalid HINFO record": "Invalid HINFO record name or value provided",
        "invalid SRV record": "Invalid SRV record name or value provided",
        "invalid DANE record": "Invalid DANE record name or value provided",
        "invalid TLSA record": "Invalid TLSA record name or value provided",
        "invalid DS record": "Invalid DS record name or value provided",
        "invalid CAA record": "Invalid CAA record name or value provided",
        "record type not allowed": "You cannot create DNS records of this type",
        "record not found": "Record not found"
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

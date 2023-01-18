import fetch, {RequestInit, Response} from "node-fetch";
import ApiResponse from "./ApiResponse.js";
import Zone from "./Zone.js";
import ZoneModel from "./models/ZoneModel.js";
import ClientParseError from "./errors/ClientParseError.js";
import ErrorModel from "./models/ErrorModel.js";
import ApiError from "./errors/ApiError.js";

/**
 * Hetzner DNS API client for Node.js
 * @class
 */
class HetznerDnsClient {
    readonly #token: string;
    private readonly baseUrl: URL;

    /**
     * Create a new Hetzner DNS API client
     * @param {string} token - Hetzner DNS API token/key
     * @param {URL} [baseUrl] - Base URL for the API
     * @public
     */
    public constructor(token: string, baseUrl?: URL) {
        this.#token = token;
        this.baseUrl = baseUrl ?? new URL("https://dns.hetzner.com/api/v1/");
    }

    /**
     * # Zones
     * A secondary zone can be created, by adding a primary server before adding any records.
     */
    public zones = {
        /**
         * Create Zone
         * @param {string} name - See {@link {Zone#name}}
         * @param {number} [ttl] - See {@link {Zone#ttl}}
         * @returns {Promise<Zone>}
         */
        create: async (name: string, ttl?: number): Promise<Zone> => {
            const response: ApiResponse<ZoneModel> = await this.request("POST", "zones", "application/json", {
                name,
                ttl,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res);
        },

        /**
         * Get Zone
         * @param {string} id - ID of zone to get
         * @returns {Zone}
         */
        get: async (id: string): Promise<Zone> => {
            const response: ApiResponse<ZoneModel> = await this.request("GET", `zones/${id}`);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res);
        },

        /**
         * Delete Zone
         * @param {string} id - ID of zone to delete
         * @returns {Promise<void>}
         */
        delete: async (id: string): Promise<void> => {
            await this.request("DELETE", `zones/${id}`);
        },
    } as const;

    /**
     * Send a request to the Hetzner DNS API
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method - HTTP method
     * @param {string} path - Path to the API endpoint
     * @param {"application/json"} contentType - Content type of the request body
     * @param {Record<string, any>} body - Request body
     * @param {Record<string, string|number>} [query] - Query parameters
     * @template T - Type of the response body
     * @returns {Promise<T>} - Response body
     * @throws {ApiError}
     * @private
     */
    private async request<T extends ErrorModel>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        contentType: "application/json",
        body: Record<string, any>,
        query?: Record<string, string | number>
    ): Promise<ApiResponse<T>>;
    /**
     * Send a request to the Hetzner DNS API
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method - HTTP method
     * @param {string} path - Path to the API endpoint
     * @param {string} [contentType] - Content type of the request body
     * @param {any} [body] - Request body
     * @param {Record<string, string|number>} [query] - Query parameters
     * @template T - Type of the response body
     * @returns {Promise<T>} - Response body
     * @throws {ApiError}
     * @private
     */
    private async request<T extends ErrorModel>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        contentType?: string,
        body?: any,
        query?: Record<string, string | number>
    ): Promise<ApiResponse<T>>;
    /**
     * Send a request to the Hetzner DNS API
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method - HTTP method
     * @param {string} path - Path to the API endpoint
     * @param {string} [contentType] - Content type of the request body
     * @param {any} [body] - Request body
     * @param {Record<string, string|number>} [query] - Query parameters
     * @template T - Type of the response body
     * @returns {Promise<T>} - Response body
     * @throws {ApiError}
     * @private
     */
    private async request<T extends ErrorModel>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        contentType?: string,
        body?: any,
        query?: Record<string, string | number>
    ): Promise<ApiResponse<T>> {
        const url = new URL(path, this.baseUrl);
        if (query) {
            const stringQuery = Object.fromEntries(Object.entries(query).map(([key, value]) => [key, String(value)]));
            url.search = new URLSearchParams(stringQuery).toString();
        }
        const params: RequestInit & {headers: Record<string, string>} = {
            method,
            headers: {
                "Auth-API-Token": this.#token,
            },
            follow: 0
        };
        if (contentType && body && ["POST", "PUT"].includes(method)) {
            params.headers["Content-Type"] = contentType;
            params.body = contentType === "application/json" ? JSON.stringify(body) : body;
        }
        const response: Response = await fetch(url.toString(), params);
        const responseBodyRaw: ArrayBuffer = await response.arrayBuffer();
        const apiResponse = new ApiResponse<T>(response, responseBodyRaw, params, this);
        if (response.status >= 400 || response.status < 200) {
            if (apiResponse.json) {
                // non-standard error
                if (typeof apiResponse.json.error === "string") {
                    const message = ApiError.specialMessages[apiResponse.json.error];
                    if (message) throw new ApiError(message.message, message.code, apiResponse);
                }
                // standard errors
                else if (apiResponse.json.error) {
                    const message = ApiError.messages[apiResponse.json.error.message];
                    if (message) throw new ApiError(message, apiResponse.json.error.code, apiResponse);
                    throw new ApiError("Unknown error", apiResponse.json.error.code, apiResponse);
                }
                // special JSON errors
                else if (apiResponse.json.message) {
                    const message = ApiError.specialMessages[apiResponse.json.message];
                    if (message) throw new ApiError(message.message, message.code, apiResponse);
                }
                throw new ApiError("Unknown error", response.status, apiResponse);
            }
            // special errors
            else {
                Object.keys(ApiError.specialMessages).forEach((key) => {
                    if (apiResponse.body.includes(key)) {
                        const message = ApiError.specialMessages[key];
                        if (message) throw new ApiError(message.message, message.code, apiResponse);
                    }
                });
                throw new ApiError("Unknown error", response.status, apiResponse);
            }
        }
        return apiResponse;
    }
}

export default HetznerDnsClient;

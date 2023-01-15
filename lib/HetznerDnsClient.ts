import fetch, {RequestInit, Response} from "node-fetch";
import ApiResponse from "./ApiResponse.js";
import Zone from "./Zone.js";
import ZoneModel from "./models/ZoneModel.js";
import ClientParseError from "./models/Errors/ClientParseError.js";

/**
 * Hetzner DNS API client for Node.js
 * @class
 */
class HetznerDnsClient {
    private readonly token: string;
    private readonly baseUrl: URL;

    /**
     * Create a new Hetzner DNS API client
     * @param {string} token - Hetzner DNS API token/key
     * @param {URL} [baseUrl] - Base URL for the API
     * @public
     */
    public constructor(token: string, baseUrl?: URL) {
        this.token = token;
        this.baseUrl = baseUrl ?? new URL("https://dns.hetzner.com/api/v1/");
    }

    /**
     * # Zones
     * A secondary zone can be created, by adding a primary server before adding any records.
     */
    public zones = {
        /**
         * Get a zone
         * @param {string} id - ID of zone to get
         * @returns {Zone}
         */
        get: async (id: string): Promise<Zone> => {
            const response: ApiResponse<ZoneModel> = await this.request("GET", `zones/${id}`);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res);
        }
    } as const;

    /**
     * Send a request to the Hetzner DNS API
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method - HTTP method
     * @param {string} path - Path to the API endpoint
     * @param {Record<string, string|number>} [query] - Query parameters
     * @param {string} [contentType] - Content type of the request body
     * @param {any} [body] - Request body
     * @template T - Type of the response body
     * @returns {Promise<T>} - Response body
     * @private
     */
    private async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        contentType?: string,
        body?: any,
        query?: Record<string, string | number>
    ): Promise<ApiResponse<T>>;
    private async request<T>(
        method: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        contentType: "application/json",
        body: Record<string, any>,
        query?: Record<string, string | number>
    ): Promise<ApiResponse<T>> {
        const url = new URL(path, this.baseUrl);
        if (query) {
            const stringQuery = Object.fromEntries(Object.entries(query).map(([key, value]) => [key, String(value)]));
            url.search = new URLSearchParams(stringQuery).toString();
        }
        const params: RequestInit = {
            method,
            headers: {
                "Content-Type": contentType,
                "Auth-API-Token": this.token,
            }
        };
        if (body && ["POST", "PUT"].includes(method)) {
            params.body = JSON.stringify(body);
        }
        const response: Response = await fetch(url.toString(), params);
        const responseBodyRaw: ArrayBuffer = await response.arrayBuffer();
        return new ApiResponse<T>(response, responseBodyRaw, params, this);
    }
}

export default HetznerDnsClient;

import fetch, {BodyInit, RequestInit, Response} from "node-fetch";
import ApiResponse from "./ApiResponse.js";
import Zone from "./Zone.js";
import ZoneModelWrapped from "./models/ZoneModelWrapped.js";
import ClientParseError from "./errors/ClientParseError.js";
import ErrorModel from "./models/ErrorModel.js";
import ApiError from "./errors/ApiError.js";
import Zones from "./Zones.js";
import PaginatedZones from "./models/PaginatedZones";
import ZoneValidationPretty from "./ZoneValidationPretty.js";
import ZoneValidation from "./models/ZoneValidation";
import Records from "./models/Records";
import DnsRecord from "./DnsRecord.js";
import RecordModelWrapped from "./models/RecordModelWrapped";
import BulkCreateRecordsPretty from "./BulkCreateRecordsPretty.js";
import BulkCreateRecords from "./models/BulkCreateRecords";
import BulkUpdateRecordsPretty from "./BulkUpdateRecordsPretty.js";
import BulkUpdateRecords from "./models/BulkUpdateRecords";
import PrimaryServer from "./PrimaryServer.js";
import PrimaryServers from "./models/PrimaryServers";
import PrimaryServerModelWrapped from "./models/PrimaryServerModelWrapped";

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
     * A secondary zone can be created, by adding a primary server before adding any records.
     */
    public zones = {
        /**
         * Get all Zones
         * @param {Object} [options] - Search options
         * @param {string} [options.name] - Full name of a zone. Will return an array with one or no results. Example: `example.com`
         * @param {number} [options.page] - A page parameter specifies the page to fetch. The number of the first page is 1. Must be >= 1.
         * @param {number} [options.perPage] - Number of zones to be shown per page. Returns 100 by default. Maximum 100.
         * @param {string} [options.searchName] - Partial name of a zone. Will return an array with zones that contain the searched string. Example: `example`
         * @returns {Promise<Zones>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        getAll: async (options?: {name?: string, page?: number, perPage?: number, searchName?: string}): Promise<Zones> => {
            options ??= {};
            const query = new URLSearchParams();
            if (options.name) query.set("name", options.name);
            if (options.page) query.set("page", options.page.toString());
            if (options.perPage) query.set("per_page", options.perPage.toString());
            if (options.searchName) query.set("search_name", options.searchName);
            const response: ApiResponse<PaginatedZones> = await this.request("GET", "zones", void 0, void 0, query);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zones(this, res, options);
        },

        /**
         * Create Zone
         * @param {string} name - See {@link Zone#name}
         * @param {number} [ttl] - See {@link Zone#ttl}
         * @returns {Promise<Zone>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        create: async (name: string, ttl?: number): Promise<Zone> => {
            const response: ApiResponse<ZoneModelWrapped> = await this.request("POST", "zones", "application/json", {
                name,
                ttl,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res.zone);
        },

        /**
         * Get Zone
         * @param {string} id - ID of zone to get
         * @returns {Promise<Zone>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        get: async (id: string): Promise<Zone> => {
            const response: ApiResponse<ZoneModelWrapped> = await this.request("GET", `zones/${id}`);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res.zone);
        },

        /**
         * Update Zone
         * @param {string} id - ID of zone to update
         * @param {string} name - The current name of the zone. Changing zone name is not possible.
         * @param {number} [ttl] - New TTL of the zone (see {@link Zone#ttl})
         * @returns {Promise<Zone>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        update: async (id: string, name: string, ttl?: number): Promise<Zone> => {
            const response: ApiResponse<ZoneModelWrapped> = await this.request("PUT", `zones/${id}`, "application/json", {
                name,
                ttl,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res.zone);
        },

        /**
         * Delete Zone
         * @param {string} id - ID of zone to delete
         * @returns {Promise<void>}
         * @throws {ApiError}
         */
        delete: async (id: string): Promise<void> => {
            await this.request("DELETE", `zones/${id}`);
        },

        /**
         * Import Zone file plain
         * @param {string} id - ID of zone to import to
         * @param {string | Uint8Array | Buffer | readonly number[]} file - Zone file contents to import
         * @returns {Promise<Zone>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        importZone: async (id: string, file: string | Uint8Array | Buffer | readonly number[]): Promise<Zone> => {
            const data = Buffer.from(file);
            const response: ApiResponse<ZoneModelWrapped> = await this.request("POST", `zones/${id}/import`, "text/plain", data);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new Zone(this, res.zone);
        },

        /**
         * Export Zone file
         * @param {string} id - ID of zone to export
         * @returns {Promise<string>}
         * @throws {ApiError}
         */
        exportZone: async (id: string): Promise<string> => {
            const response: ApiResponse<any> = await this.request("GET", `zones/${id}/export`);
            return response.body;
        },

        /**
         * Validate Zone file plain
         *
         * **Warning**: As of Jan 19, 2023, this endpoint appears to always return an empty array for valid records.
         * @param {string | Uint8Array | Buffer | readonly number[]} file - Zone file contents to validate
         * @returns {Promise<ZoneValidationPretty>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        validateZone: async (file: string | Uint8Array | Buffer | readonly number[]): Promise<ZoneValidationPretty> => {
            const data = Buffer.from(file);
            const response: ApiResponse<ZoneValidation> = await this.request("POST", "zones/file/validate", "text/plain", data);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new ZoneValidationPretty(this, res);
        }
    } as const;

    public records = {
        /**
         * Get All Records
         * @param {string} [zoneId] - ID of zone to get the records of
         * @returns {Promise<DnsRecord[]>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        getAll: async (zoneId?: string): Promise<DnsRecord[]> => {
            const response: ApiResponse<Records> = await this.request("GET", "records", void 0, void 0, zoneId ? {zone_id: zoneId} : void 0);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return res.records.map(r => new DnsRecord(this, r));
        },

        /**
         * Create Record
         * @param {string} zoneId - ID of zone to create the record in
         * @param {string} name - See {@link DnsRecord#name}
         * @param {DnsRecord.Type} type - See {@link DnsRecord#type}
         * @param {string} value - See {@link DnsRecord#value}
         * @param {number} [ttl] - See {@link DnsRecord#ttl}
         * @returns {Promise<DnsRecord>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        create: async (zoneId: string, name: string, type: DnsRecord.Type, value: string, ttl?: number): Promise<DnsRecord> => {
            const response: ApiResponse<RecordModelWrapped> = await this.request("POST", "records", "application/json", {
                zone_id: zoneId,
                name,
                type: type.toString(),
                value,
                ttl,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new DnsRecord(this, res.record);
        },

        /**
         * Get Record
         * @param {string} id - ID of record to get
         * @returns {Promise<DnsRecord>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        get: async (id: string): Promise<DnsRecord> => {
            const response: ApiResponse<RecordModelWrapped> = await this.request("GET", `records/${id}`);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new DnsRecord(this, res.record);
        },

        /**
         * Update Record
         * @param {string} id - ID of record to updated
         * @param {string} zoneId - ID of zone the record is associated with. **Note**: Changing the zone of a record is not possible.
         * @param {DnsRecord.Type} type - See {@link DnsRecord#type}. **Note**: Changing the type of a record is not possible.
         * @param {string} name - See {@link DnsRecord#name}
         * @param {string} value - See {@link DnsRecord#value}
         * @param {number} [ttl] - See {@link DnsRecord#ttl}
         * @returns {Promise<DnsRecord>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        update: async (id: string, zoneId: string, type: DnsRecord.Type, name: string, value: string, ttl?: number): Promise<DnsRecord> => {
            const response: ApiResponse<RecordModelWrapped> = await this.request("PUT", `records/${id}`, "application/json", {
                zone_id: zoneId,
                type: type.toString(),
                name,
                value,
                ttl,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new DnsRecord(this, res.record);
        },

        /**
         * Delete Record
         * @param {string} id - ID of record to delete
         * @returns {Promise<void>}
         * @throws {ApiError}
         */
        delete: async (id: string): Promise<void> => {
            await this.request("DELETE", `records/${id}`);
        },

        /**
         * Bulk Create Records
         * @param {Object[]} records - Array of records to create
         * @param {string} records[].name - See {@link DnsRecord#name}
         * @param {number} [records[].ttl] - See {@link DnsRecord#ttl}
         * @param {DnsRecord.Type} records[].type - See {@link DnsRecord#type}
         * @param {string} records[].value - See {@link DnsRecord#value}
         * @param {string} records[].zoneId - ID of zone to create the record in
         * @returns {Promise<BulkCreateRecordsPretty>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        bulkCreate: async (records: {name: string, ttl?: number, type: DnsRecord.Type, value: string, zoneId: string}[]): Promise<BulkCreateRecordsPretty> => {
            const r = records.map(r => ({
                name: r.name,
                ttl: r.ttl,
                type: r.type.toString(),
                value: r.value,
                zone_id: r.zoneId,
            }));
            const response: ApiResponse<BulkCreateRecords> = await this.request("POST", "records/bulk", "application/json", {records: r});
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new BulkCreateRecordsPretty(this, res);
        },

        /**
         * Bulk Update Records
         * @param {Object[]} records - Array of records to update
         * @param {string} records[].id - ID of record to update
         * @param {string} records[].name - See {@link DnsRecord#name}
         * @param {number} [records[].ttl] - See {@link DnsRecord#ttl}
         * @param {DnsRecord.Type} records[].type - See {@link DnsRecord#type}. **Note**: Changing the type of a record is not possible.
         * @param {string} records[].value - See {@link DnsRecord#value}
         * @param {string} records[].zoneId - ID of zone the record is associated with. **Note**: Changing the zone of a record is not possible.
         * @returns {Promise<BulkUpdateRecordsPretty>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        bulkUpdate: async (records: {id: string, name: string, ttl?: number, type: DnsRecord.Type, value: string, zoneId: string}[]): Promise<BulkUpdateRecordsPretty> => {
            const r = records.map(r => ({
                id: r.id,
                name: r.name,
                ttl: r.ttl,
                type: r.type.toString(),
                value: r.value,
                zone_id: r.zoneId,
            }));
            const response: ApiResponse<BulkUpdateRecords> = await this.request("PUT", "records/bulk", "application/json", {records: r});
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new BulkUpdateRecordsPretty(this, res);
        }
    } as const;

    /**
     * Primary servers can only be added to a zone, if no records were added to it, yet. By adding a primary server to a newly created zone, it automatically becomes a secondary zone.
     */
    public primaryServers = {
        /**
         * Get All Primary Servers
         * @param {string} [zoneId] - ID of zone to get primary servers for
         * @returns {Promise<PrimaryServer[]>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        getAll: async (zoneId?: string): Promise<PrimaryServer[]> => {
            const response: ApiResponse<PrimaryServers> = await this.request("GET", "primary_servers", void 0, void 0, zoneId ? {zone_id: zoneId} : void 0);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return res.primary_servers.map(r => new PrimaryServer(this, r));
        },

        /**
         * Create Primary Server
         * @param {string} zoneId - ID of zone to create the primary server in
         * @param {string} address - See {@link PrimaryServer#address}
         * @param {number} port - See {@link PrimaryServer#port}
         * @returns {Promise<PrimaryServer>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        create: async (zoneId: string, address: string, port: number): Promise<PrimaryServer> => {
            const response: ApiResponse<PrimaryServerModelWrapped> = await this.request("POST", "primary_servers", "application/json", {
                zone_id: zoneId,
                address,
                port,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new PrimaryServer(this, res.primary_server);
        },

        /**
         * Get Primary Server
         * @param {string} id - ID of primary server to get
         * @returns {Promise<PrimaryServer>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        get: async (id: string): Promise<PrimaryServer> => {
            const response: ApiResponse<PrimaryServerModelWrapped> = await this.request("GET", `primary_servers/${id}`);
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new PrimaryServer(this, res.primary_server);
        },

        /**
         * Update Primary Server
         * @param {string} id - ID of primary server to update
         * @param {string} zoneId - ID of zone the primary server is associated with. **Note**: Changing the zone of a primary server is not possible.
         * @param {string} address - See {@link PrimaryServer#address}
         * @param {number} port - See {@link PrimaryServer#port}
         * @returns {Promise<PrimaryServer>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        update: async (id: string, zoneId: string, address: string, port: number): Promise<PrimaryServer> => {
            const response: ApiResponse<PrimaryServerModelWrapped> = await this.request("PUT", `primary_servers/${id}`, "application/json", {
                zone_id: zoneId,
                address,
                port,
            });
            const res = response.json;
            if (res === null) throw new ClientParseError();
            return new PrimaryServer(this, res.primary_server);
        },

        /**
         * Delete Primary Server
         * @param {string} id - ID of primary server to delete
         * @returns {Promise<void>}
         * @throws {ApiError}
         * @throws {ClientParseError}
         */
        delete: async (id: string): Promise<void> => {
            await this.request("DELETE", `primary_servers/${id}`);
        }
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
        query?: Record<string, string | number> | URLSearchParams
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
        body?: BodyInit,
        query?: Record<string, string | number> | URLSearchParams
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
        body?: BodyInit | Record<string, any>,
        query?: Record<string, string | number> | URLSearchParams
    ): Promise<ApiResponse<T>> {
        const url = new URL(path, this.baseUrl);
        if (query && !(query instanceof URLSearchParams)) {
            const stringQuery = Object.fromEntries(Object.entries(query).map(([key, value]) => [key, String(value)]));
            url.search = new URLSearchParams(stringQuery).toString();
        }
        else if (query) url.search = query.toString();
        const params: RequestInit & {headers: Record<string, string>} = {
            method,
            headers: {
                "Auth-API-Token": this.#token,
            },
            follow: 0
        };
        if (contentType && body && ["POST", "PUT"].includes(method)) {
            params.headers["Content-Type"] = contentType;
            params.body = contentType === "application/json" ? JSON.stringify(body as Record<string, any>) : body as BodyInit;
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

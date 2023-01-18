import HetznerDnsClient from "./HetznerDnsClient.js";
import {Response, RequestInit} from "node-fetch";
import ErrorModel from "./models/ErrorModel.js";

/**
 * API response object
 * @class
 * @template T - Response data model
 */
export default class ApiResponse<T extends ErrorModel> {

    /**
     * Fetch response
     * @type {Response}
     * @readonly
     */
    public readonly response: Response;

    /**
     * Raw response body
     * @type {ArrayBuffer}
     * @readonly
     */
    public readonly raw: ArrayBuffer;

    /**
     * Request options
     * @type {RequestInit}
     * @readonly
     */
    public readonly options: RequestInit;

    /**
     * API client instance used to make the request
     * @type {HetznerDnsClient}
     * @readonly
     */
    public readonly client: HetznerDnsClient;

    /**
     * Create a new API response object
     * @param {Response} response - Fetch response
     * @param {ArrayBuffer} raw - Raw response body
     * @param {RequestInit} options - Request options
     * @param {HetznerDnsClient} client - API client instance used to make the request
     */
    public constructor(response: Response, raw: ArrayBuffer, options: RequestInit, client: HetznerDnsClient) {
        this.response = response;
        this.raw = raw;
        this.options = options;
        this.client = client;
    }

    /**
     * Get response body as string
     * @type {string}
     * @readonly
     */
    public get body(): string {
        return Buffer.from(this.raw).toString();
    }

    /**
     * Get parsed response body (if JSON). `null` if not JSON or parsing fails.
     * @type {T | null}
     * @readonly
     */
    public get json(): T | null {
        try {
            return JSON.parse(this.body) as T;
        }
        catch (e) {
            return null;
        }
    }
}

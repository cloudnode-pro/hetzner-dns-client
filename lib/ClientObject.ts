import HetznerDnsClient from "./HetznerDnsClient.js";

/**
 * Client object
 * @class
 * @template T - Raw data model
 */
export default class ClientObject<T> {
    /**
     * API client instance
     * @type {HetznerDnsClient}
     * @readonly
     * @private
     */
    readonly #client: HetznerDnsClient;

    /**
     * API client instance
     * @type {HetznerDnsClient}
     * @readonly
     */
    public get client(): HetznerDnsClient {
        return this.#client;
    }

    /**
     * Raw data
     * @type {T}
     * @readonly
     * @private
     */
    readonly #data: T;

    /**
     * Raw data
     * @type {T}
     * @readonly
     */
    public get _data(): T {
        return this.#data;
    }

    /**
     * Constructor
     * @param {HetznerDnsClient} client - API client instance
     * @param {T} data - Raw data
     * @internal
     */
    public constructor(client: HetznerDnsClient, data: T) {
        this.#client = client;
        this.#data = data;
    }
}

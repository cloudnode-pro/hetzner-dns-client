import ClientObject from "./ClientObject.js";
import Zone from "./Zone.js";
import PaginatedZones from "./models/PaginatedZones";
import HetznerDnsClient from "./HetznerDnsClient.js";

/**
 * A collection of zones
 * @class
 * @extends {ClientObject<PaginatedZones>}
 */
export default class Zones extends ClientObject<PaginatedZones> {
    /**
     * Zones in this collection
     * @type {Zone[]}
     * @private
     */
    #zones: Zone[];

    /**
     * The last page that was fetched and included in this collection
     * @type {number}
     * @private
     */
    #lastPage: number;

    /**
     * The options used to fetch this page
     * @type {{name?: string, page?: number, perPage?: number, searchName?: string}}
     * @readonly
     * @private
     */
    private readonly inputOptions: {name?: string, page?: number, perPage?: number, searchName?: string};

    /**
     * Create a new zones collection
     * @param {HetznerDnsClient} client - API client instance
     * @param {PaginatedZones} data - Raw data
     * @param {{name?: string, page?: number, perPage?: number, searchName?: string}} [inputOptions] - Options used to fetch this page
     * @internal
     */
    public constructor(client: HetznerDnsClient, data: PaginatedZones, inputOptions?: {name?: string, page?: number, perPage?: number, searchName?: string}) {
        super(client, data);
        this.#zones = data.zones.map((zone) => new Zone(client, zone));
        this.#lastPage = data.meta.pagination.page;
        this.inputOptions = inputOptions ?? {};
    }

    /**
     * Get zones in this collection
     * @type {Zone[]}
     * @readonly
     */
    public get zones(): Zone[] {
        return this.#zones;
    }

    /**
     * Get number of zones in this collection
     * @type {number}
     * @readonly
     */
    public get count(): number {
        return this.#zones.length;
    }

    /**
     * Check if this is the last page
     * @type {boolean}
     * @readonly
     */
    public get isLastPage(): boolean {
        return this._data.meta.pagination.last_page <= this.#lastPage;
    }

    /**
     * Whether this collection contains *all* possible zones from the time of fetching.
     * @type {boolean}
     * @readonly
     */
    public get isComplete(): boolean {
        return this._data.meta.pagination.total_entries <= this.count;
    }

    /**
     * Append another zones collection to this collection. Duplicate zones will be removed.
     * **Note**: To avoid issues with paging and duplicate zones, only merge zone pages with the same page size.
     * @param {Zones} zones - Zones collection to append
     * @private
     */
    private append(zones: Zones): void {
        this.#zones = this.#zones.concat(zones.zones.filter(z => !this.#zones.some(z2 => z2.id === z.id)));
        this.#lastPage = zones._data.meta.pagination.page;
    }

    /**
     * Fetch next page of zones and attach them to this collection
     * @returns {Promise<Zones | null>} - The newly fetched page or null if there are no more pages
     * @throws {ApiError}
     */
    public async fetchNextPage(): Promise<Zones | null> {
        if (this.isLastPage) return null;
        const options = this.inputOptions;
        options.page = this.#lastPage + 1;
        options.perPage = this._data.meta.pagination.per_page;
        const zones = await this.client.zones.getAll(options);
        this.append(zones);
        return zones;
    }

    /**
     * Fetch all pages after the current page and attach them to this collection.
     * **Note**: This method will make multiple API calls and may take a while, depending on the number of zones.
     * @returns {Promise<void>}
     * @throws {ApiError}
     */
    public async fetchAllPages(): Promise<void> {
        while (!this.isLastPage) {
            await this.fetchNextPage();
        }
    }
}

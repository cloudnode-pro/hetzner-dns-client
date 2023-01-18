import PaginatedData from "./PaginatedData.js";
import ZoneModel from "./ZoneModel";

/**
 * API response with paginated zones
 * @interface
 * @extends {PaginatedData}
 */
export default interface PaginatedZones extends PaginatedData {
    /**
     * Zones
     */
    zones: ZoneModel[];
}

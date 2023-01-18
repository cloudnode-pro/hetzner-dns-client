import ErrorModel from "./ErrorModel.js";

/**
 * Paginated API response
 * @interface
 * @extends {ErrorModel}
 */
export default interface PaginatedData extends ErrorModel {
    /**
     * Response metadata
     */
    meta: {
        /**
         * Pagination information
         */
        pagination: {
            /**
             * The current page number (starting at 1)
             * @type {number}
             */
            page: number;

            /**
             * The number of items shown per page
             * @type {number}
             */
            per_page: number;

            /**
             * The number of the last page
             * @type {number}
             */
            last_page: number;

            /**
             * Total number of items
             * @type {number}
             */
            total_entries: number;
        }
    }
}

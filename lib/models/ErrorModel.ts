/**
 * Error model of API response
 * @interface
 */
export default interface ErrorModel {
    error?: {
        /**
         * Error message
         * @type {string}
         */
        message: string;

        /**
         * Error code
         */
        code: number;
    },
    /**
     * Error message
     * @type {string}
     */
    message?: string;
}

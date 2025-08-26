/**
 * Utility functions for error handling
 */

/**
 * Determines the type of error based on the error object
 * @param error The error object
 * @returns The error type classification
 */
export function classifyError(error) {
    if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        // Network related errors
        if (
            errorMessage.includes('network') ||
            errorMessage.includes('fetch') ||
            errorMessage.includes('networkerror') ||
            errorMessage.includes('failed to fetch')
        ) {
            return 'network';
        }

        // Server errors (5xx)
        if (
            errorMessage.includes('500') ||
            errorMessage.includes('503') ||
            errorMessage.includes('server')
        ) {
            return 'server';
        }

        // Timeout errors
        if (
            errorMessage.includes('timeout') ||
            errorMessage.includes('timed out')
        ) {
            return 'timeout';
        }
    }

    return 'unknown';
}

/**
 * Formats error messages for display
 * @param error The error object
 * @returns A clean error message
 */
export function formatErrorMessage(error) {
    if (error instanceof Error) {
        // Remove technical details that wouldn't help the user
        return error.message
            .replace(/^Error:\s*/i, '')
            .replace(/^TypeError:\s*/i, '')
            .replace(/^NetworkError:\s*/i, '');
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'An unexpected error occurred';
}
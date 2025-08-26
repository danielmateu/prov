import { useCallback } from 'react';

// Check if the browser supports the View Transitions API
const supportsViewTransitions = 'startViewTransition' in document;

/**
 * Custom hook to handle view transitions with fallback for unsupported browsers
 */
export function useViewTransition() {
    const transition = useCallback(
        (callback) => {
            if (!supportsViewTransitions) {
                // Fallback for browsers that don't support View Transitions API
                callback();
                return;
            }

            // @ts-ignore - TypeScript doesn't have types for this new API yet
            document.startViewTransition(callback);
        },
        []
    );

    return { transition, supportsViewTransitions };
}
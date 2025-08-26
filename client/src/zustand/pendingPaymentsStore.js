
import { create } from 'zustand';

const apiURL = import.meta.env.VITE_API_URL;
const POLLING_INTERVAL = 120000; // 2 minutes polling interval (reduced frequency)
const DEBOUNCE_DELAY = 1000; // 1 second debounce for rapid updates
const CACHE_DURATION = 60000; // 1 minute cache duration
const MAX_RETRIES = 3; // Maximum retry attempts
const RETRY_DELAY = 5000; // 5 seconds between retries

export const usePendingPaymentsStore = create((set, get) => ({
    pendingPayments: [],
    isLoading: false,
    error: null,
    lastFetched: null,
    pollingInterval: null,
    pendingPaymentsDetails: [],
    retryCount: 0,
    isOnline: true,
    lastSuccessfulFetch: null,

    // Main fetch function with debouncing, caching, and retry logic
    fetchPendingPayments: async (force = false) => {
        const now = Date.now();
        const lastFetched = get().lastFetched;
        const lastSuccessful = get().lastSuccessfulFetch;

        // Skip if recently fetched unless forced or cache expired
        if (!force && lastFetched && now - lastFetched < DEBOUNCE_DELAY) {
            return;
        }

        // Use cached data if available and not expired
        if (!force && lastSuccessful && now - lastSuccessful < CACHE_DURATION) {
            return;
        }

        // Check if we're online
        if (!navigator.onLine) {
            set({ isOnline: false });
            return;
        }

        set({ isLoading: true });

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(`${apiURL}/noticeController/get_Ex_PendingPayments`, {
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache',
                    'If-Modified-Since': lastSuccessful ? new Date(lastSuccessful).toUTCString() : ''
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Error fetching pending payments');

            const data = await response.json();
            
            // Only update if data has actually changed
            const currentData = get().pendingPayments;
            const hasChanged = JSON.stringify(currentData) !== JSON.stringify(data);
            
            if (hasChanged || force) {
                set({
                    pendingPayments: data,
                    error: null,
                    lastFetched: now,
                    lastSuccessfulFetch: now,
                    retryCount: 0,
                    isOnline: true
                });
            } else {
                // Data hasn't changed, just update timestamps
                set({
                    lastFetched: now,
                    retryCount: 0
                });
            }
        } catch (error) {
            const currentRetryCount = get().retryCount;
            
            if (error.name === 'AbortError') {
                set({ error: 'Request timeout - check your connection' });
            } else if (currentRetryCount < MAX_RETRIES) {
                // Retry with exponential backoff
                setTimeout(() => {
                    set({ retryCount: currentRetryCount + 1 });
                    get().fetchPendingPayments(true);
                }, RETRY_DELAY * Math.pow(2, currentRetryCount));
                return;
            } else {
                set({ error: error.message, retryCount: 0 });
            }
            console.error('Error fetching pending payments:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    // Smart polling that adapts based on user activity and data changes
    startSmartPolling: () => {
        const currentInterval = get().pollingInterval;
        if (currentInterval) clearInterval(currentInterval);

        let adaptiveInterval = POLLING_INTERVAL;
        let inactivityTimer = null;
        let isUserActive = true;

        // Track user activity
        const resetInactivityTimer = () => {
            isUserActive = true;
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                isUserActive = false;
            }, 300000); // 5 minutes of inactivity
        };

        // Add event listeners for user activity
        const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        activityEvents.forEach(event => {
            document.addEventListener(event, resetInactivityTimer, { passive: true });
        });

        const smartPoll = () => {
            // Don't poll if user is inactive and tab is not visible
            if (!isUserActive && document.hidden) {
                return;
            }

            // Don't poll if offline
            if (!navigator.onLine) {
                set({ isOnline: false });
                return;
            }

            get().fetchPendingPayments();
        };

        // Initial poll
        resetInactivityTimer();
        smartPoll();

        const interval = setInterval(smartPoll, adaptiveInterval);
        set({ pollingInterval: interval });

        // Handle visibility change
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                // Tab became visible, fetch immediately
                get().fetchPendingPayments(true);
                resetInactivityTimer();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Handle online/offline events
        const handleOnline = () => {
            set({ isOnline: true });
            get().fetchPendingPayments(true);
        };

        const handleOffline = () => {
            set({ isOnline: false });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Cleanup function
        return () => {
            clearInterval(interval);
            clearTimeout(inactivityTimer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
            activityEvents.forEach(event => {
                document.removeEventListener(event, resetInactivityTimer);
            });
        };
    },

    fetchPendingPaymentsDetails: async (invoicingAddressId, month, quincena, serviceType) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const response = await fetch(`${apiURL}/noticeController/getPendingPaymentDetails?invoicingAddressId=${invoicingAddressId}&month=${month}&quincena=${quincena}&serviceType=${serviceType}`, {
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Error fetching payment details');

            const data = await response.json();
            set({ pendingPaymentsDetails: data });
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error fetching payment details:', error);
            }
        }
    },

    // Legacy polling method (kept for backward compatibility)
    startPolling: () => {
        return get().startSmartPolling();
    },

    // Stop polling
    stopPolling: () => {
        const currentInterval = get().pollingInterval;
        if (currentInterval) {
            clearInterval(currentInterval);
            set({ pollingInterval: null });
        }
    },

    // Manual refresh with user feedback
    refreshData: async () => {
        await get().fetchPendingPayments(true);
    },

    // Get cache status
    getCacheStatus: () => {
        const now = Date.now();
        const lastSuccessful = get().lastSuccessfulFetch;
        
        if (!lastSuccessful) return 'no-cache';
        
        const age = now - lastSuccessful;
        if (age < CACHE_DURATION) return 'fresh';
        if (age < CACHE_DURATION * 2) return 'stale';
        return 'expired';
    },

    // Update payment status with automatic refresh
    updatePaymentStatus: async (invoicingAddressId, month, quincena, serviceType, newStatus) => {
        // Optimistic update
        set(state => ({
            pendingPayments: state.pendingPayments.map(payment => {
                if (payment.Ex_InvoicingAddressID === invoicingAddressId &&
                    payment.Month === month &&
                    payment.Quincena === quincena &&
                    payment.ServiceTypeID === serviceType) {
                    return { ...payment, Status: newStatus };
                }
                return payment;
            })
        }));

        // Debounced refresh to avoid too many requests
        setTimeout(() => {
            get().fetchPendingPayments(true);
        }, 1000);
    },

    // Remove payment with automatic refresh
    removePayment: async (invoicingAddressId, month, quincena, serviceType) => {
        // Optimistic update
        set(state => ({
            pendingPayments: state.pendingPayments.filter(payment =>
                !(payment.Ex_InvoicingAddressID === invoicingAddressId &&
                    payment.Month === month &&
                    payment.Quincena === quincena &&
                    payment.ServiceTypeID === serviceType)
            )
        }));

        // Debounced refresh
        setTimeout(() => {
            get().fetchPendingPayments(true);
        }, 1000);
    },

    // Add new payment with automatic refresh
    addPayment: async (payment) => {
        // Optimistic update
        set(state => ({
            pendingPayments: [...state.pendingPayments, payment]
        }));

        // Debounced refresh
        setTimeout(() => {
            get().fetchPendingPayments(true);
        }, 1000);
    },

    // Bulk update payments
    bulkUpdatePayments: async (updates) => {
        // Optimistic update
        set(state => ({
            pendingPayments: state.pendingPayments.map(payment => {
                const update = updates.find(u =>
                    u.Ex_InvoicingAddressID === payment.Ex_InvoicingAddressID &&
                    u.Month === payment.Month &&
                    u.Quincena === payment.Quincena &&
                    u.ServiceTypeID === payment.ServiceTypeID
                );
                return update ? { ...payment, ...update } : payment;
            })
        }));

        // Debounced refresh
        setTimeout(() => {
            get().fetchPendingPayments(true);
        }, 1000);
    },

    // Reset store state
    reset: () => {
        get().stopPolling();
        set({
            pendingPayments: [],
            isLoading: false,
            error: null,
            lastFetched: null,
            lastSuccessfulFetch: null,
            retryCount: 0,
            isOnline: true
        });
    }
}));
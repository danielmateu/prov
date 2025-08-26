import React from 'react';
import { CustomerSearchInput } from './CustomerSearchInput';
import CustomerFound from '../CustomerFound';
import NoCustomerFound from '../NoCustomerFound';
import { NoticesGrid } from './NoticesGrid';
import LoadingNoticesSkeleton from '../skeletons/LoadingNoticesSkeleton';

export const BaseFormLayout = ({
    // Header props
    headerIcon: HeaderIcon,
    title,
    subtitle,
    headerExtra,

    // Search props
    searchValue,
    detectedType,
    fetchingCustomer,
    onSearchChange,

    // Customer props
    phoneVerified,
    customerData,

    // Notices props
    notices,
    filteredNotices,
    selectedNotice,
    searchQuery,
    onSearchQueryChange,
    onNoticeSelect,
    loadingNotices,
    selectionLabel,
    showNotices = true,

    // Form content
    children
}) => {
    return (
        <div className="mx-auto transition-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border dark:border-white">
                {/* Header */}
                <div className="border-b border-gray-200 dark:border-gray-700 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <HeaderIcon className="w-8 h-8 text-sky-600 mr-3" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-200">{title}</h2>
                                <p className="text-gray-600 dark:text-slate-400 mt-1">{subtitle}</p>
                            </div>
                        </div>
                        {headerExtra}
                    </div>
                </div>

                <div className="p-8">
                    {/* Search Input */}
                    <CustomerSearchInput
                        searchValue={searchValue}
                        detectedType={detectedType}
                        fetchingCustomer={fetchingCustomer}
                        onSearchChange={onSearchChange}
                    />

                    {/* Customer Data Display */}
                    {phoneVerified && customerData && (
                        <CustomerFound customerData={customerData} />
                    )}

                    {/* No Customer Found Message */}
                    {searchValue.length > 0 && !fetchingCustomer && !phoneVerified && detectedType && detectedType !== 'unknown' && (
                        <NoCustomerFound />
                    )}

                    {/* Notices Section */}
                    {phoneVerified && showNotices && (
                        <>
                            {loadingNotices ? (
                                <LoadingNoticesSkeleton />
                            ) : (
                                <NoticesGrid
                                    notices={notices}
                                    filteredNotices={filteredNotices}
                                    selectedNotice={selectedNotice}
                                    searchQuery={searchQuery}
                                    onSearchChange={onSearchQueryChange}
                                    onNoticeSelect={onNoticeSelect}
                                    selectionLabel={selectionLabel}
                                />
                            )}
                        </>
                    )}

                    {/* Form Content */}
                    {children}
                </div>
            </div>
        </div>
    );
};
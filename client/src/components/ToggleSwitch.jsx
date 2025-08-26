import React from 'react';


const ToggleSwitch = ({
    checked,
    onChange,
    label,
    description
}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                {label && (
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{label}</h4>
                )}
                {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                )}
            </div>

            <button
                type="button"
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${checked ? 'bg-sky-200' : 'bg-gray-200'
                    }`}
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
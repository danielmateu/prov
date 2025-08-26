import { useState, useEffect, KeyboardEvent } from 'react';

export function useKeyboardSelect({
    suggestions,
    onSelect,
    isOpen,
    setIsOpen
}) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        if (!isOpen) {
            setSelectedIndex(-1);
        }
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (!suggestions.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setSelectedIndex(0);
                } else {
                    setSelectedIndex((prev) =>
                        prev < suggestions.length - 1 ? prev + 1 : prev
                    );
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setSelectedIndex((prev) =>
                        prev > 0 ? prev - 1 : prev
                    );
                }
                break;

            case 'Enter':
                e.preventDefault();
                if (isOpen && selectedIndex >= 0) {
                    onSelect(suggestions[selectedIndex]);
                    setIsOpen(false);
                }
                break;

            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    return {
        selectedIndex,
        handleKeyDown,
    };
}
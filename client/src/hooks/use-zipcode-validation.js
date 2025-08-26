import { validateZipCode } from '@/components/ServiceForm/api';
import { useState } from 'react';

export function useZipCodeValidation(
    setError,
    clearErrors
) {
    const [isValidating, setIsValidating] = useState(false);
    const [population, setPopulation] = useState(null);


    const validatePostalCode = async (value) => {
        // console.log('Validando código postal:', value);
        if (value.length === 5) {
            setIsValidating(true);
            const isValid = await validateZipCode(value);
            setPopulation(isValid);

            // console.log('isValid:', isValid);
            setIsValidating(false);

            if (!isValid) {
                setError('cp', {
                    type: 'manual',
                    message: 'El código postal no es válido'
                });
            } else {
                clearErrors('cp');
            }
        } else {
            setError('cp', {
                type: 'manual',
                message: 'El código postal debe tener 5 dígitos'
            });

        }
    };

    return {
        isValidating,
        validatePostalCode,
        population
    };
}
/**
 * Shared utility helpers for ASA Universe
 */

// Global formatters to avoid expensive redeclaring during render loops
export const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
});

export const numberFormatter = new Intl.NumberFormat('id-ID');

import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

const { subscribe, update } = writable<Toast[]>([]);

let id = 0;

export const toast = {
    subscribe,
    add: (message: string, type: ToastType = 'info', duration = 3000) => {
        const toastId = id++;
        update(toasts => [...toasts, { id: toastId, message, type }]);
        setTimeout(() => {
            update(toasts => toasts.filter(t => t.id !== toastId));
        }, duration);
    },
    remove: (id: number) => {
        update(toasts => toasts.filter(t => t.id !== id));
    }
};

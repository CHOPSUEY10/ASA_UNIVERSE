import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface CartItem {
    id: string; // Unique ID for the cart item (product.id + variants)
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variants: {
        kain?: string;
        kerah?: string;
        patch?: string;
        size?: string;
        designFileUrl?: string;
        kainId?: number;
        kerahId?: number;
        patchId?: number;
        sizeId?: number;
        fontId?: number;
        fontName?: string;
        fontPreviewUrl?: string;
    };
}

const CART_KEY = 'asa_universe_cart'; // Kept for legacy fallback or guest sessions if needed, but we focus on DB

function createCartStore() {
    const { subscribe, set, update } = writable<CartItem[]>([]);

    return {
        subscribe,
        
        // Memuat cart dari database saat app di-mount
        init: async () => {
            if (!browser) return;
            try {
                const res = await fetch('/api/cart');
                if (res.ok) {
                    const data = await res.json();
                    set(data.items || []);
                }
            } catch (e) {
                console.error("Failed to load cart from DB", e);
            }
        },

        addItem: async (item: CartItem) => {
            if (!browser) return;
            try {
                const res = await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
                
                if (res.ok) {
                    const data = await res.json();
                    // Kita bisa ambil ulang atau optimistically update
                    // Optimistic update:
                    update((items) => {
                        const existingIndex = items.findIndex(
                            i => i.productId === item.productId &&
                            i.variants.kerahId === item.variants.kerahId &&
                            i.variants.patchId === item.variants.patchId &&
                            i.variants.sizeId === item.variants.sizeId &&
                            i.variants.designFileUrl === item.variants.designFileUrl
                        );
                        let newItems;
                        if (existingIndex >= 0) {
                            newItems = [...items];
                            newItems[existingIndex].quantity += item.quantity;
                            newItems[existingIndex].price = data.item.price; // Update price just in case
                        } else {
                            // Assign DB id and correct price back to the optimistically added item
                            const newItem = { ...item, id: data.item.id, price: data.item.price };
                            newItems = [...items, newItem];
                        }
                        return newItems;
                    });
                }
            } catch (e) {
                console.error("Failed to save cart to DB", e);
            }
        },
        
        removeItem: async (id: string) => {
            if (!browser) return;
            try {
                const res = await fetch(`/api/cart?id=${id}`, { method: 'DELETE' });
                if (res.ok) {
                    update((items) => items.filter(i => i.id !== id));
                }
            } catch (e) {
                console.error("Failed to delete item", e);
            }
        },
        
        updateQuantity: (id: string, quantity: number) => {
            // Note: Untuk fitur ini idealnya kita buat endpoint PUT /api/cart
            // Untuk MVP ini, kita bisa pertahankan secara lokal atau implementasi penuh
            update((items) => {
                if (quantity <= 0) return items.filter(i => i.id !== id);
                return items.map(i => i.id === id ? { ...i, quantity } : i);
            });
        },
        
        clear: async () => {
            if (!browser) return;
            try {
                const res = await fetch('/api/cart', { method: 'DELETE' });
                if (res.ok) {
                    set([]);
                }
            } catch (e) {
                console.error("Failed to clear cart", e);
            }
        }
    };
}

export const cart = createCartStore();

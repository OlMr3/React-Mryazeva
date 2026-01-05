export const CART_GUEST_KEY = "cart_guest";
export const loadGuestCart = () => {
    try {
        const raw = sessionStorage.getItem(CART_GUEST_KEY);
        return raw ? JSON.parse(raw) : { items: [] };
    } catch {
        return { items: [] };
    }
};

export const saveGuestCart = (cart) => {
    try {
        sessionStorage.setItem(CART_GUEST_KEY, JSON.stringify(cart));
    } catch {

    }
};

export const clearGuestCart = () => {
    sessionStorage.removeItem(CART_GUEST_KEY);
};
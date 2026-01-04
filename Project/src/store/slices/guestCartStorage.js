export const CART_GUEST_KEY = "cart_guest";

export const loadGuestCart = () => {
    console.log('loadGuestCart')
try {
const raw = sessionStorage.getItem(CART_GUEST_KEY);
return raw ? JSON.parse(raw) : { items: [] };
} catch {
return { items: [] };

}};

export const saveGuestCart = (cart) => {

try {
sessionStorage.setItem(CART_GUEST_KEY, JSON.stringify(cart));
console.log('saveGuestCart')
} catch {

} };

export const clearGuestCart = () => {
 console.log('clearGuestCart called', new Date().toISOString()); 
 console.trace();
sessionStorage.removeItem(CART_GUEST_KEY);

};
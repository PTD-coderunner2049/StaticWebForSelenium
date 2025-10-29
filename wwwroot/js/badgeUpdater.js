const sessionKey = 'commissionCart';

/**
 * Utility function to update the cart badge count.
 * This is now globally available.
 */
function updateCartBadge() {
    const badgeElement = document.getElementById('cart-badge');
    
    if (!badgeElement) {
        return;
    }

    const existingCartJson = sessionStorage.getItem(sessionKey);
    let cart = [];
    
    if (existingCartJson) {
        try {
            cart = JSON.parse(existingCartJson);
        } catch (e) {
            console.error("Error parsing cart data for badge update:", e);
        }
    }
    badgeElement.textContent = cart.length;
}
updateCartBadge();
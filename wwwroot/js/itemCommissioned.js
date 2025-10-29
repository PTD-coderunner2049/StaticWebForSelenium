/**
 * This script renders two lists:
 * 1. Active Commissions (commissionCart): Allows removal and payment.
 * 2. Commission History (commissionedCart): Shows paid items.
 */

// 1. Get the container element and keys
const productsContainer = document.getElementById('products-container');
const sessionKey = 'commissionCart'; // Active, pending payment
const commissionedKey = 'commissionedCart'; // Paid history

// --- Utility function to retrieve items from session storage ---
const getCartItems = (key) => {
    const jsonString = sessionStorage.getItem(key);
    if (jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error(`Error parsing data from sessionStorage key "${key}":`, e);
            return [];
        }
    }
    return [];
};


// 2. Function to generate the HTML for a single product card
const createCartItemCard = (item, isPaid = false) => {
    // Determine card appearance and status
    const cardStatusClass = isPaid ? 'opacity-75 border-success' : '';
    const badgeClass = isPaid ? 'bg-success' : 'bg-danger';
    const statusText = isPaid ? 'Paid Commission' : 'Pending Commission';
    
    let footerContent;

    if (isPaid) {
        // Show status for paid items
        const paidDate = item.paidDate ? new Date(item.paidDate).toLocaleDateString() : 'N/A';
        footerContent = `
            <div class="text-center text-success fw-bold">Paid on ${paidDate}</div>
        `;
    } else {
        // Show Pay and Remove buttons for active items
        footerContent = `
            <div class="text-center d-flex justify-content-center">
                <!-- NEW PAY BUTTON: White/Light and to the left -->
                <button class="btn btn-sm btn-light border mt-auto me-2 pay-item-btn" data-item-id="${item.id}">Pay</button>
                <!-- Existing REMOVE BUTTON: Red -->
                <button class="btn btn-sm btn-danger mt-auto remove-item-btn" data-item-id="${item.id}">Remove</button>
            </div>
        `;
    }

    return `
        <div class="col mb-5">
            <div class="card h-100 ${cardStatusClass}">
                <div class="badge ${badgeClass} text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${statusText}</div>
                <img class="card-img-top" src="${item.imageSrc}" alt="${item.name}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${item.name}</h5>
                        $${item.price.toFixed(2)}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    ${footerContent}
                </div>
            </div>
        </div>
    `;
};

// 3. Function to handle item payment (move item from pending to paid)
const payForItem = (itemIdToPay) => {
    const pendingCart = getCartItems(sessionKey);
    let paidCart = getCartItems(commissionedKey);
    
    const idToPay = parseInt(itemIdToPay);

    // Find the item in the pending cart
    const itemToMove = pendingCart.find(item => item.id === idToPay);
    
    if (itemToMove) {
        // Create the new pending cart without the item
        const updatedPendingCart = pendingCart.filter(item => item.id !== idToPay);

        // Add item to paid cart with a paid date
        const paidItem = { 
            ...itemToMove, 
            paidDate: Date.now(),
            // Add any other commission/paid details here
        };
        paidCart.push(paidItem);

        // Save both updated arrays back to sessionStorage
        sessionStorage.setItem(sessionKey, JSON.stringify(updatedPendingCart));
        sessionStorage.setItem(commissionedKey, JSON.stringify(paidCart));
        
        // Reload the page to display the updated cart lists
        window.location.reload();
    } else {
        console.error(`Item with ID ${itemIdToPay} not found in pending cart.`);
    }
};


// 4. Function to handle item removal (only from the active cart)
const removeItemFromCart = (itemIdToRemove) => {
    // 1. Retrieve current items from the active cart
    const cartItems = getCartItems(sessionKey);
    
    const idToRemove = parseInt(itemIdToRemove);

    // 2. Filter the array to keep only items whose ID does NOT match the one to remove
    const updatedCart = cartItems.filter(item => item.id !== idToRemove);

    // 3. Save the updated array back to sessionStorage
    sessionStorage.setItem(sessionKey, JSON.stringify(updatedCart));

    // 4. Reload the page to display the updated cart list
    window.location.reload(); 
};

// 5. Function to retrieve the items, render them, and attach listeners
const renderCartItems = () => {
    if (!productsContainer) {
        console.error('Container element not found.');
        return;
    }
    
    // Load both carts
    const pendingItems = getCartItems(sessionKey);
    // Sort paid items by date, newest first (optional, but good practice for history)
    const paidItems = getCartItems(commissionedKey).sort((a, b) => b.paidDate - a.paidDate); 

    let fullHTML = '';
    
    // --- Render Active Commissions (Pending Payment) ---
    fullHTML += '<h2 class="col-12 text-center my-5 fw-bolder text-dark">Active Commissions (<span class="text-danger">Pending Payment</span>)</h2>';
    
    if (pendingItems.length === 0) {
        fullHTML += '<h5 class="col-12 text-center text-muted mb-5">You have no commissions awaiting payment.</h5>';
    } else {
        fullHTML += '<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">';
        // Render pending items (isPaid=false)
        fullHTML += pendingItems.map(item => createCartItemCard(item, false)).join('');
        fullHTML += '</div>';
    }
    
    // --- Visual Separator ---
    fullHTML += '<hr class="my-5 col-12 border-primary border-3 opacity-100">'; 
    
    // --- Render Commission History (Paid) ---
    fullHTML += '<h2 class="col-12 text-center my-5 fw-bolder text-dark">Commission History (<span class="text-success">Paid</span>)</h2>';

    if (paidItems.length === 0) {
        fullHTML += '<h5 class="col-12 text-center text-muted mb-5">Your paid commission history is empty.</h5>';
    } else {
        fullHTML += '<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">';
        // Render paid items (isPaid=true)
        fullHTML += paidItems.map(item => createCartItemCard(item, true)).join('');
        fullHTML += '</div>';
    }

    // Insert all HTML content
    productsContainer.innerHTML = fullHTML;
    
    // 6. Attach Event Listeners (only to pending items)
    
    // Attach Remove Listeners
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            removeItemFromCart(event.currentTarget.getAttribute('data-item-id'));
        });
    });

    // Attach Pay Listeners
    document.querySelectorAll('.pay-item-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            payForItem(event.currentTarget.getAttribute('data-item-id'));
        });
    });
};

// 7. Call the function to display the cart items when the script loads
renderCartItems();

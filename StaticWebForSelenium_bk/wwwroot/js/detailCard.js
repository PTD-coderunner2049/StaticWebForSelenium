// --- Function to handle adding the product to sessionStorage (the 'cart') ---
function addToCart(product, quantity) {
    // 1. Retrieve the current cart items from sessionStorage
    const existingCartJson = sessionStorage.getItem(sessionKey);
    let cart = [];
    if (existingCartJson) {
        try {
            cart = JSON.parse(existingCartJson);
        } catch (e) {
            console.error("Error parsing cart data from sessionStorage:", e);
            cart = []; 
        }
    }
    const uniqueCommissionId = Date.now(); 

    const cartItem = {
        // This is the unique ID for this specific entry (commission instance)
        id: uniqueCommissionId, 
        
        // This links back to the original product in localStorage (useful for rendering)
        productId: product.id, 
        
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc,
        
        // Store the quantity requested for this one commission instance
        quantity: quantity 
    };
    
    // Add the single new entry to the cart array
    cart.push(cartItem);
    
    console.log(`New commission instance for "${product.name}" added with quantity ${quantity}.`);

    // 2. Store the updated cart back into sessionStorage
    sessionStorage.setItem(sessionKey, JSON.stringify(cart));
    
    // Calculate total item count (sum of all quantities) for the console log
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log(`Total unique commission entries: ${cart.length}. Total quantity of items: ${totalItems}`);

    // 3. Update the cart badge immediately
    updateCartBadge();
}

// --- Main function to load details and set up the button ---
function loadProductDetails() {
    const localStorageKey = 'allProductsData';
    const container = document.getElementById('product-detail-container');
    
    // 1. Load Products from localStorage (Robust loading)
    const productsJsonString = localStorage.getItem(localStorageKey);
    let products = []; 
    // ... (Products loading logic remains the same)
    if (productsJsonString) {
        try {
            products = JSON.parse(productsJsonString);
        } catch (e) {
            console.error("Error parsing products from localStorage:", e);
        }
    }
    
    if (products.length === 0) {
        // ... (Error handling remains the same)
        if (container) {
            container.innerHTML = '<h2 class="text-center">Error: Could not load product data.</h2>';
        }
        return; 
    }

    // 2. Get the ID from the URL and find the product
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const itemId = parseInt(productId);
    
    if (isNaN(itemId) || !container) {
        if (container) {
            container.innerHTML = '<h2 class="text-center">Product Not Found.</h2>';
        }
        return;
    }

    const product = products.find(p => p.id === itemId);

    if (product) {
        // 3. Create and inject the HTML (remains the same)
        const productHTML = `
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6">
                    <img class="card-img-top mb-5 mb-md-0" src="${product.imageSrc}" alt="${product.name}" />
                </div>
                
                <div class="col-md-6">
                    <div class="small mb-1">${product.delivery}</div>
                    <h1 class="display-5 fw-bolder">${product.name}</h1>
                    <div class="fs-5 mb-5">
                        <span>$${product.price.toFixed(2)}</span>
                    </div>
                    <p class="lead">${product.description}</p>
                    <div class="d-flex">
                        <input class="form-control text-center me-3" id="inputQuantity" type="number" value="1" min="1" style="max-width: 3rem" />
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" id="commissionButton">
                            <i class="bi-cart-fill me-1"></i>
                            Place a commission
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = productHTML;

        // 4. Attach the Event Listener
        const button = document.getElementById('commissionButton');
        const quantityInput = document.getElementById('inputQuantity');
        
        button.addEventListener('click', () => {
            const quantity = Math.max(1, parseInt(quantityInput.value) || 1); 
            addToCart(product, quantity);
        });

    } else {
        container.innerHTML = '<h2 class="text-center">Product details could not be loaded.</h2>';
    }
}

// --- Initialization ---
loadProductDetails();
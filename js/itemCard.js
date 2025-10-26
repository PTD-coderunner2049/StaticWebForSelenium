// 1. Get the container element
const productsContainer = document.getElementById('products-container');

// 2. Function to generate the HTML for a single product card
const createProductCard = (product) => {
    // Using a template literal (backticks) for cleaner multi-line HTML
    return `
        <div class="col mb-5">
            <div class="card h-100">
                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${product.delivery}</div>
                <img class="card-img-top" src="${product.imageSrc}" alt="${product.name}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${product.name}</h5>
                        $${product.price.toFixed(2)}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" href="itemdetail.html?id=${product.id}">View</a>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// 3. Loop through the products and append the generated HTML to the container
const renderProducts = () => {
    // Generate an array of HTML strings for all products
    const productCardsHTML = products.map(createProductCard).join('');

    // Insert all the generated HTML into the container once
    productsContainer.innerHTML = productCardsHTML;
};

// 4. Call the function to display the products when the script loads
renderProducts();



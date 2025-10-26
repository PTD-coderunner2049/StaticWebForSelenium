/**
 * This script injects the complete, updated navigation bar HTML 
 * (including the necessary cart badge ID) into the existing <nav> element.
 */

// The complete inner HTML for the new navigation structure
const newNavbarInnerContent = `
    <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="login.html">Log Out</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="dashboard.html">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="dashboard.html">All Products</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="dashboard.html">Popular Items</a></li>
                        <li><a class="dropdown-item" href="dashboard.html">New Arrivals</a></li>
                    </ul>
                </li>
            </ul>
            <form class="d-flex">
                <a class="btn btn-outline-dark d-flex align-items-center" href="commissionList.html">
                    <i class="bi-cart-fill me-1"></i>
                    My Pre-commision list
                    <!-- This span includes the required ID for the cart script -->
                    <span class="badge bg-dark text-white ms-1 rounded-pill" id="cart-badge">0</span>
                </a>
            </form>
        </div>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Select the existing navbar element. Using .navbar targets the first one on the page.
    const existingNav = document.querySelector('nav.navbar'); 

    if (existingNav) {
        // Replace the existing content with the new, updated HTML
        existingNav.innerHTML = newNavbarInnerContent;
    } else {
        console.error("Error: Could not find a <nav class='navbar'> element to inject navigation content.");
    }
});

const localStorageKey = 'allProductsData';
const productsJsonString = JSON.stringify(products);
localStorage.setItem(localStorageKey, productsJsonString);
console.log("Products successfully loaded into localStorage!");
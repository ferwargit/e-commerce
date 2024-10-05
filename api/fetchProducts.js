// fetchProducts.js

// URL de la API
const apiUrl = 'https://fakestoreapi.com/products';

// Selección de elementos en el DOM
const productGrid = document.querySelector('.product-grid');
const categoryFilter = document.getElementById('categoryFilter');

// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);
        applyCategoryFilter(products); // Aplicar el filtro inicial
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Función para mostrar productos en el DOM
function displayProducts(products) {
    productGrid.innerHTML = ''; // Limpiar grid de productos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button>Añadir al carrito</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Función para aplicar el filtro de categoría
function applyCategoryFilter(products) {
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;

        const filteredProducts = selectedCategory === 'all'
            ? products
            : products.filter(product => product.category === selectedCategory);

        displayProducts(filteredProducts);
    });
}

// Cargar productos al cargar la página
window.addEventListener('DOMContentLoaded', fetchProducts);

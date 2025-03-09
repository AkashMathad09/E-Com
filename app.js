// app.js
let editingIndex = -1;
const LOW_STOCK_THRESHOLD = 5;

function addProduct() {
    const productName = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("price").value;

    if (productName && category && stock && price) {
        let products = JSON.parse(localStorage.getItem("products")) || [];

        if (editingIndex === -1) {
            products.push({ productName, category, stock, price });
        } else {
            products[editingIndex] = { productName, category, stock, price };
            editingIndex = -1;
        }

        localStorage.setItem("products", JSON.stringify(products));
        alert("Product saved successfully!");
        document.getElementById("productForm").reset();
        loadProducts();
    } else {
        alert("Please fill out all fields.");
    }
}

function loadProducts(filter = "") {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const table = document.querySelector("table");
    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
    `;

    products.forEach((product, index) => {
        if (product.productName.toLowerCase().includes(filter.toLowerCase()) || product.category.toLowerCase().includes(filter.toLowerCase())) {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td class="${product.stock <= LOW_STOCK_THRESHOLD ? 'low-stock' : ''}">
                    ${product.stock} ${product.stock <= LOW_STOCK_THRESHOLD ? '⚠️ Low Stock' : ''}
                </td>
                <td>${product.price}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            `;
        }
    });
}

function editProduct(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products[index];

    document.getElementById("productName").value = product.productName;
    document.getElementById("category").value = product.category;
    document.getElementById("stock").value = product.stock;
    document.getElementById("price").value = product.price;

    editingIndex = index;
}

function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }
}

function searchProduct() {
    const searchInput = document.getElementById("searchInput").value;
    loadProducts(searchInput);
}

window.onload = loadProducts;

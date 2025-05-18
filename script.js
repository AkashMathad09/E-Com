document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const product = {
    name: document.getElementById("productName").value,
    price: document.getElementById("productPrice").value,
    stock: document.getElementById("productStock").value,
    category: document.getElementById("productCategory").value,
  };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  alert("Product added successfully!");
  this.reset();
});

// Only run this code on the view_products.html page
if (document.getElementById("productList")) {
  const productList = document.getElementById("productList");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
  } else {
    const listHTML = products.map((product, index) => `
      <div class="product-card">
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      </div>
    `).join("");
    productList.innerHTML = listHTML;
  }
  const listHTML = products.map((product, index) => `
  <div class="product-card">
    <h2>${product.name}</h2>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>Stock:</strong> ${product.stock}</p>
    <p><strong>Category:</strong> ${product.category}</p>
    <button onclick="editProduct(${index})">Edit</button>
    <button onclick="deleteProduct(${index})">Delete</button>
  </div>
`).join("");
productList.innerHTML = listHTML;

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload(); // Refresh to update the list
  }
}

function editProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[index];

  // Store the index to update it later in the add product page
  localStorage.setItem("editIndex", index);
  localStorage.setItem("editProduct", JSON.stringify(product));

  // Redirect to add_product.html for editing
  window.location.href = "add_product.html";
}

if (window.location.pathname.includes("add_product.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const editProduct = JSON.parse(localStorage.getItem("editProduct"));
    const index = localStorage.getItem("editIndex");

    if (editProduct) {
      document.getElementById("productName").value = editProduct.name;
      document.getElementById("productPrice").value = editProduct.price;
      document.getElementById("productStock").value = editProduct.stock;
      document.getElementById("productCategory").value = editProduct.category;
    }

    document.getElementById("productForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("productName").value;
      const price = document.getElementById("productPrice").value;
      const stock = document.getElementById("productStock").value;
      const category = document.getElementById("productCategory").value;

      const products = JSON.parse(localStorage.getItem("products")) || [];

      const newProduct = { name, price, stock, category };

      if (index !== null && index !== "null") {
        products[index] = newProduct;
        localStorage.removeItem("editIndex");
        localStorage.removeItem("editProduct");
      } else {
        products.push(newProduct);
      }

      localStorage.setItem("products", JSON.stringify(products));
      this.reset();
      alert("Product saved!");
      window.location.href = "view_products.html";
    });
  });
}

}

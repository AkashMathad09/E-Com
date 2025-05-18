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
}

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

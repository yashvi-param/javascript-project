const products = [
  { id: 1, name: "Classic T-Shirt", category: "Fashion", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Running Shoes", category: "Footwear", price: 1499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 2499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Laptop Backpack", category: "Accessories", price: 1799, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Wireless Headphones", category: "Electronics", price: 1899, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Sunglasses", category: "Accessories", price: 699, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Denim Jacket", category: "Fashion", price: 2199, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Running Cap", category: "Sports", price: 499, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=80" },
  { id: 9, name: "Water Bottle", category: "Home", price: 599, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80" },
  { id: 10, name: "Coffee Mug", category: "Home", price: 399, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80" },
  { id: 11, name: "Leather Wallet", category: "Accessories", price: 899, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80" },
  { id: 12, name: "Perfume", category: "Beauty", price: 1299, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80" },
  { id: 13, name: "Basketball", category: "Sports", price: 899, image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=700&q=80" },
  { id: 14, name: "Desk Plant", category: "Home", price: 499, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=80" },
  { id: 15, name: "Classic Watch", category: "Accessories", price: 1999, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80" },
  { id: 16, name: "Casual Hoodie", category: "Fashion", price: 1499, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80" },
  { id: 17, name: "Bluetooth Speaker", category: "Electronics", price: 1599, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80" },
  { id: 18, name: "Sofa Cushion", category: "Home", price: 549, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=700&q=80" },
  { id: 19, name: "Notebook", category: "Books", price: 299, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=80" },
  { id: 20, name: "Teddy Bear", category: "Toys", price: 799, image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=80" }
];

let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");

function formatPrice(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function saveCart() {
  localStorage.setItem("shopEaseCart", JSON.stringify(cart));
}

function showProducts(list = products) {
  if (!list.length) {
    productGrid.innerHTML = '<p class="empty">No products found.</p>';
    return;
  }

  productGrid.innerHTML = list.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="rating">★★★★★ <small>(120+)</small></div>
        <p class="price">${formatPrice(product.price)}</p>
        <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  renderCart();
  showToast(`${product.name} added to cart`);
}

function changeQuantity(id, change) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(product => product.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty">Your cart is empty.</div>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-image" src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <small>${formatPrice(item.price)} each</small>
        <div class="quantity">
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <strong>${item.quantity}</strong>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.remove("hidden");
}

function closeCart() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.add("hidden");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
  showToast("Cart cleared");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }
  showToast("Demo checkout completed!");
  cart = [];
  saveCart();
  renderCart();
});

searchInput.addEventListener("input", event => {
  const keyword = event.target.value.toLowerCase().trim();
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  );
  showProducts(filtered);
});

showProducts();
renderCart();

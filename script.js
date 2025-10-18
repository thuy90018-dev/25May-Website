
function clearCart() {
  localStorage.removeItem('cart');
  document.getElementById('cart-items').innerHTML = '<p>Giỏ hàng trống.</p>';
}
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<p>Giỏ hàng trống.</p>';
  } else {
    container.innerHTML = cart.map(i => `<p>${i}</p>`).join('');
  }
});
const modal = document.getElementById("cartModal");
const closeBtn = document.querySelector(".close");
const confirmBtn = document.getElementById("confirmAdd");
let currentProduct = null;
// Khi ấn vào nút "Thêm vào giỏ"
document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    currentProduct = e.target.closest('.product').querySelector('h3').textContent;
    modal.style.display = "block";
  });
});

// Đóng hộp chọn
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Xác nhận thêm vào giỏ
confirmBtn.onclick = function() {
  const size = document.getElementById("size").value;
  const quantity = document.getElementById("quantity").value;
  modal.style.display = "none";
  alert(`🛒 Đã thêm ${quantity} x ${currentProduct} (Size ${size}) vào giỏ hàng!`);
};

// Đóng khi bấm ra ngoài
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const Modal = document.getElementById("cartModal");
const cartModal = document.getElementById("cartView");
const closeBtn = document.querySelector(".close");
const closeCart = document.querySelector(".closeCart");
const confirmBtn = document.getElementById("confirmAdd");
const cartBtn = document.getElementById("cartBtn");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPriceEl = document.getElementById("totalPrice");

let cart = [];
let currentProducts = null;
let currentPrice = 0;

// Khi bấm "Thêm vào giỏ"
document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productDiv = e.target.closest('.product');
    currentProduct = productDiv.querySelector('h3').textContent;
    currentPrice = parseInt(productDiv.querySelector('p').textContent.replace(/\D/g, ''));
    modal.style.display = "block";
  });
});

// Đóng hộp chọn size
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Xác nhận thêm vào giỏ
confirmBtn.onclick = function() {
  const size = document.getElementById("size").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  modal.style.display = "none";

  cart.push({ name: currentProduct, size, quantity, price: currentPrice });
  updateCart();
  alert(`🛒 Đã thêm ${quantity} x ${currentProduct} (Size ${size}) vào giỏ hàng!`);
};

// Hiện giỏ hàng
cartBtn.onclick = function() {
  cartModal.style.display = "block";
};

// Đóng giỏ hàng
closeCart.onclick = function() {
  cartModal.style.display = "none";
};

// Đóng khi click ra ngoài
window.onclick = function(event) {
  if (event.target == modal) modal.style.display = "none";
  if (event.target == cartModal) cartModal.style.display = "none";
};

// Cập nhật giỏ hàng
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <p>${item.name} - Size: ${item.size} - SL: ${item.quantity} - Giá: ${(item.price * item.quantity).toLocaleString()}đ
      <button onclick="removeItem(${index})">❌</button></p>
    `;
    cartItems.appendChild(itemDiv);
    total += item.price * item.quantity;
  });
  totalPriceEl.textContent = "Tổng: " + total.toLocaleString() + "đ";
  cartCount.textContent = cart.length;
}

// Xóa sản phẩm
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('🛒 Sản phẩm đã được thêm vào giỏ hàng!');
  });
});
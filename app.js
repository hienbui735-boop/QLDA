// 1. Danh sách sản phẩm mở rộng đa dạng
let products = [
  { id: 1, name: 'Cà Phê Phin Sữa Đá', category: 'coffee', basePrice: 29000, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400', desc: 'Cà phê phin truyền thống đậm đà hòa quyện cùng sữa đặc ngọt ngào.' },
  { id: 2, name: 'Bạc Xỉu Tươi Mát', category: 'coffee', basePrice: 29000, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400', desc: 'Vị cà phê nhẹ nhàng hòa cùng lớp sữa tươi béo ngậy sảng khoái.' },
  { id: 3, name: 'Cà Phê Đen Đá Phin', category: 'coffee', basePrice: 25000, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', desc: 'Cà phê nguyên chất dành cho người yêu thích hương vị nguyên bản.' },
  { id: 4, name: 'Trà Sen Vàng Thanh Mát', category: 'tea', basePrice: 45000, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400', desc: 'Trà Oolong thanh nhẹ kết hợp hạt sen thơm bùi và củ năng giòn tan.' },
  { id: 5, name: 'Trà Đào Cam Sả', category: 'tea', basePrice: 45000, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400', desc: 'Trà trái cây thơm nức cùng đào giòn ngọt và hương cam sả sảng khoái.' },
  { id: 6, name: 'Trà Thạch Vải', category: 'tea', basePrice: 42000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', desc: 'Sự kết hợp giữa vị trà đậm đà và những trái vải mọng nước.' },
  { id: 7, name: 'Freeze Matcha Nhật Bản', category: 'freeze', basePrice: 55000, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', desc: 'Đá xay trà xanh Matcha béo ngậy kết hợp lớp kem tươi mịn màng.' },
  { id: 8, name: 'Freeze Cà Phê Phin', category: 'freeze', basePrice: 55000, image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400', desc: 'Đá xay cà phê phin đậm đà phủ kem tươi béo bùi khó cưỡng.' },
  { id: 9, name: 'Bánh Mỳ Que Pate', category: 'cake', basePrice: 19000, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400', desc: 'Bánh mỳ giòn tan với nhân pate béo ngậy đặc trưng.' },
  { id: 10, name: 'Bánh Mousse Cacao', category: 'cake', basePrice: 35000, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', desc: 'Bánh ngọt vị cacao mềm mịn thơm ngon hấp dẫn.' },
];

const vouchers = {
  'BIGORDER20': 0.2,
  'FRESH15': 0.15,
  'FRESH10': 0.1,
  'FREESHIP': 0.05
};

let currentCategory = 'all';
let selectedProduct = null;
let discountRate = 0;

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VNĐ';
}

// 2. Render danh sách sản phẩm ở trang menu
function renderProducts(category = 'all', sortType = 'default') {
  currentCategory = category;
  const list = document.getElementById('product-list');
  if (!list) return;

  let filtered = category === 'all' 
    ? [...products] 
    : products.filter(p => p.category === category);

  if (sortType === 'price-asc') filtered.sort((a, b) => a.basePrice - b.basePrice);
  if (sortType === 'price-desc') filtered.sort((a, b) => b.basePrice - a.basePrice);
  if (sortType === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sortType === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));

  list.innerHTML = filtered.map(p => `
    <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between group">
      <div class="relative overflow-hidden">
        <img src="${p.image}" alt="${p.name}" class="h-48 w-full object-cover group-hover:scale-105 transition duration-500">
        <span class="absolute top-3 left-3 bg-emerald-800 text-yellow-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
          ${p.category}
        </span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-base text-gray-800 mb-1 group-hover:text-emerald-700 transition line-clamp-1">${p.name}</h3>
          <p class="text-xs text-gray-400 mb-3 line-clamp-2">${p.desc}</p>
        </div>
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs text-gray-400">Giá chỉ từ</span>
            <span class="text-emerald-700 font-black text-base">${formatCurrency(p.basePrice)}</span>
          </div>
          <button onclick="openProductModal(${p.id})" class="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl shadow transition">
            Tùy Chọn & Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(category, btnElement) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-700', 'text-white');
    btn.classList.add('bg-gray-100', 'text-gray-700');
  });
  if (btnElement) {
    btnElement.classList.remove('bg-gray-100', 'text-gray-700');
    btnElement.classList.add('bg-emerald-700', 'text-white');
  }
  renderProducts(category);
}

function sortProducts(sortType) {
  renderProducts(currentCategory, sortType);
}

// 3. Modal Tùy chọn sản phẩm
function openProductModal(productId) {
  selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return;

  const modal = document.getElementById('product-modal');
  document.getElementById('modal-title').innerText = selectedProduct.name;
  document.getElementById('modal-img').src = selectedProduct.image;
  document.getElementById('modal-desc').innerText = selectedProduct.desc;
  
  const sizeS = document.getElementById('size-s');
  if (sizeS) sizeS.checked = true;

  const qtyEl = document.getElementById('product-qty');
  if (qtyEl) qtyEl.value = 1;

  updateModalPrice();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function updateModalPrice() {
  if (!selectedProduct) return;

  let price = selectedProduct.basePrice;
  const sizeRadio = document.querySelector('input[name="size"]:checked');
  const sizeValue = sizeRadio ? sizeRadio.value : 'S';

  if (sizeValue === 'M') price += 6000;
  if (sizeValue === 'L') price += 10000;

  const qtyInput = document.getElementById('product-qty');
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

  const totalPriceEl = document.getElementById('modal-total-price');
  if (totalPriceEl) totalPriceEl.innerText = formatCurrency(price * qty);
}

function addToCartFromModal() {
  if (!selectedProduct) return;

  const sizeRadio = document.querySelector('input[name="size"]:checked');
  const size = sizeRadio ? sizeRadio.value : 'S';

  let unitPrice = selectedProduct.basePrice;
  if (size === 'M') unitPrice += 6000;
  if (size === 'L') unitPrice += 10000;

  const qtyInput = document.getElementById('product-qty');
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

  const cartItem = {
    cartItemId: Date.now(),
    id: selectedProduct.id,
    name: selectedProduct.name,
    image: selectedProduct.image,
    size: size,
    price: unitPrice,
    quantity: qty
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  closeProductModal();
  updateCartCount();
  alert('Đã thêm sản phẩm vào giỏ hàng!');
}

// 4. Quản lý Giỏ hàng
function renderCart() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDiscountEl = document.getElementById('cart-discount');
  const cartTotalEl = document.getElementById('cart-total');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="text-center py-8 text-gray-500 font-medium">Giỏ hàng của bạn đang trống.</p>';
    if (cartSubtotalEl) cartSubtotalEl.innerText = '0 VNĐ';
    if (cartDiscountEl) cartDiscountEl.innerText = '0 VNĐ';
    if (cartTotalEl) cartTotalEl.innerText = '0 VNĐ';
    return;
  }

  let subtotal = 0;
  cartItemsEl.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="flex items-center justify-between py-4 border-b">
        <div class="flex items-center gap-4">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded-xl shadow">
          <div>
            <h4 class="font-bold text-base text-gray-800">${item.name}</h4>
            <p class="text-xs text-gray-500">Size: <strong class="text-gray-700">${item.size}</strong></p>
            <p class="text-xs text-emerald-700 font-bold mt-0.5">${formatCurrency(item.price)}</p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-xs">
          <span class="font-semibold text-gray-700">SL: ${item.quantity}</span>
          <span class="font-extrabold text-gray-900">${formatCurrency(itemTotal)}</span>
          <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 font-bold">Xóa</button>
        </div>
      </div>
    `;
  }).join('');

  const discountAmount = subtotal * discountRate;
  if (cartSubtotalEl) cartSubtotalEl.innerText = formatCurrency(subtotal);
  if (cartDiscountEl) cartDiscountEl.innerText = '-' + formatCurrency(discountAmount);
  if (cartTotalEl) cartTotalEl.innerText = formatCurrency(subtotal - discountAmount);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.innerText = totalCount;
}

function applyVoucher() {
  const voucherInput = document.getElementById('voucher-code');
  if (!voucherInput) return;
  const code = voucherInput.value.trim().toUpperCase();

  if (vouchers[code]) {
    discountRate = vouchers[code];
    alert(`Áp dụng mã thành công! Được giảm ${discountRate * 100}%`);
    renderCart();
  } else {
    alert('Mã giảm giá không hợp lệ!');
  }
}

// 5. Xử lý Đặt hàng — BẮT BUỘC ĐÃ ĐĂNG NHẬP
function handleCheckout(e) {
  if (e) e.preventDefault();

  // CHECK ĐĂNG NHẬP
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Bạn cần đăng nhập tài khoản trước khi tiến hành đặt hàng!');
    window.location.href = 'login.html';
    return;
  }
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
  }

  const nameInput = document.querySelector('input[placeholder="Nhập họ và tên của bạn"]');
  const phoneInput = document.querySelector('input[placeholder="Nhập số điện thoại nhận hàng"]');
  const addressInput = document.querySelector('input[placeholder="Nhập địa chỉ giao hàng chi tiết"]');
  const paymentSelect = document.querySelector('select');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const pendingOrder = {
    customer: {
      name: nameInput ? nameInput.value : currentUser.name,
      phone: phoneInput ? phoneInput.value : '',
      address: addressInput ? addressInput.value : ''
    },
    paymentMethod: paymentSelect ? paymentSelect.value : 'qr',
    items: cart,
    subtotal: subtotal,
    discount: discountAmount,
    total: total
  };

  localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
  window.location.href = 'payment.html';
}

// 6. Quản lý trạng thái Đăng nhập / Đăng xuất trên Header
function renderHeader() {
  updateCartCount();
  
  const userMenuEl = document.getElementById('user-menu');
  if (!userMenuEl) return;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    userMenuEl.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-bold">
        <span class="text-yellow-300">👤 ${currentUser.name || currentUser.email}</span>
        <button onclick="handleLogout()" class="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg transition shadow">Đăng xuất</button>
      </div>
    `;
  } else {
    userMenuEl.innerHTML = `
      <a href="login.html" class="bg-yellow-400 text-emerald-950 px-3.5 py-1.5 rounded-full hover:bg-yellow-300 font-black text-xs transition shadow">
        Đăng Nhập
      </a>
    `;
  }
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  alert('Đã đăng xuất thành công!');
  window.location.reload();
}
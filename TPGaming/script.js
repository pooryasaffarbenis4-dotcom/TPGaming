// ============================================
// DATA - لیست محصولات با چند عکس
// ============================================
const products = [
  { 
    id: 1, 
    name: 'PS5 slim', 
    category: 'کنسول بازی', 
    price: 161499000, 
    images: [
      'images/ps5slim.jpg'
    ],
    description: 'پلی استیشن 5 یک کنسول نسل نهم قدرتمند و بسیار پر طرفدار است. با گرافیک 4K، سرعت بارگذاری فوق‌العاده و پشتیبانی از بازی‌های انحصاری بی‌نظیر.'
  },
  { 
    id: 2, 
    name: 'دسته PS5', 
    category: 'دسته بازی', 
    price: 15000000, 
    images: [
      'images/dsef.jpg',
      'images/dbla.jpg',
      'images/dsor.jpg'
    ],
    description: 'ماوس گیمینگ با سنسور ۱۶۰۰۰ DPI، ۸ دکمه قابل برنامه‌ریزی، نورپردازی RGB و وزنه‌های قابل تنظیم برای کنترل دقیق.'
  },
  { 
    id: 3, 
    name: 'هدست گیمینگ '  , 
    category: 'هدست', 
    price: 5000000, 
    images: [
      'images/hedset.jpg',
    ],
    description: 'هدست گیمینگ با صدای فراگیر ۷.۱ کاناله، میکروفون نویزگیر، طراحی ارگونومیک و پدهای گوش با قابلیت تنظیم.'
  },
  { 
    id: 4, 
    name: 'مانیتور 27 اینچ 165Hz', 
    category: 'مانیتور', 
    price: 4200000, 
    images: [
      'images/monitor.jpg',
      'images/monitor-2.jpg',
      'images/monitor-3.jpg'
    ],
    description: 'مانیتور ۲۷ اینچ با رفرش‌ریت ۱۶۵ هرتز، رزولوشن ۲K، پنل IPS، زمان پاسخگویی ۱ms و سازگار با G-Sync و FreeSync.'
  },
  { 
    id: 5, 
    name: '  مجموعه 2عددی میکروفون هالی لند', 
    category: 'میکروفون', 
    price: 30000000, 
    images: [
      'images/mic.jpg',
   
    ],
    description: 'میکروفون هالی لند یواس‌بی با کیفیت استودیویی، الگوی قطبی کاردیوئید، فیلتر پاپ داخلی و پایه ضد لرزش.'
  },
  { 
    id: 6, 
    name: 'پد ماوس بزرگ XXL', 
    category: 'لوازم جانبی', 
    price: 800000, 
    images: [
      'images/mospad.jpg',
      
    ],
    description: 'پد ماوس سایز XXL با سطح بافت‌دار، لبه‌های دوزی شده ضد سایش، زیره لاستیکی ضد لغزش و سازگار با ماوس‌های نوری و لیزری.'
  },
  { 
    id: 7, 
    name: 'صندلی گیمینگ ریزر', 
    category: 'صندلی', 
    price: 18000000, 
    images: [
      'images/sandalirazar.jpg',
     
    ],
    description: 'صندلی گیمینگ با طراحی ارگونومیک، تکیه‌گاه بلند، بالشتک گردن و کمر، روکش چرمی و پایه فلزی با چرخ‌های روان.'
  },
  { 
    id: 8, 
    name: 'کارت گرافیک RX 580', 
    category: 'سخت‌افزار', 
    price: 22800000, 
    images: [
      'images/RX5801.jpg',
      'images/RX5802.jpg',
      'images/RX5803.jpg'
    ],
    description: 'کارت گرافیک  RX 580 با 8 گیگابایت حافظه'
  },
];

// ============================================
// STATE - وضعیت برنامه
// ============================================
let cart = [];
let currentCategory = 'all';
let searchQuery = '';

// ============================================
// DOM ELEMENTS
// ============================================
const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.querySelectorAll('.cat-btn');
const productsTitle = document.getElementById('productsTitle');

const cartBadge = document.getElementById('cartBadge');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');

const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

const homeLink = document.getElementById('homeLink');
const categoriesLink = document.getElementById('categoriesLink');
const contactLink = document.getElementById('contactLink');

// ===== المنت‌های مودال =====
const modalOverlay = document.getElementById('productModalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalAddBtn = document.getElementById('modalAddToCart');
const modalThumbnails = document.getElementById('modalThumbnails');

let currentModalProductId = null;
let currentImageIndex = 0;

// ============================================
// RENDER PRODUCTS - نمایش محصولات
// ============================================
function renderProducts() {
  let filtered = products;
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }

  if (searchQuery.trim() !== '') {
    productsTitle.textContent = `نتایج جستجو برای "${searchQuery}"`;
  } else if (currentCategory === 'all') {
    productsTitle.textContent = 'همه محصولات';
  } else {
    productsTitle.textContent = `محصولات ${currentCategory}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>هیچ محصولی با این مشخصات یافت نشد!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
      </div>
      <h3>${p.name}</h3>
      <div class="category">${p.category}</div>
      <div class="price">${p.price.toLocaleString()} <span>تومان</span></div>
      <button class="btn" onclick="event.stopPropagation(); addToCart(${p.id})">
        <i class="fas fa-cart-plus"></i> افزودن به سبد
      </button>
    </div>
  `).join('');

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const id = parseInt(this.dataset.id);
      openModal(id);
    });
  });
}

// ============================================
// MODAL FUNCTIONS - با گالری
// ============================================
function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  currentImageIndex = 0;
  
  // نمایش عکس اصلی
  modalImg.src = product.images[0];
  modalImg.alt = product.name;
  modalName.textContent = product.name;
  modalCategory.textContent = product.category;
  modalPrice.textContent = `${product.price.toLocaleString()} تومان`;
  modalDescription.textContent = product.description || 'توضیحاتی برای این محصول وجود ندارد.';

  // ساخت thumbnail‌ها
  modalThumbnails.innerHTML = product.images.map((img, index) => `
    <img 
      src="${img}" 
      alt="تصویر ${index + 1}" 
      class="modal-thumb ${index === 0 ? 'active' : ''}"
      data-index="${index}"
      onclick="changeImage(${index})"
    />
  `).join('');

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function changeImage(index) {
  const product = products.find(p => p.id === currentModalProductId);
  if (!product) return;
  
  currentImageIndex = index;
  modalImg.src = product.images[index];
  
  // به‌روزرسانی کلاس active در thumbnail‌ها
  document.querySelectorAll('.modal-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// ============================================
// FILTER BY CATEGORY
// ============================================
function filterByCategory(category) {
  currentCategory = category;
  
  categoryButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });
  
  if (searchInput.value !== '') {
    searchInput.value = '';
    searchQuery = '';
  }
  
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
  renderProducts();
}

// ============================================
// CART FUNCTIONS
// ============================================
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
  showToast(`${product.name} به سبد اضافه شد`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartUI();
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartBadge.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="empty-cart-msg">🛒 سبد خرید شما خالی است</div>`;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.name}</span>
          <span class="cart-item-price">${(item.price * item.quantity).toLocaleString()} تومان</span>
        </div>
        <div class="cart-item-actions">
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <span class="qty">${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
          <button onclick="removeFromCart(${item.id})" style="background:#EF4444;color:#fff;width:30px;height:30px;border-radius:6px;border:none;cursor:pointer;font-weight:700;transition:0.2s;">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  const total = getTotal();
  cartTotalEl.textContent = total > 0 ? `${total.toLocaleString()} تومان` : '۰ تومان';
}

// ============================================
// TOAST
// ============================================
let toastTimeout;

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ============================================
// CART SIDEBAR
// ============================================
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartFn() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', closeCartFn);

// ============================================
// CHECKOUT
// ============================================
checkoutBtn.addEventListener('click', function() {
  if (cart.length === 0) {
    showToast('🛒 سبد خرید خالی است!');
    return;
  }
  const total = getTotal();
  showToast(`✅ سفارش شما با مبلغ ${total.toLocaleString()} تومان ثبت شد!`);
  cart = [];
  updateCartUI();
  closeCartFn();
});

// ============================================
// EVENT LISTENERS
// ============================================

// جستجو
searchInput.addEventListener('input', function(e) {
  searchQuery = e.target.value;
  
  if (searchQuery === '') {
    const activeBtn = document.querySelector('.cat-btn.active');
    if (activeBtn) {
      currentCategory = activeBtn.dataset.category;
    } else {
      currentCategory = 'all';
    }
    renderProducts();
    return;
  }
  
  renderProducts();
});

// دکمه‌های دسته‌بندی
categoryButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.dataset.category;
    filterByCategory(category);
  });
});

// لینک دسته‌بندی‌ها
categoriesLink.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('filterSection').scrollIntoView({ behavior: 'smooth' });
  
  categoryButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector('.cat-btn[data-category="all"]').classList.add('active');
  
  currentCategory = 'all';
  searchInput.value = '';
  searchQuery = '';
  renderProducts();
});

// لینک خانه
homeLink.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  categoryButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector('.cat-btn[data-category="all"]').classList.add('active');
  currentCategory = 'all';
  searchInput.value = '';
  searchQuery = '';
  renderProducts();
});

// ============================================
// CONTACT LINK — اسکرول به فوتر
// ============================================
contactLink.addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('footerSection').scrollIntoView({ behavior: 'smooth' });
});

// ===== رویدادهای مودال =====
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// دکمه افزودن به سبد در مودال
modalAddBtn.addEventListener('click', function() {
  if (currentModalProductId !== null) {
    addToCart(currentModalProductId);
  }
});

// بستن مودال با ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCartFn();
  }
});

// ============================================
// INIT
// ============================================
document.querySelector('.cat-btn[data-category="all"]').classList.add('active');
renderProducts();
updateCartUI();
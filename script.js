// ========== DATASET ==========
const foodsData = [
  { id: 1, name: "Margherita Pizza", category: "Pizza", price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=400&fit=crop", description: "Classic delight with 100% real mozzarella cheese." },
  { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 399, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&h=400&fit=crop", description: "Pepperoni, cheese and tomato sauce." },
  { id: 3, name: "Chicken Burger", category: "Burgers", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop", description: "Crispy chicken patty with lettuce and mayo." },
  { id: 4, name: "Veggie Burger", category: "Burgers", price: 149, image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&h=400&fit=crop", description: "Delicious plant-based patty with fresh veggies." },
  { id: 5, name: "Pasta Alfredo", category: "Main Course", price: 249, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&h=400&fit=crop", description: "Creamy white sauce pasta with bell peppers." },
  { id: 6, name: "Grilled Chicken", category: "Main Course", price: 349, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&h=400&fit=crop", description: "Perfectly grilled chicken breast with herbs." },
  { id: 7, name: "Tomato Soup", category: "Starters", price: 99, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=400&fit=crop", description: "Hot and sour tomato soup with croutons." },
  { id: 8, name: "Garlic Bread", category: "Starters", price: 129, image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=500&h=400&fit=crop", description: "Toasted garlic bread with melted cheese." },
  { id: 9, name: "Chocolate Cake", category: "Desserts", price: 199, image: "https://images.unsplash.com/photo-1578985545069-69928b1ea97s?w=500&h=400&fit=crop", description: "Rich and moist chocolate sponge cake." },
  { id: 10, name: "Ice Cream Sundae", category: "Desserts", price: 149, image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=500&h=400&fit=crop", description: "Vanilla ice cream with chocolate syrup and nuts." },
  { id: 11, name: "Cold Coffee", category: "Beverages", price: 110, image: "https://images.unsplash.com/photo-1461023058943-0708e522b512?w=500&h=400&fit=crop", description: "Refreshing cold coffee with ice cream." },
  { id: 12, name: "Lemonade", category: "Beverages", price: 80, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=400&fit=crop", description: "Freshly squeezed lemon with mint and ice." },
];

// ========== CAROUSEL ==========
const carouselInner = document.querySelector(".carousel-inner");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const navBtn = document.querySelector("#nav_btn");
const navItems = document.querySelector("#nav_items");

let currentSlide = 0;
if(prevButton) prevButton.disabled = currentSlide === 0;

navBtn.addEventListener("click", () => {
  navItems.classList.toggle("hidden");
  navItems.classList.toggle("flex");
});

function updateCarousel() {
  if(!carouselItems || carouselItems.length===0) return;
  const slideWidth = carouselItems[0].clientWidth;
  carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === carouselItems.length - 1;
}

if(nextButton) {
  nextButton.addEventListener("click", () => {
    if (currentSlide < carouselItems.length - 1) currentSlide++;
    else currentSlide = 0;
    updateCarousel();
  });
}

if(prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) currentSlide--;
    else currentSlide = carouselItems.length - 1;
    updateCarousel();
  });
}

window.addEventListener("resize", updateCarousel);


// ========== SLIDERS ==========
function initializeSliderButtons(sliderContainer) {
  const slider = sliderContainer.querySelector(".slider");
  const prevBtn = sliderContainer.querySelector(".prevBtn");
  const nextBtn = sliderContainer.querySelector(".nextBtn");
  
  if(!slider || !prevBtn || !nextBtn) return;

  function checkSliderBtns() {
    prevBtn.disabled = slider.scrollLeft === 0;
    nextBtn.disabled = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth;
  }

  slider.addEventListener("scroll", checkSliderBtns);

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkSliderBtns, 300);
  });

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkSliderBtns, 300);
  });
  
  // Drag to scroll
  let isDragging = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => isDragging = false);
  slider.addEventListener("mouseup", () => isDragging = false);
  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  });

  checkSliderBtns();
}


// ========== RENDER CARDS ==========
function CardComponent(food, isSlider = false) {
  const isFav = favorites.includes(food.id);
  const favClass = isFav ? "text-red-500" : "text-gray-400";
  
  return `
    <div class="card bg-white shadow-lg overflow-hidden rounded-lg relative ${isSlider ? 'cursor-grab shrink-0 w-60' : 'w-full max-w-sm hover:shadow-xl transition-shadow flex flex-col h-full'}">
        <button onclick="toggleFavorite(${food.id})" class="absolute top-2 right-2 text-xl ${favClass} hover:text-red-500 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow z-10 transition">
          <i class="fa-solid fa-heart"></i>
        </button>
        <img src="${food.image}" alt="${food.name}" class="w-full aspect-4/3 object-cover cursor-pointer" onclick="openFoodDetails(${food.id})">
        <div class="p-4 text-sm flex flex-col justify-between h-full">
            <div>
              <h2 title="${food.name}" class="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer" onclick="openFoodDetails(${food.id})">${food.name}</h2>
              <p class="text-xs text-gray-500 font-semibold mb-2 uppercase">${food.category}</p>
              <p class="text-gray-600 line-clamp-2 h-10">${food.description}</p>
              <hr class="my-3 border-gray-200">
              <p class="text-green-600 font-bold text-lg">
                  <i class="fa-solid fa-indian-rupee-sign"></i>${food.price}
              </p>
              <hr class="my-3 border-gray-200">
            </div>
            <button onclick="addToCart(${food.id})" class="cursor-pointer mx-auto w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold shadow rounded-lg transition flex items-center justify-center gap-2 mt-auto">
                <i class="fa-solid fa-cart-plus"></i> Add to cart
            </button>
        </div>
    </div>
  `;
}

const excitingContainer = document.querySelector("#exciting .slider");
const europeanContainer = document.querySelector("#european .slider");

function initSlidersData() {
  if (excitingContainer) {
    const popular = foodsData.slice(0, 8);
    // retain the buttons by not completely overwriting innerHTML, just prepend/append or clear out old cards
    const oldExcitingBtns = excitingContainer.innerHTML;
    excitingContainer.innerHTML = popular.map(f => CardComponent(f, true)).join("");
    // we need to put the buttons back or just call initializeSliderButtons? The original HTML had the buttons inside the slider container but absolute positioned, so they don't get scrolled with content if they are inside the slider, wait... in original index.html: <div class="slider flex gap-4 pb-4 overflow-x-hidden"><button id="prevBtn" class="absolute...
    // Actually the buttons were inside the slider div! Oh wait. I better preserve the buttons.
  }
}

// Fixed version of initSlidersData preserving buttons
function renderSliderDataWithButtons(container, foods) {
  if(!container) return;
  const buttonsHtml = Array.from(container.querySelectorAll("button")).map(b => b.outerHTML).join("");
  const cardsHtml = foods.map(f => CardComponent(f, true)).join("");
  container.innerHTML = buttonsHtml + cardsHtml;
  initializeSliderButtons(container.parentElement);
}

function initSlidersDataFixed() {
  if (excitingContainer) {
    const popular = foodsData.slice(0, 8);
    renderSliderDataWithButtons(excitingContainer, popular);
  }
  if (europeanContainer) {
    const pizzaAndPasta = foodsData.filter(f => f.category === 'Pizza' || f.name.includes('Pasta'));
    renderSliderDataWithButtons(europeanContainer, pizzaAndPasta);
  }
}


// ========== MENU & FILTERING ==========
let currentCategory = "All";
let searchQuery = "";
const menuGrid = document.getElementById("menu_grid");
const noFoodMsg = document.getElementById("no_food_msg");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search_input");

function renderMenu() {
  if (!menuGrid) return;
  
  let filtered = foodsData;
  
  if (currentCategory === "Favorites") {
    filtered = filtered.filter(f => favorites.includes(f.id));
  } else if (currentCategory !== "All") {
    filtered = filtered.filter(f => f.category === currentCategory);
  }
  
  if (searchQuery) {
    filtered = filtered.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  
  menuGrid.innerHTML = "";
  
  if (filtered.length === 0) {
    noFoodMsg.classList.remove("hidden");
  } else {
    noFoodMsg.classList.add("hidden");
    menuGrid.innerHTML = filtered.map(f => CardComponent(f, false)).join("");
  }
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => {
      b.classList.remove("active", "bg-yellow-300");
      b.classList.add("bg-gray-200");
    });
    btn.classList.remove("bg-gray-200");
    btn.classList.add("active", "bg-yellow-300");
    
    currentCategory = btn.dataset.category;
    renderMenu();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderMenu();
  });
}


// ========== FAVORITES (LOCAL STORAGE) ==========
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderMenu();
  initSlidersDataFixed();
  
  // if details modal is open for this item, update it
  if(currentDetailId === id) {
    const detailFav = document.getElementById("detail_fav");
    if(favorites.includes(id)) {
      detailFav.classList.remove("text-white");
      detailFav.classList.add("text-red-500");
    } else {
      detailFav.classList.remove("text-red-500");
      detailFav.classList.add("text-white");
    }
  }
}


// ========== CART (LOCAL STORAGE) ==========
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartModal();
}

function updateCartBadge() {
  const badge = document.getElementById("cart_badge");
  if(!badge) return;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

function addToCart(id, qty = 1) {
  const food = foodsData.find(f => f.id === id);
  if (!food) return;
  
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({ ...food, quantity: qty });
  }
  
  saveCart();
  
  const badge = document.getElementById("cart_badge");
  if(badge) {
    badge.classList.add("animate-bounce");
    setTimeout(() => badge.classList.remove("animate-bounce"), 1000);
  }
}

window.addToCart = addToCart; // Make globally accessible if needed

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

window.removeFromCart = removeFromCart;

function updateCartQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(id);
    else saveCart();
  }
}

window.updateCartQty = updateCartQty;

function clearCart() {
  cart = [];
  saveCart();
}

// ========== CART MODAL ==========
const cartModal = document.getElementById("cart_modal");
const cartItemsContainer = document.getElementById("cart_items");
const cartTotalEl = document.getElementById("cart_total");

const cartNav = document.getElementById("cart_nav");
if(cartNav) {
  cartNav.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.classList.remove("hidden");
    cartModal.classList.add("flex");
    renderCartModal();
  });
}

document.getElementById("close_cart")?.addEventListener("click", () => {
  cartModal.classList.add("hidden");
  cartModal.classList.remove("flex");
});

document.getElementById("clear_cart")?.addEventListener("click", clearCart);

function renderCartModal() {
  if(!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="text-center text-gray-500 my-auto w-full py-10"><i class="fa-solid fa-cart-shopping text-4xl mb-3 text-gray-300 block"></i>Your cart is empty</div>`;
  } else {
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      
      cartItemsContainer.innerHTML += `
        <div class="flex items-center gap-4 border-b border-gray-100 pb-3">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded-md shadow-sm">
          <div class="flex-1">
            <h4 class="font-bold text-sm line-clamp-1 text-gray-800">${item.name}</h4>
            <div class="text-green-600 font-bold text-sm mt-1"><i class="fa-solid fa-indian-rupee-sign"></i>${item.price}</div>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
              <button onclick="updateCartQty(${item.id}, -1)" class="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold transition">-</button>
              <span class="px-3 py-1 text-sm font-bold bg-white">${item.quantity}</span>
              <button onclick="updateCartQty(${item.id}, 1)" class="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold transition">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-xs text-red-500 hover:text-red-700 hover:underline">Remove</button>
          </div>
        </div>
      `;
    });
  }
  if(cartTotalEl) cartTotalEl.textContent = total;
}


// ========== FOOD DETAILS MODAL ==========
const detailsModal = document.getElementById("food_details_modal");
let currentDetailId = null;
let currentDetailQty = 1;

function openFoodDetails(id) {
  const food = foodsData.find(f => f.id === id);
  if(!food) return;
  
  currentDetailId = id;
  currentDetailQty = 1;
  
  document.getElementById("detail_img").src = food.image;
  document.getElementById("detail_name").textContent = food.name;
  document.getElementById("detail_category").textContent = food.category;
  document.getElementById("detail_desc").textContent = food.description;
  document.getElementById("detail_price").textContent = food.price;
  document.getElementById("detail_qty").textContent = currentDetailQty;
  
  const detailFav = document.getElementById("detail_fav");
  if(favorites.includes(id)) {
    detailFav.classList.remove("text-white");
    detailFav.classList.add("text-red-500");
  } else {
    detailFav.classList.remove("text-red-500");
    detailFav.classList.add("text-white");
  }
  
  detailsModal.classList.remove("hidden");
  detailsModal.classList.add("flex");
}

window.openFoodDetails = openFoodDetails;

document.getElementById("close_food_details")?.addEventListener("click", () => {
  detailsModal.classList.add("hidden");
  detailsModal.classList.remove("flex");
});

document.getElementById("detail_inc")?.addEventListener("click", () => {
  currentDetailQty++;
  document.getElementById("detail_qty").textContent = currentDetailQty;
});

document.getElementById("detail_dec")?.addEventListener("click", () => {
  if (currentDetailQty > 1) {
    currentDetailQty--;
    document.getElementById("detail_qty").textContent = currentDetailQty;
  }
});

document.getElementById("detail_add_cart")?.addEventListener("click", () => {
  addToCart(currentDetailId, currentDetailQty);
  detailsModal.classList.add("hidden");
  detailsModal.classList.remove("flex");
});

document.getElementById("detail_fav")?.addEventListener("click", () => {
  toggleFavorite(currentDetailId);
});


// ========== CHECKOUT FLOW ==========
const checkoutModal = document.getElementById("checkout_modal");
const checkoutForm = document.getElementById("checkout_form");

document.getElementById("checkout_btn")?.addEventListener("click", () => {
  if (cart.length === 0) return alert("Your cart is empty!");
  
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  document.getElementById("checkout_subtotal").textContent = total;
  document.getElementById("checkout_final").textContent = total + 40; // Delivery charge
  
  cartModal.classList.add("hidden");
  cartModal.classList.remove("flex");
  
  checkoutModal.classList.remove("hidden");
  checkoutModal.classList.add("flex");
});

document.getElementById("close_checkout")?.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
  checkoutModal.classList.remove("flex");
});


// ========== ORDERS & CONFIRMATION ==========
let orders = JSON.parse(localStorage.getItem("orders")) || [];

const confirmModal = document.getElementById("confirmation_modal");
const ordersModal = document.getElementById("orders_modal");

if(checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 40;
    const orderId = "ORD" + Math.floor(Math.random() * 90000 + 10000);
    
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString(),
      items: [...cart],
      total: totalAmount,
      status: "Confirmed",
      timestamp: Date.now()
    };
    
    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    clearCart();
    
    checkoutModal.classList.add("hidden");
    checkoutModal.classList.remove("flex");
    
    document.getElementById("confirm_order_id").textContent = orderId;
    document.getElementById("confirm_total").textContent = totalAmount;
    document.getElementById("confirm_status").textContent = "Confirmed";
    
    confirmModal.classList.remove("hidden");
    confirmModal.classList.add("flex");
    
    // Simulate status update
    simulateOrderStatus(orderId);
  });
}

document.getElementById("close_confirmation")?.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
  confirmModal.classList.remove("flex");
});

document.getElementById("btn_view_orders")?.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
  confirmModal.classList.remove("flex");
  openOrdersModal();
});

const ordersNav = document.getElementById("orders_nav");
if(ordersNav) {
  ordersNav.addEventListener("click", (e) => {
    e.preventDefault();
    openOrdersModal();
  });
}

document.getElementById("close_orders")?.addEventListener("click", () => {
  ordersModal.classList.add("hidden");
  ordersModal.classList.remove("flex");
});

function openOrdersModal() {
  const ordersList = document.getElementById("orders_list");
  if(!ordersList) return;
  ordersList.innerHTML = "";
  
  if (orders.length === 0) {
    ordersList.innerHTML = `<div class="text-center text-gray-500 py-10 w-full"><i class="fa-solid fa-receipt text-4xl mb-3 text-gray-300 block"></i>You have no previous orders.</div>`;
  } else {
    orders.forEach(order => {
      let statusColor = "text-blue-600 bg-blue-50";
      let statusIcon = "fa-clock";
      if(order.status === "Delivered") {
        statusColor = "text-green-600 bg-green-50";
        statusIcon = "fa-check-circle";
      }
      if(order.status === "Preparing") {
        statusColor = "text-yellow-600 bg-yellow-50";
        statusIcon = "fa-fire-burner";
      }
      if(order.status === "Out for Delivery") {
        statusColor = "text-orange-600 bg-orange-50";
        statusIcon = "fa-motorcycle";
      }
      
      const itemsHtml = order.items.map(i => `<span class="inline-block bg-gray-200 rounded px-2 py-1 text-xs text-gray-700 mr-2 mb-2">${i.quantity}x ${i.name}</span>`).join("");
      
      ordersList.innerHTML += `
        <div class="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition">
          <div class="flex justify-between items-start mb-3 border-b border-gray-100 pb-3">
            <div>
              <h4 class="font-bold text-lg text-gray-800">Order #${order.id}</h4>
              <p class="text-xs text-gray-500 mt-1"><i class="fa-regular fa-calendar-days mr-1"></i>${order.date}</p>
            </div>
            <div class="text-right">
              <div class="font-bold text-green-600 text-lg"><i class="fa-solid fa-indian-rupee-sign"></i>${order.total}</div>
              <div class="text-xs font-bold px-2 py-1 rounded mt-1 inline-block ${statusColor}"><i class="fa-solid ${statusIcon} mr-1"></i>${order.status}</div>
            </div>
          </div>
          <div class="mt-2">${itemsHtml}</div>
        </div>
      `;
    });
  }
  
  ordersModal.classList.remove("hidden");
  ordersModal.classList.add("flex");
}

function simulateOrderStatus(orderId) {
  // Order Confirmed -> Preparing (5s) -> Out for Delivery (10s) -> Delivered (15s)
  setTimeout(() => updateStatus(orderId, "Preparing"), 5000);
  setTimeout(() => updateStatus(orderId, "Out for Delivery"), 10000);
  setTimeout(() => updateStatus(orderId, "Delivered"), 15000);
}

function updateStatus(orderId, newStatus) {
  orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
    // If orders modal is open, refresh it
    if (!ordersModal.classList.contains("hidden")) {
      openOrdersModal();
    }
  }
}


// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  initSlidersDataFixed();
  renderMenu();
  updateCartBadge();
});

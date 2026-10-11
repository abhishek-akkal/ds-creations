/* =========================
   PRODUCT PRICES
========================= */

const productPrices = {
  "Ganesh Decorative Wall Art": "₹599",
  "Handmade Rose Bouquet": "₹499",
  "Shri Radha Decorative Art": "₹649",
  "Shiv & Parvati Decorative Wall Art": "₹599",
  "Kolam Wooden Chowki": "₹199",
  "Kolam Coaster Set": "₹399",
  "Hanuman Decorative Artwork": "₹599",
  "Personalised Name Decoration": "₹499",
  "Crochet Flower Pins": "₹149",
  "Crochet Flower Hair Clips": "₹99",
  "Handmade Floral Haar": "₹349",
  "Shivling Lotus Decorative Wall Art": "₹349",
  "Traditional Spiritual Art": "₹549",
  "Modak Incense Holder": "₹199",
  "Handmade Wall Diya Holders": "₹249",
  "Decorative Diya Set": "₹99",
  "Handmade Decorative Bag": "₹399",
  "Round Kolam Wall Art": "₹299",
  "Shubh Labh Door Hanging": "₹349",
  "Traditional Decorative Wall Set": "₹549",
  "Handcrafted Round Spiritual Wall Art": "₹599",
  "Traditional Ghungroo Dance Wall Art": "₹549",
  "Crochet Flower Set (Set of 3)": "₹199",
  "Colourful Handmade Diya Set": "₹399",
};

/* =========================
   LOGIN / USER NAME
========================= */

const loginBtn = document.getElementById("loginBtn");
const loginText = document.getElementById("loginText");
const loginOverlay = document.getElementById("loginOverlay");
const loginClose = document.getElementById("loginClose");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");
const logoutBtn = document.getElementById("logoutBtn");

function updateLoginUI() {
  const savedName = localStorage.getItem("dsCreationsUserName");

  if (savedName) {
    if (loginText) loginText.textContent = savedName;
    if (nameInput) nameInput.value = savedName;
    if (saveNameBtn) saveNameBtn.textContent = "Save Name";
    if (logoutBtn) logoutBtn.style.display = "block";
  } else {
    if (loginText) loginText.textContent = "Login";
    if (nameInput) nameInput.value = "";
    if (saveNameBtn) saveNameBtn.textContent = "Continue";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

function openLogin() {
  updateLoginUI();

  if (loginOverlay) {
    loginOverlay.classList.add("active");
  }

  setTimeout(() => {
    if (nameInput) nameInput.focus();
  }, 100);
}

function closeLogin() {
  if (loginOverlay) {
    loginOverlay.classList.remove("active");
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", openLogin);
}

if (loginClose) {
  loginClose.addEventListener("click", closeLogin);
}

if (loginOverlay) {
  loginOverlay.addEventListener("click", (event) => {
    if (event.target === loginOverlay) {
      closeLogin();
    }
  });
}

if (saveNameBtn) {
  saveNameBtn.addEventListener("click", () => {
    const name = nameInput ? nameInput.value.trim() : "";

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("dsCreationsUserName", name);
    updateLoginUI();
    closeLogin();
  });
}

if (nameInput) {
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && saveNameBtn) {
      saveNameBtn.click();
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("dsCreationsUserName");
    updateLoginUI();
    closeLogin();
  });
}

updateLoginUI();

/* =========================
   CART DATA
========================= */

let cart = JSON.parse(localStorage.getItem("dsCreationsCart")) || [];

function saveCart() {
  localStorage.setItem("dsCreationsCart", JSON.stringify(cart));
}

function getNumericPrice(price) {
  return Number(price.replace(/[₹,]/g, ""));
}

/* =========================
   CREATE CART PANEL
========================= */

const cartOverlay = document.createElement("div");
cartOverlay.className = "cart-overlay";
document.body.appendChild(cartOverlay);

const cartPanel = document.createElement("div");
cartPanel.className = "cart-panel";

cartPanel.innerHTML = `
  <div class="cart-header">
    <h2>Your Cart</h2>
    <button class="cart-close" id="cartClose" type="button">
      ×
    </button>
  </div>

  <div class="cart-items" id="cartItems"></div>

  <div class="cart-footer">
    <div class="cart-total">
      <span>Total</span>
      <span id="cartTotal">₹0</span>
    </div>

    <button class="checkout-btn" id="checkoutBtn" type="button">
      Continue to WhatsApp
    </button>
  </div>
`;

document.body.appendChild(cartPanel);

/* =========================
   QR PAYMENT CHECKOUT
========================= */

const existingWhatsAppCheckout = cartPanel.querySelector("#checkoutBtn");

const cartFooterElement = cartPanel.querySelector(".cart-footer");

const proceedPaymentButton = document.createElement("button");

proceedPaymentButton.type = "button";
proceedPaymentButton.className = "checkout-btn";
proceedPaymentButton.id = "proceedPaymentBtn";
proceedPaymentButton.textContent = "Proceed to Payment";

if (cartFooterElement && existingWhatsAppCheckout) {
  cartFooterElement.insertBefore(
    proceedPaymentButton,
    existingWhatsAppCheckout,
  );

  // WhatsApp checkout will be opened from the payment window.
  existingWhatsAppCheckout.style.display = "none";
}

const paymentOverlay = document.createElement("div");
paymentOverlay.className = "qr-payment-overlay";

paymentOverlay.innerHTML = `
  <section
    class="qr-payment-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="qrPaymentTitle"
  >
    <button
      class="qr-payment-close"
      type="button"
      aria-label="Close payment window"
    >
      &times;
    </button>

    <h2 id="qrPaymentTitle">Pay with UPI</h2>

    <p>Scan this QR code using your UPI app.</p>

    <img
      class="qr-payment-image"
      src="images/QRCode.png"
      alt="DS Creations UPI payment QR code"
    >

    <div class="qr-payment-total">
      Total to pay:
      <strong id="qrPaymentTotal">₹0</strong>
    </div>

    <p class="qr-payment-note">
      If your QR code does not fill in the amount automatically,
      enter the total shown above.
    </p>

    <button
      class="checkout-btn qr-continue-whatsapp"
      type="button"
    >
      I've Paid — Continue to WhatsApp
    </button>

    <p class="qr-payment-note">
      Your order is not confirmed until DS Creations
      verifies the payment.
    </p>
  </section>
`;

document.body.appendChild(paymentOverlay);

const qrPaymentTotal = paymentOverlay.querySelector("#qrPaymentTotal");

const closePaymentButton = paymentOverlay.querySelector(".qr-payment-close");

const continueToWhatsAppButton = paymentOverlay.querySelector(
  ".qr-continue-whatsapp",
);

function closePaymentModal() {
  paymentOverlay.classList.remove("active");
}

proceedPaymentButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  renderCart();
  qrPaymentTotal.textContent = cartTotal.textContent;
  paymentOverlay.classList.add("active");
});

closePaymentButton.addEventListener("click", closePaymentModal);

paymentOverlay.addEventListener("click", (event) => {
  if (event.target === paymentOverlay) {
    closePaymentModal();
  }
});

continueToWhatsAppButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    closePaymentModal();
    return;
  }

  closePaymentModal();

  if (existingWhatsAppCheckout) {
    existingWhatsAppCheckout.click();
  }
});

/* =========================
   NAVBAR CART ELEMENTS
========================= */

const navbarCart = document.getElementById("navbarCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartClose = document.getElementById("cartClose");
const checkoutBtn = document.getElementById("checkoutBtn");

/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }
}

/* =========================
   RENDER CART
========================= */

function renderCart() {
  updateCartCount();

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        Your cart is empty.
      </div>
    `;

    cartTotal.textContent = "₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const numericPrice = getNumericPrice(item.price);
    const itemTotal = numericPrice * item.quantity;

    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price} each</div>
      </div>

      <div class="cart-quantity">
        <button
          class="quantity-btn"
          type="button"
          data-action="minus"
          data-index="${index}"
        >−</button>

        <span class="quantity-number">${item.quantity}</span>

        <button
          class="quantity-btn"
          type="button"
          data-action="plus"
          data-index="${index}"
        >+</button>

        <button
          class="remove-item"
          type="button"
          data-action="remove"
          data-index="${index}"
        >Remove</button>
      </div>
    `;

    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = "₹" + total.toLocaleString("en-IN");
}

/* =========================
   OPEN / CLOSE CART
========================= */

function openCart() {
  renderCart();
  cartOverlay.classList.add("active");
  cartPanel.classList.add("active");
}

function closeCart() {
  cartOverlay.classList.remove("active");
  cartPanel.classList.remove("active");
}

if (navbarCart) {
  navbarCart.addEventListener("click", openCart);
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}

cartOverlay.addEventListener("click", closeCart);

/* =========================
   CART QUANTITY CONTROLS
========================= */

if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;
    const index = Number(button.dataset.index);

    if (Number.isNaN(index) || !cart[index]) return;

    if (action === "plus") {
      cart[index].quantity++;
    }

    if (action === "minus") {
      cart[index].quantity--;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();
  });
}

/* =========================
   PRODUCT CARDS
========================= */

const productCards = document.querySelectorAll(".product-card");

productCards.forEach((card) => {
  const orderLink = card.querySelector(".order-link");

  if (!orderLink) return;

  const productName =
    orderLink.dataset.product || card.dataset.product || "Handmade Creation";

  const price = productPrices[productName] || "₹399";
  const productInfo = card.querySelector(".product-info");

  if (!productInfo) return;

  // Prevent duplicate price/cart sections.
  if (productInfo.querySelector(".product-bottom")) return;

  const productBottom = document.createElement("div");
  productBottom.className = "product-bottom";

  const priceElement = document.createElement("span");
  priceElement.className = "product-price";
  priceElement.textContent = price;

  const cartButton = document.createElement("button");
  cartButton.type = "button";
  cartButton.className = "cart-btn";
  cartButton.textContent = "🛒 Cart";

  cartButton.addEventListener("click", () => {
    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: productName,
        price: price,
        quantity: 1,
      });
    }

    saveCart();
    updateCartCount();

    const originalText = cartButton.textContent;
    cartButton.textContent = "✓ Added";

    setTimeout(() => {
      cartButton.textContent = originalText;
    }, 1000);
  });

  productBottom.appendChild(priceElement);
  productBottom.appendChild(orderLink);
  productBottom.appendChild(cartButton);

  productInfo.appendChild(productBottom);
});

/* =========================
   INITIALIZE CART
========================= */

updateCartCount();
renderCart();

/* =========================
   CATEGORY FILTER
========================= */

const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    productCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "All" || category === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* =========================
   CUSTOM ORDER → WHATSAPP
========================= */

document.querySelectorAll(".order-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const product = link.dataset.product || "Custom Order";

    const message =
      `Hello DS Creations! 👋\n\n` +
      `I am interested in ordering:\n${product}\n\n` +
      `Please share more details.`;

    const whatsappURL =
      "https://wa.me/919699608447?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
});

/* =========================
   WHATSAPP CHECKOUT
========================= */

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let message =
      "Hello DS Creations! 👋\n\n" + "I would like to place an order:\n\n";

    let total = 0;

    cart.forEach((item) => {
      const price = getNumericPrice(item.price);
      const itemTotal = price * item.quantity;

      total += itemTotal;

      message +=
        `• ${item.name}\n` +
        `  Quantity: ${item.quantity}\n` +
        `  Price: ${item.price}\n\n`;
    });

    message += `Total: ₹${total.toLocaleString("en-IN")}\n\n`;

    const savedName = localStorage.getItem("dsCreationsUserName");

    if (savedName) {
      message += `Name: ${savedName}\n\n`;
    }

    message += "Please confirm the order. Thank you!";

    const whatsappURL =
      "https://wa.me/919699608447?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
}

/* =========================
   CLOSE MODALS WITH ESCAPE
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeLogin();
    closePaymentModal();
  }
});

/* =========================
   END OF APP.JS
========================= */

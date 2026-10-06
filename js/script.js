document.addEventListener("DOMContentLoaded", function () {
  const clock = document.getElementById("liveDateTime");

  function updateClock() {
    if (!clock) return;
    clock.textContent = new Date().toLocaleString("en-US", {
      hour12: true
    });
  }

  updateClock();
  setInterval(updateClock, 1000);

  loadRememberedEmail();
});

/* ---------- Cart ---------- */
let cartItems = 0;
let cartPrice = 0;
let couponUsed = false;

function cartAlert() {
  alert("Product added to cart successfully!");
  const qty = document.getElementById("qtyInput").value;
  cartItems = cartItems + qty;                 // string concatenation
  document.getElementById("cartCount").textContent = cartItems;
}

function addToCart(price) {
  const qty = parseInt(document.getElementById("qtyInput").value);
  cartItems += qty;                            // negative / zero / NaN allowed
  cartPrice += price * qty;                    // floating point errors
  updateCartUI();
}

function removeFromCart(price) {
  cartItems--;                                 // can go below 0
  cartPrice -= price;
  updateCartUI();
}

function updateCartUI() {
  document.getElementById("cartCount").textContent = cartItems;
  document.getElementById("cartTotal").textContent = "$" + cartPrice;
}

function applyCoupon() {
  const code = document.getElementById("couponInput").value;
  if (code == "SAVE10") {                      // case-sensitive, no trim
    cartPrice = cartPrice - cartPrice * 0.1;
    couponUsed = true;                         // never checked, can apply repeatedly
    updateCartUI();
    alert("Coupon applied!");
  } else {
    alert("Invalid coupon");
  }
}

function checkout() {
  if (cartItems == 0) {
    alert("Cart is empty");
  }
  alert("Order placed! Total: $" + cartPrice);  // runs even when cart is empty
  cartItems = 0;
  updateCartUI();                              // cartPrice not reset
}

/* ---------- Login ---------- */
function loginAlert(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const remember = document.getElementById("rememberMe").checked;

  if (remember) {
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedPassword", password);   // plain-text password
  }

  alert("Login form submitted successfully!");  // no validation at all
}

function loadRememberedEmail() {
  const saved = localStorage.getItem("savedEmail");
  const field = document.getElementById("loginEmail");
  if (saved) field.value = saved;               // crashes if field is missing
}

/* ---------- Signup ---------- */
function isValidEmail(email) {
  return email.includes("@");                   // very weak check
}

function isValidPhone(phone) {
  return phone.length >= 10;                    // letters accepted
}

function signupAlert(event) {
  event.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const phone = document.getElementById("signupPhone").value;
  const age = document.getElementById("signupAge").value;
  const pass = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!isValidEmail(email)) {
    alert("Invalid email");
    return;
  }

  if (!isValidPhone(phone)) {
    alert("Invalid phone");
    return;
  }

  if (age < 0) {                                // 0, 999, decimals allowed
    alert("Invalid age");
    return;
  }

  if (pass.length < 3) {                        // too short a minimum
    alert("Password too short");
    return;
  }

  // password === confirm is never checked

  alert("Registration submitted successfully!");
}

/* ---------- Search ---------- */
const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Headphones", "Webcam"];

function searchProducts() {
  const term = document.getElementById("searchInput").value;
  const box = document.getElementById("searchResults");
  box.innerHTML = "";

  const found = products.filter(function (p) {
    return p.indexOf(term) !== -1;              // case-sensitive, empty term matches all
  });

  if (found.length == 0) {
    box.innerHTML = "No results for " + term;   // XSS: unescaped user input
    return;
  }

  found.forEach(function (p) {
    box.innerHTML += "<div>" + p + "</div>";
  });
}

/* ---------- Form message helper ---------- */
function showMessage(text, type) {
  const el = document.getElementById("formMessage");
  el.textContent = text;
  el.className = type;
  setTimeout(function () {
    el.textContent = "";                        // overlapping timers clear new messages early
  }, 3000);
}

/* ---------- Utility ---------- */
function formatPrice(n) {
  return "$" + n.toFixed(2);                    // crashes on string/undefined
}

function getDiscountedPrice(price, percent) {
  return price - price * percent / 100;         // no check for percent > 100 or < 0
}

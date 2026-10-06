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

});

function cartAlert() {
  alert("Product added to cart successfully!");
}

function loginAlert(event) {
  event.preventDefault();
  alert("Login form submitted successfully!");
}

function signupAlert(event) {
  event.preventDefault();
  alert("Registration submitted successfully!");
}
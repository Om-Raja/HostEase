
// rules tab 

document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".tablinks");
  const tabContents = document.querySelectorAll(".tabcontent");

  function openTab(name) {
    tabContents.forEach(tab => tab.style.display = "none");
    tabLinks.forEach(btn => btn.classList.remove("active"));

    document.getElementById(name).style.display = "block";
    document.querySelector(`.tablinks[data-target="${name}"]`).classList.add("active");
  }

  // Add click event to buttons
  tabLinks.forEach(btn => {
    btn.addEventListener("click", function () {
      openTab(this.dataset.target);
    });
  });

  // Open first tab by default
  if (tabLinks.length > 0) {
    tabLinks[0].click();
  }
});












// bootstrap model registration page


document.querySelector('#registerModal form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form from submitting until validation passes

  // Get input values
  const email = document.getElementById('email').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Mobile number should be exactly 10 digits
  if (!/^\d{10}$/.test(mobile)) {
    alert('Mobile number must be exactly 10 digits.');
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
  // Show success message and redirect (simulate login page)
  alert('Registration successful!');
  // Simulate redirect to login page
  window.location.href = 'login.html'; // change this to your actual login page
});











//your JS code here. If required.
// Function to set a cookie with expiration time (1 day)
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Days to milliseconds
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// Function to delete a cookie
function deleteCookie(name) {
  setCookie(name, "", -1); // Set expiry date in the past
}

// Function to handle login
function loginUser(username) {
  setCookie("username", username, 1); // Store username in a cookie for 1 day
  displayWelcomeSection(username);
}

// Function to handle logout
function logoutUser() {
  deleteCookie("username");
  displayLoginSection();
}

// Function to display welcome section
function displayWelcomeSection(username) {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("welcome-section").style.display = "block";
  document.getElementById("user-name").textContent = username;
}

// Function to display login section
function displayLoginSection() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("welcome-section").style.display = "none";
}

// Check if the user is already logged in
window.onload = function () {
  const savedUsername = getCookie("username");
  if (savedUsername) {
    displayWelcomeSection(savedUsername);
  } else {
    displayLoginSection();
  }
};

// Add event listener for login form submission
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  loginUser(username);
});

// Add event listener for logout button
document.getElementById("logout").addEventListener("click", function () {
  logoutUser();
});

window.onload = function() {
    checkLoginStatus();
};

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function checkLoginStatus() {
    const username = getCookie("username");
    if (username) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        setCookie("username", username, 7); // Store username in cookie for 7 days
        checkLoginStatus();
    } else {
        alert("Invalid username or password");
    }
}

function logout() {
    setCookie("username", "", -1); // Delete the cookie
    checkLoginStatus();
}

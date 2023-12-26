var logOut = document.getElementById('logOut');
var userName = document.getElementById('userName');
var username = localStorage.getItem('sessionUsername');

if (username) {
    userName.innerHTML = `<span class="anim-bg">${username}</span>`;
}

logOut.addEventListener('click', function () {
    localStorage.removeItem('sessionUsername');
    location.replace("../index.html");
})
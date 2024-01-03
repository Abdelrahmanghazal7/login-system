var logOut = document.getElementById('logOut');
var userName = document.getElementById('userName');
var sessionUser = localStorage.getItem('sessionUsername');

if (sessionUser) {
    userName.innerHTML = `<span class="anim-bg">${sessionUser}</span>`;
}

logOut.addEventListener('click', function () {
    localStorage.removeItem('sessionUsername');
    window.location.assign('index.html');
})

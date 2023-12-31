var signUpName = document.getElementById('signUpName');
var signUpEmail = document.getElementById('signUpEmail');
var signUpPassword = document.getElementById('signUpPassword');
var SignUpBtn = document.getElementById('SignUpBtn');
var signInEmail = document.getElementById('signInEmail');
var signInPassword = document.getElementById('signInPassword');
var loginBtn = document.getElementById('loginBtn');
var exist = document.getElementById('exist');
var incorrect = document.getElementById('incorrect');
var header = document.querySelector('header');
var hidePopup = document.querySelectorAll('.hide');
var signUpArray;

if (localStorage.getItem('users') == null) {
    signUpArray = [];
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'));
}

// S I G N - U P
SignUpBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        exist.innerHTML = '<span class="error">All inputs is required</span>';
        return false
    }

    var signUp = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    }


    if (isEmailExist()) {
        exist.innerHTML = '<span class="error">email already exists</span>';

    } else {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        exist.innerHTML = '<span class="success">Success (login to access)</span>';
        clearSignUpform();
    }

})

function isEmailExist() {
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function clearSignUpform() {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
}

// L O G I N

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();

    incorrect.innerHTML = '';

    if (signInPassword.value == "" || signInEmail.value == "") {
        incorrect.innerHTML = '<span class="error">All inputs is required</span>';
        return false;
    }

    if (Exist() == true) {

        signInEmail.value = '';
        signInPassword.value = '';
        
        window.location.assign('home.html');

    } else {
        incorrect.innerHTML = '<span class="error">incorrect email or password</span>';
    }
})

function Exist() {

    var email = signInEmail.value;
    var password = signInPassword.value;

    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            return true;
        }
    }
    return false;
}

//  C H A N G E   P A S S W O R D 

function changePassword() {

    var existPasswordEmail = document.getElementById('existPasswordEmail').value;

    var newPassword = document.getElementById('newPassword').value;

    var foundUser = signUpArray.find(user => user.email.toLowerCase() === existPasswordEmail.toLowerCase());

    if (foundUser) {

        foundUser.password = newPassword;
        localStorage.setItem('users', JSON.stringify(signUpArray));

        showToast(`Password Changed Successfully <span class="founduser">${foundUser.name}</span>`, "success", 5000);
        clearPopupInputs()
    } else {
        document.getElementById('passwordError').innerHTML = '<span class="error">User not found .. Please sign up first or provide a valid email</span>';
    }
}

// C H A N G E   N A M E

function changeName() {
    var existNameEmail = document.getElementById('existNameEmail').value;
    var newName = document.getElementById('newName').value;

    var foundUser = signUpArray.find(user => user.email.toLowerCase() === existNameEmail.toLowerCase());
    if (foundUser) {
        foundUser.name = newName;
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('nameError').innerHTML = '';

        showToast(`Name Changed Successfully <span class="founduser">${foundUser.name}</span>`, "success", 5000);
        clearPopupInputs()
    } else {
        document.getElementById('nameError').innerHTML = '<span class="error">User not found .. Please sign up first or provide a valid email</span>';
    }
}

// D E L E T E  U S E R

function deleteAccount() {
    var existdeletEmail = document.getElementById('existdeletEmail').value;

    var userToDelete = signUpArray.find(user => user.email.toLowerCase() === existdeletEmail.toLowerCase());

    if (userToDelete) {
        var index = signUpArray.indexOf(userToDelete);
        signUpArray.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('emailError').innerHTML = '';

        showToast("Account Deleted Successfully", "success", 5000);
        clearPopupInputs()

    } else {
        document.getElementById('emailError').innerHTML = '<span class="error">User not found .. Please provide a valid email</span>';
    }
}

// T O G G L E   M E N U

document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggle');

    // Toggle menu on button click
    toggleButton.addEventListener('click', function () {
        header.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        var isClickInsideMenu = header.contains(event.target);
        var isClickOnToggleButton = toggleButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggleButton) {
            header.classList.remove('open');
        }
    });
});

// H I D E   P O P U P

for (let i = 0; i < hidePopup.length; i++) {
    hidePopup[i].addEventListener('click', function () {
        header.classList.remove('open');
        document.getElementById('passwordError').innerHTML = '';
        document.getElementById('nameError').innerHTML = '';
        document.getElementById('emailError').innerHTML = '';
    })
}

// T O A S T

let icon = { success: '<span class="material-symbols-outlined"><img class="check" src="./check.png" alt="check"></span>' };

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (
        !Object.keys(icon).includes(toastType))
        toastType = "info";

    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` <div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]}
                      </div> 
                      <div class="toast-message">
                      ${message}
                      </div> 
                      <div class="toast-progress"></div> 
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
        `${duration / 1000}s`;

    let toastAlready =
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box)
};

function clearPopupInputs() {
    document.getElementById('existPasswordEmail').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('existNameEmail').value = '';
    document.getElementById('newName').value = '';
    document.getElementById('existdeletEmail').value = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
}

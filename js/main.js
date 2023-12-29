var signUpName = document.getElementById('signUpName');
var signUpEmail = document.getElementById('signUpEmail');
var signUpPassword = document.getElementById('signUpPassword');
var SignUpBtn = document.getElementById('SignUpBtn');
var signInEmail = document.getElementById('signInEmail');
var signInPassword = document.getElementById('signInPassword');
var loginBtn = document.getElementById('loginBtn');
var exist = document.getElementById('exist');
var incorrect = document.getElementById('incorrect');
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

    if (signInPassword.value == "" || signInEmail.value == "") {
        incorrect.innerHTML = '<span class="error">All inputs is required</span>';
        return false;
    }

    if (Exist() == true) {

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
        showToast('Password changed successfully, ' + foundUser.name + '!');
        document.getElementById('passwordError').innerHTML = '';
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
        showToast('Name changed successfully!');
        document.getElementById('nameError').innerHTML = '';
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
        showToast('Account deleted successfully!');
        document.getElementById('emailError').innerHTML = '';
    } else {
        document.getElementById('emailError').innerHTML = '<span class="error">User not found .. Please provide a valid email</span>';
    }
}

// T O G G L E   M E N U

document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggle');
    var header = document.querySelector('header');

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

// S U C C E S S   M E S S A G E

function showToast(message) {
    var toast = document.getElementById('toast');
    var toastMessage = document.getElementById('toastMessage');

    toastMessage.innerText = message;
    toast.classList.add('active');

    setTimeout(function () {
        toast.classList.remove('active');
    }, 3000);
}

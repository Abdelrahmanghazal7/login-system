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

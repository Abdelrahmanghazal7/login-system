const signUpName = document.getElementById('signUpName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpBtn = document.getElementById('signUpBtn');
const signInEmail = document.getElementById('signInEmail');
const signInPassword = document.getElementById('signInPassword');
const loginBtn = document.getElementById('loginBtn');
const exist = document.getElementById('exist');
const incorrect = document.getElementById('incorrect');
const header = document.querySelector('header');
const hidePopup = document.querySelectorAll('.hide');
let signUpArray = getLocalStorageItem('users');

function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// S I G N - U P

signUpBtn.addEventListener('click', function (e) {

    signUpName.addEventListener('input', validateSignUpInputs);
    signUpEmail.addEventListener('input', validateSignUpInputs);
    signUpPassword.addEventListener('input', validateSignUpInputs);

    // Continue with the existing handleSignUp logic if the validation passes
    handleSignUp(e);
});

function handleSignUp(e) {
    e.preventDefault();

    if (validateSignUpInputs()) {
        const signUp = {
            name: signUpName.value,
            email: signUpEmail.value,
            password: signUpPassword.value
        };

        if (isEmailExist()) {
            exist.innerHTML = '<span class="error">Email already exists</span>';
        } else {
            clearSignUpform();
            signUpArray.push(signUp);
            localStorage.setItem('users', JSON.stringify(signUpArray));
            exist.innerHTML = '<span class="success">Success (login to access)</span>';
        }
    }
}

function validateSignUpInputs() {
    const emailFormat = /^\S+@\S+\.\S+$/;
    const passwordStrength = /^.{6,}$/;

    if (signUpName.value.trim() === "" || signUpEmail.value.trim() === "" || signUpPassword.value.trim() === "") {
        exist.innerHTML = '<span class="error">All inputs are required</span>';
        return false;
    }

    if (!emailFormat.test(signUpEmail.value.trim())) {
        exist.innerHTML = '<span class="error">Invalid email format</span>';
        return false;
    }

    if (!passwordStrength.test(signUpPassword.value.trim())) {
        exist.innerHTML = '<span class="error">Password must have at least 6 characters</span>';
        return false;
    }

    // Clear the error message when all fields are filled correctly
    exist.innerHTML = '';
    return true;
}

function isEmailExist() {
    return signUpArray.some(user => user.email.toLowerCase() === signUpEmail.value.toLowerCase());
}

function clearSignUpform() {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
}

// L O G I N

loginBtn.addEventListener('click', function (e) {

    signInEmail.addEventListener('input', validateLoginInputs);
    signInPassword.addEventListener('input', validateLoginInputs);

    // Continue with the existing handleLogin logic if the validation passes
    handleLogin(e);
});

function handleLogin(e) {
    e.preventDefault();

    incorrect.innerHTML = '';

    if (validateLoginInputs()) {
        if (Exist()) {
            signInEmail.value = '';
            signInPassword.value = '';
            window.location.assign('home.html');
        } else {
            incorrect.innerHTML = '<span class="error">Incorrect email or password</span>';
        }
    }
}

function validateLoginInputs() {
    if (signInEmail.value.trim() === "" || signInPassword.value.trim() === "") {
        incorrect.innerHTML = '<span class="error">All inputs are required</span>';
        return false;
    }

    // Clear the error message when all fields are filled correctly
    incorrect.innerHTML = '';
    return true;
}

function Exist() {
    const email = signInEmail.value;
    const password = signInPassword.value;

    const foundUser = signUpArray.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password.toLowerCase() === password.toLowerCase());

    if (foundUser) {
        localStorage.setItem('sessionUsername', foundUser.name);
        return true;
    }

    return false;
}

// C H A N G E   P A S S W O R D 
function changePassword() {
    const existPasswordEmail = document.getElementById('existPasswordEmail').value;
    const newPassword = document.getElementById('newPassword').value;

       // Validate if the new password has at least 6 characters
     if (newPassword.trim().length < 6) {
        document.getElementById('passwordError').innerHTML = '<span class="error">Password must have at least 6 characters</span>';
        return;
    }
    
    const foundUser = signUpArray.find(user => user.email.toLowerCase() === existPasswordEmail.toLowerCase());

    if (foundUser) {
        foundUser.password = newPassword;
        localStorage.setItem('users', JSON.stringify(signUpArray));

        showToast(`Password Changed Successfully <span class="founduser">${foundUser.name}</span>`, "success", 5000);
        clearPopupInputs();
    } else {
        document.getElementById('passwordError').innerHTML = '<span class="error">User not found .. Please sign up first or provide a valid email</span>';
    }
}

// C H A N G E   N A M E
function changeName() {
    const existNameEmail = document.getElementById('existNameEmail').value;
    const newName = document.getElementById('newName').value;

    const foundUser = signUpArray.find(user => user.email.toLowerCase() === existNameEmail.toLowerCase());
    if (foundUser) {
        foundUser.name = newName;
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('nameError').innerHTML = '';

        showToast(`Name Changed Successfully <span class="founduser">${foundUser.name}</span>`, "success", 5000);
        clearPopupInputs();
    } else {
        document.getElementById('nameError').innerHTML = '<span class="error">User not found .. Please sign up first or provide a valid email</span>';
    }
}

// D E L E T E  U S E R
function deleteAccount() {
    const existdeletEmail = document.getElementById('existdeletEmail').value;

    const userToDelete = signUpArray.find(user => user.email.toLowerCase() === existdeletEmail.toLowerCase());

    if (userToDelete) {
        const index = signUpArray.indexOf(userToDelete);
        signUpArray.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('emailError').innerHTML = '';

        showToast("Account Deleted Successfully", "success", 5000);
        clearPopupInputs();
    } else {
        document.getElementById('emailError').innerHTML = '<span class="error">User not found .. Please provide a valid email</span>';
    }
}

// T O G G L E   M E N U
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle');

    // Toggle menu on button click
    toggleButton.addEventListener('click', function () {
        header.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = header.contains(event.target);
        const isClickOnToggleButton = toggleButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggleButton) {
            header.classList.remove('open');
        }
    });
});

// H I D E   P O P U P
hidePopup.forEach(element => {
    element.addEventListener('click', function () {
        header.classList.remove('open');
        document.getElementById('passwordError').innerHTML = '';
        document.getElementById('nameError').innerHTML = '';
        document.getElementById('emailError').innerHTML = '';
    });
});

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

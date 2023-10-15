document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if( ! loginForm) console.error('#login-form not found - ignored');
    else loginForm.addEventListener('submit', loginFormSubmit);

    const namePhoneForm = document.getElementById('name-phone-form');
    if( ! namePhoneForm ) console.error('#name-phone-form not found - ignored');
    else namePhoneForm.addEventListener('submit', namePhoneFormSubmit);
});

function namePhoneFormSubmit(e) {
    e.preventDefault();
    console.log('namePhoneFormSubmit') ;
    validateNamePhoneForm();
}
function validateNamePhoneForm() {
    const namePhoneForm = document.getElementById('name-phone-form');
    if( ! namePhoneForm ) throw '#name-phone-form not found - Validation stopped';
    const nameInput = namePhoneForm.querySelector('[name="user-name"]');
    if( ! nameInput ) throw '[name="user-name"] not found - Validation stopped';
    const phoneInput = namePhoneForm.querySelector('[name="user-phone"]');
    if( ! phoneInput ) throw '[name="user-phone"] not found - Validation stopped';
    
    const nameHelper = nameInput.parentNode.querySelector('.helper-text');  // class="helper-text" 
    if( nameInput.value == "" ) {
        nameInput.className = "invalid";
        nameHelper.setAttribute("data-error", "Ім'я не може бути порожним");
    }
    else if( /\d/.test(nameInput.value) ) {
        nameInput.className = "invalid";
        nameHelper.setAttribute("data-error", "Ім'я не може містити цифри");
    }
    else if( /[^a-zа-яіїєґ' ]/i.test(nameInput.value) ) {
        nameInput.className = "invalid";
        nameHelper.setAttribute("data-error", "Ім'я не може містити спецзнаки");
    }
    else {
        nameInput.className = "valid";
    }


    const phoneHelper = phoneInput.parentNode.querySelector('.helper-text');  // class="helper-text" 
    if( phoneInput.value == "" ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "Номер не може бути порожним");
    }/*
    else if( /\D/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "Номер має складатись з цифр");
    }
    else if( ! /^\d{6}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "Номер має складатись з 6 цифр");
    }
    else if( ! /^\d{6,8}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "Номер від 6 до 8 цифр");
    }
    else if( ! /^\d{2}-\d{2}-\d{2}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "Номер має виглядати як xx-xx-xx");
    }   
    else if( ! /^\d{2}(-\d{2}){2}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "Номер має виглядати як xx-xx-xx");
    } 
    else if( ! /^\d{2}(-?\d{2}){2}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", "xx-xx-xx або xxxxxx");
    } */     
    else if( ! /^\+\d\d\(0\d\d\)([- ]?\d){7}$/.test(phoneInput.value) ) {
        phoneInput.className = "invalid";
        phoneHelper.setAttribute("data-error", " +38(098)7654321");
    }
    else {
        phoneInput.className = "valid";
    }

}

// лямбда (у програмуванні) - функціональний вираз (expression), тобто
// інструкція (statement), яка повертає значення
loginFormSubmit = e => {
    // console.log(e);
    e.preventDefault();  // зупинити обробку за замовчанням
    console.log("Submit detected");
    var result = validateForm(e.target);
    if( result !== true ) {
        alert( result ) ;
    }
};

function validateForm(formNode) {
    const loginInput = formNode.querySelector('[name="user-login"]');
    if( ! loginInput ) throw 'Element [name="user-login"] not found';
    const userLogin = loginInput.value;
    if(userLogin.length < 2) {
        return "Логін закороткий";
    }
    return true ;
}
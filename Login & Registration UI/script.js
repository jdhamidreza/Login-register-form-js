const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

RegisterLink.addEventListener('click', () =>{
    container.classList.add('active');
})

LoginLink.addEventListener('click', () => {
    container.classList.remove('active');
})

// Live validation rules
function isValidEmail(value){
    // RFC 5322-inspired, pragmatic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(value.trim());
}

function isStrongPassword(value){
    // >= 12 chars, at least 3 uppercase letters, a number, a symbol
    if(!value || value.length < 12) return false;
    const upperMatches = value.match(/[A-Z]/g) || [];
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[^A-Za-z0-9]/.test(value);
    return upperMatches.length >= 3 && hasNumber && hasSymbol;
}

function isValidUsername(value){
    // > 3 characters
    return typeof value === 'string' && value.trim().length > 3;
}

function isValidPhone(value){
    // Simple international phone check: 7-15 digits, optional leading + and spaces/dashes
    const digits = value.replace(/[^\d]/g, '');
    return digits.length >= 7 && digits.length <= 15;
}

function ensureFieldMessage(containerEl){
    let msg = containerEl.querySelector('.field-msg');
    if(!msg){
        msg = document.createElement('div');
        msg.className = 'field-msg';
        containerEl.appendChild(msg);
    }
    return msg;
}

function attachValidation(input){
    const wrapper = input.closest('.input-box');
    if(!wrapper) return;
    const msg = ensureFieldMessage(wrapper);

    const update = () => {
        // If user hasn't tried to submit yet for this form, do not show messages
        const form = input.closest('form');
        const shouldShow = form && form.dataset.submitAttempted === '1';
        const name = (input.getAttribute('name') || '').toLowerCase();
        const value = input.value;
        let valid = true;
        let text = '';

        if(name === 'email'){
            valid = isValidEmail(value);
            text = valid ? '' : 'Enter a valid email address';
        } else if(name === 'password'){
            valid = isStrongPassword(value);
            text = valid ? '' : '12+ chars, 3 uppercase, a number, a symbol';
        } else if(name === 'username'){
            valid = isValidUsername(value);
            text = valid ? '' : 'Username must be more than 3 characters';
        } else if(name === 'phone'){
            valid = isValidPhone(value);
            text = valid ? '' : 'Enter a valid phone number';
        }

        const showState = shouldShow || document.activeElement === input;
        wrapper.classList.toggle('valid', showState && valid && value.length > 0);
        wrapper.classList.toggle('invalid', showState && !valid && value.length > 0);
        msg.textContent = showState ? text : '';
        // Always keep actual validity correct so form submission can be blocked
        input.setCustomValidity(valid ? '' : text);
    };

    input.addEventListener('input', update);
    input.addEventListener('blur', update);
    update();
}

// Attach validation to inputs
document.querySelectorAll('.form-box input').forEach(attachValidation);

// Defer showing messages until the user attempts to submit
document.querySelectorAll('.form-box form').forEach((form) => {
    form.addEventListener('submit', (e) => {
        form.dataset.submitAttempted = '1';

        // Re-validate all inputs in this form
        const inputs = form.querySelectorAll('input');
        let firstInvalid = null;
        inputs.forEach((input) => {
            // Trigger input event to run validators
            input.dispatchEvent(new Event('input', { bubbles: true }));
            if(!firstInvalid && !input.checkValidity()){
                firstInvalid = input;
            }
        });

        if(firstInvalid){
            e.preventDefault();
            firstInvalid.focus();
        }
    });
});
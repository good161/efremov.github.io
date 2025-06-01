document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('.registration-form__input');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        inputs.forEach(input => {
            const group = input.closest('.registration-form__group');
            group.classList.remove('registration-form__group--error');
            if (!input.value.trim()) {
                group.classList.add('registration-form__group--error');
                isValid = false;
            }
            if (input.id === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
                group.classList.add('registration-form__group--error');
                isValid = false;
            }
            if (input.id === 'password' && input.value.length < 8) {
                group.classList.add('registration-form__group--error');
                isValid = false;
            }
            if (input.id === 'confirmPassword' &&
                input.value !== document.getElementById('password').value) {
                group.classList.add('registration-form__group--error');
                isValid = false;
            }
        });
        if (isValid) {
            alert('Регистрация успешна!');
            form.reset();
        }
    });
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('registration-form__group--focus');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('registration-form__group--focus');
        });
    });
});

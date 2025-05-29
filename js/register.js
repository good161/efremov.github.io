document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isFormValid = true;
    const form = this;
    const usernameField = form.querySelector('#username');
    if (!usernameField.value.trim()) {
        usernameField.parentElement.classList.add('registration-form__group--error');
        isFormValid = false;
    } else {
        usernameField.parentElement.classList.remove('registration-form__group--error');
    }
    const emailField = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value || !emailRegex.test(emailField.value)) {
        emailField.parentElement.classList.add('registration-form__group--error');
        isFormValid = false;
    } else {
        emailField.parentElement.classList.remove('registration-form__group--error');
    }
    const passwordField = form.querySelector('#password');
    if (!passwordField.value || passwordField.value.length < 8) {
        passwordField.parentElement.classList.add('registration-form__group--error');
        isFormValid = false;
    } else {
        passwordField.parentElement.classList.remove('registration-form__group--error');
    }
    const confirmPasswordField = form.querySelector('#confirmPassword');
    if (passwordField.value !== confirmPasswordField.value) {
        confirmPasswordField.parentElement.classList.add('registration-form__group--error');
        isFormValid = false;
    } else {
        confirmPasswordField.parentElement.classList.remove('registration-form__group--error');
    }
    if (isFormValid) {
        console.log('Форма валидна, отправка данных...');
        alert('Регистрация успешно завершена!');
    }
});

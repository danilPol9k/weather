document.addEventListener('DOMContentLoaded', function () {
    togglePasswordVisibility();
  });
  
  function togglePasswordVisibility() {
    let passwordInput = document.getElementById('password');
    let eye = document.querySelector('.eye');
    eye.addEventListener('click', function () {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eye.style.backgroundImage = "url('/images/close.png')";
      } else {
        passwordInput.type = 'password';
        eye.style.backgroundImage = "url('/images/open.png')";
      }
    })
}

function validateRegistration(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let messageElement = document.getElementById("message");

    if (username.length < 3) {
        messageElement.innerText = "Имя пользователя должно содержать не менее 3 символов";
        return false;
    } else if (!email.includes("@") || !email.includes(".")) {
        messageElement.innerText = "Неверный формат email";
        return false;
    } else if (password.length < 6) {
        messageElement.innerText = "Пароль должен содержать не менее 6 символов";
        return false;
    } else {
        messageElement.innerText = "Регистрация успешна";

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 2500);

        return true;
    } 
}

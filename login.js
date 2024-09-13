document.addEventListener('DOMContentLoaded', function () {
  const inp = document.querySelector('.inp-num');

  inp.addEventListener('input', function () {
    if (this.value.length > 1) {
      this.value = this.value.slice(0, 1);
    }
  });

  inp.addEventListener('keydown', function (event) {
    if (!/\d/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  });
});

function validateRegistration(event) {
  event.preventDefault();

  const inputs = document.querySelectorAll('.inp-num');
  let allFilled = true;
  for (let input of inputs) {
    if (input.value === '' || input.value.length !== 1) {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1000);
  }
}
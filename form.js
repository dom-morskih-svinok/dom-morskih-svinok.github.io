// Форма заявки демонстрационная: данные проверяются здесь и никуда не уходят.
(function () {
  var form = document.getElementById("request-form");
  if (!form) return;

  var done = document.getElementById("request-done");
  var nameInput = document.getElementById("request-name");
  var contactInput = document.getElementById("request-contact");

  function showError(input, text) {
    var box = document.getElementById(input.id + "-error");
    box.textContent = text;
    box.hidden = !text;
    if (text) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  function isContact(value) {
    var email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    var digits = value.replace(/\D/g, "");
    var phone = /^[+\d\s()-]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
    return email || phone;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = nameInput.value.trim();
    var contact = contactInput.value.trim();

    showError(nameInput, name ? "" : "Напишите, как к вам обращаться.");
    if (!contact) {
      showError(contactInput, "Укажите телефон или почту.");
    } else if (!isContact(contact)) {
      showError(contactInput, "Проверьте контакт. Пример телефона: +7 900 000-00-00, пример почты: name@mail.ru.");
    } else {
      showError(contactInput, "");
    }

    var firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    form.reset();
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });
})();

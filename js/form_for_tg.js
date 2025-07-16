
  document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      partnership: document.getElementById('partnership').value,
      schedule: document.querySelector('input[name="schedule"]:checked')?.value || 'Not selected',
      additionalInfo: document.getElementById('additionalInfo').value.trim()
    };

    const telegramBotToken = '7542517520:AAE4I49ZLYolTP1s97cTwwUIh6riJgg9eOI';
    const telegramChatId = '746586393';

    let message = `<b>📥 New Contact Form Submission</b>%0A`;
    message += `<b>First Name:</b> ${formData.firstName}%0A`;
    message += `<b>Last Name:</b> ${formData.lastName}%0A`;
    message += `<b>Email:</b> ${formData.email}%0A`;
    message += `<b>Phone:</b> ${formData.phone}%0A`;
    message += `<b>Partnership:</b> ${formData.partnership}%0A`;
    message += `<b>Schedule a Call:</b> ${formData.schedule}%0A`;
    message += `<b>Additional Info:</b> ${formData.additionalInfo || 'N/A'}`;

    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&parse_mode=html&text=${message}`)
      .then(response => {
        if (response.ok) {
          showMainregPopup('mainregSuccessPopup');
          document.getElementById('contactForm').reset();
        } else {
          showMainregPopup('mainregErrorPopup');
        }
        // В обоих случаях закрываем форму
        popupBg_camp.classList.remove('active');
        popup_camp.classList.remove('active');
        unlockScroll();

      })
      .catch(error => {
        console.error('Telegram Error:', error);
        showMainregPopup('mainregErrorPopup');
        // Закрываем форму, но данные не сбрасываем
        popupBg_camp.classList.remove('active');
        popup_camp.classList.remove('active');
        unlockScroll();

      });
  });

  function showMainregPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'block';

    popup.querySelector('.mainreg-popup-close-btn').addEventListener('click', () => {
      popup.style.display = 'none';
    });

    setTimeout(() => {
      popup.style.display = 'none';
    }, 15000);
  }









// popup форма для отправки заявки

// popup
let popupBg_camp = document.querySelector('.popup__bg_camp');
let popup_camp = document.querySelector('.popup_camp');
let openPopupButtons_camp = document.querySelectorAll('.open-popup_camp'); 
let closePopupButton_camp = document.querySelector('.close-popup_camp'); 
let closePopupButtonSubmit_camp = document.querySelector('.close_through_submit_camp');

// Проверка на заполненность полей
function checkFormValidity() {
  const firstName = document.getElementById('firstName')?.value.trim() || "";
  const lastName = document.getElementById('lastName')?.value.trim() || "";
  const email = document.getElementById('email')?.value.trim() || "";
  const phone = document.getElementById('phone')?.value.trim() || "";
  const partnership = document.getElementById('partnership')?.value || "";
  const schedule = document.querySelector('input[name="schedule"]:checked')?.value || "";

  return (
    firstName &&
    lastName &&
    email &&
    phone &&
    partnership &&
    schedule
  );
}


// Функция для блокировки прокрутки
function lockScroll() {
    document.body.classList.add('lock-scroll');
}

// Функция для разблокировки прокрутки
function unlockScroll() {
    document.body.classList.remove('lock-scroll');
}

// Проверяем, существуют ли элементы, прежде чем вешать обработчики событий
if (openPopupButtons_camp) {
    openPopupButtons_camp.forEach((button) => { 
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (popupBg_camp && popup_camp) {
                popupBg_camp.classList.add('active');
                popup_camp.classList.add('active');
                lockScroll();
            }
        });
    });
}

if (closePopupButton_camp) {
    closePopupButton_camp.addEventListener('click', () => {
        if (popupBg_camp && popup_camp) {
            popupBg_camp.classList.remove('active');
            popup_camp.classList.remove('active');
            unlockScroll();
        }
    });
}

document.addEventListener('click', (e) => {
    if (popupBg_camp && e.target === popupBg_camp) {
        popupBg_camp.classList.remove('active');
        popup_camp.classList.remove('active');
        unlockScroll();
    }
});

if (closePopupButtonSubmit_camp) {
    closePopupButtonSubmit_camp.addEventListener('click', () => {
        if (checkFormValidity() && popupBg_camp && popup_camp) {
            popupBg_camp.classList.remove('active');
            popup_camp.classList.remove('active');
            unlockScroll();
        }
    });
}

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
